import React from 'react'
import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'
import { SupplierDetail } from 'types/price'
import { useMovecleanContext } from '@/common/context/movecleanProvider/moveclean.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import { ShortLocale } from '@/common/enums/LocaleEnum'
import useResponsive from '@/common/hooks/useResponsive'
import Button from '@/components/atoms/Button'
import Flex from '@/components/atoms/Flex'
import { Rating } from '@/components/atoms/Rating'
import Text from '@/components/atoms/Text'
import PopupNew from '@/components/molecules/PopupNew'
import { TextTemplate } from '@/components/molecules/TextTemplate/TextTemplate'
import ArrowRight from '@/public/images/ArrowRight_v2.svg'
import RoundCheckmark from '@/public/images/Round_green_checkmark.svg'
import {
  serviceVariants,
  imageWrapperVariants,
  nameAndButtonWrapperVariants,
  buttonWrapperVariants,
  priceAndRatingWrapperVariants,
  ratingWrapperVariants,
  checkmarkWrapperVariants,
} from './ServiceItem.variants'

interface ServiceItemProps {
  item: SupplierDetail
  price: string
  setCurrentStep: (step: number) => void
  onResidenceSizeError: () => void
}
const ServiceItem = ({ item, price, setCurrentStep, onResidenceSizeError }: ServiceItemProps) => {
  const { setSelectedProvider } = useMovecleanContext()
  const { t, i18n } = useTranslation(['moveclean', 'common'])
  const { isTabletPortraitOrGreater } = useResponsive()
  const locale = i18n.language
  const {
    user: { currentMove },
  } = useUserContext()
  const currentResidenceSize = Number(currentMove?.fromResidenceSize ?? 0) + Number(currentMove?.fromAddress?.additionalSpace ?? 0)

  const RatingDescription = [
    {
      type: 'text',
      value: t('common:otherProviderReviewDescription1'),
    },
    {
      type: 'link',
      value: {
        url: t('common:otherProviderReviewDescription2_Url'),
        text: t('common:otherProviderReviewDescription2_Text'),
      },
    },
  ]

  return (
    <div className={clsx(serviceVariants())}>
      <Flex style={{ width: '100%' }} direction={isTabletPortraitOrGreater ? 'row' : 'column'} alignItems="center">
        <div className={clsx(imageWrapperVariants())} style={{ backgroundImage: `url(${item.imageUrl})` }}>
          <div className={clsx(checkmarkWrapperVariants())}>
            <RoundCheckmark />
          </div>
        </div>

        <div className={clsx(nameAndButtonWrapperVariants())}>
          <Flex direction="column" justifyItems="center" justifyContent="center" style={{ height: '100%', flexGrow: 1, paddingTop: isTabletPortraitOrGreater ? 0 : 16 }}>
            <Text spacing="none" className="!text-[24px] !font-bold">
              {item.displayName}
            </Text>
          </Flex>
          {isTabletPortraitOrGreater && (
            <div className={clsx(buttonWrapperVariants())}>
              <Button
                onClick={() => {
                  if (!!price && currentResidenceSize >= 10) {
                    setSelectedProvider && setSelectedProvider(item)
                    setCurrentStep(2)
                  } else {
                    onResidenceSizeError()
                  }
                }}
                fontSize={15}
                iconRight={<ArrowRight color="#000" />}
                padding="10px 32px"
                text={t('chooseAndMoveOn')}
                variant="outline"
                largerArrowRight
              />
            </div>
          )}
        </div>
      </Flex>
      {!isTabletPortraitOrGreater && <div style={{ height: 1, width: '100%', background: '#21476633', opacity: 0.5, borderRadius: '16px', margin: '16px 0' }} />}
      <div className={clsx(priceAndRatingWrapperVariants())}>
        <Flex direction="column">
          {!!price && currentResidenceSize >= 10 && (
            <Text spacing="none" className="!text-[32px] !leading-[32px] !font-bold text-right">
              {price} {t('kr')}
            </Text>
          )}
          {!!price && currentResidenceSize >= 10 && (
            <Text spacing="none" variant="body" style={{ width: locale !== ShortLocale.SV ? '150px' : '120px', textAlign: 'right' }}>
              {t('afterRut')}
            </Text>
          )}
          {(!price || currentResidenceSize < 10) && (
            <Text spacing="none" variant="bodyItalic" style={{ width: 120, textAlign: 'right' }}>
              {t('addResidenceSizeToSeePrice')}
            </Text>
          )}
        </Flex>
        {isTabletPortraitOrGreater && <div style={{ height: 1, width: '100%', background: '#21476633', opacity: 0.5, borderRadius: '16px' }} />}
        <Flex justifyContent="space-between">
          <PopupNew showBackground={!isTabletPortraitOrGreater} noUnderline withFluidWidth text={<TextTemplate text={RatingDescription}></TextTemplate>}>
            <div className={clsx(ratingWrapperVariants())}>
              <Rating
                rating={item.rating}
                starsColor={'var(--color-secondary-light)'}
                ratingColor={'var(--color-secondary-main)'}
                reviewColor={'var(--color-secondary-dark)'}
                fontSize={20}
                ratingTextFontSize={locale !== ShortLocale.SV && !isTabletPortraitOrGreater ? 13 : 16}
                numberOfRatings={item.reviewCount}
                asColumn
              />
            </div>
          </PopupNew>
        </Flex>
      </div>
      {!isTabletPortraitOrGreater && (
        <div className={clsx(buttonWrapperVariants())}>
          <Button
            onClick={() => {
              if (!!price && currentResidenceSize >= 10) {
                setSelectedProvider && setSelectedProvider(item)
                setCurrentStep(2)
              } else {
                onResidenceSizeError()
              }
            }}
            fontSize={15}
            iconRight={<ArrowRight color="#000" />}
            padding="10px 32px"
            text={t('chooseAndMoveOn')}
            variant="outline"
          />
        </div>
      )}
    </div>
  )
}

export default ServiceItem
