import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'next/navigation'
import { useLeadContext } from '@/common/context/lead/LeadProvider'
import useResponsive from '@/common/hooks/useResponsive'
import TrustedLoadingState from '@/components/molecules/TrustedLoadingState'
import OnboardingDataSection from './OnboardingDataSection'

export interface NoBankIdProps {
  code: string
}

export const NoBankIdUserTemplate = ({ code }: NoBankIdProps) => {
  const { t } = useTranslation(['signup'])
  const { isTabletPortraitOrGreater } = useResponsive()
  const {
    lead: { leadDetails, partnerDetails, hasFetchedData },
    setInvitationCode,
    setChannel,
    isLoadingCreateUser,
  } = useLeadContext()

  useEffect(() => {
    if (!!code) setInvitationCode(code)
  }, [code, setInvitationCode])

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showDataSection, setShowDataSection] = useState<boolean>(false)
  const [inviterLogoUrl, setInviterLogoUrl] = useState<string>('')
  const channelQuery = useSearchParams().get('channel')

  useEffect(() => {
    if (hasFetchedData) {
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setShowDataSection(true)
      }, 2000)
    }
  }, [hasFetchedData])

  useEffect(() => {
    if (!!channelQuery) {
      setChannel(channelQuery as string)
    }
  }, [channelQuery, setChannel])

  useEffect(() => {
    if (!inviterLogoUrl?.length && code) {
      setInviterLogoUrl(leadDetails.brokerAgencyLogo || '')
    }
  }, [inviterLogoUrl, leadDetails, partnerDetails, code])

  useEffect(() => {
    if (!isTabletPortraitOrGreater && typeof window !== 'undefined' && showDataSection) {
      const intercomApp = document.querySelector('.intercom-lightweight-app')
      intercomApp?.setAttribute('style', 'display: none')
    }
  }, [isTabletPortraitOrGreater, showDataSection])

  return (
    <>
      {!showDataSection && (
        <TrustedLoadingState
          brokerOfficeName={leadDetails?.brokerOfficeName}
          brokerAgencyLogo={inviterLogoUrl || leadDetails?.brokerAgencyLogo}
        />
      )}
      {showDataSection && <OnboardingDataSection code={code} setShowDataSection={setShowDataSection} />}
    </>
  )
}

export default NoBankIdUserTemplate
