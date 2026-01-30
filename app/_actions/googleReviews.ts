'use server'

const FLYTTSMART_PLACE_ID = 'ChIJJ9A1BWedX0YRxQLDioTrsH0'

export type GoogleReviewCountAndRating = { rating: number | null; reviewCount: number | null }
export type GoogleReview = {
  author_name: string
  rating: number
  text?: string
  time: number
  profile_photo_url?: string
  author_url?: string
  relative_time_description?: string
}

export async function fetchGoogleReviewCountAndRating(): Promise<GoogleReviewCountAndRating> {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${FLYTTSMART_PLACE_ID}&fields=rating,user_ratings_total&key=${process.env.GOOGLE_API_KEY}`,
      { next: { revalidate: 3600 * 24 } },
    )

    const data = await response.json()
    const { result } = data
    return { rating: result?.rating ? result?.rating : null, reviewCount: result?.user_ratings_total ? result?.user_ratings_total : null }
  } catch (error: unknown) {
    return { rating: null, reviewCount: null }
  }
}

export async function fetchGoogleReviews(language: 'sv' | 'en'): Promise<{ reviews: GoogleReview[] }> {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?placeid=${FLYTTSMART_PLACE_ID}&fields=reviews&reviews_sort=newest&reviews_no_translations=true&language=${language}&key=${process.env.GOOGLE_API_KEY}`,
    { next: { revalidate: 3600 * 24 } },
  )

  const data = await response.json()
  const { result } = data
  return { reviews: result?.reviews ? result?.reviews : null }
}

export async function fetchReviews(languageParam: 'sv' | 'en'): Promise<GoogleReview[] | null> {
  try {
    const { reviews } = await fetchGoogleReviews(languageParam as 'sv' | 'en')
    return reviews
  } catch (error: unknown) {
    return null
  }
}
