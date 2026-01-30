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
