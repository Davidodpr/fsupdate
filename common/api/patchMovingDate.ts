import { format } from 'date-fns'
import createFetchInstance from '../utils/api'

export const patchMovingDate = async (movingDate: Date, movingInDate?: Date, trackEvent?: () => void) => {
  const movingDateString = format(movingDate, 'yyyy-MM-dd')
  const movingInDateString = movingInDate ? format(movingInDate, 'yyyy-MM-dd') : undefined

  const fetchInstance = createFetchInstance('PATCH')

  const newCurrentMove = await fetchInstance<CurrentMove>('/moves/current', {
    body: JSON.stringify({
      movingDate: movingDateString,
      ...(movingInDateString && { movingInDate: movingInDateString }),
    }),
  })

  if (trackEvent) {
    trackEvent()
  }

  return newCurrentMove
}
