import { ElomradenAddressDTO } from 'types/elomraden'
import { PowerOrder } from 'types/orders'
import { ElectricityProviderType } from '@/pageTypes/electricity'
import createFetchInstance from '../utils/api'

const fetchGet = createFetchInstance('GET')
const fetchPost = createFetchInstance('POST')
const fetchPatch = createFetchInstance('PATCH')

export const getElectricityPrices = async (consumption: number, signal?: AbortController['signal']): Promise<Record<string, ElectricityProviderType> | undefined> => {
  try {
    const data = await fetchGet<Record<string, ElectricityProviderType>>(
      `/moves/current/power/prices?consumptionPeriod=yearly&estimatedYearlyConsumption=${consumption}`,
      signal ? { signal } : undefined,
    )
    if (data) return data
    else return {}
  } catch (e: unknown) {
    return undefined
  }
}

export const getExternalCurrentElectricityData = async (): Promise<ElomradenAddressDTO | undefined> => {
  try {
    const data = await fetchGet<ElomradenAddressDTO>('/web/external/current/electricity/data')
    return data
  } catch (e: unknown) {
    return undefined
  }
}

export const getElectricityConsumption = async (residenceType: string, residenceSize: number): Promise<number | undefined> => {
  const data = await fetchGet<number>(`/electricity-consumption?residenceType=${residenceType}&residenceSize=${residenceSize}`)
  return data
}

export const signPower = async (apartmentNumber: string, orderData: OrderData): Promise<PowerOrder> => {
  if (apartmentNumber) {
    // Update apartment number
    await fetchPatch('/moves/current', {
      body: JSON.stringify({ apartmentNumber }),
    })
  }
  const order = await fetchPost<PowerOrder>('/web/order/create/power', {
    body: JSON.stringify(orderData),
  })

  window.dataLayer?.push({ price_per_month: Math.floor(Number(orderData?.meta?.estimatedYearlyConsumption) / 12) })

  return order
}

type OrderData = {
  supplierName: string
  meta: {
    cancelExistingContract: boolean
    existingProvider: string
    endDate: Date | string | null
    estimatedYearlyConsumption?: number | string
  }
  products: {
    service: string
    price: number | null
    deliveryDate: string | null
    description: string
    meta: {
      discountPeriod: number | undefined
      areaId: string
      facilityId: string | null
      active: null
      vattenfall?: {
        discCampaign?: string
        tlCampaign?: string
      }
    }
  }[]
}
