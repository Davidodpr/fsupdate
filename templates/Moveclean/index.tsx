'use client'

import { useEffect, useState, useRef } from 'react'
import ReactGA4 from 'react-ga4'
import { useTranslation } from 'react-i18next'
import { useEffectOnce } from 'react-use'
import { useIntercom } from 'react-use-intercom'
import { clsx } from 'clsx'
import { useSearchParams } from 'next/navigation'
import Andreas from 'public/images/Andreas.png'
import formatDate from '@/appComponents/format'
import { useChecklistContext } from '@/common/context/checklist/checklistContext.provider'
import { useMovecleanContext } from '@/common/context/movecleanProvider/moveclean.provider'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import { MoveServiceOrder, MoveService } from '@/common/enums/MoveServicesEnum'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import { getDefaultDate } from '@/common/helpers/date'
import { useEmailPhoneForm } from '@/common/hooks/useEmailPhoneForm'
import useResponsive from '@/common/hooks/useResponsive'
import BackToMovepageButton, { GoBackTopWrapper, GoBackToTopInnerWrapper } from '@/components/atoms/BackToMovepageButton'
import Button from '@/components/atoms/Button'
import Flex from '@/components/atoms/Flex'
import Spinner, { SpinnerWrapper } from '@/components/atoms/Spinner'
import Text from '@/components/atoms/Text'
import { Accordion, AccordionTrigger, AccordionItem, AccordionContent } from '@/components/molecules/Accordion'
import ServiceAlreadyBooked from '@/components/molecules/ServiceAlreadyBooked'
import { ORDER_ERROR } from '@/constants/errorCodes'
import Kitchen from '@/public/images/Kitchen.svg'
import Tiles from '@/public/images/Tiles.svg'
import CleaingIcon from '@/public/images/cleaningIcon.svg'
import TopSection from './Components/TopSection/TopSection'
import {
  wrapperVariants,
  contentContainerVariants,
  accordianWrapperVariants,
  accordionButtonWrapperVariants,
  accordionContentWrapperVariants,
  imageWrapperVariants,
  buttonWrapperVariants,
  spinnerBgWrapperVariants,
} from './Moveclean.variants'
import Step1ServicesAndPrices from './Step1ServicesAndPrices/Step1ServicesAndPrices'
import Step2SummaryAndOrder from './Step2SummaryAndOrder/Step2SummaryAndOrder'
import Step3Confirmation from './Step3Confirmation/Step3Confirmation'

export const Moveclean = () => {
  const { t } = useTranslation(['moveclean', 'common', 'error'])
  const { setNewTheme, hasSetTheme, theme } = useThemeContext()
  const [hasCheckedTheme, setHasCheckedTheme] = useState(false)
  const {
    user: { currentMove },
    user: { currentMove: { fromResidenceSize, fromAddress } = {} },
  } = useUserContext()

  const { skippedActivities } = useChecklistContext()
  const themeQuery = useSearchParams().get('theme')
  const { isTabletPortraitOrGreater } = useResponsive()
  const { isLoading, setIsLoading, setError, orderData, orderMoveclean, sendMovecleanPageVisitIntercomEvent, selectedProvider } = useMovecleanContext()
  const { trackEvent } = useIntercom()
  const { user } = useUserContext()
  const [currentStep, setCurrentStep] = useState(1)
  const [currentDatePicked, setCurrentDatePicked] = useState<Date>(currentMove?.movingDate ? getDefaultDate(new Date(currentMove?.movingDate)) : getDefaultDate(new Date()))
  const { getValues, trigger } = useEmailPhoneForm()
  const emailPhoneForm = useEmailPhoneForm()
  const { show } = useIntercom()
  const shouldShowEmailPhoneForm = !user.contact.email || !user.contact.phone
  const residenceSizeRef = useRef<HTMLInputElement>(null)
  const [residenceSizeError, setResidenceSizeError] = useState<string | null>(null)

  useEffectOnce(() => {
    sendMovecleanPageVisitIntercomEvent()
  })

  const onSubmit = async () => {
    setIsLoading(true)
    trigger()
    try {
      const movecleanOrder = {
        type: 'moveclean',
        supplierId: selectedProvider?.id ?? '',
        supplierName: selectedProvider?.name ?? '',
        seenHourlyPrices: false,
        isQuotation: false,
        fromResidence: {
          size: parseInt(fromResidenceSize ? fromResidenceSize.toString() : '0', 10),
          sizeOfAdditionalSpace: parseInt(fromAddress?.additionalSpace ? fromAddress?.additionalSpace?.toString() : '0', 10),
        },
        toResidence: {
          size: parseInt(currentMove?.residenceSize ? currentMove?.residenceSize.toString() : '0', 10),
          residenceType: currentMove?.residenceType ?? undefined,
        },
        moveclean: {
          deliveryDate: currentDatePicked ? formatDate(currentDatePicked, 'yyyy-MM-dd') : new Date().toISOString(),
          service: MoveServiceOrder.CLEANING,
        },
        emailAndPhone: !!getValues('email')?.length || !!getValues('phone')?.length ? { email: getValues('email'), phone: getValues('phone') } : undefined,
        meta: {
          wantsHandyman: false,
          wantsStorage: false,
          wantsDisposal: false,
          wantsPackaging: false,
          heavyLifting: false,
        },
      }

      const response = await orderMoveclean(movecleanOrder)
      if (response?.length) {
        setCurrentStep(3)
        setIsLoading(false)
      } else {
        setIsLoading(false)
        setCurrentStep(1)
        setError(ORDER_ERROR)
      }
    } catch (e: unknown) {
      setIsLoading(false)
      setCurrentStep(1)
      setError(ORDER_ERROR)
    }
  }

  useEffect(() => {
    if (!isLoading) {
      window.dataLayer?.push({})
      ReactGA4.event('entered_product_flow')
    }
  }, [isLoading, trackEvent])

  useEffect(() => {
    if (themeQuery === ThemeEnum.FASTIGHETSBYRAN) {
      setNewTheme(ThemeEnum.FASTIGHETSBYRAN)
    }
    const timer = setTimeout(() => {
      setHasCheckedTheme(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [themeQuery, setNewTheme])

  if (isLoading || !hasCheckedTheme || !hasSetTheme)
    return (
      <div className={clsx(spinnerBgWrapperVariants())}>
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

  if (currentStep === 3 && !!orderData) return <Step3Confirmation bookedOrder={orderData} />

  const movecleanSkipped = !!skippedActivities.find((item) => item.type === MoveService.MOVECLEAN)

  return (
    <div className={clsx(wrapperVariants())}>
      {movecleanSkipped ? (
        <ServiceAlreadyBooked />
      ) : (
        <div className={clsx(contentContainerVariants())}>
          <div style={{ width: '100%', height: '100%' }}>
            {theme !== ThemeEnum.FASTIGHETSBYRAN && (
              <GoBackTopWrapper variant="secondaryLight">
                <GoBackToTopInnerWrapper>
                  <BackToMovepageButton />
                </GoBackToTopInnerWrapper>
              </GoBackTopWrapper>
            )}
            {(currentStep === 1 || currentStep === 2) && (
              <TopSection
                residenceSizeError={residenceSizeError}
                setResidenceSizeError={setResidenceSizeError}
                pickedDate={currentDatePicked}
                setPickedDate={setCurrentDatePicked}
                ref={residenceSizeRef}
                isStepTwo={currentStep === 2}
              />
            )}
            {currentStep === 1 && (
              <Step1ServicesAndPrices
                onResidenceSizeError={() => {
                  setResidenceSizeError(t('error:INFOMISSING.residenceSize'))
                  residenceSizeRef.current?.focus()
                }}
                currentDatePicked={currentDatePicked ?? new Date()}
                setCurrentStep={setCurrentStep}
              />
            )}
            {currentStep === 2 && (
              <Step2SummaryAndOrder
                currentDatePicked={currentDatePicked ?? new Date()}
                setCurrentStep={setCurrentStep}
                shouldShowEmailPhoneForm={shouldShowEmailPhoneForm}
                emailPhoneForm={emailPhoneForm}
                setCurrentDatePicked={setCurrentDatePicked}
                submitOrder={onSubmit}
              />
            )}
          </div>
          <div className={clsx(accordianWrapperVariants())}>
            <Accordion type="single" collapsible className={`${isTabletPortraitOrGreater ? 'mt-8' : 'mt-0'} min-w-full`}>
              {FAQ.map(({ question, answer }, index) => (
                <AccordionItem key={`faq-${index}`} value={`faq-${index}`} style={{ minWidth: '100%' }}>
                  <div className={clsx(accordionButtonWrapperVariants())}>
                    <AccordionTrigger className="!py-8 text-left !px-3 md:!p-8">{question}</AccordionTrigger>
                  </div>
                  <div className={clsx(accordionContentWrapperVariants())}>
                    <AccordionContent noPadding>
                      {index === 0 ? (
                        <Flex style={{ padding: isTabletPortraitOrGreater ? '0' : '0 16px 16px' }} direction={isTabletPortraitOrGreater ? 'row' : 'column'}>
                          {isTabletPortraitOrGreater && (
                            <>
                              <span className={clsx(imageWrapperVariants())} style={{ backgroundImage: `url(${Andreas.src})` }} />
                              <Flex direction="column" style={{ gap: 16 }}>
                                <span style={{ padding: '0 32px 0 24px', lineHeight: '120%' }}>{answer}</span>

                                <div className={clsx(buttonWrapperVariants())}>
                                  <Button onClick={() => show()} fontSize={15} padding="8px 32px !important" text={t('helpFromMoveCoordinator')} variant="outline" />
                                </div>
                              </Flex>
                            </>
                          )}
                          {!isTabletPortraitOrGreater && (
                            <>
                              <Flex>
                                <span className={clsx(imageWrapperVariants())} style={{ backgroundImage: `url(${Andreas.src})` }} />
                                <Flex direction="column" style={{ gap: 16 }}>
                                  <span style={{ padding: '0 0 0 24px', lineHeight: '120%' }}>{answer}</span>
                                </Flex>
                              </Flex>
                              <div className={clsx(buttonWrapperVariants())}>
                                <Button onClick={() => show()} fontSize={15} padding="8px 32px !important" text={t('helpFromMoveCoordinator')} variant="outline" />
                              </div>
                            </>
                          )}
                        </Flex>
                      ) : index === 1 ? (
                        <Flex style={{ gap: 12, padding: isTabletPortraitOrGreater ? '0 0 24px 32px' : '0 16px 16px' }} direction="column">
                          <Flex style={{ gap: 8 }} alignItems="center">
                            <div style={{ width: 32 }}>
                              <CleaingIcon />
                            </div>
                            <Text style={{ fontSize: 'var(--fs-fontSizes-5)' }} spacing="none">
                              {t('MOVESUMMARY.cleaningItem1')}
                            </Text>
                          </Flex>
                          <Flex style={{ gap: 8 }} alignItems="center">
                            <div style={{ width: 32 }}>
                              <Kitchen />
                            </div>
                            <Text style={{ fontSize: 'var(--fs-fontSizes-5)' }} spacing="none">
                              {t('MOVESUMMARY.cleaningItem2')}
                            </Text>
                          </Flex>
                          <Flex style={{ gap: 8 }} alignItems="center">
                            <div style={{ width: 32 }}>
                              <Tiles />
                            </div>
                            <Text style={{ fontSize: 'var(--fs-fontSizes-5)' }} spacing="none">
                              {t('MOVESUMMARY.cleaningItem3')}
                            </Text>
                          </Flex>
                          <span>
                            {answer}
                            {
                              <a
                                rel="noreferrer noopener"
                                target="_blank"
                                style={{ textDecoration: 'unset', marginLeft: 4 }}
                                className="!font-bold"
                                href="https://help.flyttsmart.se/sv/articles/5226636-vad-ingar-i-flyttstadningen"
                              >
                                {t('MOVESUMMARY.answer2LinkText')}
                              </a>
                            }
                          </span>
                        </Flex>
                      ) : (
                        <Flex style={{ gap: 12, padding: isTabletPortraitOrGreater ? '0 0 24px 32px' : '0 16px 16px' }} direction="column">
                          {answer}
                          <ul className="list-disc pl-10">
                            <li>{t('MOVESUMMARY.answer3ListItem1')}</li>
                            <li>{t('MOVESUMMARY.answer3ListItem2')}</li>
                            <li>{t('MOVESUMMARY.answer3ListItem3')}</li>
                            <li>{t('MOVESUMMARY.answer3ListItem4')}</li>
                          </ul>
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

export default Moveclean
