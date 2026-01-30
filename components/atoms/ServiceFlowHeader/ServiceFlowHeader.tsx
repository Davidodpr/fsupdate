import React from 'react'
import Image from 'next/legacy/image'
import useResponsive from '@/common/hooks/useResponsive'
import BackToMovepageButton from '../BackToMovepageButton'
import Text from '../Text'
import { serviceFlowHeaderWrapperVariants, headerTextVariants, innerWrapperVariants } from './ServiceFlowHeader.variants'

export interface ServiceFlowHeaderProps {
  imageUrl?: string
  text: string
  isExternalModule?: boolean
}

const ServiceFlowHeader = ({ imageUrl, text, isExternalModule }: ServiceFlowHeaderProps) => {
  const { isTabletPortraitOrGreater } = useResponsive()

  return (
    <div className={serviceFlowHeaderWrapperVariants()} data-testid="service-flow-header-container">
      {!isExternalModule && <BackToMovepageButton />}
      <div className={innerWrapperVariants()}>
        {imageUrl && <Image src={imageUrl} alt={text} width={isTabletPortraitOrGreater ? 40 : 30} height={isTabletPortraitOrGreater ? 40 : 30} />}
        <Text className={`${headerTextVariants()}`}>{text}</Text>
      </div>
    </div>
  )
}

export default ServiceFlowHeader
