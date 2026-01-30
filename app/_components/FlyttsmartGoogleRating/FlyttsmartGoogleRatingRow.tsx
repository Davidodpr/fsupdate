import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GoogleReviewCountAndRating } from 'app/_actions/googleReviews'
import { clsx } from 'clsx'
import GoogleStar from '@/public/images/GoogleStar.svg'
import { GoogleReviewModal } from './GoogleReviewModal'

export const LoaderWrapper = () => <div className="flex h-[34px]" />

export const FlyttsmartGoogleRatingRow = ({
  flyttsmartGoogleReviewCountAndRating,
  leftAlign,
  withoutBorderBottom,
}: {
  flyttsmartGoogleReviewCountAndRating?: GoogleReviewCountAndRating
  leftAlign?: boolean
  withoutBorderBottom?: boolean
}) => {
  const [showModal, setShowModal] = useState(false)
  const { t } = useTranslation(['common'])
  const reviewCountAndRating = flyttsmartGoogleReviewCountAndRating

  if (!reviewCountAndRating) return <LoaderWrapper />

  return (
    <div className={clsx('flex flex-row w-full pb-3 mb-[9px]', leftAlign ? 'justify-start' : 'justify-between', !withoutBorderBottom && 'border-b border-[#ddd]')}>
      {showModal && <GoogleReviewModal showModal={showModal} setShowModal={setShowModal} reviewCountAndRating={reviewCountAndRating} />}
      <div className="flex flex-row text-[#70757A] items-center gap-[3px] cursor-pointer" onClick={() => setShowModal(true)}>
        <div className="leading-normal pt-0.5 font-[arial]">{String(reviewCountAndRating.rating).replace('.', ',')}</div>
        <div className="flex items-center">
          {[...Array(Math.round(reviewCountAndRating?.rating ?? 0))].map((rating, i) => (
            <GoogleStar key={i} />
          ))}
        </div>
      </div>
      <div
        className={clsx('font-normal text-[#161BA4] font-[arial] leading-[1.5] pt-[3px] text-[13px] cursor-pointer hover:underline', leftAlign ? 'ml-4' : 'ml-0')}
        onClick={() => setShowModal(true)}
      >
        {reviewCountAndRating.reviewCount} {t('reviewsOnGoogle')}
      </div>
    </div>
  )
}
