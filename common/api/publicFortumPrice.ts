import { ExternalElectricityProviderType } from '@/pageTypes/electricity'
import createFetchInstance from '../utils/api'

const fetchGet = createFetchInstance('GET')
const fetchPost = createFetchInstance('POST')

export const getPublicFortumPrice = async (zipCode: number, residenceType: string, residenceSize: number): Promise<ExternalElectricityProviderType | undefined> => {
  return fetchGet<ExternalElectricityProviderType>(`/web/public/fortum-price/${zipCode}?residenceType=${residenceType}&residenceSize=${residenceSize}`)
}

export const sendPublicFortumPricePageVisit = async (isInitial: boolean, zipcode?: number, id?: string): Promise<{ id: string }> => {
  return fetchPost(`/web/public/fortum-price-page-visit`, {
    body: JSON.stringify({ isInitial, zipcode, id }),
  })
}

export default getPublicFortumPrice
