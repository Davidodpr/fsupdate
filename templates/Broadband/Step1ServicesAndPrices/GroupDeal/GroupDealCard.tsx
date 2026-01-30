import React from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import useResponsive from '@/common/hooks/useResponsive'
import Flex from '@/components/atoms/Flex'
import H3 from '@/components/atoms/H3'
import ImageKit from '@/components/atoms/ImageKit'
import Text from '@/components/atoms/Text'
import { groupDealCardWrapperVariants, groupDealBannerVariants, groupDeadTitleVariants } from './DealCard.variants'

export interface GroupDealCardProps {
  groupDealComapanyLogo: string
}

const GroupDealCard = ({ groupDealComapanyLogo }: GroupDealCardProps) => {
  const { isTabletPortraitOrGreater } = useResponsive()
  const { t } = useTranslation(['broadband', 'common'])
  const { iconSet } = useThemeContext()

  return (
    <div className={groupDealCardWrapperVariants()}>
      <div className={groupDeadTitleVariants()}>
        <Flex direction="row" justifyContent="space-between" alignItems="center">
          <ImageKit src={`/Products/Broadband/${groupDealComapanyLogo}.svg`} width="100" height="75" />
          <H3 style={{ fontFamily: 'Gilroy' }}>{t('STEPTWO.GROUPDEAL.discountTitle')}</H3>
        </Flex>
      </div>
      <Flex direction={isTabletPortraitOrGreater ? 'row' : 'column'} justifyContent="space-between" alignItems={isTabletPortraitOrGreater ? 'start' : 'center'}>
        <div className={groupDealBannerVariants()}>
          <Text variant="mediumBold" spacing="none">
            {t('STEPTWO.GROUPDEAL.youHaveAGroupDeal')}
          </Text>
        </div>
      </Flex>

      <Flex direction="row" justifyContent="space-between" alignItems="center" style={{ padding: isTabletPortraitOrGreater ? 32 : 16 }}>
        <div>
          <Text variant="medium" spacing="none" style={{ width: isTabletPortraitOrGreater ? '75%' : '100%' }}>
            {t('STEPTWO.GROUPDEAL.infoTextOne')}
          </Text>
          <Text variant="medium" spacing="top" style={{ width: isTabletPortraitOrGreater ? '75%' : '100%' }}>
            {t('STEPTWO.GROUPDEAL.infoTextTwo')}
          </Text>
        </div>
        {isTabletPortraitOrGreater && iconSet.BROADBAND_GROUP_DEAL && <Image src={iconSet.BROADBAND_GROUP_DEAL} alt="gruppavtal" width="205" height="150" />}
      </Flex>
    </div>
  )
}

export default GroupDealCard
