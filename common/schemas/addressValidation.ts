import * as yup from 'yup'
import { Message } from 'yup/lib/types'
import { TFunction } from 'i18next'
import { RESIDENCE_TYPES, APARTMENT_TYPES } from '@/constants/residenceTypes'

/**
 * Constants for address validation
 * Swedish zip codes (postnummer) are always 5 digits
 */
export const ADDRESS_VALIDATION_CONSTANTS = {
  ZIP_LENGTH: 5,
  APARTMENT_NUMBER_LENGTH: 4,
} as const

/**
 * Base address validation schema factory
 * Creates a Yup schema with standard address field validations
 */
export const createBaseAddressSchema = (
  t: TFunction,
  options?: {
    requireCity?: boolean
  },
) => {
  const { requireCity = false } = options || {}

  return yup.object({
    autoCompleteAddress: yup.string(),
    street: yup.string().test('street-or-autocomplete', t('error:INFOMISSING.invalidStreet') as Message, function (value) {
      const { autoCompleteAddress } = this.parent
      return !!(value || autoCompleteAddress)
    }),
    streetNumber: yup.string().when('hiddenStreetNumber', {
      is: 'true',
      then: yup.string().required(t('error:INFOMISSING.noStreetNumber') as Message),
    }),
    zip: yup
      .string()
      .min(ADDRESS_VALIDATION_CONSTANTS.ZIP_LENGTH, t('error:INFOMISSING.invalidZip') as Message)
      .max(ADDRESS_VALIDATION_CONSTANTS.ZIP_LENGTH, t('error:INFOMISSING.invalidZip') as Message)
      .required(t('error:INFOMISSING.invalidZip') as Message),
    city: requireCity ? yup.string().required(t('error:INFOMISSING.invalidCity') as Message) : yup.string(),
  })
}

/**
 * Extended schema for FromAddress components with residence size fields
 */
export const createFromAddressSchema = (
  t: TFunction,
  options?: {
    requireAdditionalSpace?: boolean
  },
) => {
  const { requireAdditionalSpace = false } = options || {}

  return createBaseAddressSchema(t).shape({
    sqm: yup
      .number()
      .min(1, t('error:INFOMISSING.residenceSize') as Message)
      .required(t('error:INFOMISSING.residenceSize') as Message)
      .typeError(t('error:INFOMISSING.residenceSize') as Message),
    additionalSpace: requireAdditionalSpace
      ? yup
          .number()
          .min(0, t('error:INFOMISSING.residenceSize') as Message)
          .required(t('error:INFOMISSING.residenceSize') as Message)
          .typeError(t('error:INFOMISSING.residenceSize') as Message)
      : yup
          .string()
          .min(0, t('error:INFOMISSING.residenceSize') as Message)
          .typeError(t('error:INFOMISSING.residenceSize') as Message),
  })
}

/**
 * Extended schema for ToAddress components with apartment/residence type fields
 */
export const createToAddressSchema = (
  t: TFunction,
  options?: {
    requireApartmentNumber?: boolean
  },
) => {
  const { requireApartmentNumber = true } = options || {}

  return createBaseAddressSchema(t).shape({
    apartmentNumber: requireApartmentNumber
      ? yup.string().when(['residenceType', 'apartmentType'], {
          is: (residenceType: string, apartmentType: (typeof APARTMENT_TYPES)[keyof typeof APARTMENT_TYPES]) => {
            // Only require apartment number if residence type is 'apartment' and apartmentType is set
            return residenceType === RESIDENCE_TYPES.APARTMENT && [APARTMENT_TYPES.APARTMENT, APARTMENT_TYPES.RENTAL, APARTMENT_TYPES.OWNED].includes(apartmentType)
          },
          then: yup
            .string()
            .nullable(true)
            .min(ADDRESS_VALIDATION_CONSTANTS.APARTMENT_NUMBER_LENGTH, t('error:INFOMISSING.invalidApartmentNumber') as Message)
            .max(ADDRESS_VALIDATION_CONSTANTS.APARTMENT_NUMBER_LENGTH, t('error:INFOMISSING.invalidApartmentNumber') as Message)
            .required(t('error:INFOMISSING.invalidApartmentNumber') as Message),
          otherwise: yup.string().nullable(true),
        })
      : yup.string().nullable(true),
    sqm: yup
      .number()
      .min(1, t('error:INFOMISSING.residenceSize') as Message)
      .required(t('error:INFOMISSING.residenceSize') as Message)
      .typeError(t('error:INFOMISSING.residenceSize') as Message),
    residenceType: yup.string().nullable(true),
    apartmentType: yup.string().nullable(true),
  })
}

/**
 * Minimal address schema without additional fields (for simple forms)
 */
export const createMinimalAddressSchema = (
  t: TFunction,
  options?: {
    requireCity?: boolean
  },
) => {
  return createBaseAddressSchema(t, options).required()
}
