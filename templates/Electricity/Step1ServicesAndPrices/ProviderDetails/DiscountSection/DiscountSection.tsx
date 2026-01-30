import React from 'react'
import { useTranslation } from 'react-i18next'
import { ElectricityProviderType } from 'types/electricity'
import { useElectricityProvider } from '@/common/context/electricity/electricityContext.provider'
import Text from '@/components/atoms/Text'

export interface DiscountSectionProps {
  provider: ElectricityProviderType
}

const DiscountSection = ({ provider }: DiscountSectionProps) => {
  const { t } = useTranslation(['electricity', 'common'])
  const { consumptionValue } = useElectricityProvider()
  const monthlyConsumption = Number(consumptionValue) / 12
  const monthlyCostWithDiscount = Number((provider.totalKwhPriceExcDiscount * monthlyConsumption) / 100)

  return (
    <div className="w-full bg-[var(--color-inactive-main)] p-4" data-testid="discount-section-container">
      <Text variant="mediumBold" spacing="bottom">
        {t(`PROVIDERDETAILS.montlyCost`)}
      </Text>
      <div className="flex justify-between">
        <Text variant="medium" spacing="none">
          {t(`PROVIDERDETAILS.calculatedUsage`)}
        </Text>
        <Text variant="medium" spacing="none">
          {`${monthlyCostWithDiscount.toFixed(2)} ${t(`moneyMonth`)}`}
        </Text>
      </div>
      <div className="flex justify-start flex-col text-[var(--color-inactive-dark)] max-w-[150px] md:max-w-[300px]">
        <Text variant="medium" spacing="none">
          {`${monthlyConsumption.toFixed(0)} ${t(`PROVIDERDETAILS.kwhMonth`)} * ${provider.totalKwhPriceExcDiscount} ${t(`PROVIDERDETAILS.pennyKwh`)}`}
        </Text>
      </div>
      <div className="flex justify-between border-b border-dashed border-[var(--color-radio-border)]">
        <Text variant="medium" spacing="none">
          {t(`PROVIDERDETAILS.monthlyFee`)}
        </Text>
        <Text variant="medium" spacing="none">
          {provider.subscriptionFee} {t('moneyMonth')}
        </Text>
      </div>
      <div className="flex justify-between pt-[3px]">
        <Text variant="medium" spacing="none">
          {t(`PROVIDERDETAILS.totally`)}
        </Text>
        <Text variant="medium" spacing="none">
          {(provider.subscriptionFee + monthlyCostWithDiscount).toFixed(2)} {t('moneyMonth')}
        </Text>
      </div>
      <div className="flex justify-between">
        <Text variant="mediumBold" className="text-[var(--color-error-red)]">
          {t(`PROVIDERDETAILS.flyttsmartDiscount`, { months: provider.discountPeriod })}
        </Text>
      </div>
      <div className="flex justify-between">
        <Text variant="medium" spacing="none">
          {t(`PROVIDERDETAILS.montlyCost`)}
        </Text>
        <Text variant="medium" spacing="none">
          {(provider.subscriptionFee + monthlyCostWithDiscount).toFixed(2)} {t('moneyMonth')}
        </Text>
      </div>
      {provider.subscriptionFeeDiscount > 0 && (
        <div className="flex justify-between">
          <Text variant="medium" spacing="none" className="text-[var(--color-error-red)]">
            {t(`PROVIDERDETAILS.montlyDiscount`)}
          </Text>
          <Text variant="medium" spacing="none" className="text-[var(--color-error-red)]">
            -{provider.subscriptionFeeDiscount} {t('moneyMonth')}
          </Text>
        </div>
      )}
      {provider.monthlyTotalKwhDiscount > 0 && (
        <div className="flex justify-between">
          <Text variant="medium" spacing="none" className="text-[var(--color-error-red)]">
            {provider.kwhDiscount} {t(`PROVIDERDETAILS.pennyKwh`)}
          </Text>
          <Text variant="medium" spacing="none" className="text-[var(--color-error-red)]">
            -{provider.monthlyTotalKwhDiscount} {t('moneyMonth')}
          </Text>
        </div>
      )}
      <div className="flex justify-between border-t border-dashed border-[var(--color-radio-border)] pt-[3px]">
        <Text variant="medium" spacing="none" className="text-[var(--color-error-red)]">
          {t(`PROVIDERDETAILS.totalPrice`)}
        </Text>
        <Text variant="medium" spacing="none" className="text-[var(--color-error-red)]">
          {Math.round(provider.monthlyCostWithDiscount)} {t('moneyMonth')}
        </Text>
      </div>
    </div>
  )
}

export default DiscountSection
