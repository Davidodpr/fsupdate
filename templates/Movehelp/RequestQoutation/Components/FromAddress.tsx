import React, { useCallback } from 'react'
import { MoveValues } from '@/common/context/movehelpProvider/movehelp.provider'
import { BaseFromAddress } from '@/components/organisms/AddressForm'

interface FromAddressProps {
  setData?: (data: MoveValues) => void
  moveData: MoveValues
  withoutPadding?: boolean
  withNoHeightOnAddress?: boolean
  setMissingStreetNumberError?: (error: boolean) => void
}

/**
 * Movehelp RequestQuotation FromAddress - Refactored to use BaseFromAddress
 * Syncs address changes while preserving sqm and additionalSpace
 */
export const FromAddress = ({ setData, moveData, withoutPadding, withNoHeightOnAddress, setMissingStreetNumberError }: FromAddressProps) => {
  const handleDataChange = useCallback((address: { street: string; city: string; zip: string }) => {
    if (setData) {
      // Only update if values have changed to avoid infinite loops
      if (
        address.street !== moveData?.fromAddress?.street ||
        address.city !== moveData?.fromAddress?.city ||
        address.zip !== moveData?.fromAddress?.zip
      ) {
        const updatedData: MoveValues = {
          sqm: moveData?.sqm,
          additionalSpace: moveData?.additionalSpace,
          toAddress: moveData?.toAddress,
          fromAddress: address,
        }
        setData(updatedData)
      }
    }
  }, [setData, moveData])

  return (
    <BaseFromAddress
      initialValues={{
        autoCompleteAddress: moveData?.fromAddress?.street || '',
        street: moveData?.fromAddress?.street || '',
        zip: moveData?.fromAddress?.zip || '',
        city: moveData?.fromAddress?.city || '',
      }}
      onDataChange={handleDataChange}
      withoutPadding={withoutPadding}
      withNoHeightOnAddress={withNoHeightOnAddress}
      setMissingStreetNumberError={setMissingStreetNumberError}
    />
  )
}
