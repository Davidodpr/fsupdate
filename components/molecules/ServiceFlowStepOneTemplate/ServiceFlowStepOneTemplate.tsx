import React from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/legacy/image'
import { useRouter, usePathname } from 'next/navigation'
import useResponsive from '@/common/hooks/useResponsive'
import { ActivityEnum } from '@/common/types/activity'
import ArrowForward from '@/components/atoms/ArrowForward'
import Button from '@/components/atoms/Button'
import Flex from '@/components/atoms/Flex'
import Text from '@/components/atoms/Text'
import ServiceFlowStepOneCustomSection from './ServiceFlowStepOneCustomSection'
import {
  textSectionVariants,
  buttonsWrapperVariants,
  imageWrapperVariants,
  largeButtonWrapperVariants,
  goBackButtonVariants,
  serviceFlowStepOneTemplateWrapperVariants,
  innerWrapperVariants,
} from './ServiceFlowStepOneTemplate.variants'

export interface ServiceFlowStepOneTemplateProps {
  textSectionType: ActivityEnum.POWER | ActivityEnum.INTERNET | ActivityEnum.INSURANCE
  iconLink: string
  imageUrl?: string
  withoutBackButton?: boolean
}

const ServiceFlowStepOneTemplate = ({ imageUrl, textSectionType, withoutBackButton, iconLink }: ServiceFlowStepOneTemplateProps) => {
  const { isTabletPortraitOrGreater } = useResponsive()
  const pathname = usePathname()
  const { push } = useRouter()
  const { t } = useTranslation(['common'])
  return (
    <div className={serviceFlowStepOneTemplateWrapperVariants()} data-testid="service-flow-step-one-template-container">
      <div className={innerWrapperVariants()}>
        {isTabletPortraitOrGreater && imageUrl && (
          <div className={imageWrapperVariants()}>
            <Image src={imageUrl} alt="" width={isTabletPortraitOrGreater ? 190 : 30} height={isTabletPortraitOrGreater ? 190 : 30} />
          </div>
        )}
        <ServiceFlowStepOneCustomSection variant={textSectionType} />
        <Flex className={textSectionVariants()} justifyContent="start">
          {isTabletPortraitOrGreater && (
            <Text style={{ paddingRight: 20 }} spacing="none">
              {iconLink}
            </Text>
          )}
          <Text variant="largeBlack" spacing="none">
            {t('common:questionsChat')}
          </Text>
        </Flex>
        <Flex className={buttonsWrapperVariants({ withoutBackButton })} justifyContent="space-between" alignItems="center">
          {!withoutBackButton && (
            <div className={goBackButtonVariants()} onClick={() => push('/app/movepage')}>
              {<Text variant="linkBig">{t('common:goBack')}</Text>}
            </div>
          )}
          <div className={largeButtonWrapperVariants()}>
            <Button
              iconRight={<ArrowForward color="#ffffff" />}
              text={t('common:toSuggestion')}
              onClick={() => {
                push(`${pathname}?step=2`)
              }}
            />
          </div>
        </Flex>
      </div>
    </div>
  )
}

export default ServiceFlowStepOneTemplate
