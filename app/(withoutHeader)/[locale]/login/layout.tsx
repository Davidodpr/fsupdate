import React, { ReactNode } from 'react'
import { Suspense } from 'react'
import initTranslations from 'i18n'
import TranslationsProvider from 'providers/TranslationProvider'
import StyledFlex from '@/appComponents/StyledLayoutFlex'
import getI18nNamespaces from '@/appComponents/getI18nNamespaces'
import Spinner, { SpinnerWrapper } from '@/components/atoms/Spinner'
import { PageLayoutClient } from '../_components/PageLayoutClient'

interface Props {
  children: ReactNode
  params: Promise<{
    locale: string
  }>
}
const i18nNamespaces = getI18nNamespaces('login')
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
          <PageLayoutClient>{children}</PageLayoutClient>
        </Suspense>
      </StyledFlex>
    </TranslationsProvider>
  )
}
