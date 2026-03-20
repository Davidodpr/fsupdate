import { Suspense } from 'react'
import { LandingPage } from '@/templates/landing'
import { isServerDemoMode } from '@/common/utils/demoMode'
import { isSafari, isIos } from '../../_components/responsive'
import { fetchReviews, fetchGoogleReviewCountAndRating } from '../../_actions/googleReviews'
import Loading from './loading'

export default async function Page() {
  const [isServerSafari, isServerIos] = await Promise.all([isSafari(), isIos()])
  const [googleReviews, googleRating] = isServerDemoMode
    ? [null, { rating: null, reviewCount: null }]
    : await Promise.all([fetchReviews('sv'), fetchGoogleReviewCountAndRating()])

  return (
    <main>
      <Suspense fallback={<Loading />}>
        <LandingPage
          isServerIosOrSafari={isServerSafari || isServerIos}
          googleReviews={googleReviews}
          googleRating={googleRating}
        />
      </Suspense>
    </main>
  )
}
