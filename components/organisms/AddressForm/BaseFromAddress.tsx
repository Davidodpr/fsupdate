import React, { ReactNode, useEffect } from 'react'
import { useWatch, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useUserContext } from '@/common/context/user/UserProvider'
import { createMinimalAddressSchema, createFromAddressSchema } from '@/common/schemas/addressValidation'
import BaseAddressForm, { BaseAddressFormValues } from './BaseAddressForm'

export interface BaseFromAddressFormValues extends BaseAddressFormValues {
  sqm?: string | number
  additionalSpace?: string | number
}

export type BaseFromAddressProps = {
  onSubmit?: (data: BaseFromAddressFormValues) => void | Promise<void>
  onDataChange?: (address: { street: string; city: string; zip: string }) => void
  initialValues?: Partial<BaseFromAddressFormValues>

  withResidenceSize?: boolean
  withAdditionalSpace?: boolean

  withoutPadding?: boolean
  withErrorPadding?: boolean
  className?: string

  onValidationChange?: (isValid: boolean) => void

  children?: ReactNode | ((methods: UseFormReturn<BaseFromAddressFormValues>) => ReactNode)

  openQuotationModal?: (open: boolean) => void
  externalZipTranslation?: string
  hasSetValueCheck?: (hasSetValue: boolean) => void
  customOnSelect?: () => void
  withNoHeightOnAddress?: boolean
  customOnNoAddressSelect?: () => void
  setMissingStreetNumberError?: (error: boolean) => void
}

export const BaseFromAddress: React.FC<BaseFromAddressProps> = ({
  onSubmit,
  onDataChange,
  initialValues,
  withResidenceSize = false,
  withAdditionalSpace = false,
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
  const fromAddress = user?.currentMove?.fromAddress
  const fromResidenceSize = user?.currentMove?.fromResidenceSize
  const additionalSpace = user?.currentMove?.fromAddress?.additionalSpace

  // Create schema based on features enabled
  const schema = withResidenceSize ? createFromAddressSchema(t, { requireAdditionalSpace: false }) : createMinimalAddressSchema(t)

  const defaultValues: BaseFromAddressFormValues = {
    autoCompleteAddress: initialValues?.autoCompleteAddress || fromAddress?.street || '',
    street: initialValues?.street || fromAddress?.street || '',
    streetNumber: initialValues?.streetNumber || '',
    zip: initialValues?.zip || fromAddress?.zip || '',
    city: initialValues?.city || fromAddress?.city || '',
    hiddenStreetNumber: 'false',
    ...(withResidenceSize && {
      sqm: initialValues?.sqm || (fromResidenceSize ? fromResidenceSize.toString() : ''),
    }),
    ...(withAdditionalSpace && {
      additionalSpace: initialValues?.additionalSpace || (additionalSpace ? additionalSpace.toString() : ''),
    }),
  }

  const handleSubmit = async (data: BaseFromAddressFormValues) => {
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

export default BaseFromAddress
