import { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useIntercom } from 'react-use-intercom'
import { clsx } from 'clsx'
import { useSearchParams } from 'next/navigation'
import { cancelPoaBankIdSign } from '@/common/api/poa'
import { useChecklistContext } from '@/common/context/checklist/checklistContext.provider'
import { useElectricityProvider } from '@/common/context/electricity/electricityContext.provider'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import usePrevious from '@/common/hooks/usePrevious'
import useResponsive from '@/common/hooks/useResponsive'
import { ActivityEnum } from '@/common/types/activity'
import BackToMovepageButton, { GoBackTopWrapper, GoBackToTopInnerWrapper } from '@/components/atoms/BackToMovepageButton'
import Flex from '@/components/atoms/Flex'
import Spinner, { SpinnerWrapper } from '@/components/atoms/Spinner'
import Text from '@/components/atoms/Text'
import { Accordion, AccordionTrigger, AccordionItem, AccordionContent } from '@/components/molecules/Accordion'
import OrderFailError from '@/components/molecules/ErrorMessage'
import ServiceAlreadyBooked from '@/components/molecules/ServiceAlreadyBooked'
import { BANK_ID_STATUS_COMPLETE, BANK_ID_STATUS_PENDING } from '@/constants/bankid'
import Step2Details from './Components/Step2Details/Step2Details'
import Step3Summary from './Components/Step3Summary/Step3Summary'
import Step4BankId from './Components/Step4BankId/Step4BankId'
import Step5Confirmation from './Components/Step5Confirmation/Step5Confirmation'
import TopSection from './Components/TopSection/TopSection'
import Step1ServicesAndPrices from './Step1ServicesAndPrices/Step1ServicesAndPrices'
import {
  spinnerBgWrapperVariants,
  wrapperVariants,
  contentContainerVariants,
  accordianWrapperVariants,
  accordionButtonWrapperVariants,
  accordionContentWrapperVariants,
  popupHeaderVariants,
} from './electricity.variants'

export const ElectricityTemplate = () => {
  const { t } = useTranslation(['electricity', 'common', 'error'])
  const { setNewTheme, hasSetTheme, theme } = useThemeContext()
  const [hasCheckedTheme, setHasCheckedTheme] = useState(false)
  const { trackEvent, show } = useIntercom()
  const { activitiesList, isChecklistItemOrderedOrSkipped } = useChecklistContext()
  const query = useSearchParams()
  const themeQuery = query.get('theme')
  const { isTabletPortraitOrGreater } = useResponsive()
  const { currentProvider, orderRef, orderComplete, errorMessageKey, setOrderRef, setAutoStartToken, setPoaStatus, showOrderFailedError, poaStatus, setShowOrderFailedError } =
    useElectricityProvider()

  const [currentStep, setCurrentStep] = useState(1)
  const previousStep = usePrevious(currentStep)
  const [electricitySkipped, setElectricitySkipped] = useState(false)

  const residenceSizeRef = useRef<HTMLInputElement>(null)
  const [residenceSizeError, setResidenceSizeError] = useState<string | null>(null)

  useEffect(() => {
    if (activitiesList?.length) {
      const item = isChecklistItemOrderedOrSkipped(ActivityEnum.POWER)
      if (item) {
        setElectricitySkipped(true)
      } else {
        trackEvent('el_landing')
      }
    }
  }, [activitiesList])

  const cancel = async () => {
    setOrderRef('')
    setAutoStartToken('')
    setShowOrderFailedError(undefined)
    setPoaStatus(undefined)
    setCurrentStep(3)
    try {
      if (orderRef) await cancelPoaBankIdSign(orderRef || '')
    } catch (e: unknown) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (themeQuery === ThemeEnum.FASTIGHETSBYRAN) {
      setNewTheme(ThemeEnum.FASTIGHETSBYRAN)
    }
    const timer = setTimeout(() => {
      setHasCheckedTheme(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [themeQuery, setNewTheme])

  if (!hasCheckedTheme || !hasSetTheme)
    return (
      <div className={spinnerBgWrapperVariants()}>
        <SpinnerWrapper>
          <Spinner scale={2} color="green" />
        </SpinnerWrapper>
      </div>
    )

  const FAQ = [
    {
      question: t('MOVESUMMARY.question1'),
      answer: t('MOVESUMMARY.answer1'),
    },
    {
      question: t('MOVESUMMARY.question2'),
      answer: t('MOVESUMMARY.answer2'),
    },
    {
      question: t('MOVESUMMARY.question3'),
      answer: t('MOVESUMMARY.answer3'),
    },
  ]

  const getPopupText = () => {
    return (
      <div className="md:py-2">
        <Text className="!text-[14px]">{t('calculationsPopupFirstText')}</Text>
        <Text className={popupHeaderVariants()}>{t('calculationsPopupFirstHeader')}</Text>
        <ul className="list-disc list-inside ml-5 mt-4">
          <li>{t('calculationsPopupFirstListItem')}</li>
          <li>{t('calculationsPopupSecondListItem')}</li>
          <li>{t('calculationsPopupThirdListItem')}</li>
          <li>{t('calculationsPopupFourthListItem')}</li>
          <li>{t('calculationsPopupFifthListItem')}</li>
        </ul>
      </div>
    )
  }

  return (
    <div className={wrapperVariants()}>
      {electricitySkipped ? (
        <ServiceAlreadyBooked />
      ) : (
        <div className={contentContainerVariants()}>
          <div style={{ width: '100%', height: '100%' }}>
            {theme !== ThemeEnum.FASTIGHETSBYRAN && (
              <GoBackTopWrapper variant="secondaryLight">
                <GoBackToTopInnerWrapper>
                  <BackToMovepageButton />
                </GoBackToTopInnerWrapper>
              </GoBackTopWrapper>
            )}
            {(currentStep === 1 || currentStep === 2 || currentStep === 3) && (
              <TopSection
                residenceSizeError={residenceSizeError}
                setResidenceSizeError={setResidenceSizeError}
                inputRef={residenceSizeRef}
                isStepTwo={currentStep === 2 || currentStep === 3}
                popupText={getPopupText()}
              />
            )}
            {currentStep === 1 && <Step1ServicesAndPrices setCurrentStep={setCurrentStep} popupText={getPopupText()} />}
            {currentStep === 2 && currentProvider?.provider && (
              <Step2Details previousStep={previousStep ?? 0} setCurrentStep={setCurrentStep} providerName={currentProvider?.provider} />
            )}
            {currentStep === 3 && currentProvider?.provider && !orderRef && !showOrderFailedError && !orderComplete && !errorMessageKey && (
              <Step3Summary setCurrentStep={setCurrentStep} providerName={currentProvider?.provider} />
            )}
            {orderRef && [BANK_ID_STATUS_PENDING, undefined].includes(poaStatus) && <Step4BankId cancel={cancel} />}
            {orderComplete && currentProvider?.provider && <Step5Confirmation />}
            {!showOrderFailedError && !orderComplete && poaStatus === BANK_ID_STATUS_COMPLETE && !!currentProvider?.provider && (
              <div style={{ position: 'relative', minHeight: 100 }}>
                <SpinnerWrapper className="top-[50px]">
                  <Spinner scale={2} color="green" />
                </SpinnerWrapper>
              </div>
            )}
            {showOrderFailedError && ![BANK_ID_STATUS_PENDING, BANK_ID_STATUS_COMPLETE, undefined].includes(poaStatus) && !orderComplete && (
              <OrderFailError show={show} cancel={cancel} />
            )}
          </div>
          <div className={accordianWrapperVariants()}>
            <Accordion type="single" collapsible className={`${isTabletPortraitOrGreater ? 'mt-8' : 'mt-0'} min-w-full`}>
              {FAQ.map(({ question, answer }, index) => (
                <AccordionItem key={`faq-${index}`} value={`faq-${index}`} style={{ minWidth: '100%' }}>
                  <div className={accordionButtonWrapperVariants()}>
                    <AccordionTrigger className="!py-8 text-left !px-3 md:!p-8">{question}</AccordionTrigger>
                  </div>
                  <div className={accordionContentWrapperVariants()}>
                    <AccordionContent noPadding>
                      {index === 0 ? (
                        <Flex style={{ gap: 12, padding: isTabletPortraitOrGreater ? '0 0 24px 32px' : '0 16px 16px' }} direction="column">
                          <>
                            <Flex direction="column" style={{ gap: 16 }}>
                              <span style={{ lineHeight: '120%' }}>{answer}</span>
                              <Text style={{ fontSize: 'var(--fs-fontSizes-5)' }} spacing="none">
                                {t('MOVESUMMARY.answer1_text2')}
                              </Text>
                              {
                                <a
                                  rel="noreferrer noopener"
                                  target="_blank"
                                  className="!text-[var(--color-primary-main)] !font-bold"
                                  style={{ textDecoration: 'unset', marginLeft: 4 }}
                                  href="https://help.flyttsmart.se/sv/collections/2776997-el"
                                >
                                  {t('MOVESUMMARY.answer1_link')}
                                </a>
                              }
                            </Flex>
                          </>
                        </Flex>
                      ) : index === 1 ? (
                        <Flex style={{ gap: 12, padding: isTabletPortraitOrGreater ? '0 0 24px 32px' : '0 16px 16px' }} direction="column">
                          {answer}
                          <Text style={{ fontSize: 'var(--fs-fontSizes-5)' }} spacing="none">
                            {t('MOVESUMMARY.answer2_text2')}
                          </Text>
                        </Flex>
                      ) : (
                        <Flex style={{ gap: 12, padding: isTabletPortraitOrGreater ? '0 0 24px 32px' : '0 16px 16px' }} direction="column">
                          {answer}
                          <ul className="list-disc pl-10">
                            <li>{t('MOVESUMMARY.answer3ListItem1')}</li>
                            <li>{t('MOVESUMMARY.answer3ListItem2')}</li>
                          </ul>
                          <Text style={{ fontSize: 'var(--fs-fontSizes-5)' }} spacing="none">
                            {t('MOVESUMMARY.answer3_text2')}
                          </Text>
                          <Text style={{ fontSize: 'var(--fs-fontSizes-5)' }} spacing="none">
                            {t('MOVESUMMARY.answer3_text3')}
                          </Text>
                        </Flex>
                      )}
                    </AccordionContent>
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      )}
    </div>
  )
}

export default ElectricityTemplate
