import { MoveServiceOrder, MoveService } from '@/common/enums/MoveServicesEnum'
import PRICE_TYPE_ENUM from '@/common/enums/PriceEnum'

type SupplierServiceTypes = (typeof MoveServiceOrder)[keyof typeof MoveServiceOrder]

export type SupplierDetailBase = {
  id: string
  name: string
  displayName: string
  type: string
  serviceTypes: SupplierServiceTypes[]
  rating: string
  reviewCount: number
  imageUrl: string
}

export type SupplierDetail = {
  isRecommended?: boolean
  prices?: WebMoveServiceSupplierPrices
  addons?: MoveServicePriceAddon
} & SupplierDetailBase

export type ShowCleaningSupplierDetail = {
  holidayPrice: number
  price: number
} & SupplierDetailBase

export type TailoredMoveSupplierDetail = {
  price?: WebMoveServiceSupplierPriceTailored
  addons?: MoveServicePriceAddon
  quotationInfo: {
    comment: string
    validUntil: string
    deliveryDate: string
    orderId: string
    seller: {
      image: string
    }
    distance?: number
    fromAddress: {
      address?: string
      size?: number
    }
    toAddress?: {
      address?: string
      size?: number
    }
  }
} & SupplierDetailBase

export type WebMoveServiceSupplierFixedPrices = {
  residenceSize: number
  price: number
  discountAmount?: number
}

export type WebMoveServiceSupplierFixedPricesTailored = {
  residenceSize: number
  price: number
  quotationHolidayPrice?: number
}
export type HourlyPrices = {
  base: number
  holiday: number
  estimatedHours?: number
}
export type WebMoveServiceSupplierPrices = {
  hourly?: HourlyPrices
  fixed?: WebMoveServiceSupplierFixedPrices[]
}

export type WebMoveServiceSupplierPriceTailored = {
  fixed?: WebMoveServiceSupplierFixedPricesTailored[]
}
export type MoveServicePriceAddon = {
  holiday: number | null
  elevator: ElevatorFee[]
}

export type ElevatorFee = {
  sqm: number
  none: number
  small: number
}

export type MoveServicesDynamicPricePerHourSupplier = {
  description: string
  holidayPrice: number
  isDefaultPrice: boolean
  isRutService: boolean
  price: number
  service: (typeof MoveService)[keyof typeof MoveService]
  units: number
  unitsType: PRICE_TYPE_ENUM.HOURLY | PRICE_TYPE_ENUM.FIXED
}

export type MovehelpAndMovecleanAndPackagingPrices = {
  movehelp: MoveServicesDynamicPricePerHourSupplier
  moveclean: MoveServicesDynamicPricePerHourSupplier
  packaging: MoveServicesDynamicPricePerHourSupplier
}

export type MovehelpAndMovecleanAndPackagingSupplier = {
  messageKey?: string
  prices: MovehelpAndMovecleanAndPackagingPrices
  discount: number
  completedServices: string[]
}
