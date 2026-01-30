import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import Image from 'next/image'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import useResponsive from '@/common/hooks/useResponsive'
import Flex from '@/components/atoms/Flex'
import Text from '@/components/atoms/Text'
import Popup from '@/components/molecules/PopupNew'
import ArrowDown from '@/public/images/Arrow-down-black.svg'
import ArrowUp from '@/public/images/Arrow-up-black.svg'
import {
  showMoreWrapperVariants,
  questionMarkWrapperVariants,
  detailsTextSectionVariants,
  providerDetailsWrapperVariants,
  priceSectionVariants,
  kwhPriceSectionWithDiscountVariants,
  greyWrapperVariants,
  whiteWrapperVariants,
} from './ProviderDetails.variants'
import Tv from './Tv/Tv'

export interface ProviderDetailsProps {
  offer: BroadbandOfferData
  popupText: ReactElement
}

const ProviderDetails = ({ offer, popupText }: ProviderDetailsProps) => {
  const { t } = useTranslation(['broadband', 'common'])
  const { iconSet } = useThemeContext()
  const { isTabletPortraitOrGreater } = useResponsive()
  const isRouterInOffer = offer?.additionalProducts?.find((x) => x.type === 'router')
  const normalPrice = offer?.price?.monthlyAmounts?.find((price) => price.end === -1)
  const discountPrice = offer?.price?.monthlyAmounts?.find((price) => price.end !== -1)
  const isTVInOffer = offer?.additionalProducts?.find((x) => x.type === 'tv' || x.category === 'tv')
  const tvOffer = isTVInOffer?.additionalProducts?.find((x) => x.type === 'tv' || x.category === 'tv')
  const normalTvPrice = tvOffer?.price?.monthlyAmounts?.find((price) => price.end === -1) || isTVInOffer?.price?.monthlyAmounts?.find((price) => price.end === -1)
  const discountTvPrice = tvOffer?.price?.monthlyAmounts?.find((price) => price.end !== -1)
  const tvBox = isTVInOffer?.additionalProducts?.find((x) => x.type === 'tv_box')
  const [showMore, setShowMore] = React.useState(true)

  const offerType = offer.type !== 'mobile' ? 'fixed' : 'mobile'

  const getRightUnit = () => {
    if (offer.type !== 'mobile') {
      return `${offer.speed.down} ${t('speedUnit')}`
    }
    if (offer.dataLimit && offer.dataLimit > 0) {
      return `${offer.dataLimit} ${t('dataLimitUnit')}`
    } else {
      return t('STEPTWO.unlimited')
    }
  }

  return (
    <div className={clsx(providerDetailsWrapperVariants({ withPaddingBottom: !isTVInOffer }))} data-testid="provider-details-container">
      <Flex style={{ gap: 32 }} direction={isTabletPortraitOrGreater ? 'row' : 'column'}>
        <Flex direction="column" alignItems="start" style={{ width: '100%', maxWidth: isTabletPortraitOrGreater ? '280px' : '100%' }}>
          <Text
            variant="providerDetails"
            spacing="none"
            style={{ padding: isTabletPortraitOrGreater ? '0 0 8px 0px' : '17px 0 16px 16px', height: isTabletPortraitOrGreater ? 32 : 'unset' }}
          >
            {t('details')}
          </Text>
          <div className={clsx(whiteWrapperVariants({ withoutTopMargin: true }))}>
            <div className={clsx(detailsTextSectionVariants())}>
              <Text spacing="none" variant="bodyBold">
                {t(`type`)}
              </Text>
              <Text spacing="none">{offerType === 'fixed' ? t('STEPTWO.fixedBroadband') : t('STEPTWO.mobileBroadband')}</Text>
            </div>
            <div className={clsx(detailsTextSectionVariants())}>
              <Text spacing="none" variant="bodyBold">
                {t(`STEPTWO.downSpeed`)}
              </Text>
              <Text spacing="none" style={{ paddingBottom: 0 }}>
                {t('STEPTWO.speedDownToo')} {offer.speed?.down} {t('STEPTWO.speedUnit')}
              </Text>
              <Text spacing="none">
                {t('STEPTWO.speedUpToo')} {offer.speed?.up} {t('STEPTWO.speedUnit')}
              </Text>
            </div>
            <div className={clsx(detailsTextSectionVariants())}>
              <Text spacing="none" variant="bodyBold">
                {t(`STEPTWO.dataLimit`)}
              </Text>
              <Text spacing="none">{getRightUnit()}</Text>
            </div>
            <div className={clsx(detailsTextSectionVariants())}>
              <Text spacing="none" variant="bodyBold">
                {t(`bindingTime`)}
              </Text>
              <Text spacing="none" style={{ paddingBottom: 0 }}>
                {offer?.contractMonths} {t('STEPTWO.monthsBindingTime')}
              </Text>
              <Text spacing="none">{t('STEPTWO.cancelTime')}</Text>
            </div>
            {isRouterInOffer && (
              <div className={clsx(detailsTextSectionVariants())} style={{ paddingBottom: 0 }}>
                <Text spacing="none" variant="bodyBold">
                  {t(`STEPTWO.router`)}
                </Text>
                {isRouterInOffer?.optional ? (
                  <Text spacing="none">
                    {isRouterInOffer?.name} {t('STEPTWO.asAddonOn')}
                  </Text>
                ) : (
                  <Text spacing="none">
                    {isRouterInOffer?.name} {t('STEPTWO.comesWith')}
                  </Text>
                )}
              </div>
            )}
          </div>
        </Flex>
        <Flex direction="column" style={{ width: '100%' }}>
          <Flex alignItems="center" style={{ padding: '0 0 8px 16px', gap: 2 }}>
            <Text variant="providerDetails" spacing="none">
              {t('STEPTWO.priceSpecification')}
            </Text>
            <Popup textMargin noUnderline text={popupText}>
              <span className={clsx(questionMarkWrapperVariants())}>
                <Image src={iconSet.INFO_ICON} alt="question icon" width={24} height={24} />
              </span>
            </Popup>
          </Flex>
          <div className={clsx(greyWrapperVariants({ withoutTopMargin: true }))}>
            <Text variant="providerDetails" className="!text-[18px] !font-bold" spacing="none">
              {t('headerService')}
            </Text>
            <div className={clsx(priceSectionVariants({ withDiscountPadding: !!offer?.price?.campaign }))}>
              <Text spacing="none">{t(`STEPTWO.monthlyFee`)}</Text>
              <Text spacing="none" style={{ textDecoration: !!offer?.price?.campaign ? 'line-through' : 'none' }}>{`${normalPrice?.amount} ${t(`STEPTWO.pricePerMonth`)}`}</Text>
            </div>
            {!!offer?.price?.campaign && discountPrice && (
              <div className={clsx(kwhPriceSectionWithDiscountVariants())}>
                <Text spacing="none" style={{ color: '#B8220B', fontSize: '12px' }}>
                  {t('STEPTWO.discountPriceText', { months: discountPrice.end })}
                </Text>
                <Text spacing="none" style={{ color: '#E9391E', fontWeight: 'bold' }}>{`${discountPrice.amount} ${t(`STEPTWO.pricePerMonth`)}`}</Text>
              </div>
            )}
            <div className={clsx(priceSectionVariants({ withDiscountPadding: !!offer?.startupPrice?.campaign }))}>
              <Text spacing="none">{t(`STEPTWO.startingFee`)}</Text>
              <Text spacing="none" style={{ textDecoration: !!offer?.startupPrice?.campaign ? 'line-through' : 'none' }}>{`${
                offer?.startupPrice?.oneTimeAmountWithoutDiscount ?? offer?.startupPrice?.oneTimeAmount ?? '0'
              } ${t(`money`)}`}</Text>
            </div>
            {!!offer?.startupPrice?.campaign && (
              <div className={clsx(kwhPriceSectionWithDiscountVariants())}>
                <Text spacing="none" style={{ color: '#B8220B', fontSize: '12px' }}>
                  {t('STEPTWO.discount')}
                </Text>
                <Text spacing="none" style={{ color: '#E9391E', fontWeight: 'bold' }}>{`${offer?.startupPrice?.oneTimeAmount} ${t(`money`)}`}</Text>
              </div>
            )}
            {isRouterInOffer && !isRouterInOffer?.optional && (
              <div className={clsx(priceSectionVariants())}>
                <Text spacing="none">{isRouterInOffer?.name}</Text>
                <Text spacing="none">
                  {isRouterInOffer?.price?.oneTimeAmount ? isRouterInOffer?.price?.oneTimeAmount : 0} {t('money')}
                </Text>
              </div>
            )}
            {!!isRouterInOffer?.freightPrice?.oneTimeAmount && (
              <div className={clsx(priceSectionVariants())}>
                <Text spacing="none">{t(`STEPTWO.freight`)}</Text>
                <Text spacing="none">{`${isRouterInOffer?.freightPrice?.oneTimeAmount} ${t(`money`)}`}</Text>
              </div>
            )}
            {!!offer.freightPrice?.oneTimeAmount && (
              <div className={clsx(priceSectionVariants())}>
                <Text spacing="none">{t('STEPTWO.freight')}</Text>
                <Text spacing="none">
                  {offer?.freightPrice?.oneTimeAmount} {t('money')}
                </Text>
              </div>
            )}
            {isTVInOffer && (
              <>
                <div className={clsx(priceSectionVariants({ withTopBorder: true }))} />
                <Text variant="providerDetails" spacing="none">
                  {t('STEPTWO.tvPackage')}
                </Text>
                <div className={clsx(priceSectionVariants({ withDiscountPadding: !!tvOffer?.price?.campaign }))}>
                  <Text spacing="none">{t(`STEPTWO.monthlyFee`)}</Text>
                  <Text spacing="none" style={{ textDecoration: !!tvOffer?.price?.campaign ? 'line-through' : 'none' }}>{`${normalTvPrice?.amount} ${t(
                    `STEPTWO.pricePerMonth`,
                  )}`}</Text>
                </div>
                {!!tvOffer?.price?.campaign && discountTvPrice && (
                  <div className={clsx(kwhPriceSectionWithDiscountVariants())}>
                    <Text spacing="none" style={{ color: '#B8220B', fontSize: '12px' }}>
                      {t('STEPTWO.discountPriceText', { months: discountTvPrice.end })}
                    </Text>
                    <Text spacing="none" style={{ color: '#E9391E', fontWeight: 'bold' }}>{`${discountTvPrice.amount} ${t(`STEPTWO.pricePerMonth`)}`}</Text>
                  </div>
                )}
                {!!tvBox && tvBox.price && (
                  <div className={clsx(priceSectionVariants({ withDiscountPadding: !!tvBox?.price?.campaign }))}>
                    <Text spacing="none">{t(`STEPTWO.tvBox`)}</Text>
                    <Text spacing="none" style={{ textDecoration: !!tvBox?.price?.campaign ? 'line-through' : 'none' }}>{`${
                      tvBox?.price?.oneTimeAmountWithoutDiscount ?? tvBox?.price?.oneTimeAmount
                    } ${t(`money`)}`}</Text>
                  </div>
                )}
                {tvBox?.freightPrice?.oneTimeAmount && (
                  <div className={clsx(priceSectionVariants())}>
                    <Text spacing="none">{t(`STEPTWO.freight`)}</Text>
                    <Text spacing="none">{`${tvBox?.freightPrice?.oneTimeAmount} ${t(`money`)}`}</Text>
                  </div>
                )}
                {!!tvBox?.price?.campaign && (
                  <div className={clsx(kwhPriceSectionWithDiscountVariants())}>
                    <Text spacing="none" style={{ color: '#B8220B', fontSize: '12px' }}>
                      {t('STEPTWO.discount')}
                    </Text>
                    <Text spacing="none" style={{ color: '#E9391E', fontWeight: 'bold' }}>{`${tvBox.price?.oneTimeAmount} ${t(`money`)}`}</Text>
                  </div>
                )}
              </>
            )}
            <div className={clsx(priceSectionVariants({ withNormalBorderTop: true }))} />
            <div className={clsx(priceSectionVariants())}>
              <Text spacing="none">{t(`totalFirstYear`)}</Text>
              <Text spacing="none">{`${offer?.comparisonPriceAmount * 12} ${t('money')}`}</Text>
            </div>
            <div className={clsx(priceSectionVariants())}>
              <Text spacing="none" className="!text-[18px] !font-bold" variant="providerDetails">
                {t(`STEPTWO.comparisonPrice`)}
              </Text>
              <Text spacing="none" className="!text-[18px] !font-bold" variant="providerDetails">{`${offer?.comparisonPriceAmount} ${t('STEPTWO.pricePerMonth')}`}</Text>
            </div>
          </div>
        </Flex>
      </Flex>
      {isTVInOffer && (
        <div className={clsx(whiteWrapperVariants(), 'mt-8', !isTabletPortraitOrGreater ? 'mb-4' : 'mb-0')}>
          <div className={clsx(priceSectionVariants({ withHover: true }))} onClick={() => setShowMore(!showMore)}>
            <Text spacing="none" variant="providerDetails" style={{ paddingBottom: 0 }}>
              {tvOffer?.title ?? tvOffer?.name}
            </Text>
            <div className={clsx(showMoreWrapperVariants())}>{showMore ? <ArrowUp></ArrowUp> : <ArrowDown></ArrowDown>}</div>
          </div>
          {showMore && <Tv tvDetails={tvOffer || isTVInOffer} />}
        </div>
      )}
    </div>
  )
}

export default ProviderDetails
