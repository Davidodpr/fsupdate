import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useMovehelpContext } from '@/common/context/movehelpProvider/movehelp.provider'
import useResponsive from '@/common/hooks/useResponsive'
import ArrowForward from '@/components/atoms/ArrowForward'
import Button from '@/components/atoms/Button'
import Popup from '@/components/atoms/Popup'
import Text from '@/components/atoms/Text'
import TextArea from '@/components/atoms/TextArea'
import InfoIcon from '@/public/images/Question_green.svg'
import { MovingDate } from '@/components/organisms/FormFields/MovingDate/MovingDate'
import { dataSectionWrapperVariants, livingSelectionVariants, questionIconWrapperVariants, popupWrapperVariants, continueButtonWrapperVariants } from '../RequestQuotation.variants'

interface DetailsSectionProps {
  setCurrentStep: (step: number) => void
  currentStep: number
  isMovehelp: boolean
  isMovehelpAndMoveclean: boolean
}

export const DetailsSection = ({ setCurrentStep, currentStep, isMovehelpAndMoveclean }: DetailsSectionProps) => {
  const { isTabletPortraitOrGreater } = useResponsive()
  const { t } = useTranslation(['movehelp', 'common', 'error'])
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const { otherComment, setOtherComment, movecleanDate, setMovecleanDate, movehelpDate, setMovehelpDate } = useMovehelpContext()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  return (
    <>
      <div className={dataSectionWrapperVariants({ morePadding: true })}>
        <Text spacing="none" style={{ marginBottom: '14px', paddingRight: 16 }} variant="larger">
          {t('QUOTATIONS.whenDoYouWantMovehelp')}
        </Text>
        <MovingDate
          defaultDate={movehelpDate && new Date(movehelpDate) >= new Date() ? movehelpDate : new Date()}
          positionBottom
          setDatePicked={setMovehelpDate}
          withCalendarIcon
        />
        <div className={questionIconWrapperVariants()}>
          <Popup
            withFluidWidth
            text={
              <div className={popupWrapperVariants()}>
                {
                  <>
                    <Text style={{ fontSize: '15px' }}>{t('QUOTATIONS.movehelpDatePopupText1')}</Text>
                    <Text style={{ marginTop: 8, fontSize: '15px' }}>{t('QUOTATIONS.movehelpDatePopupText2')}</Text>
                  </>
                }
              </div>
            }
          >
            <InfoIcon className="[&_path]:stroke-[var(--color-primary-main)]" />
          </Popup>
        </div>
        <Text spacing="none" style={{ fontSize: '15px', textAlign: 'right', fontStyle: 'italic' }}>
          {t('QUOTATIONS.dateExtraInfo')}
        </Text>
      </div>
      {isMovehelpAndMoveclean && (
        <div className={dataSectionWrapperVariants({ morePadding: true })}>
          <Text spacing="none" style={{ marginBottom: '14px', paddingRight: 18 }} variant="larger">
            {t('QUOTATIONS.whenDoYouWantMoveclean')}
          </Text>
          <MovingDate
            defaultDate={movecleanDate && new Date(movecleanDate) >= new Date() ? movecleanDate : new Date()}
            positionBottom
            setDatePicked={setMovecleanDate}
            withCalendarIcon
          />
          <div className={questionIconWrapperVariants()}>
            <Popup
              withFluidWidth
              text={
                <div className={popupWrapperVariants()}>
                  {
                    <>
                      <Text style={{ fontSize: '15px' }}>{t('QUOTATIONS.movecleanDatePopupText1')}</Text>
                      <Text style={{ marginTop: 8, fontSize: '15px' }}>{t('QUOTATIONS.movecleanDatePopupText2')}</Text>
                    </>
                  }
                </div>
              }
            >
              <InfoIcon className="[&_path]:stroke-[var(--color-primary-main)]" />
            </Popup>
          </div>
          <Text spacing="none" style={{ fontSize: '15px', textAlign: 'right', fontStyle: 'italic' }}>
            {t('QUOTATIONS.dateExtraInfo')}
          </Text>
        </div>
      )}

      <div className={dataSectionWrapperVariants({ morePadding: true })}>
        <Text style={{ margin: '0 0 24px', maxWidth: isTabletPortraitOrGreater ? 360 : 320, lineHeight: '24px', paddingRight: 32 }} variant="larger">
          {t('QUOTATIONS.anythingElseToKnow')}
        </Text>
        <div className={livingSelectionVariants()}>
          <TextArea
            ref={textAreaRef}
            style={{ minHeight: 180 }}
            onChange={(e) => setOtherComment && setOtherComment(e.currentTarget.value)}
            placeholder={t('QUOTATIONS.anythingElseToKnowPlaceholder')}
            value={otherComment}
          ></TextArea>
        </div>
        <div className={questionIconWrapperVariants()}>
          <Popup
            withFluidWidth
            text={
              <div className={popupWrapperVariants()}>
                <Text style={{ fontSize: '15px' }}>{t('QUOTATIONS.otherCommentsPopup')}</Text>
                <ul style={{ paddingLeft: 25, fontSize: '15px' }}>
                  <li>{t('QUOTATIONS.otherCommentsPopupBullet1')}</li>
                  <li>{t('QUOTATIONS.otherCommentsPopupBullet2')}</li>
                  <li>{t('QUOTATIONS.otherCommentsPopupBullet3')}</li>
                  <li>{t('QUOTATIONS.otherCommentsPopupBullet4')}</li>
                </ul>
              </div>
            }
          >
            <InfoIcon className="[&_path]:stroke-[var(--color-primary-main)]" />
          </Popup>
        </div>
      </div>
      <div className={continueButtonWrapperVariants()}>
        <Button onClick={() => setCurrentStep(currentStep + 1)} largerArrowRight iconRight={<ArrowForward />} iconColor="white" text={t('common:continue')} padding="10px 64px" />
      </div>
    </>
  )
}

export default DetailsSection
