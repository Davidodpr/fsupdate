export type OrderAddress = {
  id?: string
  street?: string
  zip?: string
  city?: string
  apartmentNumber?: string | null
  size?: number | null
  elevator?: string | null
  floor?: number | null
  sizeOfAdditionalSpace?: number | null
  residenceType?: string | null
  isLimitedAccess?: boolean | null
}

export type OrderNotes = {
  supplier?: string
  flyttsmart?: string
  customer?: string
  cancel?: string
  cancelReason?: string
  decline?: string
}
type Address = {
  street?: string
  zip?: string
  city?: string
  apartmentNumber?: string | null
}
export type OrderContact = {
  id?: string
  orderId?: string
  pno: string
  firstName: string
  lastName: string
  phone: string
  email: string
  address: Address
  isPrimary: boolean
}
export type MoveServiceMeta = {
  wantsHandyman?: boolean
  wantsDisposal?: boolean
  wantsPackaging?: boolean
  wantsStorage?: boolean
  heavyLifting?: boolean
  wantsWindowCleaning?: boolean | null
}

export type ResidenceInfo = {
  size?: number
  elevator?: ElevatorType
  floor?: number | null
  sizeOfAdditionalSpace?: number
  residenceType?: string
  isLimitedAccess?: boolean | null
}

export type Product = {
  deliveryDate: string | Date
  service: string
}

export type MoveServiceOrderProduct = {
  id?: string | null
  price: number
  deliveryDate?: Date | string | null
  units: number
  unitsType?: string | null
  periodUnit?: number | null
  periodType?: string | null
  description?: string | null
  isRutService: boolean
  parentId?: string | null
  service: string
  holidayPrice?: number
}
