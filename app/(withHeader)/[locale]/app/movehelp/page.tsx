import { Suspense } from 'react'
import { fetchGoogleReviewCountAndRating } from 'app/_actions/googleReviews'
import MovehelpTemplate from '@/templates/Movehelp'
import Loading from '../loading'

export default async function Home() {
  const googleReviewCountAndRating = await fetchGoogleReviewCountAndRating()
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <MovehelpTemplate flyttsmartGoogleReviewCountAndRating={googleReviewCountAndRating} />
      </Suspense>
    </main>
  )
}
