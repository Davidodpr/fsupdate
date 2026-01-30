'use client'

import { useTranslation } from 'react-i18next'
import Button from '@/components/atoms/Button/Button'
import LoadingOverlay from '@/components/molecules/LoadingOverlay'
import LogoHeader from '@/components/molecules/LogoHeader'
import {
  containerVariants,
  contentVariants,
  titleVariants,
  descriptionVariants,
  mainSectionVariants,
  errorContainerVariants,
  errorTextVariants,
  footerVariants,
  footerTextVariants,
  rulesSectionVariants,
  rulesTitleVariants,
  rulesContentVariants,
  contactSectionVariants,
  contactTitleVariants,
  contactTextVariants,
} from './Maklarhuset.variants'
import { LeaderboardTable } from './components/LeaderboardTable'
import { PodiumDisplay } from './components/PodiumDisplay'
import { useLeaderboardData } from './hooks/useLeaderboardData'

// Number of top brokers to display in the podium
const PODIUM_SIZE = 3

export const MaklarhusetTemplate = () => {
  const { t } = useTranslation('maklarhuset')

  const { brokers, loading, error, refetch } = useLeaderboardData()

  const handleRetry = () => {
    refetch()
  }

  return (
    <div className={containerVariants()}>
      <LoadingOverlay
        isVisible={loading}
        title={t('leaderboard.loading')}
        subtitle={t('footer.refreshAutomatically')}
        aria-label={t('leaderboard.loading')}
        spinnerColor="green"
        spinnerScale={2}
      />

      <div className={contentVariants()}>
        <LogoHeader logoSrc="/images/mh-logo-black.svg" logoAlt="Mäklarhuset" secondaryLogoSrc="/images/Logo.svg" secondaryLogoAlt="Flyttsmart" showDivider={true} />

        <h1 className={titleVariants()}>{t('title')}</h1>
        <div className={descriptionVariants()} dangerouslySetInnerHTML={{ __html: t('description') }} />

        {error && !loading && (
          <div className={errorContainerVariants()}>
            <p className={errorTextVariants()}>{t('leaderboard.error')}</p>
            <Button variant="primary" text={t('leaderboard.retry')} onClick={handleRetry} padding="12px 32px" withMaxContentWidth />
          </div>
        )}

        <div className={mainSectionVariants()}>
          {brokers.length > 0 && <PodiumDisplay brokers={brokers.slice(0, PODIUM_SIZE)} />}
          <LeaderboardTable brokers={brokers.slice(PODIUM_SIZE)} loading={loading} />
        </div>

        <div className={footerVariants()}>
          <p className={footerTextVariants()}>{t('footer.refreshAutomatically')}</p>
        </div>

        <section className={rulesSectionVariants()}>
          <h2 className={rulesTitleVariants()}>{t('rules.title')}</h2>
          <div className={rulesContentVariants()} dangerouslySetInnerHTML={{ __html: t('rules.content') }} />
        </section>

        <section className={contactSectionVariants()}>
          <h3 className={contactTitleVariants()}>{t('contact.title')}</h3>
          <p className={contactTextVariants()}>
            <a className="!hover:underline" href="mailto:Sebastian@flyttsmart.se">
              Sebastian@flyttsmart.se
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
