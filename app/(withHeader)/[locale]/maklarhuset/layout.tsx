import React, { ReactNode } from 'react'
import initTranslations from 'app/i18n'
import { Metadata } from 'next'
import TranslationsProvider from 'providers/TranslationProvider'
import getI18nNamespaces from '@/appComponents/getI18nNamespaces'

interface Props {
  children: ReactNode
  params: Promise<{
    locale: string
  }>
}

export const metadata: Metadata = {
  title: 'Mäklarhuset Leaderboard | Flyttsmart',
  description: 'Broker power-of-attorney document rankings and performance metrics',
}

const i18nNamespaces = getI18nNamespaces('maklarhuset')

export default async function MaklarhusetLayout(props: Props) {
  const params = await props.params
  const { locale } = params
  const { children } = props

  const { resources } = await initTranslations(locale, i18nNamespaces)

  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
      {children}
    </TranslationsProvider>
  )
}
