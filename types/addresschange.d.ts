declare type SkatteverketLoginResponse = {
  data: Record<string, string>
}

declare type SkatteverketStatusResponse = {
  autoStartToken: SetStateAction<string>
  qr: SetStateAction<string>
  cookie: SetStateAction<Record<string, string>>
  tag: SetStateAction<string>
}

declare type SkatteverketUserDataResponse = {
  relations: SkatteverketPersonToMove[]
  user: SetStateAction<Record<string, Record<string, string>>>
  address: Record<string, SkatteverketUserDataCurrentAddress>
}

declare type SkatteverketValidAddressObject = {
  id?: string
  street?: string
  streetName?: string
  streetNumber?: string
  zip?: string
  city?: string
  apartmentNumber?: string
}

declare type SkatteverketValidAddressResponse = SkatteverketValidAddressObject[]

declare type SkatteverketUserDataCurrentAddress = {
  additionalInfo: string
  city: string
  propertyDesignation: string
  registrationDate: string
  street: string
  zip: string
}

declare type SkatteverketPersonToMove = {
  name: string
  pno: string
  isUnderage?: boolean
  guardians?: SkatteverketPersonToMove[]
}

declare type SkatteverketContract = {
  moveDate: Date
  isPermanent: boolean
  validity: string
  newAddress: SkatteverketValidAddressObject
  propertyInformation: {
    propertyDesignation: string
    propertyOwner: string
  }
  peopleToMove: SkatteverketPersonToMove[]
  contactInformation: {
    phoneNumber: string
    email: string
  }
}
