'use client'

import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Skeleton from 'react-loading-skeleton'
import { useIntercom } from 'react-use-intercom'
import { useSearchParams } from 'next/navigation'
import { useAddresschangeContext } from '@/common/context/addresschange/addresschange.provider'
import { ChecklistContextProvider, CreateChecklistContext } from '@/common/context/checklist/checklistContext.provider'
import { useChecklistContext } from '@/common/context/checklist/checklistContext.provider'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { SkatteverketStatusEnum } from '@/common/enums/SkatteverketEnum'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import { ActivityEnum } from '@/common/types/activity'
import ServiceFlowHeader from '@/components/atoms/ServiceFlowHeader'
import Spinner, { SpinnerWrapper } from '@/components/atoms/Spinner'
import ServiceAlreadyBooked from '@/components/molecules/ServiceAlreadyBooked'
import { mainWrapperVariants } from './AddresschangePage.variants'
import AlternativeAddresschange from './AlternativeAddresschange'
import { Login } from './steps/step1/Login'
import { CurrentAddress } from './steps/step2/CurrentAddress'
import { NewAddress } from './steps/step3/NewAddress'
import { ContactDetails } from './steps/step4/ContactDetails'
import { Summary } from './steps/step5/Summary'
import { Confirmation } from './steps/step6/Confirmation'


interface AddresschangePageProps {
  isExternalModule?: boolean
}

export const AddresschangePage = ({ isExternalModule }: AddresschangePageProps) => {
  const contextObject = CreateChecklistContext()
  const [isLoading, setIsLoading] = useState(true)
  const { trackEvent } = useIntercom()
  const { activitiesList, isChecklistItemOrderedOrSkipped } = useChecklistContext()
  const { t } = useTranslation(['addresschange', 'common'])
  const theme = useSearchParams().get('theme')
  const [currentStep, setCurrentStep] = useState(1)
  const { setNewTheme, iconSet, hasSetTheme } = useThemeContext()
  const { loginStatus } = useAddresschangeContext()
  const [isAddresschangeLockedOrCompletedOrSkipped, setIsAddresschangeLockedOrCompletedOrSkipped] = useState(false)

  useEffect(() => {
    if (activitiesList?.length) {
      const item = isChecklistItemOrderedOrSkipped(ActivityEnum.ADDRESSCHANGE)
      if (item) {
        setIsAddresschangeLockedOrCompletedOrSkipped(true)
      } else {
        trackEvent('addresschange_landing')
      }
      setIsLoading(false)
    }
  }, [activitiesList])

  const goToNextStep = useCallback(() => {
    setCurrentStep(currentStep + 1)
    window.scrollTo(0, 0)
  }, [currentStep])

  const goToPrevStep = useCallback(() => {
    setCurrentStep(currentStep - 1)
    window.scrollTo(0, 0)
  }, [currentStep])

  useEffect(() => {
    if (loginStatus === SkatteverketStatusEnum.COMPLETED && currentStep === 1) {
      goToNextStep()
    }
  }, [loginStatus])

  useEffect(() => {
    if (theme === ThemeEnum.FASTIGHETSBYRAN) {
      setNewTheme(ThemeEnum.FASTIGHETSBYRAN)
    }
  }, [theme, setNewTheme])

  return (
    <div className={mainWrapperVariants()}>
      {!hasSetTheme || isLoading ? (
        <>
          {isExternalModule ? (
            <Skeleton style={{ lineHeight: 'unset' }} />
          ) : (
            <SpinnerWrapper>
              <Spinner scale={2} color="green" />
            </SpinnerWrapper>
          )}
        </>
      ) : (
        <>
          {isAddresschangeLockedOrCompletedOrSkipped ? (
            <ServiceAlreadyBooked />
          ) : (
            <>
              <ServiceFlowHeader
                isExternalModule={isExternalModule}
                imageUrl={iconSet.ADDRESSCHANGE_SIMPLE}
                text={process.env.NEXT_PUBLIC_ADDRESSCHANGE_ACTIVE === 'true' && currentStep < 6 ? t('header', { step: currentStep, total: 5 }) : t('headerAlternative')}
              />
              {process.env.NEXT_PUBLIC_ADDRESSCHANGE_ACTIVE === 'true' ? (
                <>
                  {currentStep === 1 && <Login />}
                  {currentStep === 2 && <CurrentAddress goToPrevStep={goToPrevStep} goToNextStep={goToNextStep} />}
                  {currentStep === 3 && <NewAddress goToPrevStep={goToPrevStep} goToNextStep={goToNextStep} />}
                  {currentStep === 4 && <ContactDetails goToNextStep={goToNextStep} goToPrevStep={goToPrevStep} />}
                  {currentStep === 5 && <Summary goToNextStep={goToNextStep} goToPrevStep={goToPrevStep} />}
                  {currentStep === 6 && <Confirmation />}
                </>
              ) : (
                <ChecklistContextProvider context={contextObject}>
                  <AlternativeAddresschange />
                </ChecklistContextProvider>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}
