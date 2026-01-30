import React, { ReactElement, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { useElectricityProvider } from '@/common/context/electricity/electricityContext.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import { ElectricityEnum, ElectricityIconsUrls } from '@/common/enums/ElectricityEnum'
import { ShortLocale } from '@/common/enums/LocaleEnum'
import useResponsive from '@/common/hooks/useResponsive'
import Button from '@/components/atoms/Button'
import Flex from '@/components/atoms/Flex'
import Text from '@/components/atoms/Text'
import { VATTENFALL, TIBBER, FORTUM } from '@/constants/electricity'
import { ElectricityProviderType } from '@/pageTypes/electricity'
import ArrowDown from '@/public/images/Arrow-down-black.svg'
import ArrowUp from '@/public/images/Arrow-up-black.svg'
import ArrowRightThin from '@/public/images/ArrowRight_v2_white.svg'
import ProviderDetails from '../ProviderDetails/ProviderDetails'
import {
  showMoreSectionVariants,
  showMoreTextVariants,
  largeButtonWrapperVariants,
  priceAndDiscountTextBoldVariants,
  priceAndDiscountTextRedBoldVariants,
  discountPriceVariants,
  discountedPriceVariants,
  electricityProviderCardWrapperVariants,
  priceAndDiscountWrapperVariants,
  movingPriceBoxVariants,
  discountBoxVariants,
  noDiscountBoxVariants,
  priceAndDiscountInfoWrapperVariants,
  electricityProviderCardHeaderContentVariants,
} from './ElectricityProviderCard.variants'

export interface ElectricityProviderCardProps {
  provider: ElectricityProviderType
  showMorePreOpened?: boolean
  popupText: ReactElement
  setCurrentStep?: (step: number) => void
}

const ElectricityProviderCard = ({ provider, showMorePreOpened, popupText, setCurrentStep }: ElectricityProviderCardProps) => {
  const { selectProvider, consumptionValue } = useElectricityProvider()
  const {
    user: { currentMove },
  } = useUserContext()
  const { isTabletPortraitOrGreater } = useResponsive()
  const { t, i18n } = useTranslation(['electricity', 'common'])
  const locale = i18n.language
  const [showMore, setShowMore] = useState(showMorePreOpened || false)
  const hasDiscount = provider.discountPeriod > 0 && provider.monthlyCostWithDiscount?.toFixed(2) !== provider.monthlyCostWithoutDiscountRounded?.toFixed(2)

  const hasAllInfoToDisplayPrice = currentMove?.residenceSize > 0 && !!currentMove?.residenceType && !!currentMove?.toAddress?.street
  const buttonIsDisabled = consumptionValue === 0 || consumptionValue === null || consumptionValue === '' || !hasAllInfoToDisplayPrice

  return (
    <div className={electricityProviderCardWrapperVariants()} data-testid="electricity-provider-card-container">
      <div className={electricityProviderCardHeaderContentVariants()}>
        <div style={{ height: 48, width: 180, overflow: 'hidden', position: 'relative' }}>
          <Image
            alt=" "
            src={`https://ik.imagekit.io/flyttsmart${ElectricityEnum?.[provider.provider as keyof ElectricityIconsUrls]}`}
            fill
            style={{ objectFit: provider.provider === TIBBER ? 'cover' : 'contain' }}
          />
        </div>
        {hasAllInfoToDisplayPrice ? (
          <>
            {!isTabletPortraitOrGreater && (
              <div className={movingPriceBoxVariants()}>
                <Text spacing="none" className={priceAndDiscountTextBoldVariants()}>
                  {provider?.provider === TIBBER ? t('quarterPrice') : provider.provider === FORTUM ? t('movingPriceMonthly') : t('movingPrice')}
                </Text>
              </div>
            )}

            {isTabletPortraitOrGreater && (
              <div className={priceAndDiscountWrapperVariants()}>
                {hasDiscount && (
                  <Text spacing="none" className={discountedPriceVariants()}>
                    <span style={{ fontSize: '32px' }}>
                      {Math.round(provider.monthlyCostWithDiscount)} {''}
                    </span>
                    <span style={{ fontSize: '32px' }}>{t('money')}</span>
                    {t('perMonth')}
                  </Text>
                )}
                {!hasDiscount && (
                  <Text spacing="none" className={discountPriceVariants()}>
                    <span style={{ fontSize: '32px' }}>
                      {Math.round(provider.monthlyCostWithoutDiscountRounded)} {''}
                    </span>
                    <span style={{ fontSize: '32px' }}>{t('money')}</span>
                    {t('perMonth')}
                  </Text>
                )}
                <Text variant="bodyBold" style={{ margin: '4px -4px 4px 0' }}>
                  {`(${+Number(provider?.totalKwhPriceExcDiscount - provider?.kwhDiscount).toFixed(2)} ${t(`PROVIDERDETAILS.pennyKwh`)})`}
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
                  {provider?.provider === TIBBER ? t('quarterPrice') : provider.provider === FORTUM ? t('movingPriceMonthly') : t('movingPrice')}
                </Text>
              </div>
            )}
          </>
        )}
      </div>
      <div className={priceAndDiscountInfoWrapperVariants()}>
        <Flex
          style={{ width: isTabletPortraitOrGreater ? '110%' : '100%', gap: 8 }}
          alignItems="start"
          direction={isTabletPortraitOrGreater ? 'column' : 'row'}
          justifyContent={isTabletPortraitOrGreater && !hasAllInfoToDisplayPrice ? 'start' : isTabletPortraitOrGreater && hasAllInfoToDisplayPrice ? 'center' : 'space-between'}
        >
          <Flex style={{ gap: 8 }}>
            {isTabletPortraitOrGreater && (
              <div className={movingPriceBoxVariants()}>
                <Text spacing="none" className={priceAndDiscountTextBoldVariants()}>
                  {provider?.provider === TIBBER ? t('quarterPrice') : provider.provider === FORTUM ? t('movingPriceMonthly') : t('movingPrice')}
                </Text>
              </div>
            )}

            {hasAllInfoToDisplayPrice && (
              <Flex alignItems="center" style={{ gap: isTabletPortraitOrGreater ? '12px' : '6px' }} direction={isTabletPortraitOrGreater ? 'row' : 'column'}>
                {provider?.discountPeriod > 0 ? (
                  <div className={discountBoxVariants()}>
                    <Text spacing="none" className={priceAndDiscountTextRedBoldVariants()}>
                      {provider?.discountPeriod === 1 ? `${provider.discountPeriod} ${t('oneMonth')}` : `${provider.discountPeriod} ${t('multipleMonths')} ${t('discount')}`}
                    </Text>
                  </div>
                ) : (
                  <div className={noDiscountBoxVariants()}>
                    <Text spacing="none" className={priceAndDiscountTextBoldVariants()}>
                      {t('noDiscount')}
                    </Text>
                  </div>
                )}
                {!isTabletPortraitOrGreater && (
                  <Text
                    spacing="none"
                    style={{
                      fontStyle: 'italic',
                      fontWeight: '400',
                      fontSize: '14px',
                      color: 'var(--fs-colors-secondaryDark)',
                      marginTop: isTabletPortraitOrGreater ? '0px' : '4px',
                    }}
                  >
                    {t('noCuringPeriod')}
                  </Text>
                )}
              </Flex>
            )}
          </Flex>
          {isTabletPortraitOrGreater && (
            <Text
              spacing="none"
              style={{ fontStyle: 'italic', fontWeight: '400', fontSize: '14px', color: 'var(--fs-colors-secondaryDark)', marginTop: isTabletPortraitOrGreater ? '0px' : '4px' }}
            >
              {t('noCuringPeriod')}
            </Text>
          )}
          {hasAllInfoToDisplayPrice ? (
            <>
              {!isTabletPortraitOrGreater && (
                <div className={priceAndDiscountWrapperVariants()}>
                  {hasDiscount && (
                    <Text spacing="none" className={discountedPriceVariants()}>
                      <span style={{ fontSize: '32px' }}>
                        {Math.round(provider.monthlyCostWithDiscount)} {''}
                      </span>
                      <span style={{ fontSize: '32px' }}>{t('money')}</span>
                      {t('perMonth')}
                    </Text>
                  )}
                  {!hasDiscount && (
                    <Text spacing="none" className={discountPriceVariants()}>
                      <span style={{ fontSize: '32px' }}>
                        {Math.round(provider.monthlyCostWithoutDiscountRounded)} {''}
                      </span>
                      <span style={{ fontSize: '32px' }}>{t('money')}</span>
                      {t('perMonth')}
                    </Text>
                  )}
                  <Text
                    style={{ margin: '4px -4px 4px 0' }}
                    variant="bodyBold"
                  >{`(${provider?.provider === VATTENFALL ? provider?.totalKwhPriceExcDiscount : provider?.monthlyPrice2000} ${t(`PROVIDERDETAILS.pennyKwh`)})`}</Text>
                </div>
              )}
            </>
          ) : (
            <>
              {!isTabletPortraitOrGreater && (
                <Text spacing="none" style={{ maxWidth: 187, fontStyle: 'italic', marginLeft: 'auto' }}>
                  {t('STEPTWO.addInfoToSeePrice')}
                </Text>
              )}
            </>
          )}
        </Flex>
        <Flex justifyContent={isTabletPortraitOrGreater ? 'center' : 'space-between'} style={{ marginLeft: isTabletPortraitOrGreater ? 'auto' : 'none', width: '100%' }}>
          <div className={showMoreSectionVariants()} onClick={() => setShowMore(!showMore)}>
            <Text spacing="none" className={showMoreTextVariants()}>
              {t('common:readMore')}
            </Text>
            {showMore ? <ArrowUp></ArrowUp> : <ArrowDown></ArrowDown>}
          </div>
          <div className={largeButtonWrapperVariants()}>
            <Button
              iconRight={<ArrowRightThin color={buttonIsDisabled ? '#fff' : 'var(--fs-colors-secondaryDark)'} />}
              text={t('bookElectricity')}
              disabled={buttonIsDisabled}
              variant="primary"
              largerArrowRight
              withFullWidth
              padding={isTabletPortraitOrGreater && locale === ShortLocale.EN ? '8px' : isTabletPortraitOrGreater ? '8px 24px' : '10px 24px 10px 32px'}
              onClick={() => {
                selectProvider(provider.provider)
                setCurrentStep && setCurrentStep(2)
              }}
            />
          </div>
        </Flex>
      </div>
      {showMore && <ProviderDetails provider={provider} popupText={popupText} />}
    </div>
  )
}

export default ElectricityProviderCard
