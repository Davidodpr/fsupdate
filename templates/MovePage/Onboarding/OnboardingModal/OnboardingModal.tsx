'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLeadContext } from '@/common/context/lead/LeadProvider'
import useResponsive from '@/common/hooks/useResponsive'
import Flex from '@/components/atoms/Flex'
import Spinner from '@/components/atoms/Spinner'
import TrustIndicatorsStrip from '@/components/molecules/TrustIndicatorsStrip'
import MapPin from '@/public/images/MapPin_filled.svg'
import { OnboardingFormAddress } from './OnboardingForm/OnboardingForm'
import { OnboardingFormDates } from './OnboardingForm/OnboardingFormDates'
import {
  styledModalVariants,
  styledHeaderSectionVariants,
  modalDividerVariants,
  styledHeaderVariants,
  termsTextVariants,
  termsTextLinkVariants,
  termsWrapperVariants,
  dragHandleVariants,
  introSectionVariants,
  introTitleVariants,
  introDescriptionVariants,
} from './OnboardingModal.variants'

export interface OnboardingModalProps {
  onSaveAddress: (address: Record<string, string>) => void
  setShowDataSection?: (show: boolean) => void
}

const TERMS_URL = 'https://flyttsmart.se/terms'

const OnboardingModal = ({ onSaveAddress, setShowDataSection }: OnboardingModalProps) => {
  const { t } = useTranslation(['signup', 'movePage', 'common'])
  const { isTabletPortraitOrGreater } = useResponsive()
  const [currentStep, setCurrentStep] = useState(1)
  const [fullHeight, setFullHeight] = useState(false)
  const [showMovingInDate, setShowMovingInDate] = useState(false)

  const {
    lead: { hasFetchedData },
    leadAddressData,
  } = useLeadContext()

  const isMobile = !isTabletPortraitOrGreater

  useEffect(() => {
    if (fullHeight && isMobile) {
      document.body.style.overflowY = 'hidden'
    }
    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [fullHeight, isMobile])

  const headerText = currentStep === 1 ? t('whereToMove') : t('whenToMove')

  return (
    <div
      className={styledModalVariants({
        fullHeight: isMobile ? fullHeight : false,
        isStepTwo: currentStep === 2 && !showMovingInDate,
        isStepTwoAndTwoDates: currentStep === 2 && showMovingInDate,
      })}
    >
      {/* Drag handle for mobile bottom sheet */}
      {isMobile && <div className={dragHandleVariants()} />}

      <Flex direction="column" justifyContent="start" alignItems="stretch">
        <TrustIndicatorsStrip className="mb-4 -mx-2" />

        {/* Intro section - only show on step 1 */}
        {currentStep === 1 && (
          <div className={introSectionVariants()}>
            <h1 className={introTitleVariants()}>{t('introTitle')}</h1>
            <p className={introDescriptionVariants()}>{t('introDescription')}</p>
          </div>
        )}

        <div className={styledHeaderSectionVariants()}>
          <MapPin className="mb-0.5" />
          <h2 className={styledHeaderVariants()}>{headerText}</h2>
        </div>

        <div className={modalDividerVariants()} />

        {!hasFetchedData && <Spinner />}

        {currentStep === 1 && (
          <OnboardingFormAddress
            setFullHeight={setFullHeight}
            setCurrentStep={setCurrentStep}
            leadAddress={leadAddressData}
            setShowDataSection={setShowDataSection}
            onSubmitCallback={onSaveAddress}
          />
        )}

        {currentStep === 2 && (
          <OnboardingFormDates
            setShowMovingInDate={setShowMovingInDate}
            showMovingInDate={showMovingInDate}
            leadAddress={leadAddressData}
            setShowDataSection={setShowDataSection}
          />
        )}

        <div className={`${termsWrapperVariants()} items-center mt-2.5`}>
          <p className={termsTextVariants()}>{t('terms')}</p>
          <a
            className={termsTextLinkVariants()}
            href={TERMS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('termsLinkText')}
          </a>
        </div>
      </Flex>
    </div>
  )
}

export default OnboardingModal
