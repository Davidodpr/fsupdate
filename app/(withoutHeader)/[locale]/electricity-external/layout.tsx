import React, { ReactNode } from 'react'
import { fetchGoogleReviewCountAndRating } from 'app/_actions/googleReviews'
import initTranslations from 'i18n'
import { Metadata } from 'next'
import TranslationsProvider from 'providers/TranslationProvider'
import StyledFlex from '@/appComponents/StyledLayoutFlex'
import getI18nNamespaces from '@/appComponents/getI18nNamespaces'
import { PageLayoutClient } from '../../../(withHeader)/[locale]/app/_components/PageLayoutClient'

interface Props {
  children: ReactNode
  params: Promise<{
    locale: string
  }>
}

export const metadata: Metadata = {
  title: 'Flyttsmart | Externt elpris',
}

const i18nNamespaces = getI18nNamespaces('electricity')
export default async function layout(props: Props) {
  const params = await props.params

  const { locale } = params

  const { children } = props

  const { resources } = await initTranslations(locale, i18nNamespaces)
  const googleReviewCountAndRating = await fetchGoogleReviewCountAndRating()

  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
      <StyledFlex>
        <PageLayoutClient googleReviewCountAndRating={googleReviewCountAndRating}>{children}</PageLayoutClient>
      </StyledFlex>
    </TranslationsProvider>
  )
}
