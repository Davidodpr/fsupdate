'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useEffectOnce } from 'react-use'
import { useIntercom } from 'react-use-intercom'
import { useSearchParams } from 'next/navigation'
import Andreas from 'public/images/Andreas.png'
import { incrementMoveservicePageVisitIntercomEvent } from '@/common/api/getUser'
import { useChecklistContext } from '@/common/context/checklist/checklistContext.provider'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { MoveService } from '@/common/enums/MoveServicesEnum'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import useResponsive from '@/common/hooks/useResponsive'
import { ActivityEnum } from '@/common/types/activity'
import BackToMovepageButton, { GoBackTopWrapper, GoBackToTopInnerWrapper } from '@/components/atoms/BackToMovepageButton'
import Button from '@/components/atoms/Button'
import Flex from '@/components/atoms/Flex'
import Spinner, { SpinnerWrapper } from '@/components/atoms/Spinner'
import Text from '@/components/atoms/Text'
import { Accordion, AccordionTrigger, AccordionItem, AccordionContent } from '@/components/molecules/Accordion'
import ServiceAlreadyBooked from '@/components/molecules/ServiceAlreadyBooked'
import HowItWorks from '@/public/images/HowItWorksQuotes.svg'
import { GoogleReviewCountAndRating } from '../../app/_actions/googleReviews'
import TopSection from './Components/TopSection/TopSection'
import GetQuotationStart from './GetQuotationStart/GetQuotationStart'
import {
  spinnerBgWrapperVariants,
  wrapperVariants,
  contentContainerVariants,
  accordianWrapperVariants,
  accordionButtonWrapperVariants,
  accordionContentWrapperVariants,
  imageWrapperVariants,
  buttonWrapperVariants,
} from './Movehelp.variants'


interface MovehelpTemplateProps {
  flyttsmartGoogleReviewCountAndRating: GoogleReviewCountAndRating
}

export const MovehelpTemplate = ({ flyttsmartGoogleReviewCountAndRating }: MovehelpTemplateProps) => {
  const { t } = useTranslation(['movehelp', 'common', 'error'])
  const { setNewTheme, hasSetTheme, theme } = useThemeContext()
  const [hasCheckedTheme, setHasCheckedTheme] = useState(false)
  const { skippedActivities } = useChecklistContext()
  const themeQuery = useSearchParams().get('theme')
  const { isTabletPortraitOrGreater } = useResponsive()

  const { show } = useIntercom()

  useEffectOnce(() => {
    incrementMoveservicePageVisitIntercomEvent({ service: ActivityEnum.MOVEHELP })
  })

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
      question: t('MOVESUMMARY.howItWorks'),
      answer: t('MOVESUMMARY.howItWorksAnswer1'),
    },
    {
      question: t('MOVESUMMARY.question1'),
      answer: t('MOVESUMMARY.answer1'),
    },
    {
      question: t('MOVESUMMARY.question2'),
      answer: t('MOVESUMMARY.answer2_section1'),
    },
    {
      question: t('MOVESUMMARY.question3'),
      answer: t('MOVESUMMARY.answer3'),
    },
  ]

  const movehelpSkipped = !!skippedActivities.find((item) => item.type === MoveService.MOVEHELP)

  return (
    <div className={wrapperVariants()}>
      {movehelpSkipped ? (
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
            <TopSection flyttsmartGoogleReviewCountAndRating={flyttsmartGoogleReviewCountAndRating} />
            <GetQuotationStart />
          </div>
          <div className={accordianWrapperVariants()}>
            <Accordion defaultValue="faq-0" type="single" collapsible className={`${isTabletPortraitOrGreater ? 'mt-4' : 'mt-0'} min-w-full`}>
              {FAQ.map(({ question, answer }, index) => (
                <AccordionItem key={`faq-${index}`} value={`faq-${index}`} style={{ minWidth: '100%' }}>
                  <div className={accordionButtonWrapperVariants()}>
                    <AccordionTrigger>{question}</AccordionTrigger>
                  </div>
                  <div className={accordionContentWrapperVariants()}>
                    <AccordionContent noPadding>
                      {index === 0 ? (
                        <Flex justifyContent="center" alignItems="center" direction={isTabletPortraitOrGreater ? 'row' : 'column-reverse'} style={{ width: '100%', gap: 24 }}>
                          <Flex style={{ gap: 12, padding: isTabletPortraitOrGreater ? '0 0 24px 32px' : '0 16px 16px' }} direction="column">
                            {answer}
                            <Text style={{ fontSize: '16px', lineHeight: '120%', letterSpacing: '0.32' }}>{t('MOVESUMMARY.howItWorksAnswer2')}</Text>
                          </Flex>
                          <Flex style={{ paddingBottom: 24, paddingRight: 32 }}>
                            <HowItWorks />
                          </Flex>
                        </Flex>
                      ) : index === 1 ? (
                        <Flex style={{ padding: isTabletPortraitOrGreater ? '0' : '0 16px 16px' }} direction={isTabletPortraitOrGreater ? 'row' : 'column'}>
                          {isTabletPortraitOrGreater && (
                            <>
                              <span className={imageWrapperVariants()} style={{ backgroundImage: `url(${Andreas.src})` }} />
                              <Flex direction="column" style={{ gap: 16 }}>
                                <span style={{ padding: '0 32px 0 24px', lineHeight: '120%' }}>{answer}</span>

                                <div className={buttonWrapperVariants()}>
                                  <Button onClick={() => show()} fontSize={15} padding="8px 32px !important" text={t('helpFromMoveCoordinator')} variant="outline" />
                                </div>
                              </Flex>
                            </>
                          )}
                          {!isTabletPortraitOrGreater && (
                            <>
                              <Flex>
                                <span className={imageWrapperVariants()} style={{ backgroundImage: `url(${Andreas.src})` }} />
                                <Flex direction="column" style={{ gap: 16 }}>
                                  <span style={{ padding: '0 0 0 24px', lineHeight: '120%' }}>{answer}</span>
                                </Flex>
                              </Flex>
                              <div className={buttonWrapperVariants()}>
                                <Button onClick={() => show()} fontSize={15} padding="8px 32px" text={t('helpFromMoveCoordinator')} variant="outline" />
                              </div>
                            </>
                          )}
                        </Flex>
                      ) : index === 2 ? (
                        <Flex style={{ gap: 12, padding: isTabletPortraitOrGreater ? '0 0 24px 32px' : '0 16px 16px' }} direction="column">
                          {answer}
                          <Text>{t('MOVESUMMARY.answer2_section2')}</Text>
                          <ul className="list-disc pl-8">
                            <li>{t('MOVESUMMARY.movingItem1')}</li>
                            <li>{t('MOVESUMMARY.movingItem2')}</li>
                            <li>{t('MOVESUMMARY.movingItem3')}</li>
                            <li>{t('MOVESUMMARY.movingItem4')}</li>
                            <li>{t('MOVESUMMARY.movingItem5')}</li>
                          </ul>
                        </Flex>
                      ) : (
                        <Flex style={{ gap: 12, padding: isTabletPortraitOrGreater ? '0 0 24px 32px' : '0 16px 16px' }} direction="column">
                          {answer}
                          <ul className="list-disc pl-8">
                            <li>{t('MOVESUMMARY.answer3ListItem1')}</li>
                            <li>{t('MOVESUMMARY.answer3ListItem2')}</li>
                            <li>{t('MOVESUMMARY.answer3ListItem3')}</li>
                            <li>{t('MOVESUMMARY.answer3ListItem4')}</li>
                            <li>{t('MOVESUMMARY.answer3ListItem5')}</li>
                            <li>{t('MOVESUMMARY.answer3ListItem6')}</li>
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

export default MovehelpTemplate
