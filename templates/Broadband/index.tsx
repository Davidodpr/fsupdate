import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useIntercom } from 'react-use-intercom'
import { useBroadbandProvider } from '@/common/context/broadband/broadbandProvider.provider'
import { useChecklistContext } from '@/common/context/checklist/checklistContext.provider'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import useResponsive from '@/common/hooks/useResponsive'
import { ActivityEnum } from '@/common/types/activity'
import BackToMovepageButton, { GoBackTopWrapper, GoBackToTopInnerWrapper } from '@/components/atoms/BackToMovepageButton'
import Flex from '@/components/atoms/Flex'
import Spinner, { SpinnerWrapper } from '@/components/atoms/Spinner'
import Text from '@/components/atoms/Text'
import { Accordion, AccordionTrigger, AccordionItem, AccordionContent } from '@/components/molecules/Accordion'
import ServiceAlreadyBooked from '@/components/molecules/ServiceAlreadyBooked'
import Step2Details from './Components/Step2Details/Step2Details'
import Step3Summary from './Components/Step3Summary/Step3Summary'
import Step4Confirmation from './Components/Step4Confirmation/Step4Confirmation'
import Step5Cancel from './Components/Step5Cancel/Step5Cancel'
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
} from './broadband.variants'

const BroadbandTemplate = () => {
  const { t } = useTranslation(['broadband', 'common'])
  const { hasSetTheme, theme } = useThemeContext()
  const { trackEvent } = useIntercom()
  const { isTabletPortraitOrGreater } = useResponsive()
  const { orderComplete } = useBroadbandProvider()
  const { activitiesList, isChecklistItemOrderedOrSkipped } = useChecklistContext()
  const [broadbandSkippedOrCompleted, setBroadbandSkippedOrCompleted] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  useEffect(() => {
    if (activitiesList?.length) {
      const item = isChecklistItemOrderedOrSkipped(ActivityEnum.INTERNET)
      if (item) {
        setBroadbandSkippedOrCompleted(true)
      } else {
        trackEvent('broadband_landing')
      }
    }
  }, [activitiesList])

  if (!hasSetTheme)
    return (
      <div className={spinnerBgWrapperVariants()}>
        <SpinnerWrapper>
          <Spinner scale={2} color="green" />
        </SpinnerWrapper>
      </div>
    )

  const FAQ = [
    {
      question: t('FAQ.whyOrder'),
      answer: t('FAQ.whyOrderAnswer'),
    },
    {
      question: t('FAQ.whatIsIncluded'),
      answer: t('FAQ.whatIsIncludedAnswer'),
    },
    {
      question: t('FAQ.whatHappensAfterOrder'),
      answer: t('FAQ.whatHappensAfterOrderAnswer'),
    },
  ]

  const getPopupText = () => {
    return (
      <div className="!font-[12px]">
        <Text className={popupHeaderVariants()}>{t('mobileOrFixed')}</Text>
        <Text className="mt-2 !font-[14px]">{t('mobileOrFixed1')}</Text>
        <Text className="mt-2 !font-[14px]">{t('mobileOrFixed2')}</Text>
        <Text className="mt-2 !font-[14px]">{t('mobileOrFixed3')}</Text>
      </div>
    )
  }

  const getPriceText = () => {
    return (
      <div>
        <Text className={popupHeaderVariants()}>{t('suggestedPricePopupHeader')}</Text>
        <Text className="!text-[14px]">{t('suggestedPricePopupText')}</Text>
      </div>
    )
  }

  return (
    <div className={wrapperVariants()}>
      {broadbandSkippedOrCompleted ? (
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
            <TopSection hideChoiceAndAddress={currentStep !== 1} popupText={getPopupText()} />
            {currentStep === 1 && <Step1ServicesAndPrices setCurrentStep={setCurrentStep} popupText={getPriceText()} />}
            {currentStep === 2 && <Step2Details setCurrentStep={setCurrentStep} />}
            {currentStep === 3 && !orderComplete && <Step3Summary setCurrentStep={setCurrentStep} />}
            {orderComplete && currentStep === 4 && <Step4Confirmation setCurrentStep={setCurrentStep} />}
            {currentStep === 4 && !orderComplete && (
              <Flex justifyContent="center" style={{ height: '200px', padding: '32px 0', marginTop: 50 }}>
                <Spinner scale={2} color="green" />
              </Flex>
            )}
            {currentStep === 5 && <Step5Cancel />}
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
                                {t('FAQ.whyOrderAnswerText_2')}
                              </Text>
                              {
                                <a
                                  rel="noreferrer noopener"
                                  target="_blank"
                                  className="!text-[var(--color-primary-main)] !font-bold"
                                  style={{ textDecoration: 'unset', marginLeft: 4 }}
                                  href={t('FAQ.whyOrderAnswer_url')}
                                >
                                  {t('FAQ.whyOrderAnswer_url_text')}
                                </a>
                              }
                            </Flex>
                          </>
                        </Flex>
                      ) : index === 1 ? (
                        <Flex style={{ gap: 12, padding: isTabletPortraitOrGreater ? '0 0 24px 32px' : '0 16px 16px' }} direction="column">
                          {answer}
                          <Text style={{ fontSize: 'var(--fs-fontSizes-5)' }} spacing="none">
                            {t('FAQ.whatIsIncludedAnswer_2')}
                          </Text>
                          {
                            <a
                              rel="noreferrer noopener"
                              className="!text-[var(--color-primary-main)] !font-bold"
                              target="_blank"
                              style={{ textDecoration: 'unset', marginLeft: 4 }}
                              href={t('FAQ.whatIsIncludedAnswer_url')}
                            >
                              {t('FAQ.whatIsIncludedAnswer_url_text')}
                            </a>
                          }
                        </Flex>
                      ) : (
                        <Flex style={{ gap: 12, padding: isTabletPortraitOrGreater ? '0 24px 24px 32px' : '0 16px 16px' }} direction="column">
                          {answer}
                          <Text style={{ fontSize: 'var(--fs-fontSizes-5)' }} spacing="none">
                            {t('FAQ.whatHappensAfterOrderAnswer_2')}
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

export default BroadbandTemplate
