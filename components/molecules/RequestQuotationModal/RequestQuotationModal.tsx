import { useState } from 'react'
import ReactGA4 from 'react-ga4'
import { FormProvider, UseFormReturn, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'
import * as yup from 'yup'
import sendToZapier from '@/common/api/sendToZapier'
import useResponsive from '@/common/hooks/useResponsive'
import { ActivityEnum } from '@/common/types/activity'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Text from '@/components/atoms/Text'
import TextArea from '@/components/atoms/TextArea'
import { Modal, ModalContent } from '@/components/molecules/Modal'
import CommonAddressFormI18N from '@/components/organisms/CommonAddressFormI18N'
import DatePicker from '@/components/organisms/DatePicker'
import BirdSuccess from '@/public/images/Bird_success.svg'
import { yupResolver } from '@hookform/resolvers/yup'

type FormValues = {
  textAreaValue: string
  date: Date
  email: string
  phone: string
}

export interface RequestQuotationModalProps {
  fromAddressMethods: UseFormReturn<FormValuesFromAddress, object>
  toAddressMethods?: UseFormReturn<FormValuesToAddressLight, object>
  showModal: boolean
  setShowModal: (arg0: boolean) => void
  defaultDatePicked?: Date
  newServiceType: typeof ActivityEnum.MOVEHELP | typeof ActivityEnum.MOVECLEAN
}

const RequestQuotationModal = ({ fromAddressMethods, toAddressMethods, defaultDatePicked, newServiceType, setShowModal, showModal }: RequestQuotationModalProps) => {
  const { t } = useTranslation([`${newServiceType}`, 'common', 'external', 'error'])
  const { isTabletPortraitOrGreater } = useResponsive()
  const [datePicked, setDatePicked] = useState<DatePickerDates | undefined>(undefined)
  const [hasConfirmed, setHasConfirmed] = useState(false)
  const schema = yup.object({
    textAreaValue: yup.string(),
    email: yup.string().email(t('error:mailInvalid')).required(t('error:mailInvalid')),
    date: yup.date(),
    phone: yup
      .string()
      .required(`${t('error:phoneRequried')}`)
      .matches(new RegExp('([0-9])|(\\+[0-9])'), `${t('error:phoneInvalid')}`)
      .max(12, `${t('error:phoneInvalid')}`)
      .min(5, `${t('error:phoneInvalid')}`), // Validation for a swedish phone number, only allowed to have max 11 numbers, if you use 46, you are allowed to start with a 0 aswell
  })
  const {
    register,
    formState: { errors, defaultValues },
    getValues,
    watch,
    trigger,
    handleSubmit,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      textAreaValue: '',
      date: defaultDatePicked ? defaultDatePicked : new Date(),
      email: '',
      phone: '',
    },
  })
  const checkIfButtonShouldBeDisabled = async () => {
    const fromValidation = await fromAddressMethods.trigger(['autoCompleteAddress', 'street', 'zip', 'city'])
    const toValidation = toAddressMethods ? await toAddressMethods.trigger(['autoCompleteAddress', 'street', 'zip', 'city']) : true
    const infoValidation = await trigger(['textAreaValue', 'email', 'phone', 'date'])
    return fromValidation && toValidation && infoValidation
  }
  const onSubmit = handleSubmit(async (data) => {
    const isAllValid = await checkIfButtonShouldBeDisabled()
    if (isAllValid) {
      const getToAddress = () => {
        if (!toAddressMethods) return ''
        else if (toAddressMethods.getValues('autoCompleteAddress') !== t('common:noAddress')) {
          return toAddressMethods.getValues('autoCompleteAddress')
        } else {
          return `${toAddressMethods?.getValues('street')}, ${toAddressMethods?.getValues('zip')}, ${toAddressMethods?.getValues('city')}`
        }
      }
      const quotationData = {
        type: newServiceType,
        email: data.email,
        phone: data.phone,
        date: datePicked?.fullDate.toString(),
        textValue: data.textAreaValue,
        toAddress: getToAddress(),
        fromAddress:
          fromAddressMethods.getValues('autoCompleteAddress') !== t('common:noAddress')
            ? fromAddressMethods.getValues('autoCompleteAddress')
            : `${fromAddressMethods.getValues('street')}, ${fromAddressMethods.getValues('zip')}, ${fromAddressMethods.getValues('city')}`,
      }
      await sendToZapier(quotationData, process.env.NEXT_PUBLIC_QUOTATION_ZAPIER_HOOK as string)
      setHasConfirmed(true)
      ReactGA4.event('sent_tailored_move_request')
    }
  })
  return (
    <form>
      <div className="w-full h-full">
        <Modal open={showModal}>
          <ModalContent withCloseButton setShowModal={setShowModal} bigCloseButton size={isTabletPortraitOrGreater ? 'medium' : 'large'} fullScreenMobile={true}>
            <div className="w-full flex items-center justify-between pb-3">
              <div className="h-10 pt-[5px] flex justify-center items-center">
                <div className="ml-[10px]">
                  <Text spacing="none" variant="largeBold">
                    {t('common:quotationRequest')}
                  </Text>
                </div>
              </div>
            </div>
            <div className="w-full border-b border-[var(--color-inactive-grey-light)]" />
            {!hasConfirmed ? (
              <>
                <div className="bg-[var(--color-background-secondary)]">
                  <FormProvider {...fromAddressMethods}>
                    <div className="flex flex-col border-b border-[var(--color-inactive-grey-light)] pb-2 my-2 relative">
                      <div className="bg-[var(--color-background-secondary)] py-[5px] font-bold text-[var(--color-secondary-main)]">{t('external:from')}</div>
                      <CommonAddressFormI18N />
                    </div>
                  </FormProvider>
                  {toAddressMethods && (
                    <FormProvider {...toAddressMethods}>
                      <div className="flex flex-col border-b border-[var(--color-inactive-grey-light)] pb-2 my-2 relative">
                        <div className="bg-[var(--color-background-secondary)] py-[5px] font-bold text-[var(--color-secondary-main)]">{t('external:to')}</div>
                        <CommonAddressFormI18N />
                      </div>
                    </FormProvider>
                  )}
                  <div className="flex flex-col border-b border-[var(--color-inactive-grey-light)] pb-2 my-2 relative">
                    <DatePicker
                      defaultValue={defaultValues?.date ? defaultValues?.date : undefined}
                      setDatePicked={setDatePicked}
                      placeholder={t('external:chooseDate')}
                      withoutDayInDate
                      positionBottom
                    />
                    <TextArea style={{ marginTop: 10 }} {...register('textAreaValue')} label={t('common:textInputValue')} value={watch('textAreaValue')} />
                  </div>
                  <div className="flex flex-col pt-[10px]" style={{ borderBottom: 'unset' }}>
                    <Input defaultValue={getValues().phone} type="text" label={t('common:phone')} {...register('phone')} error={errors?.phone?.message} />
                    <div className="my-[25px_0_10px_0]">
                      <Input defaultValue={getValues().email} type="text" label={t('common:email')} {...register('email')} error={errors?.email?.message} />
                    </div>
                  </div>
                </div>
                <div className="w-full h-12">
                  <Button text={t('common:quotationRequest')} onClick={onSubmit} />
                </div>
              </>
            ) : (
              <div
                className={clsx(
                  'flex flex-col items-center',
                  'grow-0 max-w-[90%] basis-[66%] mx-auto',
                  'rounded-[var(--radius-border-radius-main)] w-full h-auto',
                  '[&_a]:text-[var(--color-primary-main)] [&_a]:font-bold',
                  'sm:max-w-[820px]',
                )}
              >
                <BirdSuccess width={219} height={171} />
                <div className="flex flex-col items-center w-full mt-5 text-center">
                  <Text className="m-0 mb-10 text-base" variant="body">
                    {t('common:confirmationText')}
                  </Text>
                  <div className="flex w-full justify-center text-xs">
                    <div className="w-[260px] h-12">
                      <Button variant="primary" text={t('common:close')} onClick={() => setShowModal(false)} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </ModalContent>
        </Modal>
      </div>
    </form>
  )
}

export default RequestQuotationModal
