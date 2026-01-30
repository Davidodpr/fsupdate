'use client'

import React, { lazy } from 'react'
import { Suspense } from 'react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Metadata } from 'next'
import StyledFlex from '@/appComponents/StyledLayoutFlex'
import Spinner, { SpinnerWrapper } from '@/components/atoms/Spinner'
import { ErrorPage } from '@/components/molecules/ErrorPage'
import * as Sentry from '@sentry/nextjs'
import { PageLayoutClient } from './_components/PageLayoutClient'


const PageLayoutClientHeader = lazy(() => import('./_components/PageLayoutClientHeader'))

export const metadata: Metadata = {
  title: 'Flyttsmart | Error',
}

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset(): void }) {
  const { t } = useTranslation(['error'])

  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <StyledFlex>
      <Suspense
        fallback={
          <SpinnerWrapper>
            <Spinner scale={2} color="green" />
          </SpinnerWrapper>
        }
      >
        <PageLayoutClientHeader />
      </Suspense>
      <PageLayoutClient>
        {
          <div style={{ marginTop: '30px' }}>
            <ErrorPage
              title={t('generalErrorHeader')}
              reset={reset}
              subTitleOne={t('generalErrorSubtitle')}
              subTitleTwo={t('generalErrorSubtitleTwo')}
              withTryAgainButton
              withRouterReload
            />
          </div>
        }
      </PageLayoutClient>
    </StyledFlex>
  )
}
