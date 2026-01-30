export type ElectricityProvidersType = 'fortum' | 'vattenfall' | 'skekraft' | 'tibber'
export type ElectricityProviderType = {
  discountPeriod: number
  kwhDiscount: number
  license: number
  markupPerKwhExVat: number
  monthlyCostWithDiscount: number
  monthlyCostWithoutDiscountRounded: number
  monthlyPrice2000: number
  monthlyPrice5000: number
  monthlyPrice20000: number
  monthlyTotalKwhDiscount: number
  periodCost: number
  pricePerKwhExVat: number
  provider: ElectricityProvidersType
  subscriptionFee: number
  subscriptionFeeDiscount: number
  totalKwhPriceExcDiscount: number
  vat: number
  vatAndLicense: number
  powerCertificate: number
  movingCost?: number
  campaignDiscountWithVAT?: number
  discCampaign?: string
  tlCampaign?: string
}

declare type ExternalElectricityProviderType = {
  discountPeriod: number
  kwhDiscount: number
  license: number
  markupPerKwhExVat: number
  monthlyCostWithDiscount: number
  monthlyCostWithoutDiscountRounded: number
  monthlyPrice2000: number
  monthlyPrice5000: number
  monthlyPrice20000: number
  monthlyTotalKwhDiscount: number
  periodCost: number
  pricePerKwhExVat: number
  provider: ElectricityProvidersType
  subscriptionFee: number
  subscriptionFeeDiscount: number
  totalKwhPriceExcDiscount: number
  vat: number
  vatAndLicense: number
  powerCertificate: number
  consumption: number
}
