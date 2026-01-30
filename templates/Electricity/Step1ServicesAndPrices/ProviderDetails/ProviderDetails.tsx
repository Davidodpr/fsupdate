import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'
import sub from 'date-fns/sub'
import Image from 'next/image'
import formatDate from '@/appComponents/format'
import { useElectricityProvider } from '@/common/context/electricity/electricityContext.provider'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import useResponsive from '@/common/hooks/useResponsive'
import Flex from '@/components/atoms/Flex'
import Text from '@/components/atoms/Text'
import Popup from '@/components/molecules/PopupNew'
import { VATTENFALL, FORTUM, SKEKRAFT, TIBBER } from '@/constants/electricity'
import { ElectricityProviderType } from '@/pageTypes/electricity'
import CheckMark from '@/public/images/CheckGreen.svg'
import {
  providerInfoBulletsVariants,
  questionMarkWrapperVariants,
  providerHeaderAndTextVariants,
  boldTextVariants,
  boldDiscountTextVariants,
  detailsTextSectionVariants,
  providerHeaderAndBenefitsWrapperVariants,
  providerDetailsWrapperVariants,
  kwhPriceSectionVariants,
  kwhPriceSectionWithDiscountVariants,
  monthlyPriceSectionVariants,
  topBenefitsSectionWrapperVariants,
  greyWrapperVariants,
  whiteWrapperVariants,
  providerHeaderVariants,
} from './ProviderDetails.variants'

export interface ProviderDetailsProps {
  provider: ElectricityProviderType
  popupText: ReactElement
  onlyPriceSpecfication?: boolean
  customConsumptionValue?: number
}

const ProviderDetails = ({ provider, popupText, onlyPriceSpecfication, customConsumptionValue }: ProviderDetailsProps) => {
  const { t } = useTranslation(['electricity', 'common'])
  const { iconSet } = useThemeContext()
  const { consumptionValue } = useElectricityProvider()
  const monthlyConsumption = Number(customConsumptionValue ?? consumptionValue) / 12
  const { isTabletPortraitOrGreater } = useResponsive()
  const monthlyCostWithDiscount = Number((provider.totalKwhPriceExcDiscount * monthlyConsumption) / 100)

  const FORTUM_FIXED_SURCHARGE = 3.90

  const getElectricityTax = (price: number, markup: number, powerCertificate: number, movingCost?: number) => {
    // For Fortum, calculate tax based on: spotPrice + movingCost + fixedSurcharge (no powerCertificate)
    if (provider.provider === FORTUM && movingCost !== undefined) {
      return +((Number(price) + Number(movingCost) + FORTUM_FIXED_SURCHARGE) * 0.25).toFixed(2)
    }
    // For other providers, use the original calculation
    return +((Number(price) + markup + powerCertificate) * 0.25).toFixed(2)
  }
  const getLastDetailPoints = (providerName: string) => {
    switch (providerName) {
      case SKEKRAFT:
        return (
          <>
            <li>
              <CheckMark style={{ paddingTop: '2px' }} />
              <Text className={boldTextVariants()} spacing="none">
                {t(`PROVIDERDETAILS.${provider.provider}.discountPeriod`, { months: provider.discountPeriod, price: provider.subscriptionFee * provider.discountPeriod })}
              </Text>
            </li>
            <li>
              <CheckMark style={{ paddingTop: '2px' }} />
              <Text className={boldTextVariants()} spacing="none">
                {t(`PROVIDERDETAILS.${provider.provider}.discount`, { months: provider.discountPeriod, discount: provider.kwhDiscount || provider.subscriptionFeeDiscount })}
              </Text>
            </li>
          </>
        )
      case TIBBER:
        return (
          <>
            <li>
              <CheckMark style={{ paddingTop: '2px' }} />
              <Text className={boldTextVariants()} spacing="none">
                {t(`PROVIDERDETAILS.${provider.provider}.noBindingPeriod`)}
              </Text>
            </li>
          </>
        )
      case VATTENFALL:
        return (
          <>
            <li>
              <CheckMark style={{ paddingTop: '2px' }} />
              <Text className={boldTextVariants()} spacing="none">
                {t(`PROVIDERDETAILS.${provider.provider}.discountPeriod`)}
              </Text>
            </li>
            <li>
              <CheckMark style={{ paddingTop: '2px' }} />
              <Text className={boldTextVariants()} spacing="none">
                {t(`PROVIDERDETAILS.${provider.provider}.discount`, { months: provider.discountPeriod, discount: provider.kwhDiscount || provider.subscriptionFeeDiscount })}
              </Text>
            </li>
          </>
        )
      case FORTUM:
        return (
          <li>
            <CheckMark style={{ paddingTop: '2px' }} />
            <Text className={boldTextVariants()} spacing="none">
              {t(`PROVIDERDETAILS.${provider.provider}.discount`, { months: provider.discountPeriod })}
            </Text>
          </li>
        )
      default:
        return null
    }
  }
  return (
    <div className={providerDetailsWrapperVariants()} data-testid="provider-details-container">
      {!onlyPriceSpecfication && (
        <div className={providerHeaderAndBenefitsWrapperVariants()}>
          <div className={providerHeaderAndTextVariants()}>
            <Text className={providerHeaderVariants()} variant="providerDetails" spacing="none">
              {t(`PROVIDERDETAILS.${provider.provider}.header`)}
            </Text>
            <Text spacing="bottom" variant="bodyLarge">
              {t(`PROVIDERDETAILS.${provider.provider}.description`)}
            </Text>
          </div>
        </div>
      )}
      <Flex style={{ gap: 32 }} direction={isTabletPortraitOrGreater ? 'row' : 'column'}>
        {!onlyPriceSpecfication && (
          <Flex direction="column" alignItems="start" style={{ width: '100%', maxWidth: isTabletPortraitOrGreater ? '280px' : '100%' }}>
            <Text
              variant="providerDetails"
              spacing="none"
              style={{ padding: isTabletPortraitOrGreater ? '0 0 8px 16px' : '17px 0 8px 16px', height: isTabletPortraitOrGreater ? 32 : 'unset' }}
            >
              {t(`PROVIDERDETAILS.benefits`)}
            </Text>
            <div className={topBenefitsSectionWrapperVariants()}>
              <ul className={providerInfoBulletsVariants()}>
                <li>
                  <CheckMark style={{ paddingTop: '2px' }} />
                  <Text variant="bodyLarge" spacing="none">
                    {t(`PROVIDERDETAILS.${provider.provider}.benefits1`)}
                  </Text>
                </li>
                <li>
                  <CheckMark style={{ paddingTop: '2px' }} />
                  <Text variant="bodyLarge" spacing="none">
                    {t(`PROVIDERDETAILS.${provider.provider}.benefits2`)}
                  </Text>
                </li>
                <li>
                  <CheckMark style={{ paddingTop: '2px' }} />
                  <Text variant="bodyLarge" spacing="none">
                    {t(`PROVIDERDETAILS.${provider.provider}.benefits3`)}
                  </Text>
                </li>
                {provider.provider !== FORTUM && (
                  <li>
                    <CheckMark style={{ paddingTop: '2px' }} />
                    <Text variant="bodyLarge" spacing="none">
                      {t(`PROVIDERDETAILS.${provider.provider}.benefits4`)}
                    </Text>
                  </li>
                )}
                {getLastDetailPoints(provider.provider)}
              </ul>
            </div>
            <Text variant="providerDetails" spacing="none" style={{ padding: isTabletPortraitOrGreater ? '16px 0 8px 16px' : '32px 0 8px 16px' }}>
              {t(`PROVIDERDETAILS.details`)}
            </Text>
            <div className={greyWrapperVariants({ withoutTopMargin: true })}>
              <div className={detailsTextSectionVariants()} style={{ paddingBottom: provider.provider === TIBBER ? 0 : '16px' }}>
                <Text spacing="none" variant="bodyBold">
                  {t(`PROVIDERDETAILS.typeOfContract`)}
                </Text>
                <Text spacing="none">{provider?.provider === TIBBER ? t('quarterPrice') : provider?.provider === FORTUM ? t('movingPriceMonthly') : t('movingPrice')}</Text>
              </div>
              {provider.provider !== TIBBER && (
                <>
                  <div className={detailsTextSectionVariants()}>
                    <Text spacing="none" variant="bodyBold">
                      {t(`bindingTime`)}
                    </Text>
                    <Text spacing="none">{t('zeroMonths')}</Text>
                  </div>
                  <div className={detailsTextSectionVariants()} style={{ paddingBottom: provider?.discountPeriod > 0 ? '16px !important' : '0px !important' }}>
                    <Text spacing="none" variant="bodyBold">
                      {t(`terminationPeriod`)}
                    </Text>
                    <Text spacing="none">{t('oneMonth')}</Text>
                  </div>
                </>
              )}
              {provider?.discountPeriod > 0 && (
                <div className={detailsTextSectionVariants()} style={{ paddingBottom: 0 }}>
                  <Text spacing="none" variant="bodyBold" style={{ color: 'var(--fs-colors-primaryMain' }}>
                    {t(`discountPeriod`)}
                  </Text>
                  <Text spacing="none" style={{ color: 'var(--fs-colors-primaryMain' }}>
                    {provider?.discountPeriod} {t('multipleMonths')}
                  </Text>
                </div>
              )}
            </div>
          </Flex>
        )}
        <Flex direction="column" style={{ width: '100%' }}>
          <Flex alignItems="center" style={{ padding: '0 0 8px 16px', gap: 2 }}>
            <Text variant="providerDetails" spacing="none">
              {t('priceSpecification')}
            </Text>
            <Popup textMargin noUnderline text={popupText}>
              <span className={questionMarkWrapperVariants()}>
                <Image src={iconSet.INFO_ICON} alt="question icon" width={24} height={24} />
              </span>
            </Popup>
          </Flex>
          <div className={greyWrapperVariants({ withoutTopMargin: true })}>
            {provider.provider === FORTUM ? (
              <>
                {/* Fortum-specific price breakdown */}
                <div className={kwhPriceSectionVariants({ withDiscountPadding: provider?.kwhDiscount > 0 })}>
                  <Text spacing="none">{t(`PROVIDERDETAILS.averageSpotPriceText`)}</Text>
                  <Text spacing="none" style={{ textDecoration: provider?.kwhDiscount > 0 ? 'line-through' : 'none' }}>{`${provider.pricePerKwhExVat} ${t(
                    `PROVIDERDETAILS.pennyKwh`,
                  )}`}</Text>
                </div>
                {provider?.kwhDiscount > 0 && (
                  <div className={kwhPriceSectionWithDiscountVariants()}>
                    <Text spacing="none" variant="bodyBoldSmall" style={{ color: 'var(--fs-colors-primaryMain)', fontSize: '12px' }}>
                      {t('withDiscountPerCent', { discount: provider.kwhDiscount })}
                    </Text>
                    <Text
                      spacing="none"
                      variant="bodyBold"
                      style={{ color: 'var(--fs-colors-primaryMain)', fontWeight: 'bold !important' }}
                    >{`${Number(Number(provider.pricePerKwhExVat) - Number(provider.kwhDiscount)).toFixed(2)} ${t(`PROVIDERDETAILS.pennyKwh`)}`}</Text>
                  </div>
                )}
                {provider?.movingCost !== undefined && (
                  <div className={kwhPriceSectionVariants()}>
                    <Text spacing="none">{t(`PROVIDERDETAILS.movingCostsText`)}</Text>
                    <Text spacing="none">{`${provider.movingCost} ${t(`PROVIDERDETAILS.pennyKwh`)}`}</Text>
                  </div>
                )}
                <div className={kwhPriceSectionVariants()}>
                  <Text spacing="none">{t(`PROVIDERDETAILS.fixedSurchargeText`)}</Text>
                  <Text spacing="none">{`${FORTUM_FIXED_SURCHARGE} ${t(`PROVIDERDETAILS.pennyKwh`)}`}</Text>
                </div>
                <div className={kwhPriceSectionVariants({ withBottomBorder: true })}>
                  <Text spacing="none">{t(`PROVIDERDETAILS.taxesWithPercent`)}</Text>
                  <Text spacing="none">
                    {`${
                      provider.vatAndLicense
                        ? +Number(provider.vatAndLicense.toFixed(2))
                        : getElectricityTax(provider.pricePerKwhExVat, provider.markupPerKwhExVat, provider.powerCertificate, provider.movingCost)
                    } ${t(`PROVIDERDETAILS.pennyKwh`)}`}
                  </Text>
                </div>
              </>
            ) : (
              <>
                {/* Standard price breakdown for other providers */}
                <div className={kwhPriceSectionVariants({ withDiscountPadding: provider?.kwhDiscount > 0 })}>
                  <Text spacing="none">{t(`PROVIDERDETAILS.electricityPriceText`)}</Text>
                  <Text spacing="none" style={{ textDecoration: provider?.kwhDiscount > 0 ? 'line-through' : 'none' }}>{`${provider.pricePerKwhExVat} ${t(
                    `PROVIDERDETAILS.pennyKwh`,
                  )}`}</Text>
                </div>
                {provider?.kwhDiscount > 0 && (
                  <div className={kwhPriceSectionWithDiscountVariants()}>
                    <Text spacing="none" variant="bodyBoldSmall" style={{ color: 'var(--fs-colors-primaryMain)', fontSize: '12px' }}>
                      {t('withDiscountPerCent', { discount: provider.kwhDiscount })}
                    </Text>
                    <Text
                      spacing="none"
                      variant="bodyBold"
                      style={{ color: 'var(--fs-colors-primaryMain)', fontWeight: 'bold !important' }}
                    >{`${Number(Number(provider.pricePerKwhExVat) - Number(provider.kwhDiscount)).toFixed(2)} ${t(`PROVIDERDETAILS.pennyKwh`)}`}</Text>
                  </div>
                )}
                <div className={kwhPriceSectionVariants()}>
                  <Text spacing="none">{t(`PROVIDERDETAILS.addOnsText`)}</Text>
                  <Text spacing="none">{`${provider.markupPerKwhExVat} ${t(`PROVIDERDETAILS.pennyKwh`)}`}</Text>
                </div>
                {!!provider?.powerCertificate && (
                  <div className={kwhPriceSectionVariants()}>
                    <Text spacing="none">{t(`PROVIDERDETAILS.powerCertificateText`)}</Text>
                    <Text spacing="none">{`${provider.powerCertificate} ${t(`PROVIDERDETAILS.pennyKwh`)}`}</Text>
                  </div>
                )}
                <div className={kwhPriceSectionVariants({ withBottomBorder: true })}>
                  <Text spacing="none">{t(`PROVIDERDETAILS.taxes`)}</Text>
                  <Text spacing="none">
                    {`${
                      provider.vatAndLicense
                        ? +Number(provider.vatAndLicense.toFixed(2))
                        : getElectricityTax(provider.pricePerKwhExVat, provider.markupPerKwhExVat, provider.powerCertificate)
                    } ${t(`PROVIDERDETAILS.pennyKwh`)}`}
                  </Text>
                </div>
              </>
            )}
            <div className={kwhPriceSectionVariants()} style={{ paddingTop: '8px', fontWeight: 700, paddingBottom: 0 }}>
              <Text className={boldTextVariants()} spacing="none" style={{ paddingBottom: 0 }}>
                {t(`PROVIDERDETAILS.yourPrice`)}
              </Text>
              <Text
                className={boldTextVariants()}
                spacing="none"
                style={{ paddingBottom: 0, textAlign: 'right' }}
              >{`${(provider.totalKwhPriceExcDiscount - provider.kwhDiscount).toFixed(2)} ${t(`PROVIDERDETAILS.pennyKwh`)}`}</Text>
            </div>
            <div className={monthlyPriceSectionVariants()}>
              <div className={kwhPriceSectionVariants()}>
                <Text spacing="none" style={{ paddingBottom: 0, fontSize: '16px !important' }}>
                  {t(`PROVIDERDETAILS.monthlyFee`)}
                </Text>
                <Text spacing="none" style={{ paddingBottom: 0, textDecoration: provider?.subscriptionFeeDiscount > 0 ? 'line-through' : 'none', fontSize: '16px !important' }}>
                  {provider.subscriptionFee} {t('moneyMonth')}
                </Text>
              </div>
              {provider?.subscriptionFeeDiscount > 0 && (
                <div className={kwhPriceSectionWithDiscountVariants()}>
                  <Text spacing="none" variant="bodyBoldSmall" style={{ color: 'var(--fs-colors-primaryMain)', fontSize: '12px' }}>
                    {t('withDiscountPerMonth', { discount: provider.subscriptionFeeDiscount })}
                  </Text>
                  <Text
                    className={boldTextVariants()}
                    spacing="none"
                    variant="bodyBold"
                    style={{ color: 'var(--fs-colors-primaryMain)', fontWeight: 'bold !important' }}
                  >{`${Number(provider.subscriptionFee) - Number(provider.subscriptionFeeDiscount)} ${t(`moneyMonth`)}`}</Text>
                </div>
              )}
            </div>

            <div className={kwhPriceSectionVariants()} style={{ fontWeight: 700, paddingBottom: 0 }}>
              <Flex direction="column" style={{ width: '50%', paddingBottom: 0 }}>
                {provider.provider === VATTENFALL && !!provider.campaignDiscountWithVAT && provider.campaignDiscountWithVAT > 0 && (
                  <>
                    <Text spacing="none" style={{ fontWeight: 700, fontSize: '14px', paddingBottom: 0, color: 'var(--fs-colors-primaryMain)' }}>
                      {t(`PROVIDERDETAILS.${provider.provider}.campaignDiscount`)}
                    </Text>
                  </>
                )}
                <div style={{ marginTop: provider.provider === VATTENFALL && (provider?.campaignDiscountWithVAT ?? 0) > 0 ? '16px' : 0 }}>
                  <Text className={boldTextVariants()} style={{ maxWidth: '100%' }} spacing="none">
                    {t(`PROVIDERDETAILS.totally`)}
                  </Text>
                </div>
                <div style={{ marginTop: '8px' }}>
                  <Text
                    spacing="none"
                    style={{ fontWeight: 300, fontStyle: 'italic', fontSize: '14px', paddingBottom: 0 }}
                  >{`${monthlyConsumption.toFixed(0)} ${t(`PROVIDERDETAILS.kwhMonth`)}`}</Text>
                </div>
              </Flex>
              <Flex direction="column" alignItems="end">
                {provider.provider === VATTENFALL && !!provider.campaignDiscountWithVAT && provider.campaignDiscountWithVAT > 0 && (
                  <div style={{ marginBottom: '8px' }}>
                    <Text spacing="none" variant="bodyBoldSmall" style={{ color: 'var(--fs-colors-primaryMain)', fontSize: '10px !important' }}>
                      -{`${provider.campaignDiscountWithVAT} ${t(`moneyMonth`)}`}
                    </Text>
                  </div>
                )}
                <Text
                  className={boldTextVariants()}
                  spacing="none"
                  style={{
                    paddingBottom: provider?.monthlyCostWithDiscount > 0 ? '0' : 8,
                    textDecoration:
                      Number(provider?.monthlyCostWithDiscount)?.toFixed(0) !== Number(provider.subscriptionFee + monthlyCostWithDiscount).toFixed(0) ? 'line-through' : 'none',
                  }}
                >
                  {(provider.subscriptionFee + monthlyCostWithDiscount).toFixed(2)} {t('moneyMonth')}
                </Text>

                {Number(provider?.monthlyCostWithDiscount)?.toFixed(0) !== Number(provider.subscriptionFee + monthlyCostWithDiscount).toFixed(0) && (
                  <Text
                    className={boldTextVariants()}
                    spacing="none"
                    style={{ color: 'var(--fs-colors-primaryMain)', fontWeight: 'bold !important' }}
                  >{`${Number(provider?.monthlyCostWithDiscount).toFixed(0)} ${t(`moneyMonth`)}`}</Text>
                )}
              </Flex>
            </div>
          </div>
          <div className={whiteWrapperVariants({ withoutTopMargin: !customConsumptionValue })}>
            <Text variant="mediumBold" spacing="none" style={{ paddingBottom: 16 }}>
              {t(`PROVIDERDETAILS.priceComparisonHeader`)}
              <span style={{ fontWeight: 400, fontSize: 14 }}>
                {' - '}
                {t(`PROVIDERDETAILS.priceComparisonText`, { month: formatDate(sub(new Date(), { months: 1 }), 'LLLL') })}
              </span>
            </Text>
            <div className={kwhPriceSectionVariants()}>
              <Text variant="medium" spacing="none">
                {t(`PROVIDERDETAILS.2000`)}
              </Text>
              <Text variant="medium" spacing="none">
                {`${provider.monthlyPrice2000} ${t(`PROVIDERDETAILS.pennyKwh`)}`}
              </Text>
            </div>
            <div className={kwhPriceSectionVariants()}>
              <Text variant="medium" spacing="none">
                {t(`PROVIDERDETAILS.5000`)}
              </Text>
              <Text variant="medium" spacing="none">
                {`${provider.monthlyPrice5000} ${t(`PROVIDERDETAILS.pennyKwh`)}`}
              </Text>
            </div>
            <div className={kwhPriceSectionVariants()}>
              <Text variant="medium" spacing="none">
                {t(`PROVIDERDETAILS.20000`)}
              </Text>
              <Text variant="medium" spacing="none">
                {`${provider.monthlyPrice20000} ${t(`PROVIDERDETAILS.pennyKwh`)}`}
              </Text>
            </div>
          </div>
        </Flex>
      </Flex>
    </div>
  )
}

export default ProviderDetails
