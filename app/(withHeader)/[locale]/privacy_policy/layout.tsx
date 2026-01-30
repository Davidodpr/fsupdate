import React, { ReactNode, lazy } from 'react'
import { Suspense } from 'react'
import { PageLayoutClient } from 'app/(withHeader)/[locale]/app/_components/PageLayoutClient'
import initTranslations from 'i18n'
import TranslationsProvider from 'providers/TranslationProvider'
import StyledFlex from '@/appComponents/StyledLayoutFlex'
import getI18nNamespaces from '@/appComponents/getI18nNamespaces'
import Spinner, { SpinnerWrapper } from '@/components/atoms/Spinner'
import { isMobileDevice } from '../../../_components/responsive'

const PageLayoutClientHeader = lazy(() => import('app/(startpage)/[locale]/_components/PageLayoutClientHeader'))
interface Props {
  children: ReactNode
  params: Promise<{
    locale: string
  }>
}
const i18nNamespaces = getI18nNamespaces('')
export default async function layout(props: Props) {
  const params = await props.params

  const { locale } = params

  const { children } = props

  const { resources } = await initTranslations(locale, i18nNamespaces)
  const isServerMobile = await isMobileDevice()

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
          <PageLayoutClientHeader isServerMobile={isServerMobile} />
        </Suspense>
        <PageLayoutClient>{children}</PageLayoutClient>
      </StyledFlex>
    </TranslationsProvider>
  )
}
