import React, { ReactElement, useState } from 'react'
import { useTranslation } from 'react-i18next'
import formatDate from '@/appComponents/format'
import { useBroadbandProvider } from '@/common/context/broadband/broadbandProvider.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import { ShortLocale } from '@/common/enums/LocaleEnum'
import useResponsive from '@/common/hooks/useResponsive'
import ArrowForward from '@/components/atoms/ArrowForward'
import Button from '@/components/atoms/Button'
import Flex from '@/components/atoms/Flex'
import ArrowRightThin from '@/components/atoms/Icons/ArrowRightThin'
import ImageKit from '@/components/atoms/ImageKit'
import Text from '@/components/atoms/Text'
import ArrowDown from '@/public/images/Arrow-down-black.svg'
import ArrowUp from '@/public/images/Arrow-up-black.svg'
import TelevisonSimple from '@/public/images/TelevisionSimple.svg'
import WifiHigh from '@/public/images/WifiHigh.svg'
import ProviderDetails from '../ProviderDetails/ProviderDetails'
import {
  showMoreSectionVariants,
  additionalServicesVariants,
  showMoreTextVariants,
  speedVariants,
  largeButtonWrapperVariants,
  priceAndDiscountTextBoldVariants,
  discountPriceVariants,
  electricityProviderCardWrapperVariants,
  priceAndDiscountWrapperVariants,
  movingPriceBoxVariants,
  priceAndDiscountInfoWrapperVariants,
  electricityProviderCardHeaderContentVariants,
} from './BroadbandOfferCard.variants'

export interface ElectricityProviderCardProps {
  offer: BroadbandOfferData
  showMorePreOpened?: boolean
  popupText: ReactElement
  setCurrentStep?: (step: number) => void
}

const BroadbandProviderCard = ({ offer, showMorePreOpened, popupText, setCurrentStep }: ElectricityProviderCardProps) => {
  const { setChosenOffer, saveOrder } = useBroadbandProvider()
  const {
    user,
    user: {
      currentMove: { toAddress: { apartmentNumber = '' } = { apartmentNumber: '' }, movingDate },
    },
  } = useUserContext()
  const { isTabletPortraitOrGreater } = useResponsive()
  const { t, i18n } = useTranslation(['broadband', 'common'])
  const locale = i18n.language
  const [showMore, setShowMore] = useState(showMorePreOpened || false)
  const isRouterInOffer = offer?.additionalProducts?.find((x) => x.type === 'router')
  const isTVInOffer = offer?.additionalProducts?.find((x) => x.type === 'tv' || x.category === 'tv')
  const channelsCount = isTVInOffer && (isTVInOffer.additionalProducts?.find((x) => x.category === 'tv')?.extraData?.channels?.length || isTVInOffer?.extraData?.channels?.length)
  const offerType = offer.type !== 'mobile' ? 'fixed' : 'mobile'
  const hasAllInfoToDisplayPrice = offer.name
  const buttonIsDisabled = !hasAllInfoToDisplayPrice

  const choseOrder = () => {
    setChosenOffer(offer)
    addOrder(offer)
    setCurrentStep && setCurrentStep(2)
  }

  const addOrder = (offerParam: BroadbandOfferData) => {
    const startDate = new Date(movingDate) ?? new Date()
    const formattedOrder = {
      offerId: offerParam.id,
      userId: user.profile.id,
      additionalProducts: [],
      cancelExistingContract: false,
      existingProvider: '',
      selectedFlatNr: apartmentNumber || null,
      startDate: formatDate(startDate, 'yyyy-MM-dd'),
      endDate: '',
      groupDealChosen: false,
    }
    saveOrder(formattedOrder)
  }

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
    <div className={electricityProviderCardWrapperVariants()} data-testid="electricity-provider-card-container">
      <div className={electricityProviderCardHeaderContentVariants()}>
        <Flex alignItems="center" style={{ gap: 32 }}>
          <ImageKit src={`/Products/Broadband/${offer.company}.svg`} height={isTabletPortraitOrGreater ? 50 : 36} width={95} objectFit="contain" />
          {isTabletPortraitOrGreater && (
            <Text spacing="none" variant="extraLargeBold" style={{ maxWidth: 400, lineHeight: '22px', display: 'block' }}>
              {offer.title}
            </Text>
          )}
        </Flex>
        {hasAllInfoToDisplayPrice ? (
          <>
            {!isTabletPortraitOrGreater && (
              <div className={movingPriceBoxVariants({ isFixed: offerType === 'fixed' })}>
                <Text spacing="none" className={priceAndDiscountTextBoldVariants()}>
                  {offerType === 'fixed' ? t('fixedBroadband') : t('mobileBroadband')}
                </Text>
              </div>
            )}
            {isTabletPortraitOrGreater && (
              <div className={priceAndDiscountWrapperVariants()}>
                <Text spacing="none" className={discountPriceVariants()}>
                  <span style={{ fontSize: '32px', paddingRight: '8px' }}>{offer.comparisonPriceAmount}</span>
                  <span style={{ fontSize: '32px' }}>{t('money')}</span>
                  {t('perMonth')}
                </Text>
              </div>
            )}
          </>
        ) : (
          <>
            {isTabletPortraitOrGreater && (
              <Text spacing="none" style={{ maxWidth: 187, fontStyle: 'italic' }}>
                {t('STEPTWO.addInfoToSeePrice')}
              </Text>
            )}
            {!isTabletPortraitOrGreater && (
              <div className={movingPriceBoxVariants()}>
                <Text spacing="none" className={priceAndDiscountTextBoldVariants()}>
                  {offerType === 'fixed' ? t('fixedBroadband') : t('mobileBroadband')}
                </Text>{' '}
              </div>
            )}
          </>
        )}
      </div>
      <div className={priceAndDiscountInfoWrapperVariants()}>
        <Flex
          style={{ width: isTabletPortraitOrGreater ? '110%' : '100%', gap: 8 }}
          alignItems="center"
          justifyContent={isTabletPortraitOrGreater && !hasAllInfoToDisplayPrice ? 'start' : isTabletPortraitOrGreater && hasAllInfoToDisplayPrice ? 'start' : 'space-between'}
        >
          {isTabletPortraitOrGreater && (
            <>
              <div className={movingPriceBoxVariants({ isFixed: offerType === 'fixed' })}>
                <Text spacing="none" className={priceAndDiscountTextBoldVariants()}>
                  {offerType === 'fixed' ? t('fixedBroadband') : t('mobileBroadband')}
                </Text>{' '}
              </div>
              <div className={speedVariants()}>
                <Text spacing="none" className="w-fit rounded-lg text-[#1F6156] px-3 py-2 text-base !font-bold bg-[#C5EDE6]">
                  {getRightUnit()}
                </Text>
              </div>
              <Flex direction="column">
                {isRouterInOffer && (
                  <div className={additionalServicesVariants()}>
                    <Flex direction="row" alignItems="center">
                      <WifiHigh />
                      {isRouterInOffer?.optional ? (
                        <Text spacing="none" variant="body" className="!text-xs px-1">
                          {t('STEPTWO.router')} {t('STEPTWO.asAddonOn').replace('.', '')}
                        </Text>
                      ) : (
                        <Text spacing="none" variant="body" className="!text-xs px-1">
                          {t('router')}
                        </Text>
                      )}
                    </Flex>
                  </div>
                )}
                {isTVInOffer && (
                  <div className={additionalServicesVariants()}>
                    <Flex direction="row" alignItems="center">
                      <TelevisonSimple />
                      <Text spacing="none" className="!text-xs px-1">
                        {t('STEPTWO.numberOfChannels', { channelLength: channelsCount?.toString() || '' })}
                      </Text>
                    </Flex>
                  </div>
                )}
              </Flex>
            </>
          )}
          {!isTabletPortraitOrGreater && (
            <Flex direction="column" style={{ gap: 16, minWidth: '100%' }}>
              <Text spacing="none" variant="extraLargeBold" style={{ maxWidth: 400, lineHeight: '22px' }}>
                {offer.title}
              </Text>
              <Flex style={{ width: '100%' }}>
                <div className={speedVariants()}>
                  <Text spacing="none" className="w-fit rounded-lg text-[#1F6156] px-3 py-2 !text-base !font-bold bg-[#C5EDE6]">
                    {getRightUnit()}
                  </Text>
                </div>
                <div className={priceAndDiscountWrapperVariants()}>
                  <Text spacing="none" className={discountPriceVariants()}>
                    <span style={{ fontSize: '32px', paddingRight: '8px' }}>{offer.comparisonPriceAmount}</span>
                    <span style={{ fontSize: '32px' }}>{t('money')}</span>
                    {t('perMonth')}
                  </Text>
                </div>
              </Flex>
              <Flex direction="column">
                {isRouterInOffer && (
                  <div className={additionalServicesVariants()}>
                    <Flex direction="row" alignItems="center">
                      <WifiHigh />
                      {isRouterInOffer?.optional ? (
                        <Text spacing="none" className="text-xs px-1">
                          {t('STEPTWO.router')} {t('STEPTWO.asAddonOn').replace('.', '')}
                        </Text>
                      ) : (
                        <Text spacing="none" className="text-xs px-1">
                          {t('router')}
                        </Text>
                      )}
                    </Flex>
                  </div>
                )}
                {isTVInOffer && (
                  <div className={additionalServicesVariants()}>
                    <Flex direction="row" alignItems="center">
                      <TelevisonSimple />
                      <Text spacing="none" className="text-xs px-1">
                        {t('STEPTWO.numberOfChannels', { channelLength: channelsCount?.toString() || '' })}
                      </Text>
                    </Flex>
                  </div>
                )}
              </Flex>
            </Flex>
          )}
        </Flex>
        <Flex justifyContent={isTabletPortraitOrGreater ? 'center' : 'space-between'} style={{ marginLeft: isTabletPortraitOrGreater ? 'auto' : 'none', width: '100%' }}>
          <div className={showMoreSectionVariants()} onClick={() => setShowMore(!showMore)}>
            <Text spacing="none" className={showMoreTextVariants()}>
              {t('common:readMore')}
            </Text>
            {showMore ? <ArrowUp></ArrowUp> : <ArrowDown></ArrowDown>}
          </div>
          <div className={largeButtonWrapperVariants({ withLessPaddingAndFontSize: locale !== ShortLocale.SV && !isTabletPortraitOrGreater })}>
            <Button
              iconRight={<ArrowRightThin />}
              iconColor="var(--color-secondary-main)"
              variant="outline"
              text={t('orderBroadband')}
              disabled={buttonIsDisabled}
              padding={isTabletPortraitOrGreater ? '10px 32px' : '8px 24px'}
              onClick={() => {
                choseOrder()
              }}
            />
          </div>
        </Flex>
      </div>
      {showMore && <ProviderDetails offer={offer} popupText={popupText} />}
    </div>
  )
}

export default BroadbandProviderCard
