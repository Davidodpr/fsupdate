import { useEffect, useState } from 'react'
import { FormProvider, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useUserContext } from '@/common/context/user/UserProvider'
import Button from '@/components/atoms/Button'
import Flex from '@/components/atoms/Flex'
import Input from '@/components/atoms/Input'
import Text from '@/components/atoms/Text'
import PencilSimple from '@/public/images/PencilSimple.svg'
import User from '@/public/images/User.svg'
import {
  cardWrapperVariants,
  inputSectionWrapperVariants,
  penWrapperVariants,
  buttonWrapperVariants,
  cardHeaderWrapperVariants,
  innerWrapperVariants,
  inputWrapperVariants,
  cardTitleVariants,
  separatorVariants,
  cardTitleTextVariants,
  textSectionVariants,
  emailAndPhoneSectionVariants,
  boldTextVariants,
  largerTextVariants,
} from './EmailPhoneFormWithEdit.variants'

interface Props {
  formMethods: UseFormReturn<{ phone: string; email: string }>
  formFullWidth?: boolean
}

export const EmailPhoneFormWithEdit = ({ formMethods, formFullWidth }: Props) => {
  const { t } = useTranslation('common')
  const [showInputs, setShowInputs] = useState(false)
  const {
    user: { profile, currentMove, contact },
    updateUserInfo,
  } = useUserContext()

  useEffect(() => {
    if (!contact?.email?.length || !contact?.phone?.length) setShowInputs(true)
  }, [contact])

  return (
    <FormProvider {...formMethods}>
      <form style={{ width: `${formFullWidth ? '100%' : ''}` }}>
        <div className={cardWrapperVariants()}>
          <div className={innerWrapperVariants()}>
            <div className={cardHeaderWrapperVariants()}>
              <div className={cardTitleVariants()}>
                {<User style={{ marginRight: '10px' }} />}
                <h2 className={cardTitleTextVariants()}>{t('contactInformation')}</h2>
              </div>
              <div className={separatorVariants()} />
            </div>
            <div className={inputSectionWrapperVariants()}>
              <div className={penWrapperVariants()} onClick={() => setShowInputs(!showInputs)}>
                <PencilSimple />
              </div>
              {showInputs ? (
                <>
                  <div className={textSectionVariants()}>
                    <Text className={boldTextVariants()} spacing="none">
                      {profile?.fullName}
                    </Text>
                    <Text
                      className={largerTextVariants()}
                      spacing="none"
                    >{`${currentMove?.fromAddress.street}, ${currentMove?.fromAddress.zip}, ${currentMove?.fromAddress.city} `}</Text>
                  </div>
                  <div className={inputWrapperVariants({ error: !!formMethods.formState.errors?.email?.message })}>
                    <Input
                      defaultValue={formMethods.getValues().email}
                      type="text"
                      label={t('common:email')}
                      {...formMethods.register('email')}
                      error={formMethods.formState.errors?.email?.message}
                    />
                  </div>
                  <div className={inputWrapperVariants({ error: !!formMethods.formState.errors?.phone?.message })}>
                    <Input
                      type="text"
                      defaultValue={formMethods.getValues().phone}
                      label={t('common:phone')}
                      {...formMethods.register('phone')}
                      error={formMethods.formState.errors?.phone?.message}
                    />
                  </div>
                  <Flex direction="row" justifyContent="space-between" alignItems="center">
                    <div className={buttonWrapperVariants()}>
                      <Button
                        type="submit"
                        text={t('common:INFOMISSING.save')}
                        onClick={async () => {
                          if (formMethods?.formState?.dirtyFields?.email || formMethods?.formState?.dirtyFields?.phone) {
                            updateUserInfo({
                              email: formMethods.getValues()?.email,
                              phone: formMethods.getValues().phone,
                              emailVerified: contact?.emailVerified,
                              firstName: profile?.firstName,
                              lastName: profile?.lastName,
                            })
                          }
                          setShowInputs(false)
                        }}
                      />
                    </div>
                  </Flex>
                </>
              ) : (
                <>
                  <div className={textSectionVariants({ noPadding: true })}>
                    <Text className={boldTextVariants()} spacing="none">
                      {profile?.fullName}
                    </Text>
                    <Text
                      className={largerTextVariants()}
                      spacing="none"
                    >{`${currentMove?.fromAddress.street}, ${currentMove?.fromAddress.zip}, ${currentMove?.fromAddress.city} `}</Text>
                  </div>
                  <div className={emailAndPhoneSectionVariants()}>
                    <Text className={largerTextVariants()} style={{ paddingRight: 16 }} spacing="none">
                      {`${t('email')}: ${contact?.email}`}
                    </Text>
                    <Text className={largerTextVariants()} spacing="none">
                      {' '}
                      {`${t('phone')}: ${contact?.phone}`}
                    </Text>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
