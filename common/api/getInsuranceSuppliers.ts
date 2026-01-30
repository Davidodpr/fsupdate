import createFetchInstance from '../utils/api'

declare type SuppliersResponse = {
  items: InsuranceSupplier[]
}

export const loadSuppliersOptions = async (): Promise<InsuranceSupplier[] | []> => {
  const getFetchInstance = createFetchInstance('GET')
  const data = await getFetchInstance<SuppliersResponse>('/suppliers', {}, { type: 'insurance' })

  if (data?.items) return data?.items
  return []
}

export default loadSuppliersOptions
