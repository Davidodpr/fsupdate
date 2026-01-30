import createFetchInstance from '../utils/api'

const getFetchInstance = createFetchInstance('GET', true)

export const fetchHolidays = async (): Promise<string[]> => {
  return await getFetchInstance<string[]>('/holidays')
}

export default fetchHolidays
