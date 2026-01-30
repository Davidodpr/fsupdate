import { FormProvider, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Input from '@/components/atoms/Input'
import { emailPhoneFormVariants } from './EmailPhoneForm.variants'

interface Props {
  formMethods: UseFormReturn<{ phone: string; email: string }>
  asCard?: boolean
  formFullWidth?: boolean
  fullInputWidth?: boolean
  withoutTitle?: boolean
}

export const EmailPhoneForm = ({ formMethods, asCard, formFullWidth, fullInputWidth, withoutTitle }: Props) => {
  const { t } = useTranslation('common')
  const variants = emailPhoneFormVariants()

  return (
    <FormProvider {...formMethods}>
      <form style={{ width: `${formFullWidth ? '100%' : ''}` }}>
        {asCard ? (
          <div className={variants.cardWrapper()}>
            <div className={variants.innerWrapper()}>
              <div className={variants.cardHeaderWrapper()}>
                <div className={variants.cardTitle()}>
                  <h2 className={variants.cardTitleText()}>{t('contactInformation')}</h2>
                </div>
                <div className={variants.separator()} />
              </div>
              <div
                className={variants.inputWrapper({
                  error: !!formMethods.formState.errors?.email?.message,
                })}
              >
                <Input
                  defaultValue={formMethods.watch().email}
                  type="text"
                  label={t('common:email')}
                  {...formMethods.register('email')}
                  error={formMethods.formState.errors?.email?.message}
                />
              </div>
              <div
                className={variants.inputWrapper({
                  error: !!formMethods.formState.errors?.phone?.message,
                })}
              >
                <Input
                  defaultValue={formMethods.watch().phone}
                  type="text"
                  label={t('common:phone')}
                  {...formMethods.register('phone')}
                  error={formMethods.formState.errors?.phone?.message}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            {!withoutTitle && <div className={variants.title()}>{t('contactInformation')}</div>}
            <div
              className={variants.inputWrapper({
                error: !!formMethods.formState.errors?.email?.message,
                fullInputWidth,
              })}
            >
              <Input
                defaultValue={formMethods.watch().email}
                type="text"
                label={t('common:email')}
                {...formMethods.register('email')}
                error={formMethods.formState.errors?.email?.message}
              />
            </div>
            <div
              className={variants.inputWrapper({
                error: !!formMethods.formState.errors?.phone?.message,
                fullInputWidth,
              })}
            >
              <Input
                defaultValue={formMethods.watch().phone}
                type="text"
                label={t('common:phone')}
                {...formMethods.register('phone')}
                error={formMethods.formState.errors?.phone?.message}
              />
            </div>
          </>
        )}
      </form>
    </FormProvider>
  )
}
