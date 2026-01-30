declare type CurrentMove = {
  movingDate: Date | string
  addressStatus: 'loading' | 'ready' | 'empty'
  addresschange: ServiceState
  apartmentType: string | null
  createdAt: Date | string
  fromAddress: FromAddress
  fromResidenceSize: number | null
  id: string
  insurance: AdvancedServiceState
  internet: AdvancedServiceState
  diy: AdvancedServiceState
  moveclean: AdvancedServiceState
  movehelp: AdvancedServiceState
  movehelpCombined: AdvancedServiceState
  movingDate: string
  movingInDate: string
  power: AdvancedServiceState
  residenceSize: number
  residenceType: string
  toAddress: ToAddress
  updatedAt: Date | string
  wizardDone: boolean
  distance: number
  additionalSpace: number | null
}

declare type ServiceOrderType = 'addresschange' | 'insurance' | 'internet' | 'diy' | 'moveclean' | 'movehelp' | 'movehelpCombined' | 'power'
declare type AdvancedServiceOrderType = 'insurance' | 'internet' | 'diy' | 'moveclean' | 'movehelp' | 'movehelpCombined' | 'power'

declare type FromAddress = {
  street: string
  city: string
  zip: string
  additionalSpace?: number | null
  residenceType?: string | null
}

declare type Contact = {
  email: string
  phoneNumber: string
}
declare type ToAddress = {
  street: string
  city: string
  zip: string
  apartmentNumber: string | null
}

declare type AlarmServiceProduct = {
  name: string
  price: string
  quantity: number
}

declare type AlarmServiceOrder = {
  totalPrice: string
  contactInfo: { address: string; email: string; fullName: string; phoneNumber: string }
  deliveryDate: string
  alarmServiceProducts: AlarmServiceProduct[]
}

declare type AdvancedServiceState = {
  canceledAt: string | null | Date
  completedAt: string | null | Date
  contractData: null | Record<string, Record<string, string | number | boolean | null, Record<string, string | number | boolean | null> | string | number | boolean | null>>
  lockedAt: string | null | Date
  meta: null
  provider: null | string
  skippedAt: string | null | Date
  startedAt: string | Date | null
  discountPeriod?: number
  bbvOffer?: Record<string, string>
  movingDistanceTooFar?: boolean
} & ServiceState

declare type ServiceState = {
  state: string
}

declare type Distance = {
  distance: number
}

declare type ToAddressConnectedTypes = {
  street: string
  city: string
  zip: string
  apartmentNumber: string | null
  residenceType: string | null
  apartmentType: string | null
  residenceSize: string | number | null
}
