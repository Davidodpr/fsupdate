import { notFound } from 'next/navigation'
import { getCoordinatorByPhone } from '@/common/utils/phone'
import initTranslations from 'i18n'
import TranslationsProvider from 'providers/TranslationProvider'
import CoordinatorHero from '@/components/organisms/CoordinatorProfile/CoordinatorHero'
import CoordinatorContact from '@/components/organisms/CoordinatorProfile/CoordinatorContact'
import CoordinatorDescription from '@/components/organisms/CoordinatorProfile/CoordinatorDescription'
import CoordinatorTestimonials from '@/components/organisms/CoordinatorProfile/CoordinatorTestimonials'
import CoordinatorSchema from '@/components/organisms/CoordinatorProfile/CoordinatorSchema'
import { fetchReviews, fetchGoogleReviewCountAndRating } from 'app/_actions/googleReviews'

interface PageProps {
  params: Promise<{ locale: string; phone: string }>
}

function validateLocale(locale: string): 'sv' | 'en' {
  return locale === 'en' ? 'en' : 'sv'
}

export default async function CoordinatorPage(props: PageProps) {
  const params = await props.params

  let decodedPhone: string
  try {
    decodedPhone = decodeURIComponent(params.phone)
  } catch (error) {
    notFound()
  }

  const coordinator = getCoordinatorByPhone(decodedPhone)

  if (!coordinator) {
    notFound()
  }

  const validatedLocale = validateLocale(params.locale)
  const { t, resources } = await initTranslations(validatedLocale, ['coordinator'])

  // Fetch Google Reviews with error handling to prevent page failure
  // If reviews fail to load, page still renders with coordinator info
  let reviews: Awaited<ReturnType<typeof fetchReviews>> = null
  let reviewStats: Awaited<ReturnType<typeof fetchGoogleReviewCountAndRating>> = {
    rating: null,
    reviewCount: null,
  }

  try {
    reviews = await fetchReviews(validatedLocale)
  } catch (error) {
    console.error('Failed to fetch Google reviews:', error)
  }

  try {
    reviewStats = await fetchGoogleReviewCountAndRating()
  } catch (error) {
    console.error('Failed to fetch Google review stats:', error)
  }

  return (
    <TranslationsProvider locale={validatedLocale} resources={resources} namespaces={['coordinator']}>
      <CoordinatorSchema coordinator={coordinator} locale={validatedLocale} jobTitle={t('coordinator')} />

      <div className="min-h-screen ">
        <main className="mx-auto max-w-2xl px-4 py-6 pb-12">
          <h1 className="text-2xl font-bold text-center text-[var(--color-text-primary)] mb-6 animate-fade-in md:text-3xl">
            {t('pageTitle')} <span className="text-[var(--color-primary-main)]">{t('pageSubtitle')}</span>
          </h1>

          <CoordinatorHero coordinator={coordinator} />
          <CoordinatorContact coordinator={coordinator} />
          <CoordinatorDescription />
          <CoordinatorTestimonials reviews={reviews} reviewStats={reviewStats} />
        </main>
      </div>
    </TranslationsProvider>
  )
}
