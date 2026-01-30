import React, { ReactNode, lazy } from 'react'
import { Suspense } from 'react'
import { fetchGoogleReviewCountAndRating, fetchReviews } from 'app/_actions/googleReviews'
import initTranslations from 'i18n'
import { Metadata } from 'next'
import TranslationsProvider from 'providers/TranslationProvider'
import StyledFlex from '@/appComponents/StyledLayoutFlex'
import getI18nNamespaces from 'app/_components/getI18nNamespaces'
import Spinner, { SpinnerWrapper } from '@/components/atoms/Spinner'
import { PageLayoutClient } from '../_components/PageLayoutClient'

const PageLayoutClientHeader = lazy(() => import('../_components/PageLayoutClientHeader'))

interface Props {
  children: ReactNode
  params: Promise<{
    locale: string
  }>
}

export const metadata: Metadata = {
  title: 'Flyttsmart | Fix & Renovering',
}

const i18nNamespaces = getI18nNamespaces('fixarenovera')

export default async function layout(props: Props) {
  const params = await props.params
  const { locale } = params
  const { children } = props

  const { resources } = await initTranslations(locale, i18nNamespaces)
  const googleReviewCountAndRating = await fetchGoogleReviewCountAndRating()
  const googleReviews = await fetchReviews(locale as 'sv' | 'en')

  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
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
        <PageLayoutClient googleReviewCountAndRating={googleReviewCountAndRating} googleReviews={googleReviews || undefined}>
          {children}
        </PageLayoutClient>
      </StyledFlex>
    </TranslationsProvider>
  )
}
