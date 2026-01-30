import createFetchInstance from '../utils/api'

export const updateFromAddress = async (fromAddress: FromAddress | null, fromResidenceSize: number | null) => {
  const fetchInstance = createFetchInstance('PATCH')
  const newCurrentMove = await fetchInstance<CurrentMove>('/moves/current', {
    body: JSON.stringify({
      fromAddress: {
        ...fromAddress,
        street: fromAddress?.street?.trim(),
      },
      ...(fromResidenceSize ? { fromResidenceSize: fromResidenceSize } : null),
    }),
  })
  return newCurrentMove
}
