/**
 * Residence type constants
 * These values are used throughout the application to represent different types of residences
 */
export const RESIDENCE_TYPES = {
  APARTMENT: 'apartment',
  TOWNHOUSE: 'townhouse',
  HOUSE: 'house',
} as const

/**
 * Apartment type constants (ownership types for apartments)
 * These values represent different ownership or rental status for apartments
 */
export const APARTMENT_TYPES = {
  OWNED: 'owned',
  RENTAL: 'rental',
  APARTMENT: 'apartment', // Used in some validation contexts
} as const

// Legacy exports for backward compatibility
export const APARTMENT = RESIDENCE_TYPES.APARTMENT
export const TOWNHOUSE = RESIDENCE_TYPES.TOWNHOUSE
export const HOUSE = RESIDENCE_TYPES.HOUSE
