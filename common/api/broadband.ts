import { OrderContact, OrderAddress, OrderNotes, MoveServiceMeta, MoveServiceOrderProduct } from 'types/book'
import createFetchInstance from '../utils/api'

export const getOffers = async (filterOptions: BroadbandFilterOptions): Promise<BredbandsvalResponse> => {
  const getOffersFetchInstance = createFetchInstance('GET')
  const selectedPackageFilters = filterOptions?.selectedPackages
  return getOffersFetchInstance<BredbandsvalResponse>(
    '/moves/current/internet/bredbandsval',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
    {
      speed: filterOptions?.speed,
      sortBy: filterOptions?.sortBy,
      router: filterOptions?.isRouter,
      types: filterOptions.types?.join(','),
      ...selectedPackageFilters,
    },
  )
}

export const getTvChannels = async (): Promise<BredbandsvalTvChannelsResponse> => {
  const getTvChannelsFetchInstance = createFetchInstance('GET')
  return getTvChannelsFetchInstance<BredbandsvalTvChannelsResponse>('/moves/current/internet/bredbandsval/tv/channels')
}

export const getStreamingServices = async (): Promise<BredbandsvalStreamingServicesResponse> => {
  const getStreamingServicesFetchInstance = createFetchInstance('GET')
  return getStreamingServicesFetchInstance<BredbandsvalStreamingServicesResponse>('/moves/current/internet/bredbandsval/tv/streaming-services')
}

export const getBredbandsvalTerms = async (): Promise<BredbandsvalTermsResponse> => {
  const getBredbandsvalTermsFetchInstance = createFetchInstance('GET')

  return getBredbandsvalTermsFetchInstance<BredbandsvalTermsResponse>('/moves/current/internet/bredbandsval/terms')
}

export const signAndCreateBroadbandOrder = async (orderData: OrderData): Promise<Order> => {
  const fetchPost = createFetchInstance('POST')
  return fetchPost<Order>('/web/order/create/internet', {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  })
}

type OrderData = {
  userId: string
  offerId: string
  startDate?: string
  selectedFlatNr?: string
  meta: {
    cancelExistingContract?: boolean
    existingProvider?: string
    endDate?: string | null
    groupDealChosen?: boolean
  }
  additionalProduct?: {
    id: string
    optional: boolean
  }[]
}

type Order = {
  id: string
  userId?: string
  moveId?: string
  status: string
  orderDate?: Date
  salespersonName?: string
  salespersonAdminId?: string
  salesChannel?: string | null
  supplierName: string
  totalPrice: number
  priceLegacy?: number
  user: OrderContact | null
  address: { to: OrderAddress; from: OrderAddress }
  notes: OrderNotes
  type: string
  meta: MoveServiceMeta
  products: MoveServiceOrderProduct[]
}
