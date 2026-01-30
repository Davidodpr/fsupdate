/**
 * Booking status constants
 * Frontend display statuses for bookings
 */
export const BOOKING_STATUS_UPCOMING = 'upcoming'
export const BOOKING_STATUS_CONFIRMED = 'confirmed'
export const BOOKING_STATUS_COMPLETED = 'completed'
export const BOOKING_STATUS_CANCELLED = 'cancelled'
export const BOOKING_STATUS_PERFORMED = 'performed'
export const BOOKING_STATUS_EXECUTED = 'executed'

export const BOOKING_STATUSES = [
  BOOKING_STATUS_UPCOMING,
  BOOKING_STATUS_CONFIRMED,
  BOOKING_STATUS_COMPLETED,
  BOOKING_STATUS_CANCELLED,
  BOOKING_STATUS_PERFORMED,
  BOOKING_STATUS_EXECUTED,
] as const

export type BookingStatusType = (typeof BOOKING_STATUSES)[number]

/**
 * Booking type constants
 * Frontend display types for bookings (Swedish labels)
 */
export const BOOKING_TYPE_MOVEHELP = 'flytthjälp'
export const BOOKING_TYPE_PACKING = 'packhjälp'
export const BOOKING_TYPE_MOVECLEAN = 'flyttstädning'
export const BOOKING_TYPE_BROADBAND = 'bredband'
export const BOOKING_TYPE_ELECTRICITY = 'el'
export const BOOKING_TYPE_INSURANCE = 'försäkring'

export const BOOKING_TYPES = [
  BOOKING_TYPE_MOVEHELP,
  BOOKING_TYPE_PACKING,
  BOOKING_TYPE_MOVECLEAN,
  BOOKING_TYPE_BROADBAND,
  BOOKING_TYPE_ELECTRICITY,
  BOOKING_TYPE_INSURANCE,
] as const

export type BookingTypeValue = (typeof BOOKING_TYPES)[number]

/**
 * Booking section constants
 * Used for determining which tab a booking is displayed in
 */
export const BOOKING_SECTION_UPCOMING = 'upcoming'
export const BOOKING_SECTION_PREVIOUS = 'previous'

export const BOOKING_SECTIONS = [BOOKING_SECTION_UPCOMING, BOOKING_SECTION_PREVIOUS] as const

export type BookingSectionType = (typeof BOOKING_SECTIONS)[number]

/**
 * Activity icon key constants
 * Used for mapping booking types to activity icons
 */
export const ACTIVITY_ICON_MOVEHELP = 'movehelp'
export const ACTIVITY_ICON_MOVECLEAN = 'moveclean'
export const ACTIVITY_ICON_INTERNET = 'internet'
export const ACTIVITY_ICON_POWER = 'power'
export const ACTIVITY_ICON_INSURANCE = 'insurance'
