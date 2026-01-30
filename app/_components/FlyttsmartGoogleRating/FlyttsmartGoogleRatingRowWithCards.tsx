import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { GoogleReview, GoogleReviewCountAndRating } from 'app/_actions/googleReviews'
import Image from 'next/image'
import useResponsive from '@/common/hooks/useResponsive'
import Flex from '@/components/atoms/Flex'
import Paper from '@/components/atoms/Paper'
import Text from '@/components/atoms/Text'
import Carousel from '@/components/organisms/Carousel'
import GoogleStar from '@/public/images/GoogleStar.svg'
import {
  loaderWrapperVariants,
  readMoreTextVariants,
  ratingRowWrapperVariants,
  styledCommentTextVariants,
  ratingInfoVariants,
  ratingValueVariants,
  reviewCountLinkVariants,
  reviewWrapperVariants,
  authorDetailsVariants,
  reviewMetaVariants,
  timeDescriptionVariants,
  starContainerVariants,
  carouselWrapperVariants,
  styledTextVariants,
  reviewImageWrapperVariants,
  styledAuthorLinkVariants,
  styledStarContainerVariants,
  styledPaperVariants,
  styledCarouselPaperVariants,
  flexWrapperVariants,
} from './FlyttsmartGoogleRatingRowWithCards.variants'

export const FlyttsmartGoogleRatingRowWithCards = ({
  flyttsmartGoogleReviewCountAndRating,
  googleReviews = [],
  leftAlign,
  withoutBorderBottom,
}: {
  flyttsmartGoogleReviewCountAndRating?: GoogleReviewCountAndRating
  googleReviews?: GoogleReview[]
  leftAlign?: boolean
  withoutBorderBottom?: boolean
}) => {
  const { t } = useTranslation('common')
  const { isTabletPortraitOrGreater, isDesktopOrGreater, isTabletLandscapeOrGreater } = useResponsive()
  const reviewCountAndRating = flyttsmartGoogleReviewCountAndRating
  const data = googleReviews?.filter((review: GoogleReview) => review.rating >= 3) || []
  const settings = {
    infinite: true,
    speed: 700,
    slidesToShow: !isTabletPortraitOrGreater ? 1 : !isDesktopOrGreater ? 2 : 3,
    slidesToScroll: !isTabletPortraitOrGreater ? 1 : !isDesktopOrGreater ? 2 : 3,
    autoplay: true,
    autoplaySpeed: 5000,
  }

  const getSlidesToShow = () => {
    if (!isTabletPortraitOrGreater || !isTabletLandscapeOrGreater) {
      if (data?.length <= 2) return 0
      if (data?.length <= 3) return 1
      if (data?.length <= 4) return 2
      return 2
    }
    if (!isDesktopOrGreater) {
      if (data?.length <= 3) return 0
      if (data?.length <= 4) return 1
      return 2
    } else {
      if (data?.length <= 4) return 0
      return 1
    }
  }

  const GoogleReviewer = ({ review }: { review: GoogleReview; noBorderBottom?: boolean }) => {
    const isLongReview = review.text ? review.text.length > 300 : false
    const [showFullReview, setShowFullReview] = useState(false)
    return (
      <div className={reviewWrapperVariants()}>
        <div className={reviewImageWrapperVariants()}>
          <a target="_blank" rel="noreferrer" href={review.author_url}>
            <Image src={review.profile_photo_url || ''} alt={review.author_name} width={40} height={40} />
          </a>
        </div>
        <div className={authorDetailsVariants({ showFullReview })}>
          <a target="_blank" href={review.author_url} className={styledAuthorLinkVariants()}>
            {review.author_name}
          </a>
          <div className={reviewMetaVariants()}>
            <div className={styledStarContainerVariants()}>
              {[...Array(Math.round(review.rating))].map((rating, i) => (
                <Image alt="Google star" width={11} height={11} src="/images/GoogleStar.svg" key={i} />
              ))}
            </div>
            <div className={timeDescriptionVariants()}>{review.relative_time_description}</div>
          </div>
          <div className={styledCommentTextVariants()}>{review.text}</div>
        </div>
        {isLongReview && (
          <Text spacing="none" className={readMoreTextVariants()} onClick={() => setShowFullReview(!showFullReview)}>
            {t(!showFullReview ? 'seeMore' : 'close')}
          </Text>
        )}
      </div>
    )
  }

  if (!reviewCountAndRating) return <div className={loaderWrapperVariants()} />

  return (
    <Flex direction="column" className={flexWrapperVariants()}>
      <Text spacing="none" className={styledTextVariants()}>
        {t('flyttsmartTotalMoversText')}
      </Text>
      <div className={ratingRowWrapperVariants({ alignment: leftAlign ? 'left' : undefined, withoutBorderBottom })}>
        <div className={ratingInfoVariants()}>
          <div className={ratingValueVariants()}>{String(reviewCountAndRating.rating).replace('.', ',')}</div>
          <div className={starContainerVariants()}>
            {[...Array(Math.round(reviewCountAndRating?.rating ?? 0))].map((rating, i) => (
              <GoogleStar key={i} />
            ))}
          </div>
        </div>
        <div className={reviewCountLinkVariants({ marginLeft: leftAlign ? 'left' : 'none' })}>
          {reviewCountAndRating.reviewCount} {t('reviewsOnGoogle')}
        </div>
      </div>
      {!isTabletPortraitOrGreater && (
        <div className={carouselWrapperVariants()}>
          <Carousel {...settings}>
            {data?.map((review, index) => (
              <Paper key={index} className={styledCarouselPaperVariants()}>
                <GoogleReviewer review={review} noBorderBottom={index === data.length - 1} key={index} />
              </Paper>
            ))}
          </Carousel>
        </div>
      )}
      {isTabletPortraitOrGreater && (
        <Flex justifyContent="center">
          {data?.slice(getSlidesToShow()).map((review, index) => (
            <Paper key={index} className={styledPaperVariants()}>
              <GoogleReviewer review={review} noBorderBottom={index === data.length - 1} key={index} />
            </Paper>
          ))}
        </Flex>
      )}
    </Flex>
  )
}
