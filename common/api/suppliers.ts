import createFetchInstance from '../utils/api'

const fetchSuppliers = createFetchInstance('GET')

export const getSuppliers = async (type: string): Promise<Supplier[]> => {
  const { items } = await fetchSuppliers<SupplierResponse>(`/suppliers`, {}, { type })
  return items
}

export type SupplierResponse = {
  items: Supplier[]
}

export type Supplier = {
  id: string
  name: string
  type: string
  cancellationOptions: CancellationOptions[]
  createdAt: string
  updatedAt: string
}

export type CancellationOptions = {
  id: string
  text: string
}
