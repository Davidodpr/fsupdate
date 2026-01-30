import {
  ORDER_SERVICE_ADDRESSCHANGE,
  ORDER_SERVICE_INSURANCE,
  ORDER_SERVICE_INTERNET,
  ORDER_SERVICE_INTERNET_ADDON,
  ORDER_SERVICE_POWER,
  ORDER_TYPE_ADDRESSCHANGE,
  ORDER_TYPE_INSURANCE,
  ORDER_TYPE_INTERNET,
  ORDER_TYPE_MOVE_SERVICE,
  ORDER_TYPE_POWER,
  type UnitsType,
  type PeriodUnit,
  type PeriodType,
  type OrderStatus,
  type OrderSalesChannel,
  type MoveServiceProductService,
} from '@/constants/order'
import { OrderAddress, OrderNotes, OrderContact } from './book'

// Re-export types from constants for backwards compatibility
export type { UnitsType, PeriodUnit, PeriodType, OrderStatus, OrderSalesChannel, MoveServiceProductService }

export type MoveServiceProductMeta = {
  volume?: number | null
  area?: number | null
  wantsHandyman?: boolean
  wantsDisposal?: boolean
  wantsPackaging?: boolean
  wantsStorage?: boolean
  heavyLifting?: boolean
  wantsWindowCleaning?: boolean | null
  discountPeriod?: number
  endDate?: string | Date | null
}

export type PowerProductMeta = {
  supplierId?: string
  supplierName?: string
  productName?: string
  discountPeriod?: number
  endDate?: string | Date | null
}

export type AddresschangeProductMeta = {
  moveDate?: string | Date | null
  newAddress?: OrderAddress | null
  receiptNumber?: string
  isConsentNeeded?: boolean
  isConsentGiven?: boolean
  notConsentReason?: string
}

export type InsuranceProductMeta = {
  supplierId?: string
  supplierName?: string
  productName?: string
  discountPeriod?: number
  endDate?: string | Date | null
}

export type InternetProductMeta = {
  supplierId?: string
  supplierName?: string
  productName?: string
  speed?: string
  technology?: string
  discountPeriod?: number
  endDate?: string | Date | null
  offerId?: string
  sessionId?: string
  offerDetails?: {
    name?: string
    title?: string
    price?: {
      monthlyAmounts?: Array<{
        start: number
        end: number
        amount: number
      }>
      campaign?: boolean
    }
    speed?: {
      down?: number
      up?: number
    }
    company?: string
    contractMonths?: number
    additionalProducts?: Array<{
      id?: string
      name?: string
      price?: {
        monthlyAmounts?: Array<{
          start: number
          end: number
          amount: number
        }>
        oneTimeAmount?: number
      }
      type?: string
      optional?: boolean
      selected?: boolean
    }>
  }
}

export type InternetAddonMeta = {
  addonType?: string
  discountPeriod?: number
}

export type MoveServiceOrderMeta = MoveServiceProductMeta
export type PowerOrderMeta = PowerProductMeta
export type AddresschangeOrderMeta = AddresschangeProductMeta
export type InsuranceOrderMeta = InsuranceProductMeta
export type InternetOrderMeta = InternetProductMeta

type OrderProductBase = {
  id?: string | null
  price?: number | null
  deliveryDate?: string | Date | null
  units: number
  unitsType?: UnitsType | null
  periodUnit?: PeriodUnit | null
  periodType?: PeriodType | null
  description?: string | null
  isRutService: boolean
  parentId?: string | null // Indicates if product is an addon
  volume?: number | null
  area?: number | null
}

export type MoveServiceOrderProduct = OrderProductBase & {
  service: MoveServiceProductService
  meta?: MoveServiceProductMeta
}

export type PowerOrderProduct = OrderProductBase & {
  service: typeof ORDER_SERVICE_POWER
  meta: PowerProductMeta
}

export type AddresschangeOrderProduct = OrderProductBase & {
  service: typeof ORDER_SERVICE_ADDRESSCHANGE
  meta: AddresschangeProductMeta
}

export type InsuranceOrderProduct = OrderProductBase & {
  service: typeof ORDER_SERVICE_INSURANCE
  meta: InsuranceProductMeta
}

export type InternetOrderProduct =
  | (OrderProductBase & {
      service: typeof ORDER_SERVICE_INTERNET
      meta: InternetProductMeta
    })
  | InternetOrderAddon

export type InternetOrderAddon = OrderProductBase & {
  service: typeof ORDER_SERVICE_INTERNET_ADDON
  meta: InternetAddonMeta
}

type OrderBase = {
  id?: string
  userId?: string
  moveId?: string
  type?: string
  status?: OrderStatus
  orderDate?: string | null
  salespersonName?: string | null
  salespersonAdminId?: string
  salesChannel?: OrderSalesChannel | null
  supplierId?: string
  supplierName?: string
  supplierPhone?: string
  supplierEmail?: string
  totalPrice?: number
  priceLegacy?: number
  user?: OrderContact | null
  address?: { to?: OrderAddress; from?: OrderAddress }
  notes?: OrderNotes
  orderNumber?: number
}

type EmailAndPhone = {
  email: string
  phone: string
}

export type MoveServiceOrder = OrderBase & {
  type: typeof ORDER_TYPE_MOVE_SERVICE
  meta: MoveServiceOrderMeta
  products: MoveServiceOrderProduct[]
  emailAndPhone?: EmailAndPhone
}

export type PowerOrder = OrderBase & {
  type: typeof ORDER_TYPE_POWER
  meta: PowerOrderMeta
  products: PowerOrderProduct[]
  emailAndPhone?: EmailAndPhone
}

export type AddresschangeOrder = OrderBase & {
  type?: typeof ORDER_TYPE_ADDRESSCHANGE
  meta: AddresschangeOrderMeta
  products?: AddresschangeOrderProduct[]
  emailAndPhone?: EmailAndPhone
}

export type InsuranceOrder = OrderBase & {
  type: typeof ORDER_TYPE_INSURANCE
  meta: InsuranceOrderMeta
  products: InsuranceOrderProduct[]
  emailAndPhone?: EmailAndPhone
}

export type InternetOrder = OrderBase & {
  type: typeof ORDER_TYPE_INTERNET
  meta: InternetOrderMeta
  products: InternetOrderProduct[]
  emailAndPhone?: EmailAndPhone
}

export type Order = MoveServiceOrder | PowerOrder | AddresschangeOrder | InsuranceOrder | InternetOrder
