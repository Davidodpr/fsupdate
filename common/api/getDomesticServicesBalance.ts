import createFetchInstance from '../utils/api'

const getDomesticServicesBalance = async (): Promise<DomesticServicesBalanceData | undefined> => {
  const fetchInstance = createFetchInstance('GET')
  try {
    const data = await fetchInstance<DomesticServicesBalanceData>('skatteverket/domestic-services-balance')
    return data
  } catch (e: unknown) {
    return undefined
  }
}

export default getDomesticServicesBalance
