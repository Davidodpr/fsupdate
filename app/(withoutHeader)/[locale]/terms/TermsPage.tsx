'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ShortLocale } from '@/common/enums/LocaleEnum'


interface TermsPageProps {
  locale: string
}

export const TermsPage = ({ locale }: TermsPageProps) => {
  const router = useRouter()
  useEffect(() => {
    if (router) router.replace(`https://help.flyttsmart.se/${locale === ShortLocale.EN ? ShortLocale.EN : ShortLocale.SV}/articles/6557804-var-hittar-jag-era-villkor`)
  }, [router, locale])

  return <></>
}
