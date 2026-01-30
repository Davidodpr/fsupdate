import { useEffect, useState } from 'react'
import { Controller, Control, UseFormWatch, UseFormSetValue, FieldErrors } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useUserContext } from '@/common/context/user/UserProvider'
import { extractDtoValidationErrors } from '@/common/helpers/extractDtoValidationErrors'
import { BaseToAddress, BaseToAddressFormValues } from '@/components/organisms/AddressForm'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import ApartmentNumberInfoModal from '@/components/molecules/ApartmentNumberInfoModal'
import InfoIcon from '@/public/images/Info.svg'
import { RESIDENCE_TYPES, APARTMENT_TYPES } from '@/constants/residenceTypes'
import {
  apartmentNumberVariants,
  buttonWrapperVariants,
  buttonsWrapperVariants,
  imageWrapperVariants,
  inputsWrapperVariants,
  livingSelectionVariants,
  livingSelectionButtonWrapperVariants,
  selectionWrapperVariants,
  sqmVariants,
  textWrapperVariants,
  toAddressWrapperVariants,
} from './ToAddress.variants'

const APARTMENT_NUMBER_ERROR = 'Apartment number needs to consist of 4 digits'

export type ToAddressProps = {
  setAccordionValue: (arg0: string) => void
}

// Inner component to handle form fields with hooks
const ToAddressFormContent = ({
  control,
  watch,
  setValue,
  errors,
  isApartmentNumberError,
  toAddressModal,
  setToAddressModal,
  toAddress,
  apartmentType,
  residenceType,
}: {
  control: Control<BaseToAddressFormValues>
  watch: UseFormWatch<BaseToAddressFormValues>
  setValue: UseFormSetValue<BaseToAddressFormValues>
  errors: FieldErrors<BaseToAddressFormValues>
  isApartmentNumberError: boolean
  toAddressModal: boolean
  setToAddressModal: (value: boolean) => void
  toAddress: ToAddress
  apartmentType: string | null
  residenceType: string
}) => {
  const { t } = useTranslation(['common', 'error'])

  // Sync values from user context when toAddress changes
  useEffect(() => {
    if (toAddress && toAddress?.street) {
      setValue('autoCompleteAddress', toAddress?.street)
      setValue('city', toAddress?.city)
      setValue('apartmentType', apartmentType || '')
      setValue('residenceType', residenceType)
    }
  }, [toAddress, setValue, apartmentType, residenceType])

  return (
    <>
      <div className={inputsWrapperVariants()}>
        <div className={sqmVariants()}>
          <Controller
            name="sqm"
            control={control}
            render={({ field }) => <Input {...field} value={field.value || ''} error={errors?.sqm?.message} type="text" label={t('sqm')} />}
          />
        </div>
      </div>
      <div className={selectionWrapperVariants()}>
        {!!watch('street') && (
          <div className={livingSelectionVariants()}>
            <div className={buttonsWrapperVariants()}>
              <div
                className={livingSelectionButtonWrapperVariants({ selected: watch('residenceType') === RESIDENCE_TYPES.APARTMENT })}
                onClick={() => {
                  setValue('residenceType', RESIDENCE_TYPES.APARTMENT)
                }}
              >
                {t('INFOMISSING.apartment')}
              </div>
              <div
                style={{ margin: '0 10px' }}
                className={livingSelectionButtonWrapperVariants({ selected: watch('residenceType') === RESIDENCE_TYPES.TOWNHOUSE })}
                onClick={() => setValue('residenceType', RESIDENCE_TYPES.TOWNHOUSE)}
              >
                {t('INFOMISSING.townhouse')}
              </div>
              <div
                className={livingSelectionButtonWrapperVariants({ selected: watch('residenceType') === RESIDENCE_TYPES.HOUSE })}
                onClick={() => setValue('residenceType', RESIDENCE_TYPES.HOUSE)}
              >
                {t('INFOMISSING.house')}
              </div>
            </div>
          </div>
        )}
        {watch('residenceType') === RESIDENCE_TYPES.APARTMENT && (
          <>
            <div className={livingSelectionVariants()}>
              <div className={buttonsWrapperVariants()}>
                <div
                  className={livingSelectionButtonWrapperVariants({ selected: watch('apartmentType') === APARTMENT_TYPES.OWNED })}
                  onClick={() => {
                    setValue('apartmentType', APARTMENT_TYPES.OWNED)
                  }}
                >
                  {t('COMMONADDRESS.owningRight')}
                </div>
                <div
                  style={{ margin: '0 10px' }}
                  className={livingSelectionButtonWrapperVariants({ selected: watch('apartmentType') === APARTMENT_TYPES.RENTAL })}
                  onClick={() => setValue('apartmentType', APARTMENT_TYPES.RENTAL)}
                >
                  {t('COMMONADDRESS.renting')}
                </div>
              </div>
            </div>
            <div className={apartmentNumberVariants()}>
              <Controller
                name="apartmentNumber"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value || ''}
                    startAdornment={t('apartment')}
                    error={isApartmentNumberError ? t('error:INFOMISSING.invalidApartmentNumber') : errors?.apartmentNumber?.message}
                    type="number"
                    label={t('apartmentNumber')}
                  />
                )}
              />
            </div>
            <div className={textWrapperVariants()}>
              <div className={imageWrapperVariants()}>
                <InfoIcon width={20} height={20} color="#1f6156" />
              </div>
              <p>
                {t('apartmenNumberInfo')}
                <a className="border-b-1 !font-bold" onClick={() => setToAddressModal(true)}>
                  {t('viewGuide')}{' '}
                </a>
              </p>
            </div>
          </>
        )}
      </div>
      <div className={buttonWrapperVariants()}>
        <Button padding="8px 52px" text={t('common:INFOMISSING.save')} variant="outline" type="submit" />
      </div>
      <ApartmentNumberInfoModal showModal={toAddressModal} setShowModal={setToAddressModal} />
    </>
  )
}

const ToAddress = ({ setAccordionValue }: ToAddressProps) => {
  const [isApartmentNumberError, setIsApartmentNumberError] = useState(false)
  const [toAddressModal, setToAddressModal] = useState(false)

  const { updateCurrentToAddress, user } = useUserContext()
  const {
    currentMove: { toAddress, residenceSize, apartmentType, residenceType },
  } = user

  const handleSubmit = async (data: BaseToAddressFormValues) => {
    try {
      const streetAddress = `${data.street || ''} ${data.streetNumber || ''}`.trim()

      const response = await updateCurrentToAddress({
        street: streetAddress,
        city: data.city,
        zip: data.zip,
        residenceType: data.residenceType || null,
        apartmentNumber: data.apartmentNumber || null,
        apartmentType: data.apartmentType || APARTMENT_TYPES.OWNED,
        residenceSize: data.sqm || null,
      })

      if (response?.id) {
        setAccordionValue('')
      }
    } catch (error: unknown) {
      const castedError = error as ErrorType
      if (extractDtoValidationErrors(castedError).includes(APARTMENT_NUMBER_ERROR)) {
        setIsApartmentNumberError(true)
      }
    }
  }

  return (
    <div data-testid="to-address-container">
      <BaseToAddress
        withResidenceSize
        withResidenceType
        withApartmentFields
        initialValues={{
          autoCompleteAddress: toAddress?.street || '',
          street: toAddress?.street || '',
          zip: toAddress?.zip || '',
          city: toAddress?.city || '',
          apartmentNumber: toAddress?.apartmentNumber || '',
          sqm: residenceSize?.toString() ?? '',
          residenceType: residenceType || '',
          apartmentType: apartmentType || '',
        }}
        onSubmit={handleSubmit}
        className={toAddressWrapperVariants()}
      >
        {(methods) => (
          <ToAddressFormContent
            control={methods.control}
            watch={methods.watch}
            setValue={methods.setValue}
            errors={methods.formState.errors}
            isApartmentNumberError={isApartmentNumberError}
            toAddressModal={toAddressModal}
            setToAddressModal={setToAddressModal}
            toAddress={toAddress}
            apartmentType={apartmentType}
            residenceType={residenceType}
          />
        )}
      </BaseToAddress>
    </div>
  )
}

export default ToAddress
