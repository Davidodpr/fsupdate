'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GoogleReview, GoogleReviewCountAndRating } from 'app/_actions/googleReviews'
import { User } from 'lucide-react'

interface CoordinatorTestimonialsProps {
  reviews: GoogleReview[] | null
  reviewStats: GoogleReviewCountAndRating
}

function ReviewerAvatar({ review, index }: { review: GoogleReview; index: number }) {
  const [imageError, setImageError] = useState(false)

  if (!review.profile_photo_url || imageError) {
    return (
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
        <User className="w-5 h-5 text-gray-500" />
      </div>
    )
  }

  return (
    <Image
      src={review.profile_photo_url}
      alt={review.author_name}
      width={40}
      height={40}
      className="rounded-full"
      loading={index === 0 ? 'eager' : 'lazy'}
      onError={() => setImageError(true)}
    />
  )
}

export default function CoordinatorTestimonials({ reviews, reviewStats }: CoordinatorTestimonialsProps) {
  const { t } = useTranslation('coordinator')

  const filteredReviews = reviews?.filter((review) => review.rating >= 3 && review.text) || []
  const displayReviews = filteredReviews.slice(0, 3)

  if (!reviewStats.rating || !reviewStats.reviewCount) {
    return null
  }

  return (
    <div className="space-y-3 mb-8">
      <h2 className="text-center text-2xl font-bold text-[var(--color-text-primary)] mb-2">{t('testimonials.title')}</h2>
      <h3 className="text-center text-sm font-semibold text-[var(--color-text-secondary)] mb-4">{t('testimonials.subtitle')}</h3>

      {displayReviews.map((review, index) => (
        <div key={index} className="border-0 bg-white shadow-[var(--shadow-soft)] rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <ReviewerAvatar review={review} index={index} />
            <div className="flex-1">
              <p className="text-sm font-semibold text-[var(--color-text-primary)]">{review.author_name}</p>
              <div className="flex gap-1 mt-1" aria-label={t('testimonials.starsRating', { rating: review.rating })}>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Image key={i} src="/images/GoogleStar.svg" alt="" width={11} height={11} />
                ))}
              </div>
            </div>
            {review.relative_time_description && <p className="text-xs text-[var(--color-text-secondary)]">{review.relative_time_description}</p>}
          </div>
          <p className="text-sm text-[var(--color-text-primary)] leading-relaxed">{review.text}</p>
        </div>
      ))}
    </div>
  )
}
