import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'
import * as yup from 'yup'
import { useUserContext } from '@/common/context/user/UserProvider'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Text from '@/components/atoms/Text'
import TextArea from '@/components/atoms/TextArea'
import { ContactCard } from '@/components/molecules/ContactCard'
import { Modal, ModalContent } from '@/components/molecules/Modal'
import useResponsive from '@/hooks/useResponsive'
import BirdSuccess from '@/public/images/Bird_success.svg'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  handymanModalWrapperVariants,
  modalHeaderVariants,
  modalDividerVariants,
  headerAndCheckboxVariants,
  largeButtonWrapperVariants,
  buttonWrapperVariants,
  textWrapperVariants,
  inputWrapperVariants,
  phoneInputWrapperVariants,
  messageInputWrapperVariants,
  emailWrapperVariants,
  titleWrapperVariants,
  innerWrapperVariants,
} from './ContactUsModal.variants'

export interface ContactUsModalProps {
  title: string
  modalDescriptionTop: string
  modalDescriptionBottom: string
  modalList?: string[]
  showModal: boolean
  setShowModal: (arg0: boolean) => void
  isHelpModal?: boolean
  isBuildingModal?: boolean
}

type ContactUsFormValues = {
  textAreaValue: string
  date: string | null
  email: string
  phone: string
}

const schema = yup.object({
  textAreaValue: yup.string(),
  date: yup.string(),
  email: yup.string(),
  phone: yup.string(),
})

const ContactUsModal = ({ title, showModal, setShowModal, modalList, isHelpModal }: ContactUsModalProps) => {
  const { register, setValue, getValues, watch } = useForm<ContactUsFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      textAreaValue: '',
      date: isHelpModal ? new Date().toISOString().split('T')?.[0] : null,
      email: '',
      phone: '',
    },
  })

  const {
    user: { contact },
  } = useUserContext()

  const { t } = useTranslation(['fixaRenoveraPage', 'common'])
  const { isTabletPortraitOrGreater } = useResponsive()
  const [isDisabled, setIsDisabled] = useState(true)
  const [hasConfirmed, setHasConfirmed] = useState(false)

  const onSubmit = () => {
    setHasConfirmed(true)
  }

  useEffect(() => {
    if (contact?.email) {
      setValue('email', contact.email)
    }
    if (contact?.phone) {
      setValue('phone', contact?.phone)
    }
  }, [contact, setValue])

  // Extract watched values to variables for static checking
  const watchedDate = watch('date')
  const watchedTextAreaValue = watch('textAreaValue')
  const watchedPhone = watch('phone')
  const watchedEmail = watch('email')

  useEffect(() => {
    if (
      (!!watchedDate && !!watchedTextAreaValue && !!watchedPhone && !!watchedEmail) ||
      (isHelpModal && !!watchedTextAreaValue && !!watchedPhone && !!watchedEmail)
    ) {
      setIsDisabled(false)
    }
  }, [watchedDate, watchedTextAreaValue, watchedPhone, watchedEmail, isHelpModal])

  return (
    <form onSubmit={onSubmit}>
      <div className={clsx(handymanModalWrapperVariants())} data-testid="handyman-modal-container">
        <Modal open={showModal}>
          <ModalContent withCloseButton setShowModal={setShowModal} bigCloseButton size={isTabletPortraitOrGreater ? 'medium' : 'small'}>
            {!hasConfirmed ? (
              <>
                <div className={clsx(modalHeaderVariants())}>
                  <div className={clsx(headerAndCheckboxVariants())}>
                    <div className={clsx(titleWrapperVariants())}>
                      <Text spacing="none" variant="largeBold">
                        {title}
                      </Text>
                    </div>
                  </div>
                </div>

                <div className={clsx(modalDividerVariants())} />

                <div className={clsx(textWrapperVariants())}>
                  <Text>{t('common:contactUsModalUpperDescription')}</Text>
                  <ContactCard view="modal" />
                  <Text>{t('common:contactUsModalLowerDescription')}</Text>
                  <ul>{modalList?.length && modalList.map((item, index) => <li key={`${index}-${title}`}>{item}</li>)}</ul>
                </div>

                <div className={clsx(inputWrapperVariants())}>
                  <div className={clsx(emailWrapperVariants())}>
                    <Input defaultValue={getValues().email} type="text" label={t('common:email')} {...register('email')} />
                  </div>

                  <div className={clsx(phoneInputWrapperVariants())}>
                    <Input defaultValue={getValues().phone} type="text" label={t('common:phone')} {...register('phone')} />
                  </div>

                  <div className={clsx(messageInputWrapperVariants())}>
                    <TextArea {...register('textAreaValue')} value={watch('textAreaValue')} label={t('common:contactUsModalMessagePlaceholder')} />
                  </div>
                </div>

                <div className={clsx(buttonWrapperVariants())}>
                  <div className={clsx(largeButtonWrapperVariants())}>
                    <Button disabled={isDisabled} text={t('common:send')} onClick={onSubmit} />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={clsx(modalHeaderVariants())}>
                  <div className={clsx(headerAndCheckboxVariants())}>
                    <div className={clsx(titleWrapperVariants())}>
                      <Text spacing="none" variant="largeBold">
                        {title}
                      </Text>
                    </div>
                  </div>
                </div>

                <div className={clsx(modalDividerVariants())} />

                <div className={clsx(innerWrapperVariants(), 'flex flex-col items-center')}>
                  <BirdSuccess width={219} height={171} />
                  <div className={clsx(textWrapperVariants())}>
                    <Text>{t('common:contactUsModalLowerDescription')}</Text>
                  </div>
                </div>

                <div className={clsx(buttonWrapperVariants())}>
                  <div className={clsx(largeButtonWrapperVariants())}>
                    <Button disabled={isDisabled} text={t('common:send')} onClick={onSubmit} />
                  </div>
                </div>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </form>
  )
}

export default ContactUsModal
