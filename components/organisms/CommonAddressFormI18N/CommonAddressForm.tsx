import React, { useState, useCallback, useEffect } from 'react'
import { useFormContext, useController, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDebounce } from 'react-use'
import { clsx } from 'clsx'
import { useAutocompleteService } from '@/common/context/autocompleteProvider/autocomplete.provider'
import { useFormHelpers } from '@/common/hooks/useFormHelpers'
import Input from '@/components/atoms/Input'
import { Autocomplete } from '@/components/molecules/Autocomplete'
import CrossBorderMoveModal from '../CrossBorderMoveModal'

export type CommonAddressFormProps = {
  withErrorPadding?: boolean
  openQuotationModal?: (open: boolean) => void
  externalZipTranslation?: string
  hasSetValueCheck?: (hasSetValue: boolean) => void
  customOnSelect?: () => void
  withNoHeightOnAddress?: boolean
  customOnNoAddressSelect?: () => void
  setMissingStreetNumberError?: (error: boolean) => void
}

const CommonAddressFormI18N = ({
  withErrorPadding = false,
  openQuotationModal,
  hasSetValueCheck,
  externalZipTranslation,
  customOnSelect,
  customOnNoAddressSelect,
  withNoHeightOnAddress,
  setMissingStreetNumberError,
}: CommonAddressFormProps) => {
  const { t } = useTranslation(['common', 'error'])
  const autocompleteService = useAutocompleteService()

  const {
    formState: { errors },
    setValue,
    control,
    register,
    getValues,
    trigger,
    watch,
  } = useFormContext<FormValuesCommon>()

  const { setValueHelper } = useFormHelpers(control, setValue)
  const {
    field: { onChange, name, value, ref },
  } = useController({
    name: 'autoCompleteAddress',
    control,
  })
  const [customInput, setCustomInput] = useState(false)
  const [hasSetValue, setHasSetValue] = useState(false)
  const [googleResult, setGoogleResult] = useState<google.maps.places.AutocompletePrediction[]>([])
  const [val, setVal] = useState('')
  const [isStreetNumberSet, setIsStreetNumberSet] = useState(false)

  useEffect(() => {
    if (hasSetValue && hasSetValueCheck) {
      hasSetValueCheck(true)
    }
  }, [hasSetValue, hasSetValueCheck])

  useDebounce(
    () => {
      if (typeof window !== undefined && autocompleteService) {
        autocompleteService.getPlacePredictions(
          {
            input: val,
            componentRestrictions: { country: 'se' },
          },
          (result: google.maps.places.AutocompletePrediction[] | null) => {
            setGoogleResult(result || [])
          },
        )
      }
    },
    200,
    [val, setGoogleResult],
  )

  const customOnChange = useCallback(
    (onChangeValue: string | undefined) => {
      if (onChangeValue) setVal(onChangeValue)
    },
    [setVal],
  )

  const onSelect = useCallback(
    (addressValue: string) => {
      // Blur the active element to close the keyboard on mobile
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }

      if (addressValue === 'NoAddress') {
        !!openQuotationModal && openQuotationModal(true)

        // Extract street number from the end of the autocomplete text
        // Matches patterns like "Kungsgatan 12", "Main Street 123A", etc.
        const streetNumberMatch = val.match(/^(.+)\s+(\d+[A-Za-z]?)$/)

        if (streetNumberMatch) {
          setValue('street', streetNumberMatch[1].trim(), { shouldDirty: true, shouldValidate: true })
          setValue('streetNumber', streetNumberMatch[2], { shouldDirty: true, shouldValidate: true })
        } else {
          setValue('street', val, { shouldDirty: true, shouldValidate: true })
          setValue('streetNumber', '', { shouldDirty: true, shouldValidate: true })
        }

        setValue('autoCompleteAddress', '', { shouldDirty: true, shouldValidate: true })
        setValue('hiddenStreetNumber', 'false', { shouldDirty: true, shouldValidate: true })
        setCustomInput(true)
        trigger(['street', 'streetNumber', 'autoCompleteAddress', 'zip', 'city'])

        customOnNoAddressSelect?.()
      } else {
        const detailsService = new google.maps.places.PlacesService(document.createElement('div'))
        const request = {
          placeId: addressValue,
          fields: ['name', 'address_component'],
        }

        detailsService.getDetails(request, (place) => {
          if (!!place?.address_components?.length) {
            const address = place?.address_components
            const streetNumber = address.find((component) => component.types.includes('street_number'))?.long_name

            if (!streetNumber) {
              setValue('hiddenStreetNumber', 'true')
              setIsStreetNumberSet(true)
            } else {
              setIsStreetNumberSet(false)
            }

            setValue('street', address.find((component) => component.types.includes('route'))?.long_name || '')
            /* If the property doesn't exist street_number will only contain 3. */
            setValue('streetNumber', streetNumber || '')
            setValueHelper('zip', address.find((component) => component.types.includes('postal_code'))?.long_name.replace(' ', '') || '')
            setValueHelper(
              'city',
              address.find((component) => component.types.includes('postal_town'))?.long_name ||
                address.find((component) => component.types.includes('sublocality'))?.long_name ||
                '',
            )
            setHasSetValue(true)
          }
          trigger(['streetNumber', 'autoCompleteAddress', 'zip', 'city', 'street'])
          customOnSelect?.()
        })
      }
    },
    [setValue, setHasSetValue, setValueHelper, val, openQuotationModal, setCustomInput, setIsStreetNumberSet, trigger, customOnNoAddressSelect, customOnSelect],
  )

  useEffect(() => {
    if (customInput || isStreetNumberSet) {
      const subscription = watch((addressValues) => {
        if (addressValues?.streetNumber?.length && addressValues?.zip?.length) {
          trigger(['streetNumber', 'autoCompleteAddress', 'zip', 'city', 'street'])
        }
      })
      return () => subscription.unsubscribe()
    }
  }, [customInput, isStreetNumberSet, trigger, watch])

  const errorsLength = Object.keys(errors).length

  useEffect(() => {
    if (errors?.streetNumber?.message?.length) {
      setMissingStreetNumberError && setMissingStreetNumberError(true)
    } else if (errorsLength === 0) {
      setMissingStreetNumberError && setMissingStreetNumberError(false)
    }
  }, [errors, errorsLength, setMissingStreetNumberError])

  return (
    <div className="w-full flex flex-col">
      {!customInput ? (
        <>
          <div className="flex gap-2.5 py-0.5">
            <div className={clsx('w-full flex-grow p-1 h-15 overflow-y-visible text-black text-sm font-normal', withNoHeightOnAddress && 'h-auto')}>
              <Autocomplete
                className="w-full text-base"
                onChange={(event) => {
                  onChange(event) // data send back to hook form
                  customOnChange(event) // UI state
                }}
                items={[...googleResult.map((loc) => ({ label: loc.description, value: loc.place_id })), { label: t('INFOMISSING.noAddress') ?? '', value: 'NoAddress' }]}
                label={t('COMMONADDRESS.address')}
                onSelect={onSelect}
                dataTestId="autocomplete"
                name={name}
                ref={ref}
                value={value}
                autoComplete="one-time-code"
                error={errors?.zip?.message && !errors.autoCompleteAddress?.message && externalZipTranslation ? externalZipTranslation : errors?.autoCompleteAddress?.message}
              />
            </div>
            {isStreetNumberSet && (
              <div className="flex-grow-0 p-1 h-15 flex-[0_0_45%] font-normal">
                <Input
                  defaultValue={getValues().streetNumber}
                  error={errors?.streetNumber?.message}
                  type="text"
                  label={t('COMMONADDRESS.streetNumber')}
                  autoComplete="one-time-code"
                  data-lpignore="true"
                  data-form-type="other"
                  data-1p-ignore="true"
                  {...register('streetNumber')}
                />
              </div>
            )}
            <input hidden defaultValue="false" {...register('hiddenStreetNumber')}></input>
          </div>
          <div className="flex gap-2.5 py-0.5" style={{ display: hasSetValue || (!!getValues().zip?.length && !!getValues().city?.length) ? 'flex' : 'none' }}>
            <div className="flex-grow-0 p-1 h-15 flex-[0_0_40%] font-normal">
              <Input defaultValue={getValues().zip} error={errors?.zip?.message} type="text" label={t('COMMONADDRESS.zipCode')} {...register('zip')} />
            </div>
            <div className="max-w-[60%] flex-grow p-1 h-15">
              <Input {...register('city')} defaultValue={getValues().city} error={errors?.city?.message} type="text" label={t('COMMONADDRESS.city')} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={clsx('flex gap-2.5 py-0.5', withErrorPadding && 'px-0.5 pb-3.5')}>
            <div className="w-full flex-grow p-1 h-15 overflow-y-visible text-black text-sm font-normal">
              <Controller
                name="street"
                control={control}
                render={({ field }) => <Input {...field} error={errors?.street?.message} type="text" label={t('COMMONADDRESS.street')} />}
              />
            </div>
            <div className="flex-grow-0 p-1 h-15 flex-[0_0_45%] font-normal">
              <Controller
                name="streetNumber"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    error={errors?.streetNumber?.message}
                    type="text"
                    label={t('COMMONADDRESS.streetNumber')}
                    autoComplete="one-time-code"
                    data-lpignore="true"
                    data-form-type="other"
                    data-1p-ignore="true"
                  />
                )}
              />
            </div>
          </div>
          <div className="flex gap-2.5 py-0.5">
            <div className="flex-grow-0 p-1 h-15 flex-[0_0_40%] font-normal">
              <Controller name="zip" control={control} render={({ field }) => <Input {...field} error={errors?.zip?.message} type="text" label={t('COMMONADDRESS.zipCode')} />} />
            </div>
            <div className="max-w-[60%] flex-grow p-1 h-15">
              <Controller name="city" control={control} render={({ field }) => <Input {...field} error={errors?.city?.message} type="text" label={t('COMMONADDRESS.city')} />} />
            </div>
          </div>
          <CrossBorderMoveModal />
        </>
      )}
    </div>
  )
}

export default CommonAddressFormI18N
