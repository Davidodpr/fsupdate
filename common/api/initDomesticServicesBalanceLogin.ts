import createFetchInstance from '../utils/api'

const initDomesticServicesBalanceLogin = async (ssn: string): Promise<void> => {
  const fetchInstance = createFetchInstance('POST')
  try {
    await fetchInstance('/skatteverket/domestic-services-balance/login', {
      body: JSON.stringify({ pno: ssn }),
      signal: AbortSignal.timeout(60000),
    })
  } catch (e: unknown) {
    return
  }
}

export default initDomesticServicesBalanceLogin
