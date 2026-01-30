/**
 * Order status
 */
export const ORDER_STATUS_LOCKED = 'locked'
export const ORDER_STATUS_COMPLETED = 'completed'
export const ORDER_STATUS_CANCELED = 'canceled'
export const ORDER_STATUS_DECLINED = 'declined'
export const ORDER_STATUS_REPORTED = 'reported'
export const ORDER_STATUS_REPORTED_APPROVED = 'reported_approved'
export const ORDER_STATUS_INVOICED = 'invoiced'
export const ORDER_STATUS_QUOTATED = 'quotated'

export const ORDER_STATUSES = [
  ORDER_STATUS_LOCKED,
  ORDER_STATUS_COMPLETED,
  ORDER_STATUS_REPORTED,
  ORDER_STATUS_REPORTED_APPROVED,
  ORDER_STATUS_INVOICED,
  ORDER_STATUS_CANCELED,
  ORDER_STATUS_DECLINED,
  ORDER_STATUS_QUOTATED,
] as const

export type OrderStatus = (typeof ORDER_STATUSES)[number]

/**
 * Sales channel
 */
export const ORDER_SALES_CHANNEL_INBOUND = 'inbound'
export const ORDER_SALES_CHANNEL_OUTBOUND_TAILORED_PRODUCT = 'outbound-tailored-product'
export const ORDER_SALES_CHANNEL_OUTBOUND_ORDER = 'outbound-activity'
export const ORDER_SALES_CHANNEL_OUTBOUND_CUSTOMER_JOURNEY = 'outbound-customer-journey'
export const ORDER_SALES_CHANNEL_DIGITAL_FS = 'digital-fs'
export const ORDER_SALES_CHANNEL_DIGITAL_WIDGET = 'digital-widget'

export const ORDER_SALES_CHANNEL = [
  ORDER_SALES_CHANNEL_INBOUND,
  ORDER_SALES_CHANNEL_OUTBOUND_TAILORED_PRODUCT,
  ORDER_SALES_CHANNEL_OUTBOUND_ORDER,
  ORDER_SALES_CHANNEL_OUTBOUND_CUSTOMER_JOURNEY,
  ORDER_SALES_CHANNEL_DIGITAL_FS,
  ORDER_SALES_CHANNEL_DIGITAL_WIDGET,
] as const

export type OrderSalesChannel = (typeof ORDER_SALES_CHANNEL)[number]

/**
 * Services
 */
export const ORDER_SERVICE_MOVING = 'moving'
export const ORDER_SERVICE_CLEANING = 'cleaning'
export const ORDER_SERVICE_CLEANING_AND_MOVING = 'cleaningAndMoving'
export const ORDER_SERVICE_POWER = 'power'
export const ORDER_SERVICE_INTERNET = 'internet'
export const ORDER_SERVICE_INSURANCE = 'insurance'
export const ORDER_SERVICE_ADDRESSCHANGE = 'addresschange'
export const ORDER_SERVICE_TRANSPORT = 'transport'
export const ORDER_SERVICE_MATERIAL = 'material'
export const ORDER_SERVICE_STORAGE = 'storage'
export const ORDER_SERVICE_PACKAGING = 'packaging'
export const ORDER_SERVICE_HANDYMAN = 'handyman'
export const ORDER_SERVICE_DISPOSAL = 'disposal'
export const ORDER_SERVICE_DISPOSAL_FOR_REUSE = 'disposal_for_reuse'
export const ORDER_SERVICE_SHOW_CLEANING = 'show_cleaning'
export const ORDER_SERVICE_WINDOW_CLEANING = 'window_cleaning'
export const ORDER_SERVICE_MOVING_ADDON = 'moving_addon'
export const ORDER_SERVICE_CLEANING_ADDON = 'cleaning_addon'
export const ORDER_SERVICE_DISCOUNT = 'discount'

export const SUPPLIER_SERVICE_TYPES = [ORDER_SERVICE_MOVING, ORDER_SERVICE_CLEANING, ORDER_SERVICE_CLEANING_AND_MOVING, ORDER_SERVICE_PACKAGING, ORDER_SERVICE_STORAGE] as const

export type SupplierServiceTypes = (typeof SUPPLIER_SERVICE_TYPES)[number]

export const ORDER_SERVICE = [
  ORDER_SERVICE_MOVING,
  ORDER_SERVICE_CLEANING,
  ORDER_SERVICE_POWER,
  ORDER_SERVICE_INTERNET,
  ORDER_SERVICE_INSURANCE,
  ORDER_SERVICE_ADDRESSCHANGE,
  ORDER_SERVICE_TRANSPORT,
  ORDER_SERVICE_MATERIAL,
] as const

export type OrderServiceType = (typeof ORDER_SERVICE)[number]

export const MOVE_SERVICE_PRODUCT_SERVICE = [
  ORDER_SERVICE_MOVING,
  ORDER_SERVICE_CLEANING,
  ORDER_SERVICE_SHOW_CLEANING,
  ORDER_SERVICE_WINDOW_CLEANING,
  ORDER_SERVICE_PACKAGING,
  ORDER_SERVICE_HANDYMAN,
  ORDER_SERVICE_DISPOSAL,
  ORDER_SERVICE_DISPOSAL_FOR_REUSE,
  ORDER_SERVICE_STORAGE,
  ORDER_SERVICE_TRANSPORT,
  ORDER_SERVICE_MATERIAL,
  ORDER_SERVICE_MOVING_ADDON,
  ORDER_SERVICE_CLEANING_ADDON,
  ORDER_SERVICE_DISCOUNT,
] as const

export type MoveServiceProductService = (typeof MOVE_SERVICE_PRODUCT_SERVICE)[number]

/**
 * Type
 */
export const ORDER_TYPE_ADDRESSCHANGE = 'addresschange'
export const ORDER_TYPE_POWER = 'power'
export const ORDER_TYPE_TERMINATE_POWER = 'terminate_power'
export const ORDER_TYPE_INSURANCE = 'insurance'
export const ORDER_TYPE_INTERNET = 'internet'
export const ORDER_SERVICE_INTERNET_ADDON = 'internet_addon'
export const ORDER_TYPE_FAMILY_LAW = 'family_law'
export const ORDER_TYPE_HOMEFIX = 'homefix'
// ORDER_TYPE_MOVE_SERVICE stored on order-table level
export const ORDER_TYPE_MOVE_SERVICE = 'moveservice'

/**
 * A move-service order can contain movehelp and/or movecleaning. We want an easy
 * way to know this in order to validate data and send correct interocm event.
 */
export const ORDER_TYPE_MOVEHELP = 'movehelp'
export const ORDER_TYPE_MOVECLEAN = 'moveclean'
export const ORDER_TYPE_MOVEHELP_COMBINED = 'movehelpCombined'

export const MOVE_SERVICE_ORDER_TYPES = [ORDER_TYPE_MOVEHELP, ORDER_TYPE_MOVECLEAN, ORDER_TYPE_MOVEHELP_COMBINED] as const

export type MoveServiceOrderTypes = (typeof MOVE_SERVICE_ORDER_TYPES)[number]

export const ORDER_TYPES = [ORDER_TYPE_MOVE_SERVICE, ORDER_TYPE_ADDRESSCHANGE, ORDER_TYPE_POWER, ORDER_TYPE_INSURANCE, ORDER_TYPE_INTERNET] as const

export type OrderType = (typeof ORDER_TYPES)[number]

export const NON_REPEATABLE_ORDER_TYPES = [ORDER_TYPE_ADDRESSCHANGE, ORDER_TYPE_POWER, ORDER_TYPE_INSURANCE, ORDER_TYPE_INTERNET] as const

export type NonRepeatableOrderType = (typeof NON_REPEATABLE_ORDER_TYPES)[number]

const REDUCED_ORDER_SERVICE = [ORDER_TYPE_MOVEHELP, ORDER_TYPE_MOVECLEAN, ORDER_TYPE_ADDRESSCHANGE, ORDER_TYPE_INSURANCE, ORDER_TYPE_INTERNET, ORDER_TYPE_POWER] as const

export type ReducedServiceTypes = (typeof REDUCED_ORDER_SERVICE)[number]

export const ORDER_TYPE_SERVICE = {
  [ORDER_TYPE_MOVEHELP]: ORDER_SERVICE_MOVING,
  [ORDER_TYPE_MOVECLEAN]: ORDER_SERVICE_CLEANING,
  [ORDER_TYPE_MOVEHELP_COMBINED]: ORDER_SERVICE_CLEANING_AND_MOVING,
  [ORDER_TYPE_POWER]: ORDER_SERVICE_POWER,
  [ORDER_TYPE_INTERNET]: ORDER_SERVICE_INTERNET,
}

/**
 * Products
 *
 * Product description used on invoice etc.
 * Might consider using language files for this further on.
 */
export const DESCRIPTION_MOVING = 'Flytthjälp'
export const DESCRIPTION_CLEANING = 'Flyttstäd'
export const DESCRIPTION_MATERIAL = 'Material'
export const DESCRIPTION_TRANSPORT = 'Transport'

export const ORDER_DESCRIPTION = {
  [ORDER_SERVICE_MOVING]: DESCRIPTION_MOVING,
  [ORDER_SERVICE_CLEANING]: DESCRIPTION_CLEANING,
  [ORDER_SERVICE_MATERIAL]: DESCRIPTION_MATERIAL,
  [ORDER_SERVICE_TRANSPORT]: DESCRIPTION_TRANSPORT,
}

export const PERIOD_TYPE_WEEKLY = 'weekly'
export const PERIOD_TYPE_MONTHLY = 'monthly'
export const PERIOD_TYPE_YEARLY = 'yearly'

export const PERIOD_TYPES = [PERIOD_TYPE_WEEKLY, PERIOD_TYPE_MONTHLY, PERIOD_TYPE_YEARLY] as const

export type PeriodType = (typeof PERIOD_TYPES)[number]

/**
 * Period units
 */
export const PERIOD_UNIT_MONTH = 'month'
export const PERIOD_UNIT_YEAR = 'year'

export const PERIOD_UNITS = [PERIOD_UNIT_MONTH, PERIOD_UNIT_YEAR] as const

export type PeriodUnit = (typeof PERIOD_UNITS)[number]

export const UNITS_TYPE_QUANTITY = 'quantity'
export const UNITS_TYPE_HOURLY = 'hourly'
export const UNITS_TYPE_HOURS = 'hours'
export const UNITS_TYPE_SQM = 'sqm'
export const UNITS_TYPE_PIECES = 'pieces'
export const UNITS_TYPE_CUBICMETERS = 'cubicmeters'

export const UNITS_TYPES = [UNITS_TYPE_QUANTITY, UNITS_TYPE_HOURLY, UNITS_TYPE_HOURS, UNITS_TYPE_SQM, UNITS_TYPE_PIECES, UNITS_TYPE_CUBICMETERS] as const

export type UnitsType = (typeof UNITS_TYPES)[number]

export const ORDER_TYPE_PRODUCT_SERVICE = {
  [ORDER_TYPE_MOVEHELP]: ORDER_SERVICE_CLEANING,
  [ORDER_TYPE_MOVECLEAN]: ORDER_SERVICE_MOVING,
  [ORDER_TYPE_MOVEHELP_COMBINED]: ORDER_SERVICE_CLEANING_AND_MOVING,
} as const

/**
 * Addons
 */
export const ADDONS = {
  [ORDER_TYPE_MOVEHELP]: [ORDER_SERVICE_TRANSPORT, ORDER_SERVICE_MATERIAL],
}
