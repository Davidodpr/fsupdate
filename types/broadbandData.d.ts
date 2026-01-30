declare type BredbandsvalResponse = {
  status: 'done' | 'failed' | 'running'
  progress: number
  groupDeals: BroadbandOfferData[]
  offers: BroadbandOfferData[]
  externalGroupDealProvider?: string
}

declare type BroadbandOfferData = {
  isGroupDeal: boolean
  requireFlatNr?: boolean
  contractMonths: number
  freightPrice?: AdditionalProductPrice
  speed: Speed
  price: AdditionalProductPrice
  name: string
  additionalProducts?: OfferAdditionalProduct[]
  startupPrice?: AdditionalProductPrice
  // this only seems to be null so we don't know
  // what this contains hence the unknown type
  operatorData?: unknown
  dataLimit?: number
  flatNrs?: string[]
  title: string
  type: OfferType
  id: string
  company: string
  category: string
  comparisonPriceAmount: number
  allowedStartDateDaysAhead?: number
}

type AdditionalProductPrice = {
  oneTimeAmount?: number
  oneTimeAmountWithoutDiscount?: number
  monthlyAmounts?: AdditionalProductMonthlyAmount[]
  campaign: boolean
}

type Speed = {
  down?: number
  up?: number
}

type AdditionalProductMonthlyAmount = {
  start: number
  end: number
  amount: number
}

type OfferAdditionalProduct = {
  optional?: boolean
  id: string
  category: string
  type: string
  name: string
  title?: string
  price?: AdditionalProductPrice
  startupPrice?: AdditionalProductPrice
  freightPrice?: AdditionalProductPrice
  extraData?: {
    channels: string[]
    streamingServices: string[]
    selectableChannels: string[]
    selectableNrOfChannels: number
  }
  additionalProducts?: OfferAdditionalProduct[]
  contractMonths?: number
}

type OfferType = 'mobile' | 'fiber' | 'coaxial' | 'dsl'
