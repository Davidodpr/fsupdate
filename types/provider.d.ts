type moveType = 'moving' | 'cleaning' | 'storage' | 'packaging'

export type ProviderItem = {
  createdAt: string
  displayName: string
  id: string
  movehelpPriceAddon: string | null
  name: string
  organizationId: string
  type: string
  updatedAt: string
  movehelpPrices: MovePricesItem[]
  serviceTypes: moveType[]
  rating: number | null
  reviews: number | null
}

export type MovePricesItem = {
  residenceSize: number
  moving: number
  cleaning: number
  discount: { tag: string; amount: number }
}
