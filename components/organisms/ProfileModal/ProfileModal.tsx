import React from 'react'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'
import * as yup from 'yup'
import { useUserContext } from '@/common/context/user/UserProvider'
import Button from '@/components/atoms/Button'
import Flex from '@/components/atoms/Flex'
import Input from '@/components/atoms/Input'
import { Modal, ModalContent, ModalTitle } from '@/components/molecules/Modal'
import { yupResolver } from '@hookform/resolvers/yup'
import { styledModalVariants, inputWrapperVariants, emailWrapperVariants, styledModalTitleVariants, buttonWrapperVariants } from './ProfileModal.variants'

export interface NewUserModalProps {
  isOpen: boolean
  onClickClose: () => void
}

type ProfileModalValues = {
  email: string
  phone: string
}

const ProfileModal = ({ isOpen, onClickClose }: NewUserModalProps) => {
  const { t } = useTranslation(['common', 'error'])
  const {
    user: { contact, profile },
    updateUserInfo,
  } = useUserContext()

  const schema = yup.object({
    email: yup.string().email(t('error:INFOMISSING.invalidEmail')).typeError(t('error:INFOMISSING.invalidEmail')),
    phone: yup
      .string()
      .matches(new RegExp('([0-9])|(\\+[0-9])'), t('error:INFOMISSING.invalidPhone'))
      .max(12, t('error:INFOMISSING.invalidPhone'))
      .typeError(t('error:INFOMISSING.invalidPhone')),
  })

  const methods = useForm<ProfileModalValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: contact.email,
      phone: contact?.phone,
    },
  })

  const onSubmit = async (data: ProfileModalValues) => {
    updateUserInfo({
      email: data?.email,
      phone: data.phone,
      emailVerified: contact?.emailVerified,
      firstName: profile?.firstName,
      lastName: profile?.lastName,
    })
    onClickClose()
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Modal open={isOpen}>
          <ModalContent
            withCloseButton
            withOverlayClose={true}
            setShowModal={() => {
              onClickClose()
            }}
            size="medium"
            className={clsx(styledModalVariants())}
          >
            <ModalTitle className={clsx(styledModalTitleVariants())}>{t('PROFILE.myContactInformation')}</ModalTitle>

            <Flex className="w-full" direction="column" justifyContent="start" alignItems="center">
              <div className={clsx(inputWrapperVariants())}>
                <div className={clsx(emailWrapperVariants())}>
                  <Controller
                    name="email"
                    control={methods.control}
                    render={({ field }) => (
                      <Input
                        type="text"
                        error={methods?.formState?.errors?.email?.message}
                        label={t('email') ?? ''}
                        value={field.value}
                        onChange={field.onChange}
                        inputRef={field.ref}
                      />
                    )}
                  />
                </div>
                <Controller
                  name="phone"
                  control={methods.control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      error={methods?.formState?.errors?.phone?.message}
                      label={t('phone') ?? ''}
                      value={field.value}
                      onChange={field.onChange}
                      inputRef={field.ref}
                    />
                  )}
                />
              </div>

              <div className={clsx(buttonWrapperVariants())}>
                <Button text={t('INFOMISSING.save')} type="button" onClick={methods.handleSubmit(onSubmit)} />
              </div>
            </Flex>
          </ModalContent>
        </Modal>
      </form>
    </FormProvider>
  )
}

export default ProfileModal
