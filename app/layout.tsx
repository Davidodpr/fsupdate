import { Suspense } from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { cookies } from 'next/headers'
import Script from 'next/script'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import Spinner, { SpinnerWrapper } from '@/components/atoms/Spinner'
import '@/styles/_reset.css'
import '@/styles/globals.css'
import i18nConfig from '../i18nConfig'
import { AppProviders } from './_components/app-providers'
import { GaScript } from './_components/ga-script'
import { TrackPageVisit } from './_components/page-visit'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://localhost:3000'

const Gilroy = localFont({
  src: [
    {
      path: './_fonts/gilroy/regular/Gilroy-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './_fonts/gilroy/regular/Gilroy-RegularItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './_fonts/gilroy/medium/Gilroy-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './_fonts/gilroy/medium/Gilroy-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: './_fonts/gilroy/semibold/Gilroy-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './_fonts/gilroy/semibold/Gilroy-SemiBoldItalic.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: './_fonts/gilroy/bold/Gilroy-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './_fonts/gilroy/bold/Gilroy-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: './_fonts/gilroy/black/Gilroy-Black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: './_fonts/gilroy/black/Gilroy-BlackItalic.woff2',
      weight: '900',
      style: 'italic',
    },
  ],
})

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Flyttsmart',
  openGraph: {
    title: 'Flyttsmart',
    description: 'En tjänst som gör det enklare att flytta. Slipp telefonköer, onödiga kostnader och spara massor med tid!',
    url: 'https://flyttsmart.se',
    siteName: 'Flyttsmart',
    type: 'website',
    locale: 'sv_SE',
    images: [
      {
        url: 'https://ik.imagekit.io/flyttsmart/logo512_8b8PVyTL1.png?updatedAt=1727167348913',
        width: 512,
        height: 512,
        alt: 'Flyttsmart logotype',
      },
      {
        url: 'https://ik.imagekit.io/flyttsmart/logo192_DvKiEwl6c.png?updatedAt=1727167349028',
        width: 192,
        height: 192,
        alt: 'Flyttsmart logotype',
      },
    ],
  },
}

const viewport: Viewport = {
  width: 'device-width',
  height: 'device-height',
  initialScale: 1.0,
  maximumScale: 5.0,
  userScalable: true,
  themeColor: '#3879ad',
}
export { viewport }

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const NEXT_LOCALE = (await cookies()).get('NEXT_LOCALE')?.value || 'sv'
  return (
    <html lang={NEXT_LOCALE} className={Gilroy.className} translate="no">
      <head>
        <GaScript />
        <meta name="facebook-domain-verification" content="b5183k22di5r7qb6f35s55bl3sh2us" />
        <meta name="google" content="notranslate" />
      </head>
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.GTM_ID}"
                        height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        ></noscript>
        <Script async src="https://apis.google.com/js/api.js?loading=async" type="text/javascript"></Script>
        <Suspense fallback={<SpinnerWrapper>{<Spinner scale={2} color="green" />}</SpinnerWrapper>}>
          <AppProviders>
            <TrackPageVisit />
            {children}
          </AppProviders>
        </Suspense>
      </body>
    </html>
  )
}
