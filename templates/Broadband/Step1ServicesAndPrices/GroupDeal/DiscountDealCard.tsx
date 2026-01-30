import React from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import useResponsive from '@/common/hooks/useResponsive'
import { capitalizeFirstLetter } from '@/common/utils/text'
import Flex from '@/components/atoms/Flex'
import H3 from '@/components/atoms/H3'
import ImageKit from '@/components/atoms/ImageKit'
import Text from '@/components/atoms/Text'
import { groupDealCardWrapperVariants, groupDeadTitleVariants } from './DealCard.variants'

export interface DiscountDealCardProps {
  groupDealComapanyLogo: string
}

const DiscountDealCard = ({ groupDealComapanyLogo }: DiscountDealCardProps) => {
  const { isTabletPortraitOrGreater } = useResponsive()
  const { t } = useTranslation(['broadband', 'common'])
  const { iconSet } = useThemeContext()

  return (
    <div className={groupDealCardWrapperVariants()}>
      <div className={groupDeadTitleVariants()}>
        <Flex direction="row" justifyContent="space-between" alignItems="center">
          <ImageKit src={`/Products/Broadband/${groupDealComapanyLogo}.svg`} width="100" height="75" />
          <H3 style={{ fontFamily: 'Gilroy' }}>{t('STEPTWO.DISCOUNTDEAL.discountTitle')}</H3>
        </Flex>
      </div>

      <Flex direction="row" justifyContent="space-between" alignItems="start" style={{ padding: isTabletPortraitOrGreater ? '24px 32px' : '16px 24px 32px' }}>
        <div>
          <Text variant="bodyBold" spacing="none" style={{ width: isTabletPortraitOrGreater ? '75%' : '100%' }}>
            {t('STEPTWO.DISCOUNTDEAL.infoTextOne', { provider: capitalizeFirstLetter(groupDealComapanyLogo) })}
          </Text>
          <Text variant="bodyBold" spacing="top" style={{ width: isTabletPortraitOrGreater ? '75%' : '100%' }}>
            {t('STEPTWO.DISCOUNTDEAL.infoTextTwo', { provider: capitalizeFirstLetter(groupDealComapanyLogo) })}
          </Text>
        </div>
        {isTabletPortraitOrGreater && iconSet.BROADBAND_GROUP_DEAL && <Image src={iconSet.BROADBAND_GROUP_DEAL} alt="gruppavtal" width="205" height="150" />}
      </Flex>
    </div>
  )
}

export default DiscountDealCard
