import { useTranslation } from 'react-i18next'
import Image from 'next/legacy/image'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import useResponsive from '@/common/hooks/useResponsive'
import Box from '@/components/atoms/Box'
import FortumLogoIcon from '@/components/atoms/FortumIcon'
import ImageKit from '@/components/atoms/ImageKit'
import Text from '@/components/atoms/Text'
import AddressAndDate from './AddressAndDate'
import {
  brokerImageWrapperVariants,
  containerVariants,
  fortumLogoWrapperVariants,
  partnerContainerVariants,
  poweredByVariants,
  topSectionWrapperVariants,
} from './TopSection.variants'

const TopSection = () => {
  const { isTabletPortraitOrGreater } = useResponsive()
  const userData = useUserContext()
  const { t } = useTranslation(['header', 'common'])

  const {
    user: {
      profile: { leadDetails, partnerDetails },
    },
  } = userData
  const { theme } = useThemeContext()

  const inviterName = leadDetails?.brokerOfficeName ?? partnerDetails?.partnerName ?? ''
  const inviterAgentName = leadDetails?.brokerOfficePersonName ?? partnerDetails?.agentName ?? ''
  const inviterDisplayName = inviterAgentName && inviterAgentName.length > 0 ? `${inviterAgentName}, ${inviterName}` : inviterName

  return (
    <div className={`${containerVariants()} ${theme}`}>
      <div className={`${fortumLogoWrapperVariants()} ${theme}`}>
        <ImageKit src={t('fortumLogo')} height={54} width={220} />
        <div className={poweredByVariants()}>
          <div>{t('poweredBy')}</div>
          <ImageKit src={t('common:logo')} height={28} width={156} />
        </div>
      </div>
      <div className={topSectionWrapperVariants()} data-testid="top-section-container">
        <AddressAndDate hasPartner={!!(inviterName && isTabletPortraitOrGreater)} />
        {inviterName && isTabletPortraitOrGreater && (
          <Box className={partnerContainerVariants()}>
            <Text spacing="none" variant="button" textAlign="center" className="invitedByText !m-0 py-1">
              {t('common:invitedBy')}
            </Text>
            {leadDetails?.brokerAgencyLogo ? (
              <div className={brokerImageWrapperVariants()}>
                <Image src={leadDetails.brokerAgencyLogo || ''} objectFit="contain" width="124" height="26" alt={`Logo of broker office ${leadDetails.brokerOfficeName}`} />
              </div>
            ) : (
              <div className={`${brokerImageWrapperVariants()} ${theme}`}>
                <FortumLogoIcon height={26} width={124} color="var(--fs-colors-primaryMain)" />
              </div>
            )}
            {inviterDisplayName ? (
              <Text spacing="none" variant="body" textAlign="center" className="text-white text-sm px-1 !font-bold">
                {inviterDisplayName}
              </Text>
            ) : (
              <Text spacing="none" variant="body" textAlign="center" className="text-white text-sm px-1 !font-bold">
                Fortum
              </Text>
            )}
          </Box>
        )}
      </div>
    </div>
  )
}

export default TopSection
