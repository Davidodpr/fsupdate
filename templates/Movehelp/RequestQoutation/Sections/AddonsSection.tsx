import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMovehelpContext } from '@/common/context/movehelpProvider/movehelp.provider'
import { useEmailPhoneForm } from '@/common/hooks/useEmailPhoneForm'
import Button from '@/components/atoms/Button'
import Checkbox from '@/components/atoms/Checkbox'
import Input from '@/components/atoms/Input'
import Popup from '@/components/atoms/Popup'
import Text from '@/components/atoms/Text'
import InfoIcon from '@/public/images/Question_green.svg'
import { MovingDate } from '@/components/organisms/FormFields/MovingDate/MovingDate'
import {
  dataSectionWrapperVariants,
  continueButtonWrapperVariants,
  questionIconWrapperVariants,
  popupWrapperVariants,
  errorWrapperVariants,
  checkboxLabelVariants,
  checkboxItemWrapperVariants,
} from '../RequestQuotation.variants'

interface AddonsSectionProps {
  isMovehelpAndMoveclean: boolean
}

export const AddonsSection = ({ isMovehelpAndMoveclean }: AddonsSectionProps) => {
  const { t } = useTranslation(['movehelp', 'common', 'error'])
  const [isSendingQuotation, setIsSendingQuotation] = useState<boolean>(false)
  const { movecleanDate, setMovecleanDate, orderMovehelp, setEmailAndPhone, checkedActivites, setCheckedActivites, hasOrdered, orderError } = useMovehelpContext()

  const emailPhoneForm = useEmailPhoneForm()
  const [contactFormError, setContactFormError] = useState<boolean>(false)

  // Local state for email and phone since react-hook-form isn't working properly
  // Initialize with values from the form (which gets them from user context)
  const initialEmail = emailPhoneForm.getValues('email') || ''
  const initialPhone = emailPhoneForm.getValues('phone') || ''
  const [localEmail, setLocalEmail] = useState(initialEmail)
  const [localPhone, setLocalPhone] = useState(initialPhone)

  const activityFormInputsMovehelp = [
    { activity: 'moveclean', label: t('QUOTATIONS.OTHER_OPTIONS.moveclean') },
    { activity: 'packing', label: t('QUOTATIONS.OTHER_OPTIONS.packing') },
    { activity: 'movingBoxes', label: t('QUOTATIONS.OTHER_OPTIONS.movingBoxes') },
    { activity: 'recycling', label: t('QUOTATIONS.OTHER_OPTIONS.recycling') },
    { activity: 'storage', label: t('QUOTATIONS.OTHER_OPTIONS.storage') },
    { activity: 'assembly', label: t('QUOTATIONS.OTHER_OPTIONS.assembly') },
  ]

  const activityFormInputs = [
    { activity: 'packing', label: t('QUOTATIONS.OTHER_OPTIONS.packing') },
    { activity: 'movingBoxes', label: t('QUOTATIONS.OTHER_OPTIONS.movingBoxes') },
    { activity: 'recycling', label: t('QUOTATIONS.OTHER_OPTIONS.recycling') },
    { activity: 'storage', label: t('QUOTATIONS.OTHER_OPTIONS.storage') },
    { activity: 'assembly', label: t('QUOTATIONS.OTHER_OPTIONS.assembly') },
  ]

  useEffect(() => {
    if (localEmail || localPhone) {
      setEmailAndPhone({
        email: localEmail,
        phone: localPhone,
      })
    }
  }, [localEmail, localPhone, setEmailAndPhone])

  useEffect(() => {
    if (hasOrdered || orderError) setIsSendingQuotation(false)
  }, [hasOrdered])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  const validateSectionAndSubmit = () => {
    if (!localPhone?.length || !localEmail?.length || !localEmail.includes('@')) {
      setContactFormError(true)
      setIsSendingQuotation(false)
    } else {
      setContactFormError(false)
      orderMovehelp(isMovehelpAndMoveclean)
    }
  }

  return (
    <>
      <div className={dataSectionWrapperVariants({ hasError: contactFormError })} style={{ paddingBottom: contactFormError ? 32 : 16 }}>
        <Text style={{ margin: '0 0 24px' }} variant="larger">
          {t('QUOTATIONS.contact')}
        </Text>
        {/* Using custom inputs since react-hook-form isn't working properly */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: contactFormError ? '32px' : '16px' }}>
          <Input
            type="text"
            label={t('common:email')}
            value={localEmail}
            onChange={(e) => setLocalEmail(e.target.value)}
            error={contactFormError && (!localEmail || !localEmail.includes('@')) ? t('error:INFOMISSING.invalidContactInformation') : undefined}
          />
          <Input
            type="text"
            label={t('common:phone')}
            value={localPhone}
            onChange={(e) => setLocalPhone(e.target.value)}
            error={contactFormError && !localPhone ? t('error:INFOMISSING.invalidContactInformation') : undefined}
          />
        </div>
        {contactFormError && (
          <div className={errorWrapperVariants()}>
            <Text spacing="none">{t('error:INFOMISSING.invalidContactInformation')}</Text>
          </div>
        )}
      </div>
      <div className={dataSectionWrapperVariants({ morePadding: true })}>
        <Text style={{ margin: '0 0 12px', lineHeight: '23px', paddingRight: 32 }} variant="larger">
          {t('QUOTATIONS.otherOption')}
        </Text>
        <Text style={{ fontSize: '15px', margin: '0 0 24px' }}>{t('QUOTATIONS.otherOptionSubtitle')}</Text>

        {isMovehelpAndMoveclean &&
          activityFormInputs.map((item) => (
            <div className={checkboxItemWrapperVariants()} key={item.activity}>
              <Checkbox
                onChange={(e) => {
                  setCheckedActivites({ ...checkedActivites, [item.activity]: e.target.checked })
                }}
                checked={Object.entries(checkedActivites).some(([key, value]) => key === item.activity && value)}
                label={
                  <div className={checkboxLabelVariants()}>
                    <Text spacing="none" variant="bodyLarge">
                      {item.label}
                    </Text>
                  </div>
                }
              />
            </div>
          ))}
        {!isMovehelpAndMoveclean &&
          activityFormInputsMovehelp.map((item) => (
            <div className={checkboxItemWrapperVariants()} key={item.activity}>
              <Checkbox
                onChange={(e) => {
                  setCheckedActivites({ ...checkedActivites, [item.activity]: e.target.checked })
                }}
                checked={Object.entries(checkedActivites).some(([key, value]) => key === item.activity && value)}
                label={
                  <div className={checkboxLabelVariants()}>
                    <Text spacing="none" variant="bodyLarge">
                      {item.label}
                    </Text>
                  </div>
                }
              />
            </div>
          ))}
        <div className={questionIconWrapperVariants()}>
          <Popup
            withFluidWidth
            text={
              <div className={popupWrapperVariants()}>
                {
                  <>
                    <p>
                      <span style={{ fontWeight: 'bold' }}>{t(activityFormInputs[0].label)}</span> - <span>{t('QUOTATIONS.additionalServicesPopupText1')}</span>
                    </p>
                    <p style={{ marginTop: 8 }}>
                      <span style={{ fontWeight: 'bold' }}>{t(activityFormInputs[1].label)}</span> - <span>{t('QUOTATIONS.additionalServicesPopupText2')}</span>
                    </p>
                    <p style={{ marginTop: 8 }}>
                      <span style={{ fontWeight: 'bold' }}>{t(activityFormInputs[2].label)}</span> - <span>{t('QUOTATIONS.additionalServicesPopupText3')}</span>
                    </p>
                    <p style={{ marginTop: 8 }}>
                      <span style={{ fontWeight: 'bold' }}>{t(activityFormInputs[3].label)}</span> - <span>{t('QUOTATIONS.additionalServicesPopupText4')}</span>
                    </p>
                    <p style={{ marginTop: 8 }}>
                      <span style={{ fontWeight: 'bold' }}>{t(activityFormInputs[4].label)}</span> - <span>{t('QUOTATIONS.additionalServicesPopupText5')}</span>
                    </p>
                  </>
                }
              </div>
            }
          >
            <InfoIcon className="[&_path]:stroke-[var(--color-primary-main)]" />
          </Popup>
        </div>
      </div>
      {!!checkedActivites?.moveclean && (
        <div className={dataSectionWrapperVariants({ morePadding: true })}>
          <Text spacing="none" style={{ marginBottom: '14px' }} variant="larger">
            {t('QUOTATIONS.whenDoYouWantMoveclean')}
          </Text>
          <Text spacing="none" style={{ marginBottom: '14px', fontSize: '16px', maxWidth: '90%' }}>
            {t('QUOTATIONS.dateExtraInfo')}
          </Text>
          <MovingDate defaultDate={movecleanDate ?? new Date()} setDatePicked={setMovecleanDate} withCalendarIcon />
          <div className={questionIconWrapperVariants()}>
            <Popup
              withFluidWidth
              text={
                <div className={popupWrapperVariants()}>
                  {
                    <>
                      <p>{t('QUOTATIONS.movecleanDatePopupText1')}</p>
                      <p style={{ marginTop: 8 }}>{t('QUOTATIONS.movecleanDatePopupText2')}</p>
                    </>
                  }
                </div>
              }
            >
              <InfoIcon className="[&_path]:stroke-[var(--color-primary-main)]" />
            </Popup>
          </div>
        </div>
      )}
      <div className={continueButtonWrapperVariants()}>
        <Button
          onClick={() => {
            setIsSendingQuotation(true)
            validateSectionAndSubmit()
          }}
          largerArrowRight
          disabled={isSendingQuotation || hasOrdered}
          text={t('QUOTATIONS.getQuotations')}
          padding="10px 64px"
        />
      </div>
    </>
  )
}

export default AddonsSection
