declare type UserProfile = {
  createdAt: string
  firstName: string
  fullName: string
  id: string
  intercomHash: string
  lastName: string
  meta: Meta | null
  partnerDetails: PartnerDetails
  pno: string
  email: string
  phone: string
  updatedAt: string
  leadDetails: LeadDetails
}

declare type Meta = {
  onboardingChannel: string
}

declare type SkatteverketLoginStatus =
  | 'SKATTEVERKET_STATUS_STARTED'
  | 'SKATTEVERKET_STATUS_BANK_ID_REQUIRED'
  | 'SKATTEVERKET_STATUS_PENDING'
  | 'SKATTEVERKET_STATUS_COMPLETED'
  | 'SKATTEVERKET_STATUS_CANCELLED'
declare type SkatteverketLoginError = 'SKATTEVERKET_TIMEOUT' | 'SKATTEVERKET_BANKID_TIMEOUT' | 'SKATTEVERKET_USER_TIMEOUT'

declare type DomesticServicesBalance = {
  data?: DomesticServicesBalanceData
  isBankIdLoading: boolean
  status?: SkatteverketStatus
  error?: SkatteverketLoginError
}

declare type DomesticServicesBalanceData = {
  amountUsed: {
    rot: number
    rut: number
  }
  amountRemaining: {
    amount: number
    limitedForRotServices: number
  }
  updatedAt: string
}

declare type SkatteverketStatus =
  | { tag: 'SKATTEVERKET_STATUS_STARTED' }
  | {
      tag: 'SKATTEVERKET_STATUS_BANK_ID_REQUIRED'
      qr: string
      autoStartToken: string
    }
  | { tag: 'SKATTEVERKET_STATUS_PENDING' }
  | {
      tag: 'SKATTEVERKET_STATUS_COMPLETED'
      cookie?: object // will only be returned for addresschange
      data?: DomesticServicesBalanceDto
    }
  | {
      tag: 'SKATTEVERKET_STATUS_CANCELLED'
      reason: SkatteverketLoginError
    }
