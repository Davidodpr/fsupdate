import React, { ReactNode } from 'react'
import { FormProvider, useForm, UseFormReturn, FieldValues, DefaultValues } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CommonAddressFormI18N from '@/components/organisms/CommonAddressFormI18N'
import Flex from '@/components/atoms/Flex'
import { AnyObjectSchema } from 'yup'

/**
 * Base address form data structure
 * All address form values should extend this interface
 */
export interface BaseAddressFormValues extends FieldValues {
  autoCompleteAddress: string
  street: string
  streetNumber?: string
  zip: string
  city: string
  hiddenStreetNumber?: string
}

export type BaseAddressFormProps<T extends BaseAddressFormValues = BaseAddressFormValues> = {
  schema: AnyObjectSchema
  defaultValues: DefaultValues<T>
  onSubmit: (data: T) => void | Promise<void>
  children?: ReactNode | ((methods: UseFormReturn<T>) => ReactNode)
  withoutPadding?: boolean
  withErrorPadding?: boolean
  className?: string
  formClassName?: string
  openQuotationModal?: (open: boolean) => void
  externalZipTranslation?: string
  hasSetValueCheck?: (hasSetValue: boolean) => void
  customOnSelect?: () => void
  withNoHeightOnAddress?: boolean
  customOnNoAddressSelect?: () => void
  setMissingStreetNumberError?: (error: boolean) => void
}

export function BaseAddressForm<T extends BaseAddressFormValues = BaseAddressFormValues>({
  schema,
  defaultValues,
  onSubmit,
  children,
  withoutPadding = false,
  withErrorPadding = false,
  className = '',
  formClassName = '',
  openQuotationModal,
  externalZipTranslation,
  hasSetValueCheck,
  customOnSelect,
  withNoHeightOnAddress,
  customOnNoAddressSelect,
  setMissingStreetNumberError,
}: BaseAddressFormProps<T>) {
  const methods = useForm<T>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  })

  const handleSubmit = methods.handleSubmit(onSubmit)

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit} className={formClassName} style={{ width: '100%' }}>
        <div className={className}>
          <Flex className={withoutPadding ? 'p-0' : 'py-2.5'} direction="column">
            <CommonAddressFormI18N
              withErrorPadding={withErrorPadding}
              openQuotationModal={openQuotationModal}
              externalZipTranslation={externalZipTranslation}
              hasSetValueCheck={hasSetValueCheck}
              customOnSelect={customOnSelect}
              withNoHeightOnAddress={withNoHeightOnAddress}
              customOnNoAddressSelect={customOnNoAddressSelect}
              setMissingStreetNumberError={setMissingStreetNumberError}
            />
          </Flex>
          {typeof children === 'function' ? children(methods) : children}
        </div>
      </form>
    </FormProvider>
  )
}

export default BaseAddressForm
