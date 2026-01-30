import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'
import Image from 'next/image'
import { Modal, ModalContent, ModalOverlay } from '@/components/molecules/Modal'
import { GoogleReview, GoogleReviewCountAndRating } from '../../_actions/googleReviews'

export interface ShareModalProps {
  reviewCountAndRating: GoogleReviewCountAndRating
  showModal: boolean
  setShowModal: (arg0: boolean) => void
}

export const GoogleReviewModal = ({ reviewCountAndRating, showModal, setShowModal }: ShareModalProps) => {
  const [data, setData] = useState<GoogleReview[]>([])
  const { t, i18n } = useTranslation(['common'])

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(`/api/google-reviews/get?language=${i18n.language}`)
        const json = await res.json()
        setData(json.reviews)
      } catch (error: unknown) {
        console.error('Failed to fetch reviews:', error)
      }
    }

    fetchReviews()
  }, [i18n.language])

  const GoogleReviewer = ({ review, noBorderBottom }: { review: GoogleReview; noBorderBottom?: boolean }) => {
    return (
      <div className={clsx('flex flex-row pb-5 leading-normal text-[13px]', !noBorderBottom && 'border-b border-[#ECEDEF]')}>
        <a target="_blank" rel="noreferrer" href={review.author_url}>
          <Image src={review.profile_photo_url || '/images/default-profile.svg'} alt={review.author_name} width={40} height={40} />
        </a>
        <div className="w-[calc(100%-58px)] ml-2">
          <a target="_blank" href={review.author_url} className="font-bold text-black mb-[5px] block">
            {review.author_name}
          </a>
          <div className="flex flex-row mb-4 content-center">
            <div className="flex items-center">
              {[...Array(Math.round(review.rating))].map((rating, i) => (
                <Image alt="Google star" width={11} height={11} src="/images/GoogleStar.svg" key={i} />
              ))}
            </div>
            <div className="text-[#767678] leading-[1.4] ml-2">{review.relative_time_description}</div>
          </div>
          <div>{review.text}</div>
        </div>
      </div>
    )
  }

  return (
    <Modal open={showModal}>
      <ModalOverlay className="!fixed !w-full !h-full !bg-black/25 !backdrop-blur-none" />
      <ModalContent
        setShowModal={setShowModal}
        size="medium"
        withCloseButton
        withOverlayClose={false}
        className="!overflow-scroll !font-[Arial] !max-w-[calc(100%-32px)] md:!max-w-[528px]"
      >
        <div className="mb-5 border-b border-[#ECEDEF] pb-5">
          <div className="text-[#4D5156] text-[28px] font-normal leading-normal">Flyttsmart Sverige Ab</div>
          <div className="text-[#70757A] text-[13px] font-normal leading-normal mb-[22px]">Sankt Eriksterrassen 72B, 112 34 Stockholm</div>
          <div className="flex flex-row text-[#70757A] items-center gap-[3px]">
            <div style={{ fontSize: 25 }}>{String(reviewCountAndRating.rating).replace('.', ',')}</div>
            <div className="flex items-center">
              {[...Array(Math.round(reviewCountAndRating.rating ?? 0))].map((rating, i) => (
                <Image alt="Google star" key={i} width={22} height={22} src="/images/GoogleStar.svg" />
              ))}
            </div>
          </div>
          <div className="text-[#767678] font-[Arial] text-[15px] font-normal">
            {t('googleReviewRatingDisclaimer', { showAmount: 5, totalAmount: reviewCountAndRating.reviewCount })}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          {data.map((review, index) => (
            <GoogleReviewer review={review} noBorderBottom={index === data.length - 1} key={index} />
          ))}
        </div>
      </ModalContent>
    </Modal>
  )
}
