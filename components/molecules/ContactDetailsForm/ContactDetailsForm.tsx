import { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { useUserContext } from '@/common/context/user/UserProvider'
import Button from '@/components/atoms/Button'
import Flex from '@/components/atoms/Flex'
import Input from '@/components/atoms/Input'
import Text from '@/components/atoms/Text'
import PencilSimple from '@/public/images/PencilSimple.svg'

interface Props {
  formMethods: UseFormReturn<{ phone: string; email: string }>
  formFullWidth?: boolean
  showContactInput: boolean
  setShowContactInput: (show: boolean) => void
  buttonPadding?: string
  withFullWidth?: boolean
  onSaveComplete?: () => void
}

export const ContactDetailsForm = ({
  formMethods,
  formFullWidth,
  showContactInput,
  setShowContactInput,
  buttonPadding = '10px 84px',
  withFullWidth = false,
  onSaveComplete,
}: Props) => {
  const { t } = useTranslation(['common'])
  const {
    user: { profile, contact },
    updateUserInfo,
  } = useUserContext()

  const [localEmail, setLocalEmail] = useState(formMethods.getValues('email') || contact?.email || '')
  const [localPhone, setLocalPhone] = useState(formMethods.getValues('phone') || contact?.phone || '')

  useEffect(() => {
    if (contact?.email) setLocalEmail(contact.email)
    if (contact?.phone) setLocalPhone(contact.phone)
  }, [contact])

  useEffect(() => {
    if (!contact?.email?.length || !contact?.phone?.length) {
      setShowContactInput(true)
    }
  }, [contact, setShowContactInput])

  const handleSave = async () => {
    formMethods.setValue('email', localEmail, { shouldValidate: true, shouldDirty: true })
    formMethods.setValue('phone', localPhone, { shouldValidate: true, shouldDirty: true })

    const isValid = await formMethods.trigger()

    if (isValid && (localEmail || localPhone)) {
      await updateUserInfo({
        email: localEmail,
        phone: localPhone,
        emailVerified: contact?.emailVerified,
        firstName: profile?.firstName,
        lastName: profile?.lastName,
      })

      setShowContactInput(false)
      onSaveComplete?.()
    }
  }

  return (
    <div className="w-full h-full relative mt-8">
      <div>
        <div className="flex flex-row items-center font-bold leading-[25px] text-left justify-start text-[var(--color-text-main)] pb-4">
          <h2 className="h-[18px] !font-bold text-xl leading-[18px] flex items-center text-center font-feature-settings-[pnum_on,lnum_on] text-[var(--color-text-main)] flex-none order-0 flex-grow-0 m-0">
            {t('contactInformation')}
          </h2>
        </div>
      </div>
      {!showContactInput && (
        <div className="absolute right-0 top-0 text-[var(--color-primary-main)] cursor-pointer" onClick={() => setShowContactInput(!showContactInput)}>
          <PencilSimple />
        </div>
      )}
      {showContactInput ? (
        <form style={{ width: `${formFullWidth ? '100%' : ''}` }}>
          <div className="pb-4 flex flex-col items-start">
            <Text spacing="none" className="!text-[16px] !font-bold pb-1">
              {profile?.fullName}
            </Text>
          </div>
          <div className={clsx('mb-4 sm:w-1/2')}>
            <Input
              value={localEmail}
              type="text"
              label={t('common:email')}
              onChange={(e) => {
                setLocalEmail(e.target.value)
                formMethods.setValue('email', e.target.value, { shouldValidate: true })
              }}
              error={formMethods.formState.errors?.email?.message}
            />
          </div>
          <div className={clsx('mb-4 sm:w-1/2')}>
            <Input
              type="text"
              value={localPhone}
              label={t('common:phone')}
              onChange={(e) => {
                setLocalPhone(e.target.value)
                formMethods.setValue('phone', e.target.value, { shouldValidate: true })
              }}
              error={formMethods.formState.errors?.phone?.message}
            />
          </div>
          <Flex direction="row" justifyContent="space-between" alignItems="center">
            <div className="w-full h-12 mt-[10px] mr-auto md:w-[200px]">
              <Button
                type="submit"
                text={t('common:INFOMISSING.save')}
                padding={buttonPadding}
                withFullWidth={withFullWidth}
                onClick={async (event) => {
                  event.preventDefault()
                  await handleSave()
                }}
              />
            </div>
          </Flex>
        </form>
      ) : (
        <>
          <div className="flex flex-col items-start">
            <Text spacing="none" className="!text-[16px] !font-bold pb-1">
              {profile?.fullName}
            </Text>
          </div>
          <div className="flex flex-col items-start">
            <Text style={{ paddingRight: 16 }} spacing="none" className="text-[var(--fs-fontSizes-5)] !important pb-1">
              {`${t('email')}: ${contact?.email || localEmail}`}
            </Text>
            <Text spacing="none" className="text-[var(--fs-fontSizes-5)] !important pb-1">
              {`${t('phone')}: ${contact?.phone || localPhone}`}
            </Text>
          </div>
        </>
      )}
    </div>
  )
}
