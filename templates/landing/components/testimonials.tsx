import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'
import useResponsive from '@/common/hooks/useResponsive'
import Carousel from '@/components/organisms/Carousel'
import Star from '@/public/images/Star.svg'

const Testimonials = () => {
  const { isTabletPortraitOrGreater, isDesktopOrGreater } = useResponsive()
  const { t } = useTranslation(['common', 'landing'])

  const carouselItems = t('landing:TESTAMONIALS', { returnObjects: true }) as []
  const settings = {
    infinite: carouselItems.length > 3,
    speed: 700,
    slidesToShow: !isTabletPortraitOrGreater ? 1 : !isDesktopOrGreater ? 2 : 3,
    slidesToScroll: !isTabletPortraitOrGreater ? 1 : !isDesktopOrGreater ? 2 : 3,
    autoplay: true,
    autoplaySpeed: 8000,
  }

  return (
    <div className="relative">
      {/* Section header */}
      <div className="text-center mb-12">
        <span className="inline-block text-[var(--color-primary-main)] text-sm font-semibold uppercase tracking-wider mb-3">
          Recensioner
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          {t('landing:testamonial_title')}
        </h2>
      </div>

      <div className="mt-8">
        <Carousel {...settings} nav="arrows">
          {carouselItems.map(({ rating, name, bio, words }) => (
            <div
              key={name}
              className={clsx(
                'flex flex-col min-h-[340px] m-4 px-6 py-8',
                'bg-white/10 backdrop-blur-sm',
                'rounded-2xl border border-white/20',
                'hover:bg-white/15 hover:border-white/30',
                'transition-all duration-300'
              )}
            >
              {/* Quote icon */}
              <div className="mb-4">
                <svg className="w-8 h-8 text-[var(--color-primary-main)]/50" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Quote text */}
              <div className="flex-1 text-white/90 text-base leading-relaxed overflow-auto mb-4">
                {words}
              </div>

              {/* Rating and author */}
              <div className="border-t border-white/10 pt-4">
                <div className="mb-2">
                  <Rating rating={parseInt(rating || '0')} max={5} />
                </div>
                <div className="font-bold text-white">{name}</div>
                <div className="text-white/75 text-sm">{bio}</div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default Testimonials

type RatingProps = {
  rating: number
  max: number
}
const Rating = ({ rating, max }: RatingProps) => {
  return (
    <div className="flex gap-0.5">
      {[
        ...Array(max)
          .fill(0)
          .map((_value, index) => (
            <Star
              key={index}
              className={clsx(
                'w-4 h-4',
                index < rating ? 'fill-[var(--color-accent-main)]' : 'fill-white/20'
              )}
            />
          )),
      ]}
    </div>
  )
}
