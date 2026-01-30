declare type BroadbandOrder = {
  offerId: string
  userId: string
  additionalProducts?: AdditionalProduct[]
  cancelExistingContract?: boolean
  existingProvider?: string
  selectedFlatNr: string | null
  startDate?: string
  endDate?: string
  groupDealChosen?: boolean
  emailAndPhone?: { email: string; phone: string }
}

type AdditionalProduct = {
  id: string
  optional: boolean
}
