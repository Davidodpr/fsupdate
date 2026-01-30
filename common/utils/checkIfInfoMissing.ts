import { ActivityEnum } from '@/types/activity'
import { InfoMissingInputsEnum } from '../enums'

//? The fromAddress object seems to have the apartmentNumber as a property with doesn't exists in type FromAddress so I create an object to avoid any
export const getUserInfoMissingForActivity = (type: ActivityEnum, user: User): (InfoMissingInputsEnum | '')[] => {
  const {
    currentMove: { toAddress, fromAddress, residenceSize, fromResidenceSize, residenceType, movingDate },
    contact,
  } = user
  const returningMissingInformation: (InfoMissingInputsEnum | '')[] = []

  checkInfoMissing(type)?.map((missingProperty) => {
    // Apartment number property that comes with both fromAddress and toAddress is not relevant in this check so it's removed
    switch (missingProperty) {
      case InfoMissingInputsEnum.RESIDENCE_SIZE:
        if (!residenceSize) returningMissingInformation.push(InfoMissingInputsEnum.RESIDENCE_SIZE)
        break
      case InfoMissingInputsEnum.RESIDENCE_SIZE_FROM_ADDRESS:
        if (!fromResidenceSize) returningMissingInformation.push(InfoMissingInputsEnum.RESIDENCE_SIZE_FROM_ADDRESS)
        break
      case InfoMissingInputsEnum.RESIDENCE_TYPE:
        if (!residenceType) returningMissingInformation.push(InfoMissingInputsEnum.RESIDENCE_TYPE)
        break
      case InfoMissingInputsEnum.MOVING_DATE:
        if (!movingDate) returningMissingInformation.push(InfoMissingInputsEnum.MOVING_DATE)
        break
      case InfoMissingInputsEnum.FROM_ADDRESS:
        if (checkMissingInformation({ street: fromAddress?.street, city: fromAddress?.city, zip: fromAddress?.zip }))
          returningMissingInformation.push(InfoMissingInputsEnum.FROM_ADDRESS)
        break
      case InfoMissingInputsEnum.TO_ADDRESS:
        if (checkMissingInformation({ street: toAddress?.street, city: toAddress?.city, zip: toAddress?.zip })) returningMissingInformation.push(InfoMissingInputsEnum.TO_ADDRESS)
        break
      case InfoMissingInputsEnum.PHONE:
        if (checkMissingInformation({ phone: contact?.phone })) returningMissingInformation.push(InfoMissingInputsEnum.PHONE)
        break
      case InfoMissingInputsEnum.EMAIL:
        if (checkMissingInformation({ email: contact?.email })) returningMissingInformation.push(InfoMissingInputsEnum.EMAIL)
        break
      default:
        return ['']
    }
  })

  return returningMissingInformation
}

//? Returns the required fields/properties for each service in an array
const checkInfoMissing = (type: string): string[] => {
  switch (type) {
    // Conditions is for movehelpCombined, moveclean and movehelp
    case ActivityEnum.MOVEHELP:
      return [InfoMissingInputsEnum.FROM_ADDRESS, InfoMissingInputsEnum.RESIDENCE_SIZE_FROM_ADDRESS, InfoMissingInputsEnum.TO_ADDRESS]
    case ActivityEnum.MOVEHELP_COMBINED:
      return [InfoMissingInputsEnum.FROM_ADDRESS, InfoMissingInputsEnum.RESIDENCE_SIZE_FROM_ADDRESS, InfoMissingInputsEnum.TO_ADDRESS]
    case ActivityEnum.MOVECLEAN:
      return [InfoMissingInputsEnum.FROM_ADDRESS]
    case ActivityEnum.SHOWCLEANING:
      return [InfoMissingInputsEnum.FROM_ADDRESS, InfoMissingInputsEnum.RESIDENCE_SIZE_FROM_ADDRESS]
    case ActivityEnum.POWER:
      return [InfoMissingInputsEnum.TO_ADDRESS, InfoMissingInputsEnum.RESIDENCE_SIZE, InfoMissingInputsEnum.RESIDENCE_TYPE]
    case ActivityEnum.INTERNET:
      return [InfoMissingInputsEnum.TO_ADDRESS]
    case ActivityEnum.INSURANCE:
      return [InfoMissingInputsEnum.TO_ADDRESS, InfoMissingInputsEnum.RESIDENCE_SIZE, InfoMissingInputsEnum.RESIDENCE_TYPE]
    default:
      return ['']
  }
}

export const hasNumber = (string: string) => /\d/.test(string)

type AddressType = FromAddress | ToAddress

type EmailType = {
  email: string | null
}
type PhoneType = {
  phone: string | null
}

type Inputs = AddressType | UserContact | PhoneType | EmailType

const isAddressType = (toBeDetermined: Inputs): toBeDetermined is AddressType => {
  if ((toBeDetermined as AddressType).street) {
    return true
  }
  return false
}

//? Receives a required object like fromAddress, toAddress or UserContact for email and phone loop through the properties a then returns the input that needs to be rendered
const checkMissingInformation = (inputs: FromAddress | ToAddress | UserContact | EmailType | PhoneType): boolean => {
  if (Object?.values(inputs).some((value) => value === null || value === '' || value === undefined || (isAddressType(inputs) && inputs?.street === value && !hasNumber(value)))) {
    return true
  } else {
    /**
     * A bug we have is that some customers have a phone number stored in the
     * DB that doesn't start with the country code, which is needed to trigger
     * broadband choices from bredbandsval. So for now we have to trigger the info missing modal
     * for the customer to type in their phone number again. Then we save the phone number correctly.
     *
     * This is a temporary fix until we have a better solution.
     */
    if (inputs.hasOwnProperty('phone')) {
      const phoneObject = inputs as PhoneType
      if (phoneObject.phone?.substring(0, 3).includes('46') === false) {
        return true
      }
    }
    return false
  }
}
