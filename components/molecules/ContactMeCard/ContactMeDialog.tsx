import React, { useEffect, useMemo, useRef, useState } from 'react'
import ReactGA4 from 'react-ga4'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useEffectOnce } from 'react-use'
import { useIntercom } from 'react-use-intercom'
import * as yup from 'yup'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Spinner from '@/components/atoms/Spinner'
import Text from '@/components/atoms/Text'
import TextArea from '@/components/atoms/TextArea'
import { Modal, ModalContent, ModalTitle } from '@/components/molecules/Modal'
import { ContactMeDropDownItemEnum, getContactMeDropDownItems } from '@/constants/contactMeDropdownItems'
import { ContactMeTypeEnum } from '@/enums/ContactMeTypeEnum'
import useResponsive from '@/hooks/useResponsive'
import ArrowDown from '@/public/images/Arrow-down-black.svg'
import BirdSuccess from '@/public/images/Bird_success.svg'
import Chat from '@/public/images/Chat_icon.svg'
import PhoneIcon from '@/public/images/Phone.svg'
import { LabelItemType } from '@/types/commonTypes'
import { sendContactMeRequest } from '@/utils/userHelpers'
import { yupResolver } from '@hookform/resolvers/yup'
import DropdownInput from '../DropdownInput/DropdownInput'
import { RadioGroup, RadioIndicator, RadioItem } from '../RadioGroup/RadioGroup'
import {
  buttonWrapperVariants,
  contactButtonFrameVariants,
  contactButtonWrapperVariants,
  contactDescriptionVariants,
  contactMeModalWrapperVariants,
  contactWrapperVariants,
  emailWrapperVariants,
  successWrapperVariants,
  headerAndCheckboxVariants,
  innerWrapperVariants,
  inputWrapperVariants,
  labelVariants,
  largeButtonWrapperVariants,
  modalDividerVariants,
  modalHeaderVariants,
  radioItemWrapperVariants,
  radioTextVariants,
  subButtonWrapperVariants,
  subLargeButtonWrapperVariants,
  textPartWrapperVariants,
  textWrapperVariants,
  titleWrapperVariants,
} from './ContactMeDialog.variants'

export interface ContactMeDialogProps {
  title: string
  modalList?: string[]
  showModal: boolean
  setShowModal: (arg0: boolean) => void
  isHelpModal?: boolean
  isBuildingModal?: boolean
  serviceType: string
}
type MovehelpFormValues = {
  textAreaValue: string
  date: string | null
  email: string
  phone: string
  callMethod: string | null
}
const schema = yup.object({
  textAreaValue: yup.string(),
  date: yup.string(),
  email: yup.string(),
  phone: yup.string(),
})

const ContactMeDialog = ({ title, showModal, setShowModal, modalList, isHelpModal, serviceType }: ContactMeDialogProps) => {
  const { theme } = useThemeContext()
  const { register, setValue, handleSubmit, watch } = useForm<MovehelpFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      textAreaValue: '',
      date: isHelpModal ? new Date().toISOString().split('T')?.[0] : null,
      email: '',
      phone: '',
      callMethod: '',
    },
  })
  const {
    user: { contact },
  } = useUserContext()
  const { t, ready } = useTranslation(['footer', 'common'])
  const { show } = useIntercom()
  const { isTabletPortraitOrGreater } = useResponsive()
  const [hasConfirmed, setHasConfirmed] = useState(false)
  const [selectMode, setselectMode] = useState<string>()
  const dropdownlist: LabelItemType[] = useMemo(() => getContactMeDropDownItems(t), [t])
  const [callTime, setCallTime] = useState<string>(ContactMeDropDownItemEnum.ITEM_ONE)
  const [openDropDown, setOpenDropDown] = useState(false)
  const dropDownRef = useRef<HTMLDivElement | null>(null)

  // Simple state for form fields
  const [emailValue, setEmailValue] = useState('')
  const [phoneValue, setPhoneValue] = useState('')
  const onSubmit = handleSubmit(async (data) => {
    if (selectMode === ContactMeTypeEnum.EMAIL) {
      await sendContactMeRequest({ type: ContactMeTypeEnum.EMAIL, content: data.textAreaValue, email: data.email, serviceType: serviceType, callMethod: '-', phone: '-' })
    } else if (selectMode === ContactMeTypeEnum.PHONECALL) {
      await sendContactMeRequest({
        type: ContactMeTypeEnum.PHONECALL,
        content: data.textAreaValue,
        email: data.email,
        phone: data.phone,
        callMethod: data.callMethod,
        serviceType: serviceType,
      })
    }
    setHasConfirmed(true)
    ReactGA4.event('sent_tailored_move_request')
  })

  useEffectOnce(() => {
    ReactGA4.event('opened_tailord_move_request_modal')
  })

  useEffect(() => {
    if (contact?.email) {
      setEmailValue(contact.email)
      setValue('email', contact.email)
    }
    if (contact?.phone) {
      setPhoneValue(contact.phone)
      setValue('phone', contact?.phone)
    }
    if (callTime && selectMode && selectMode === 'phoneCall') {
      setValue('callMethod', t(callTime))
    }
  }, [contact, callTime, selectMode, setValue, t])

  // Simple validation logic
  const isButtonDisabled = () => {
    if (!selectMode) return true
    if (selectMode === 'email') return !emailValue || emailValue.trim() === ''
    if (selectMode === 'phoneCall') return !phoneValue || phoneValue.trim() === ''
    return true
  }

  // Update form values when local state changes
  useEffect(() => {
    setValue('email', emailValue)
  }, [emailValue, setValue])

  useEffect(() => {
    setValue('phone', phoneValue)
  }, [phoneValue, setValue])

  const chatWithAgent = () => {
    show()
  }

  const callWithAgent = () => {
    window.open(`tel:${t('common:callCenterNumber')}`)
  }

  const onClick = () => {
    setShowModal(false)
  }
  if (!ready) return <Spinner />
  return (
    <form onSubmit={onSubmit}>
      <div className={contactMeModalWrapperVariants()} data-testid="contactme-modal-container">
        <Modal open={showModal}>
          <ModalContent withCloseButton dynamicWidth setShowModal={setShowModal} bigCloseButton size={isTabletPortraitOrGreater ? 'medium' : 'small'}>
            <ModalTitle className="sr-only">{title}</ModalTitle>
            <div className={modalHeaderVariants()}>
              <div className={headerAndCheckboxVariants()}>
                <div className={titleWrapperVariants()}>
                  <Text spacing="none" variant="largeBold">
                    {title}
                  </Text>
                </div>
              </div>
            </div>
            {!hasConfirmed ? (
              <>
                <div className={contactWrapperVariants()}>
                  <div className={`${contactDescriptionVariants()} border-t-1 pt-2 border-[var(--color-inactive-main)]`}>{t('dialogDescriptionTop')}</div>
                  <div className={contactButtonFrameVariants()}>
                    <div className={contactButtonWrapperVariants()}>
                      <Button
                        fontSize={14}
                        iconLeft={<Chat />}
                        text={t('common:chatButtonText')}
                        padding="4px 22px"
                        onClick={chatWithAgent}
                        variant={theme === ThemeEnum.FASTIGHETSBYRAN ? 'fb' : 'primaryAlt'}
                      />
                    </div>
                    <div className={contactButtonWrapperVariants()}>
                      <Button
                        fontSize={14}
                        iconLeft={<PhoneIcon width={22} height={21} />}
                        text={t('common:callButtonText')}
                        onClick={callWithAgent}
                        padding="4px 32px"
                        variant={theme === ThemeEnum.FASTIGHETSBYRAN ? 'fb' : 'primaryAlt'}
                      />
                    </div>
                  </div>
                </div>
                <div className={modalDividerVariants()} />
                <div className={textWrapperVariants()}>
                  <div className={contactDescriptionVariants()}>{t('dialogDescriptionBottom')}</div>
                  <ul>{modalList?.length && modalList.map((item, index) => <li key={`${index}-${title}`}>{item}</li>)}</ul>
                </div>
                <RadioGroup onValueChange={(value) => setselectMode(value)} aria-label="View address">
                  <div className={inputWrapperVariants()}>
                    <div className={radioItemWrapperVariants()}>
                      <RadioItem value="email" id="email" whiteMain>
                        <RadioIndicator whiteMain />
                      </RadioItem>
                      <div className={radioTextVariants()}>
                        <label className={labelVariants()} htmlFor="email">
                          {t('radioItem1')}
                        </label>
                      </div>
                    </div>
                    <div style={{ display: selectMode === 'email' ? 'block' : 'none' }}>
                      <div className={emailWrapperVariants()}>
                        <Input type="text" label={t('common:email')} value={emailValue} onChange={(e) => setEmailValue(e.target.value)} />
                      </div>
                      <div className={textPartWrapperVariants()}>
                        <TextArea {...register('textAreaValue')} withLessHeight value={watch('textAreaValue')} label={t('textInputValue')} />
                      </div>
                    </div>
                  </div>
                  <div className={inputWrapperVariants()}>
                    <div className={radioItemWrapperVariants()}>
                      <RadioItem value="phoneCall" id="phoneCall" whiteMain>
                        <RadioIndicator whiteMain />
                      </RadioItem>
                      <div className={radioTextVariants()}>
                        <label className={labelVariants()} htmlFor="phoneCall">
                          {t('radioItem2')}
                        </label>
                      </div>
                    </div>
                    <div style={{ display: selectMode === 'phoneCall' ? 'block' : 'none' }}>
                      <div className={textPartWrapperVariants()}>
                        <Input type="text" label={t('common:phone')} value={phoneValue} onChange={(e) => setPhoneValue(e.target.value)} />
                      </div>
                      <DropdownInput
                        seletedItem={callTime}
                        setSelectedItem={(item) => setCallTime(item)}
                        items={dropdownlist}
                        label={t('dropdownLabel')}
                        fullWidth
                        dropDownRef={dropDownRef}
                        openDropDown={openDropDown}
                        setOpenDropDown={setOpenDropDown}
                      >
                        <>
                          {t(callTime)}
                          <ArrowDown />
                        </>
                      </DropdownInput>
                      <div className={textPartWrapperVariants()}>
                        <TextArea {...register('textAreaValue')} withLessHeight value={watch('textAreaValue')} label={t('textInputValue')} />
                      </div>
                    </div>
                  </div>
                </RadioGroup>

                <div className={buttonWrapperVariants()}>
                  <div className={largeButtonWrapperVariants()}>
                    <Button disabled={isButtonDisabled()} padding="12px 112px" text={t('common:send')} onClick={onSubmit} />
                  </div>
                </div>
              </>
            ) : (
              <div className={successWrapperVariants()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <BirdSuccess width={219} height={171} />
                <div className={innerWrapperVariants()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Text className="mb-10 text-base" variant="body">
                    {t('common:confirmationText')}
                  </Text>
                  <div className={subButtonWrapperVariants()}>
                    <div className={subLargeButtonWrapperVariants()}>
                      <Button variant="primaryAlt" text={t('common:okayText')} onClick={onClick} />
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

export default ContactMeDialog
