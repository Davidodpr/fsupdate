import createFetchInstance from '../utils/api'

declare type ServiceType = 'diy' | 'homecleaningoffer' | 'handyman' | 'homefix-pro'

const validateZipCode = async (zip: string, service: ServiceType): Promise<boolean> => {
  const fetchInstance = createFetchInstance('GET', true, true)
  try {
    const data = await fetchInstance<boolean>(`/public/service/${service}/area/zip/${zip}`)
    return data
  } catch (e: unknown) {
    console.error(e)
    return false
  }
}

export default validateZipCode
