declare type Lead = {
  leadDetails: LeadDetails
  hasFetchedData: boolean
  partnerDetails: PartnerDetails
}

declare type PartnerDetails = {
  partnerId: string
  partnerName: string
  agentName: string
}
declare type LeadDetails = {
  brokerOfficeId: string
  brokerOfficeName: string
  brokerOfficePersonName: string
  pno: string
  id: string
  address: LeadAddress
  sourceSystem: string
  type: 'buyer' | 'seller' | null
  movingDate: Date
  inviteCode: string
  brokerAgencyLogo?: string
  assignedMcAdmin?: {
    id: string
    name: string
  }
}

declare type LeadAddressData = {
  toStreet: string
  toZip: string
  toCity: string
  movingInDate: Date
  movingOutDate: Date
  hasMovingInDate: boolean
}

declare type LeadAddress = {
  apartmentNumber: number | null
  city: string
  street: string
  zip: string
}
