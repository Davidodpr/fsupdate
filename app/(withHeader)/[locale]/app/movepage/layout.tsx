import React, { ReactNode, lazy } from 'react'
import { Suspense } from 'react'
import initTranslations from 'i18n'
import { Metadata } from 'next'
import TranslationsProvider from 'providers/TranslationProvider'
import StyledFlex from '@/appComponents/StyledLayoutFlex'
import getI18nNamespaces from '@/appComponents/getI18nNamespaces'
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
  title: 'Flyttsmart | Min flyttsida',
}

const i18nNamespaces = getI18nNamespaces('movepage')
export default async function layout(props: Props) {
  const params = await props.params

  const { locale } = params

  const { children } = props

  const { resources } = await initTranslations(locale, i18nNamespaces)

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
        <PageLayoutClient>{children}</PageLayoutClient>
      </StyledFlex>
    </TranslationsProvider>
  )
}
