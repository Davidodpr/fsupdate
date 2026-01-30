import { AddresschangeOrder } from 'types/orders'
import formatDate from '@/appComponents/format'
import createFetchInstance from '../utils/api'

/*
 * Skatteverket endpoints takes much more time than we set globally (3000). Login takes the longest,
 * partly because of we use scraping to login but also because of loadtime from their side.
 */
const config = { timeout: 100000 }
const loginConfig = { timeout: 600000 }

const fetchInstance = createFetchInstance('POST')

export const skatteverketLogin = async (ssn: string) => {
  const fetchInstanceWithTimeout = createFetchInstance('POST')
  const data = await fetchInstanceWithTimeout<SkatteverketLoginResponse>('/skatteverket/login', {
    body: JSON.stringify({ pno: ssn }),
    signal: AbortSignal.timeout(loginConfig.timeout),
  })
  if (data) return data
  else return {}
}

export const skatteverketStatus = async () => {
  const fetchInstanceGet = createFetchInstance('GET')
  const data = await fetchInstanceGet<Record<string, SkatteverketStatusResponse>>('/skatteverket/status')
  if (data) return data
  else return {}
}

export const skatteverketUserData = async () => {
  const fetchInstanceWithTimeout = createFetchInstance('POST')
  const data = await fetchInstanceWithTimeout<Record<string, SkatteverketUserDataResponse>>('/skatteverket/user-data', {
    signal: AbortSignal.timeout(config.timeout),
  })
  if (data) return data
  else return {}
}

export const skatteverketSearchAddresses = async (searchAddress: string) => {
  const fetchInstanceWithTimeout = createFetchInstance('POST')
  const data = await fetchInstanceWithTimeout<Record<string, SkatteverketValidAddressResponse>>('/skatteverket/addresses', {
    body: JSON.stringify({ searchAddress }),
    signal: AbortSignal.timeout(config.timeout),
  })
  if (data) return data
  else return []
}

export const skatteverketSearchAddress = async (searchAddress: SkatteverketValidAddressObject) => {
  const fetchInstanceWithTimeout = createFetchInstance('POST')
  const data = await fetchInstanceWithTimeout<SkatteverketValidAddressResponse>('/skatteverket/address', {
    body: JSON.stringify({ address: searchAddress }),
    signal: AbortSignal.timeout(config.timeout),
  })
  if (data) return data
  else return []
}

export const skatteverketApertmentNumbers = async (addressId: string) => {
  const fetchInstanceWithTimeout = createFetchInstance('POST')
  const data = await fetchInstanceWithTimeout('/skatteverket/apartmentnumbers', {
    body: JSON.stringify({ id: addressId }),
    signal: AbortSignal.timeout(config.timeout),
  })
  if (data && Array.isArray(data)) return data.flatMap((apartmentNumber: string) => Object.values(apartmentNumber))
  else return []
}

export const skatteverketValidate = async (address: SkatteverketValidAddressObject): Promise<Record<string, string | boolean>> => {
  const fetchInstanceWithTimeout = createFetchInstance('POST')
  const data = await fetchInstanceWithTimeout('/skatteverket/validate', {
    body: JSON.stringify({ address }),
    signal: AbortSignal.timeout(config.timeout),
  })
  if (data) return data as Record<string, string | boolean>
  else return {} as Record<string, string | boolean>
}

export const skatteverketChangeAddress = async (contract: SkatteverketContract) => {
  const fetchInstanceWithTimeout = createFetchInstance('POST')
  const data = await fetchInstanceWithTimeout('/skatteverket/change-address', {
    body: JSON.stringify({ ...contract, moveDate: formatDate(contract.moveDate, 'yyyy-MM-dd') }),
    signal: AbortSignal.timeout(config.timeout),
  })
  if (data) return data
  else return {}
}

export const addresschangeCreateOrder = async (orderData: AddresschangeOrder) => {
  const data = await fetchInstance('/web/order/create/addresschange', { body: JSON.stringify(orderData) })
  if (data) return data
  else return {}
}
