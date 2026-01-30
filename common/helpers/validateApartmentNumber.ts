import { SetStateAction, Dispatch } from 'react'
import { SkatteverketStatusEnum } from '../enums/SkatteverketEnum'
import { isValidApartmentNumber } from './validators'

interface ValidateApartmentNumberProps {
  address: SkatteverketValidAddressObject
  validation: Record<string, string | boolean>
  contract: SkatteverketContract
  setApartmentNumberError: Dispatch<SetStateAction<{ valid: boolean; message: string }>>
  availableApartmentNumbers: string[]
}

export default ({ address, validation, contract, setApartmentNumberError, availableApartmentNumbers }: ValidateApartmentNumberProps) => {
  const { newAddress } = contract
  if (validation.info === SkatteverketStatusEnum.STATUS_OK) {
    setApartmentNumberError({ valid: true, message: '' })
    return
  }
  if (!isValidApartmentNumber(address?.apartmentNumber || '')) {
    if (newAddress.streetName || newAddress.streetNumber || newAddress.zip || newAddress.city) {
      setApartmentNumberError({ valid: false, message: 'APT_NUMBER' })
    } else {
      setApartmentNumberError({ valid: true, message: '' })
    }
    return
  }
  if (availableApartmentNumbers.length > 0 && !!address?.apartmentNumber && !availableApartmentNumbers.includes(address.apartmentNumber)) {
    setApartmentNumberError({ valid: false, message: 'NON_EXISTING' })
    return
  }

  if (validation.info !== SkatteverketStatusEnum.STATUS_OK) {
    setApartmentNumberError({ valid: false, message: '' })
    return
  }
  setApartmentNumberError({ valid: true, message: '' })
}
