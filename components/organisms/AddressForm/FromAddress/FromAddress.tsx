import { useCallback } from 'react'
import { BaseFromAddress } from '@/components/organisms/AddressForm'
import { UpdatedMoveValues } from '@/templates/Moveclean/types'

interface FromAddressProps {
  setData?: (data: UpdatedMoveValues) => void
  moveData: UpdatedMoveValues
  withoutPadding?: boolean
  withNoHeightOnAddress?: boolean
  setMissingStreetNumberError?: (error: boolean) => void
}

export const FromAddress = ({ setData, moveData, withoutPadding, withNoHeightOnAddress, setMissingStreetNumberError }: FromAddressProps) => {
  const handleDataChange = useCallback(
    (address: { street: string; city: string; zip: string }) => {
      if (setData) {
        // Only update if values have changed to avoid infinite loops
        if (address.city !== moveData?.fromAddress?.city || address.street !== moveData?.fromAddress?.street || address.zip !== moveData?.fromAddress?.zip) {
          setData({
            ...moveData,
            fromAddress: address,
          })
        }
      }
    },
    [setData, moveData],
  )

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
