import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDebounce, useEffectOnce } from 'react-use'
import * as yup from 'yup'
import { useAddresschangeContext } from '@/common/context/addresschange/addresschange.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import { SkatteverketStatusEnum } from '@/common/enums/SkatteverketEnum'
import seperateStreetNumber from '@/common/helpers/seperateStreetNumber'
import validateApartmentNumber from '@/common/helpers/validateApartmentNumber'
import ArrowForward from '@/components/atoms/ArrowForward'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Text from '@/components/atoms/Text'
import { ApartmentNumber } from '@/components/molecules/ApartmentNumber'
import InfoBoxColored from '@/components/molecules/InfoBoxColored'
import { RadioGroup } from '@/components/molecules/RadioGroup'
import { RadioItem } from '@/components/molecules/RadioGroup'
import { RadioIndicator } from '@/components/molecules/RadioGroup'
import CommonAddressFormI18N from '@/components/organisms/CommonAddressFormI18N'
import DatePicker from '@/components/organisms/DatePicker'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  infoBoxWrapperVariants,
  buttonWrapperVariants,
  formWrapperVariants,
  innerWrapperVariants,
  inputWrapperVariants,
  stepTemplateWrapperVariants,
  radioGroupWrapperVariants,
  radioItemLabelVariants,
  goBackButtonVariants,
  styledInputVariants,
} from '../../AddresschangePage.variants'
import { PeopleToMove } from '../../components/PeopleToMove'

interface Props {
  goToNextStep: () => void
  goToPrevStep: () => void
}

export const NewAddress = ({ goToNextStep, goToPrevStep }: Props) => {
  const { t } = useTranslation(['addresschange', 'error', 'common'])
  const [apartmentNumberError, setApartmentNumberError] = useState({ valid: true, message: '' })
  const [showModal, setShowModal] = useState<boolean>(false)
  const { validateAddress, getAddresses, setContract, availableApartmentNumbers, validation, contract, setError } = useAddresschangeContext()
  const {
    user: {
      currentMove,
      currentMove: { movingDate },
    },
  } = useUserContext()

  const [val, setVal] = useState('')

  const schema = yup.object({
    street: yup.string().required(`${t('error:INFOMISSING.invalidStreet')}`),
    streetNumber: yup.string().required(`${t('error:streetNoRequried')}`),
    zip: yup
      .string()
      .required(`${t('error:INFOMISSING.invalidZip')}`)
      .length(5, `${t('error:INFOMISSING.invalidZip')}`),
    city: yup.string().required(`${t('error:cityRequried')}`),
    apartmentNumber: yup.string().trim(),
    moveDate: yup.string().required(),
    isPermanent: yup.string(),
    validity: yup.mixed().when('isPermanent', { is: 'temporary', then: yup.number().positive().integer().required(), otherwise: yup.mixed().optional() }),
    email: yup.string(),
    phone: yup.string(),
  })

  const methods = useForm<AddresschangeFormValues>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      street: contract?.newAddress?.streetName || '',
      streetNumber: contract?.newAddress?.streetNumber || '',
      zip: contract?.newAddress?.zip || undefined,
      city: contract?.newAddress?.city || '',
      apartmentNumber: contract?.newAddress?.apartmentNumber || '',
      moveDate: contract?.moveDate || movingDate || new Date(),
      isPermanent: contract?.isPermanent ? 'permanent' : 'temporary',
      validity: contract?.validity || '',
      email: contract?.contactInformation?.email || '',
      phone: contract?.contactInformation?.phoneNumber || '',
    },
  })

  const {
    register,
    setValue,
    getValues,
    formState: { errors, isValid, isValidating },
    trigger,
  } = methods

  const setDatePicked = (date: DatePickerDates) => {
    setValue('moveDate', date?.isoDate)
  }

  const handleRadioButtonChange = (isPermanent: string) => {
    setValue('isPermanent', isPermanent)
    setContract({ ...contract, isPermanent: isPermanent === 'permanent' ? true : false })
    trigger(['validity'])
  }

  const handleApartmentNumberChange = (apartmentNumber: string) => {
    validateApartmentNumber({
      address: { ...contract.newAddress, apartmentNumber },
      validation: validation,
      contract: contract,
      setApartmentNumberError,
      availableApartmentNumbers,
    })
    setValue('apartmentNumber', apartmentNumber?.trim())
    validateAddress(getValues() as unknown as SkatteverketValidAddressObject)
    setContract({ ...contract, newAddress: { ...contract.newAddress, apartmentNumber } })
  }
  const handleAddressChange = async () => {
    validateAddress(getValues() as unknown as SkatteverketValidAddressObject)
    await trigger()

    const streetName: string = getValues().street
    const streetNumber: string = getValues().streetNumber
    const city: string = getValues().city
    setValue('street', streetName?.trim())
    setContract({
      ...contract,
      newAddress: {
        street: streetName?.trim(),
        streetNumber: streetNumber?.trim(),
        zip: getValues().zip,
        city: city?.trim(),
      },
    })
  }

  const onSubmit = methods.handleSubmit(() => {
    setContract({
      ...contract,
      newAddress: {
        street: getValues().street,
        streetNumber: getValues().streetNumber,
        zip: getValues().zip,
        city: getValues().city,
        apartmentNumber: getValues().apartmentNumber,
      },
      isPermanent: getValues().isPermanent === 'permanent' ? true : false,
      validity: getValues().validity,
      contactInformation: { email: getValues().email, phoneNumber: getValues().phone },
      moveDate: new Date(getValues().moveDate),
    })
    goToNextStep()
  })

  useEffect(() => {
    if (availableApartmentNumbers.length > 1) {
      validateApartmentNumber({
        address: contract.newAddress,
        validation: validation,
        contract: contract,
        setApartmentNumberError,
        availableApartmentNumbers,
      })
    }
  }, [availableApartmentNumbers, validation, contract])

  useDebounce(
    () => {
      if (typeof window !== undefined) {
        getAddresses(val)
      }
    },
    200,
    [val],
  )
  useEffectOnce(() => {
    const asyncFUnction = async () => {
      // If we have a current move with a toAddress, we want to prefill the form with that address
      if (!!currentMove?.toAddress?.street?.length && !contract.newAddress.streetName) {
        validateAddress(currentMove.toAddress as unknown as SkatteverketValidAddressObject)
        const { street, streetNumber } = seperateStreetNumber(currentMove.toAddress.street)
        setVal(currentMove.toAddress.street)
        setValue('street', street)
        setValue('streetNumber', streetNumber ?? '')
        setValue('zip', currentMove.toAddress.zip)
        setValue('city', currentMove.toAddress.city)
        setValue('apartmentNumber', currentMove.toAddress.apartmentNumber ?? undefined)
        setValue('moveDate', currentMove.movingDate ? new Date(currentMove.movingDate) : new Date())
        setValue('isPermanent', contract.isPermanent ? 'permanent' : 'temporary')
        setContract({ ...contract, newAddress: currentMove.toAddress as unknown as SkatteverketValidAddressObject })
      } else {
        validateAddress(contract.newAddress)
        setValue('street', contract.newAddress.street ?? '')
        setValue('streetNumber', contract.newAddress.streetNumber ?? '')
        setValue('zip', contract.newAddress.zip ?? '')
        setValue('city', contract.newAddress.city ?? '')
        setValue('apartmentNumber', contract.newAddress.apartmentNumber)
        setValue('moveDate', contract.moveDate)
        setValue('isPermanent', contract.isPermanent ? 'permanent' : 'temporary')
        setValue('validity', contract.validity)
      }
      if (currentMove?.toAddress?.street?.length || contract?.newAddress?.street?.length) await trigger(['streetNumber', 'street', 'zip', 'city', 'moveDate'])
    }
    asyncFUnction()
  })

  useEffect(() => {
    setVal(contract.newAddress.street as string)
  }, [contract])

  const validateAndSetContract = () => {
    const values = getValues()
    validateAddress(values)
    setContract({ ...contract, newAddress: values })
  }

  return (
    <FormProvider {...methods}>
      <div className={stepTemplateWrapperVariants()}>
        <div className={innerWrapperVariants()}>
          <Text variant={'bodyBold'} style={{ marginBottom: '20px', marginTop: 0 }}>
            {t('addresschange:ADDRESS.whereToMove')}
          </Text>
          <div className={formWrapperVariants()}>
            {validation.info === SkatteverketStatusEnum.NO_ADDRESSES_FOUND && Object.keys(contract.newAddress).length > 0 && (
              <div className={infoBoxWrapperVariants()} style={{ marginBottom: '20px', width: '100%' }}>
                <InfoBoxColored color="red" showIcon type="warning">
                  {t('error:addressNotFound')}
                </InfoBoxColored>
              </div>
            )}
            {!currentMove.toAddress?.street?.length && !Object.keys(contract.newAddress).length && (
              <div className={inputWrapperVariants()} style={{ width: '100%', marginBottom: 0 }}>
                <CommonAddressFormI18N customOnSelect={validateAndSetContract} customOnNoAddressSelect={validateAndSetContract} />
              </div>
            )}
          </div>
          {(currentMove?.toAddress?.street || Object.keys(contract.newAddress).length > 0) && (
            <div className={formWrapperVariants()}>
              <div className={inputWrapperVariants()} style={{ width: '65%' }}>
                <Input
                  defaultValue={getValues().street}
                  type="text"
                  label={t('common:streetName')}
                  error={errors?.street?.message as string}
                  {...register('street')}
                  onBlur={() => handleAddressChange()}
                />
              </div>
              <div className={inputWrapperVariants()} style={{ width: '30%' }}>
                <Input
                  defaultValue={getValues().streetNumber}
                  type="text"
                  label={t('common:streetNumber')}
                  {...register('streetNumber')}
                  error={errors?.streetNumber?.message as string}
                  onBlur={() => handleAddressChange()}
                />
              </div>
              <div className={inputWrapperVariants()} style={{ width: '30%' }}>
                <Input
                  defaultValue={getValues().zip}
                  type="number"
                  label={t('common:zipCode')}
                  {...register('zip')}
                  error={errors?.zip?.message as string}
                  onBlur={() => handleAddressChange()}
                />
              </div>
              <div className={inputWrapperVariants()} style={{ width: '65%' }}>
                <Input
                  defaultValue={getValues().city}
                  type="text"
                  label={t('common:city')}
                  {...register('city')}
                  error={errors?.city?.message as string}
                  onBlur={() => handleAddressChange()}
                />
              </div>
            </div>
          )}
          {availableApartmentNumbers.length > 1 && (
            <ApartmentNumber
              register={register}
              apartmentNumberError={apartmentNumberError}
              setShowModal={setShowModal}
              showModal={showModal}
              getValues={getValues}
              handleApartmentNumberChange={handleApartmentNumberChange}
            />
          )}

          <Text style={{ marginTop: availableApartmentNumbers.length > 1 ? 32 : 17, marginBottom: 4 }} variant={'bodyBold'}>
            {t('addresschange:ADDRESS.whenToMove')}
          </Text>
          <div className={formWrapperVariants()}>
            <DatePicker defaultValue={new Date(getValues().moveDate)} withoutDayInDate={true} setDatePicked={setDatePicked} />
          </div>
          <Text style={{ marginTop: 28 }} variant={'bodyBold'}>
            {t('addresschange:ADDRESS.howLong')}
          </Text>
          <RadioGroup
            defaultValue={contract.isPermanent ? 'permanent' : 'temporary'}
            onValueChange={(radioValue: string) => handleRadioButtonChange(radioValue)}
            {...register('isPermanent')}
          >
            <div className={radioGroupWrapperVariants()}>
              <RadioItem value={'permanent'} whiteMain>
                <RadioIndicator whiteMain />
              </RadioItem>
              <div className={radioItemLabelVariants()}>{t('addresschange:ADDRESS.permanent')}</div>
            </div>
            <div className={radioGroupWrapperVariants()}>
              <RadioItem value={'temporary'} whiteMain>
                <RadioIndicator whiteMain />
              </RadioItem>
              <div className={radioItemLabelVariants()}>{t('addresschange:ADDRESS.temporary')}</div>
            </div>
          </RadioGroup>
          {getValues().isPermanent === 'temporary' && (
            <Input
              className={styledInputVariants()}
              defaultValue={getValues().validity}
              type="text"
              label={t('addresschange:ADDRESS.numberOfMonth')}
              {...register('validity', {
                pattern: /^[0-9]*$/,
              })}
              inputMode="numeric"
            />
          )}
          <PeopleToMove />
          <div className={buttonWrapperVariants({ justifyContent: 'between' })}>
            <div
              className={goBackButtonVariants()}
              onClick={() => {
                setError(undefined)
                goToPrevStep()
              }}
            >
              {<Text variant="linkBig">{t('common:goBack')}</Text>}
            </div>
            <Button
              disabled={!isValid || contract.peopleToMove.length === 0 || (!apartmentNumberError.valid && availableApartmentNumbers.length > 1)}
              onClick={onSubmit}
              iconRight={
                <ArrowForward
                  color={
                    !isValid || contract.peopleToMove.length === 0 || (!apartmentNumberError.valid && availableApartmentNumbers.length > 1)
                      ? 'var(--fs-colors-disabledButtonColor)'
                      : 'white'
                  }
                />
              }
              text={t('common:continue')}
              padding="0 20px !important"
            />
          </div>
        </div>
      </div>
    </FormProvider>
  )
}
