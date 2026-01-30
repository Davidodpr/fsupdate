import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'
import useResponsive from '@/common/hooks/useResponsive'
import StarsEmpty from '@/public/images/RatingStarsEmpty.svg'
import StarsFilled from '@/public/images/RatingStarsFilled.svg'
import {
  wrapperVariants,
  starRatingsVariants,
  coloredStarsVariants,
  blankStarsVariants,
  ratingNumberVariants,
  ratingTextVariants,
  type WrapperVariants,
  type StarRatingsVariants,
  type RatingNumberVariants,
  type RatingTextVariants,
} from './Rating.variants'

export type RatingProps = Omit<WrapperVariants & StarRatingsVariants & RatingNumberVariants & RatingTextVariants, 'fontSize'> & {
  rating: string
  numberOfRatings?: number
  fontSize?: number
  ratingColor?: string
  reviewColor?: string
  ratingTextFontSize?: number
  starsColor?: string
  darkFont?: boolean
  asColumn?: boolean
  className?: string
}

export const Rating = ({ rating, numberOfRatings, fontSize, ratingColor, ratingTextFontSize, darkFont, starsColor, asColumn, reviewColor, className }: RatingProps) => {
  const ratingNumber = Number(rating)
  const { isTabletPortraitOrGreater } = useResponsive()
  const { t } = useTranslation(['common'])
  const width = (ratingNumber / 5) * 100

  const getfractionalNumbers = (num: number) => {
    const numberArray = num.toString().split('.')
    if (numberArray.length === 1 && !numberArray[1]) {
      numberArray.push('0')
    }
    return numberArray
  }

  const ratingArray: string[] = rating ? getfractionalNumbers(ratingNumber) : ['0', '0']

  const wrapperClasses = clsx(wrapperVariants({ asColumn }), className)

  const starRatingsClasses = clsx(starRatingsVariants())

  const coloredStarsClasses = clsx(coloredStarsVariants(), {
    'text-[#FFA65F]': !starsColor,
  })

  const coloredStarsStyle = {
    width: `${width}%`,
    ...(starsColor && { color: starsColor }),
  }

  const blankStarsClasses = clsx(blankStarsVariants())

  const ratingNumberClasses = clsx(ratingNumberVariants(), {
    'text-[#FFA65F]': !ratingColor,
  })

  const ratingNumberStyle = {
    ...(fontSize ? { fontSize: `${fontSize}px` } : {}),
    ...(ratingColor ? { color: ratingColor } : {}),
  }

  const ratingTextClasses = clsx(ratingTextVariants({ darkFont }), {
    'text-[var(--color-primary-contrast-text)]': !darkFont && !reviewColor,
  })

  const ratingTextStyle = {
    ...(ratingTextFontSize && { fontSize: `${ratingTextFontSize}px` }),
    ...(reviewColor && { color: reviewColor }),
  }

  if (asColumn) {
    return (
      <div className={wrapperClasses}>
        <div className="flex gap-[5px]">
          <div className={ratingNumberClasses} style={ratingNumberStyle}>
            {`${ratingArray[0]},${ratingArray[1]}`}
          </div>
          <div className={starRatingsClasses}>
            <div className={coloredStarsClasses} style={coloredStarsStyle}>
              <span className="inline-block">
                <StarsFilled />
              </span>
            </div>
            <div className={blankStarsClasses}>
              <span>
                <StarsEmpty />
              </span>
            </div>
          </div>
        </div>
        {(!!numberOfRatings || numberOfRatings === 0) && (
          <div
            className={clsx(ratingTextClasses, 'h-max', {
              'ml-auto': isTabletPortraitOrGreater,
              'ml-0': !isTabletPortraitOrGreater,
            })}
            style={ratingTextStyle}
          >
            {`  ${numberOfRatings} ${t('customerRatings')}`}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={wrapperClasses}>
      <div className={ratingNumberClasses} style={ratingNumberStyle}>
        {`${ratingArray[0]},${ratingArray[1]}`}
      </div>
      <div className={starRatingsClasses}>
        <div className={coloredStarsClasses} style={coloredStarsStyle}>
          <span className="inline-block">
            <StarsFilled />
          </span>
        </div>
        <div className={blankStarsClasses}>
          <span>
            <StarsEmpty />
          </span>
        </div>
      </div>
      {(!!numberOfRatings || numberOfRatings === 0) && (
        <div className={ratingTextClasses} style={ratingTextStyle}>
          {`  ${numberOfRatings} ${t('customerRatings')}`}
        </div>
      )}
    </div>
  )
}
