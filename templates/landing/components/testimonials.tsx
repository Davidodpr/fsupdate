import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'
import useResponsive from '@/common/hooks/useResponsive'
import Carousel from '@/components/organisms/Carousel'
import Star from '@/public/images/Star.svg'
import type { GoogleReview, GoogleReviewCountAndRating } from 'app/_actions/googleReviews.types'

interface TestimonialsProps {
  googleReviews?: GoogleReview[] | null
  googleRating?: GoogleReviewCountAndRating | null
}

const Testimonials = ({ googleReviews, googleRating }: TestimonialsProps) => {
  const { isTabletPortraitOrGreater, isDesktopOrGreater } = useResponsive()
  const { t } = useTranslation(['common', 'landing'])

  const filteredGoogleReviews = googleReviews?.filter(
    (r) => r.rating >= 3 && r.text
  ) ?? []

  const hasGoogleReviews = filteredGoogleReviews.length > 0
  const carouselItems = t('landing:TESTAMONIALS', { returnObjects: true }) as []

  const items = hasGoogleReviews ? filteredGoogleReviews : carouselItems
  const settings = {
    infinite: items.length > 3,
    speed: 700,
    slidesToShow: !isTabletPortraitOrGreater ? 1 : !isDesktopOrGreater ? 2 : 3,
    slidesToScroll: !isTabletPortraitOrGreater ? 1 : !isDesktopOrGreater ? 2 : 3,
    autoplay: true,
    autoplaySpeed: 8000,
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
            {t('landing:testamonial_title')}
          </h2>
          {hasGoogleReviews && googleRating?.rating && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={clsx(
                      'w-4 h-4',
                      i < Math.round(googleRating.rating!) ? 'fill-[var(--color-accent-main)]' : 'fill-white/20'
                    )}
                  />
                ))}
              </div>
              <span className="text-white/50 text-sm">
                {googleRating.rating} på Google
                {googleRating.reviewCount && ` · ${googleRating.reviewCount} recensioner`}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Reviews */}
      <Carousel {...settings} nav="arrows">
        {hasGoogleReviews
          ? filteredGoogleReviews.map((review) => (
              <div key={review.author_name + review.time} className="px-2">
                <div className="bg-white rounded-xl p-6 h-[280px] flex flex-col">
                  <div className="mb-3">
                    <Rating rating={review.rating} max={5} />
                  </div>
                  <p className="flex-1 text-[var(--color-secondary-main)]/70 text-sm leading-relaxed overflow-hidden line-clamp-6">
                    {review.text}
                  </p>
                  <div className="pt-4 mt-auto border-t border-gray-100">
                    <div className="font-semibold text-[var(--color-secondary-main)] text-sm">{review.author_name}</div>
                    {review.relative_time_description && (
                      <div className="text-[var(--color-secondary-main)]/40 text-xs mt-0.5">{review.relative_time_description}</div>
                    )}
                  </div>
                </div>
              </div>
            ))
          : carouselItems.map(({ rating, name, bio, words }) => (
              <div key={name} className="px-2">
                <div className="bg-white rounded-xl p-6 h-[280px] flex flex-col">
                  <div className="mb-3">
                    <Rating rating={parseInt(rating || '0')} max={5} />
                  </div>
                  <p className="flex-1 text-[var(--color-secondary-main)]/70 text-sm leading-relaxed overflow-hidden line-clamp-6">
                    {words}
                  </p>
                  <div className="pt-4 mt-auto border-t border-gray-100">
                    <div className="font-semibold text-[var(--color-secondary-main)] text-sm">{name}</div>
                    <div className="text-[var(--color-secondary-main)]/40 text-xs mt-0.5">{bio}</div>
                  </div>
                </div>
              </div>
            ))}
      </Carousel>
    </div>
  )
}

export default Testimonials

const Rating = ({ rating, max }: { rating: number; max: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: max }).map((_, i) => (
      <Star
        key={i}
        className={clsx(
          'w-3.5 h-3.5',
          i < rating ? 'fill-[var(--color-accent-main)]' : 'fill-gray-200'
        )}
      />
    ))}
  </div>
)
