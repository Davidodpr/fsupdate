import {
  BOOKING_TYPE_MOVEHELP,
  BOOKING_TYPE_PACKING,
  BOOKING_TYPE_MOVECLEAN,
  BOOKING_TYPE_BROADBAND,
  BOOKING_TYPE_ELECTRICITY,
  BOOKING_TYPE_INSURANCE,
  BOOKING_STATUS_UPCOMING,
  BOOKING_STATUS_CONFIRMED,
  BOOKING_STATUS_COMPLETED,
  BOOKING_STATUS_CANCELLED,
  BOOKING_STATUS_PERFORMED,
  BOOKING_STATUS_EXECUTED,
} from '@/constants/booking'

export type BookingStatus =
  | typeof BOOKING_STATUS_UPCOMING
  | typeof BOOKING_STATUS_CONFIRMED
  | typeof BOOKING_STATUS_COMPLETED
  | typeof BOOKING_STATUS_CANCELLED
  | typeof BOOKING_STATUS_PERFORMED
  | typeof BOOKING_STATUS_EXECUTED

export type BookingType =
  | typeof BOOKING_TYPE_MOVEHELP
  | typeof BOOKING_TYPE_PACKING
  | typeof BOOKING_TYPE_MOVECLEAN
  | typeof BOOKING_TYPE_BROADBAND
  | typeof BOOKING_TYPE_ELECTRICITY
  | typeof BOOKING_TYPE_INSURANCE

export type BookingAddress = {
  street: string
  city: string
  postalCode?: string
  size?: number | null
}

export type BookingSupplier = {
  id: string
  name: string
  phone: string
  email?: string
  logo?: string
}

export type BookingPriceItem = {
  label: string
  amount: number
  isIncludedInRut?: boolean
}

export type BookingPrice = {
  items: BookingPriceItem[]
  subtotal: number
  rutDeduction?: number
  rutPercentage?: number
  total: number
  currency: string
}

export type BookingCampaignPrice = {
  start: number
  end: number
  amount: number
}

export type BookingAdditionalProduct = {
  id?: string
  name: string
  monthlyPrice?: number
  oneTimeAmount?: number
  campaignPrices?: BookingCampaignPrice[]
}

export type BookingDetails = {
  volume?: string
  area?: string
  duration?: string
  materialIncluded?: boolean
  items?: string[]
  description?: string
  // Broadband specific fields
  campaignPrices?: BookingCampaignPrice[]
  additionalProducts?: BookingAdditionalProduct[]
  contractMonths?: number
}

export type Booking = {
  id: string
  type: BookingType
  status: BookingStatus
  date: string
  time: string
  fromAddress?: BookingAddress
  toAddress?: BookingAddress
  address?: BookingAddress // For services at single location
  supplier?: BookingSupplier
  price: BookingPrice
  details: BookingDetails
  notes?: string
  bookingNumber?: string
  serviceDescription?: string
  orderType?: string // Original order type (e.g., 'power', 'terminate_power')
}
