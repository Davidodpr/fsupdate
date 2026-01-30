'use client'

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import TopNav from 'app/_components/topNav/index'
import Error from 'next'
import { ErrorPage } from '@/components/molecules/ErrorPage'
import * as Sentry from '@sentry/nextjs'
import StyledFlex from './_components/StyledLayoutFlex'


export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset(): void }) {
  const { t } = useTranslation(['error'])
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html>
      <body>
        <StyledFlex>
          <TopNav isServerMobile={false} />
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
        </StyledFlex>
      </body>
    </html>
  )
}
