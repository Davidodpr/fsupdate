import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useEffectOnce } from 'react-use'
import * as yup from 'yup'
import { useAddresschangeContext } from '@/common/context/addresschange/addresschange.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import ArrowForward from '@/components/atoms/ArrowForward'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Text from '@/components/atoms/Text'
import { yupResolver } from '@hookform/resolvers/yup'
import { buttonWrapperVariants, innerWrapperVariants, inputWrapperVariants, stepTemplateWrapperVariants, goBackButtonVariants } from '../../AddresschangePage.variants'

interface Props {
  goToNextStep: () => void
  goToPrevStep: () => void
}

export const ContactDetails = ({ goToNextStep, goToPrevStep }: Props) => {
  const { contract, setContract } = useAddresschangeContext()
  const {
    user: { contact },
  } = useUserContext()

  const { t } = useTranslation('addresschange, error, common')

  const schema = yup
    .object({
      email: yup
        .string()
        .email(`${t('error:mailInvalid')}`)
        .required(`${t('error:mailRequried')}`),
      phone: yup
        .string()
        .required(`${t('error:phoneRequried')}`)
        .matches(new RegExp('([0-9])|(\\+[0-9])'), `${t('error:phoneInvalid')}`)
        .max(12, `${t('error:phoneInvalid')}`)
        .min(5, `${t('error:phoneInvalid')}`), // Validation for a swedish phone number, only allowed to have max 11 numbers, if you use 46, you are allowed to start with a 0 aswell
    })
    .required()

  const methods = useForm<UserContactInfoFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      phone: '',
    },
  })

  const {
    register,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = methods

  useEffectOnce(() => {
    contract?.contactInformation?.email ? setValue('email', contract?.contactInformation?.email) : setValue('email', contact?.email)
    contract?.contactInformation?.phoneNumber ? setValue('phone', contract?.contactInformation?.phoneNumber) : setValue('phone', contact?.phone)
  })

  const onSubmit = methods.handleSubmit(() => {
    setContract({ ...contract, contactInformation: { email: getValues().email, phoneNumber: getValues().phone } })
    goToNextStep()
  })

  return (
    <FormProvider {...methods}>
      <form>
        <div className={stepTemplateWrapperVariants()}>
          <div className={innerWrapperVariants()}>
            <Text variant={'extraLargeBlack'} style={{ marginTop: 0 }}>
              {t('addresschange:CONTACT.title')}
            </Text>

            <div className={inputWrapperVariants()}>
              <Input defaultValue={watch().email} type="text" label={t('common:email')} {...register('email')} error={errors?.email?.message} />
            </div>
            <div className={inputWrapperVariants()}>
              <Input defaultValue={watch().phone} type="text" label={t('common:phone')} {...register('phone')} error={errors?.phone?.message} />
            </div>
            <div className={buttonWrapperVariants({ justifyContent: 'between' })}>
              <div className={goBackButtonVariants()} onClick={goToPrevStep}>
                {<Text variant="linkBig">{t('common:goBack')}</Text>}
              </div>
              <Button onClick={onSubmit} iconRight={<ArrowForward color="white" />} text={t('common:continue')} padding="0 20px !important" />
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
