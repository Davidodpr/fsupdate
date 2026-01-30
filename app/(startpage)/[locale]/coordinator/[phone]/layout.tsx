import { Metadata } from 'next'
import { getCoordinatorByPhone } from '@/common/utils/phone'
import initTranslations from 'i18n'

interface LayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string; phone: string }>
}

export async function generateMetadata(props: LayoutProps): Promise<Metadata> {
  const params = await props.params

  let decodedPhone: string
  try {
    decodedPhone = decodeURIComponent(params.phone)
  } catch (error) {
    return {}
  }

  const coordinator = getCoordinatorByPhone(decodedPhone)

  if (!coordinator) {
    return {}
  }

  const { t } = await initTranslations(params.locale, ['coordinator'])

  const title = `${coordinator.name} | ${coordinator.phone.display} | ${t('metaTitle')}`
  const description = t('metaDescription', {
    name: coordinator.name,
    phone: coordinator.phone.display,
  })

  return {
    title,
    description,
    alternates: {
      canonical: `https://flyttsmart.se/${params.locale}/coordinator/${coordinator.phone.canonical}`,
      languages: {
        sv: `https://flyttsmart.se/sv/coordinator/${coordinator.phone.canonical}`,
        en: `https://flyttsmart.se/en/coordinator/${coordinator.phone.canonical}`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: `${coordinator.name} | ${t('metaTitle')}`,
      description: t('metaDescription', {
        name: coordinator.name,
        phone: coordinator.phone.display,
      }),
      url: `https://flyttsmart.se/${params.locale}/coordinator/${coordinator.phone.canonical}`,
      siteName: 'Flyttsmart',
      images: [
        {
          url: coordinator.imageKitPath,
          width: 800,
          height: 600,
          alt: t('heroImageAlt', { name: coordinator.name }),
        },
      ],
      type: 'profile',
      locale: params.locale === 'sv' ? 'sv_SE' : 'en_US',
    },
  }
}

export default async function CoordinatorLayout(props: LayoutProps) {
  return <>{props.children}</>
}
