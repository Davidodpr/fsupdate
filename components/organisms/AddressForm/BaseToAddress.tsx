import React, { ReactNode, useEffect } from 'react'
import { useWatch, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useUserContext } from '@/common/context/user/UserProvider'
import { createMinimalAddressSchema, createToAddressSchema } from '@/common/schemas/addressValidation'
import BaseAddressForm, { BaseAddressFormValues } from './BaseAddressForm'

export interface BaseToAddressFormValues extends BaseAddressFormValues {
  sqm?: string | number
  residenceType?: string
  apartmentType?: string
  apartmentNumber?: string
}

export type BaseToAddressProps = {
  // Data handling
  onSubmit?: (data: BaseToAddressFormValues) => void | Promise<void>
  onDataChange?: (address: { street: string; city: string; zip: string }) => void
  initialValues?: Partial<BaseToAddressFormValues>

  // Feature flags
  withResidenceSize?: boolean
  withResidenceType?: boolean
  withApartmentFields?: boolean

  // Layout options
  withoutPadding?: boolean
  withErrorPadding?: boolean
  className?: string

  // Button configuration
  onValidationChange?: (isValid: boolean) => void

  // Children for custom fields/buttons
  children?: ReactNode | ((methods: UseFormReturn<BaseToAddressFormValues>) => ReactNode)

  // CommonAddressForm props
  openQuotationModal?: (open: boolean) => void
  externalZipTranslation?: string
  hasSetValueCheck?: (hasSetValue: boolean) => void
  customOnSelect?: () => void
  withNoHeightOnAddress?: boolean
  customOnNoAddressSelect?: () => void
  setMissingStreetNumberError?: (error: boolean) => void
}

export const BaseToAddress: React.FC<BaseToAddressProps> = ({
  onSubmit,
  onDataChange,
  initialValues,
  withResidenceSize = false,
  withResidenceType = false,
  withApartmentFields = false,
  withoutPadding = false,
  withErrorPadding = false,
  className = '',
  onValidationChange,
  children,
  openQuotationModal,
  externalZipTranslation,
  hasSetValueCheck,
  customOnSelect,
  withNoHeightOnAddress,
  customOnNoAddressSelect,
  setMissingStreetNumberError,
}) => {
  const { t } = useTranslation(['common', 'error'])
  const { user } = useUserContext()
  const toAddress = user?.currentMove?.toAddress
  const residenceSize = user?.currentMove?.residenceSize
  const apartmentType = user?.currentMove?.apartmentType
  const residenceType = user?.currentMove?.residenceType

  // Create schema based on features enabled
  const schema = withResidenceSize || withApartmentFields ? createToAddressSchema(t, { requireApartmentNumber: withApartmentFields }) : createMinimalAddressSchema(t)

  // Build default values from user context or initial values
  const defaultValues: BaseToAddressFormValues = {
    autoCompleteAddress: initialValues?.autoCompleteAddress || toAddress?.street || '',
    street: initialValues?.street || toAddress?.street || '',
    streetNumber: initialValues?.streetNumber || '',
    zip: initialValues?.zip || toAddress?.zip || '',
    city: initialValues?.city || toAddress?.city || '',
    hiddenStreetNumber: 'false',
    ...(withResidenceSize && {
      sqm: initialValues?.sqm || (residenceSize ? residenceSize.toString() : ''),
    }),
    ...(withResidenceType && {
      residenceType: initialValues?.residenceType || residenceType || '',
    }),
    ...(withApartmentFields && {
      apartmentType: initialValues?.apartmentType || apartmentType || '',
      apartmentNumber: initialValues?.apartmentNumber || toAddress?.apartmentNumber || '',
    }),
  }

  const handleSubmit = async (data: BaseToAddressFormValues) => {
    if (onSubmit) {
      await onSubmit(data)
    }
  }

  return (
    <BaseAddressForm
      schema={schema}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      withoutPadding={withoutPadding}
      withErrorPadding={withErrorPadding}
      className={className}
      openQuotationModal={openQuotationModal}
      externalZipTranslation={externalZipTranslation}
      hasSetValueCheck={hasSetValueCheck}
      customOnSelect={customOnSelect}
      withNoHeightOnAddress={withNoHeightOnAddress}
      customOnNoAddressSelect={customOnNoAddressSelect}
      setMissingStreetNumberError={setMissingStreetNumberError}
    >
      {(methods) => {
        // Watch for changes and trigger callback
        const DataChangeWatcher = () => {
          const watchedStreet = useWatch({ name: 'street', control: methods.control })
          const watchedStreetNumber = useWatch({ name: 'streetNumber', control: methods.control })
          const watchedCity = useWatch({ name: 'city', control: methods.control })
          const watchedZip = useWatch({ name: 'zip', control: methods.control })

          useEffect(() => {
            if (onDataChange && (watchedStreet || watchedStreetNumber || watchedZip || watchedCity)) {
              onDataChange({
                street: `${watchedStreet || ''} ${watchedStreetNumber || ''}`.trim(),
                city: watchedCity || '',
                zip: watchedZip || '',
              })
            }
          }, [watchedStreet, watchedStreetNumber, watchedCity, watchedZip])

          return null
        }

        // Validation state watcher
        const ValidationWatcher = () => {
          const watchedCity = useWatch({ name: 'city', control: methods.control })
          const watchedStreet = useWatch({ name: 'street', control: methods.control })
          const watchedZip = useWatch({ name: 'zip', control: methods.control })

          useEffect(() => {
            if (onValidationChange) {
              const isValid = !!(watchedCity && watchedStreet && watchedZip)
              onValidationChange(isValid)
            }
          }, [watchedCity, watchedStreet, watchedZip])

          return null
        }

        return (
          <>
            {onDataChange && <DataChangeWatcher />}
            {onValidationChange && <ValidationWatcher />}
            {typeof children === 'function' ? children(methods) : children}
          </>
        )
      }}
    </BaseAddressForm>
  )
}

export default BaseToAddress
