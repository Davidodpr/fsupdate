import { UpdatedMoveValues } from '@/templates/Moveclean/types'
import createFetchInstance from '../utils/api'

export const updateCurrentMove = async (data: UpdatedMoveValues) => {
  const fetchPatch = createFetchInstance('PATCH')
  if (data) {
    const newCurrentMove = await fetchPatch<CurrentMove>('/moves/current', {
      body: JSON.stringify({
        toAddress: {
          ...data.toAddress,
        },
        fromAddress: {
          ...data?.fromAddress,
          additionalSpace: Number(data?.additionalSpace),
        },
        fromResidenceSize: data?.sqm,
      }),
    })
    return newCurrentMove
  }
}

export const updateToAddress = async (data: UpdatedMoveValues, token?: string) => {
  const fetchPatch = createFetchInstance('PATCH')
  if (data) {
    const newCurrentMove = await fetchPatch<CurrentMove>('/moves/current', {
      body: JSON.stringify({
        toAddress: {
          ...data.toAddress,
        },
      }),
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })
    return newCurrentMove
  }
}
