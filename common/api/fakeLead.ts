import createFetchInstance from '../utils/api'

declare type HomelistingResponse = {
  residenceSize: number
  id: string
  source: string
  originalId: string
  brokerOfficeId: string
  address: {
    street: string
    zip: string
    city: string
    apartmentNumber: string
  }
  publishDate: string
  signingDate: string
  startingPrice: number
  finalPrice: number
  movingDate: string
  residenceType: string
  apartmentType: string
  brokerPersonName: string
  newProduction: boolean
  updatedAt: string
  createdAt: string
  number: number
  meta: null
}

declare type LeadResponse = {
  id: string
  pno: string
  firstName: string
  lastName: string
  contact: {
    phone: string[]
    email: string[]
  }
  updatedAt: string
  createdAt: string
  userId: null
  intercomId: null
  inviteCode: string
  address: {
    street: string
    apartmentNumber: string
    zip: string
    city: string
  }
  residence: {
    type: string
    size: number
    apartmentType: string
  }
  movingDate: string
  source: {
    person: string
    company: string
    group: string
    origin: string
    vitec: {
      userId: string
      customerId: string
      chainId: string
    }
  }
  meta: null
  signupStarted: null
  signupCompleted: null
  deletedAt: null
  onboardingStartedAt: null
  onboardingSkippedAt: null
}

export const createFakeLead = async (): Promise<LeadResponse> => {
  const fetchPost = createFetchInstance('POST')

  const homelistingResponse = await fetchPost<HomelistingResponse>('/dev/home-listing/create/vitec')
  if (homelistingResponse?.id) {
    const fakeLeadResponse = await fetchPost<LeadResponse[]>('/dev/lead/create-fake-lead', { body: JSON.stringify({ homeListingId: homelistingResponse.id }) })
    return fakeLeadResponse[0]
  } else {
    throw new Error('Could not create fake lead')
  }
}
