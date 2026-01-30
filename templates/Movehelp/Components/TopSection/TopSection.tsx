import { useTranslation } from 'react-i18next'
import { GoogleReviewCountAndRating } from 'app/_actions/googleReviews'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import useResponsive from '@/common/hooks/useResponsive'
import Flex from '@/components/atoms/Flex'
import Text from '@/components/atoms/Text'
import StarLarge from '@/public/images/StarLarge.svg'
import { styledHeaderVariants, styledIntroSectionTitleVariants, topSectionWrapperVariants, headerUspWrapperVariants } from './TopSection.variants'

interface TopSectionProps {
  flyttsmartGoogleReviewCountAndRating: GoogleReviewCountAndRating
}

export const TopSection = ({ flyttsmartGoogleReviewCountAndRating }: TopSectionProps) => {
  const { t } = useTranslation(['movehelp', 'common'])
  const { theme } = useThemeContext()
  const { isTabletPortraitOrGreater } = useResponsive()

  return (
    <div className={topSectionWrapperVariants()}>
      <Flex direction="column" justifyContent="space-between" alignItems={isTabletPortraitOrGreater ? 'start' : 'center'} style={{ maxWidth: '100%', width: 748 }}>
        <h1 className={styledHeaderVariants({ isSecondaryFont: theme === ThemeEnum.FASTIGHETSBYRAN })}>{t('pageTitle')}</h1>
        <Text className={styledIntroSectionTitleVariants()} spacing="none">
          {t('topSectionSubTitle')}
        </Text>
        <Flex
          direction={isTabletPortraitOrGreater ? 'row' : 'column'}
          style={{ gap: isTabletPortraitOrGreater ? 8 : 16, width: isTabletPortraitOrGreater ? '100%' : '90%', marginTop: 32 }}
        >
          <div className={headerUspWrapperVariants()}>
            <Flex justifyContent="center" style={{ height: 29, marginBottom: 4 }} alignItems="center">
              {flyttsmartGoogleReviewCountAndRating.rating && (
                <Text style={{ fontSize: 24, fontWeight: 'bold', margin: '0px 4px 0px 0px', lineHeight: '23px' }}>{flyttsmartGoogleReviewCountAndRating.rating}</Text>
              )}
              <StarLarge style={{ marginRight: 2 }} />
              <StarLarge style={{ marginRight: 2 }} />
              <StarLarge style={{ marginRight: 2 }} />
              <StarLarge style={{ marginRight: 2 }} />
              <StarLarge />
            </Flex>
            <Text style={{ fontSize: 16 }} spacing="none">
              {flyttsmartGoogleReviewCountAndRating.reviewCount}
              {t('reviewsOnGoogle')}
            </Text>
          </div>
          <div className={headerUspWrapperVariants()}>
            <Text style={{ fontWeight: 'bold', fontSize: 24, margin: '0px 0px 4px', lineHeight: 'normal' }}>{t('amountOfMovers')}</Text>
            <Text style={{ fontSize: 16 }} spacing="none">
              {t('hasGottenHelpFromUs')}
            </Text>
          </div>
          <div className={headerUspWrapperVariants()}>
            <Text style={{ fontWeight: 'bold', fontSize: 24, margin: '0px 0px 4px', lineHeight: 'normal' }}>{t('amountOfSuppliers')}</Text>
            <Text style={{ fontSize: 16 }} spacing="none">
              {t('inOurNetwork')}
            </Text>
          </div>
        </Flex>
      </Flex>
    </div>
  )
}

export default TopSection
