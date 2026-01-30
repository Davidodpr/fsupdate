import { ReactNode } from 'react'
import createFetchInstance from '../utils/api'

const sendToZapier = async (
  params: Record<string, string | string[] | ReactNode | number | undefined | Record<string, string | number>[] | Record<string, string | number>>,
  url: string,
) => {
  try {
    const fetchInstance = createFetchInstance('POST', true, true)
    const data = await fetchInstance<Record<string, string>>(url, { body: JSON.stringify(params) })
    if (data) return data
  } catch (e: unknown) {
    console.error(e)
  }
}

export default sendToZapier
