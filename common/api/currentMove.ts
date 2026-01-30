import createFetchInstance from 'common/utils/api'

const fetchInstance = createFetchInstance('GET')
export const getUsersCurrentMove = async () => {
  try {
    const data = await fetchInstance<CurrentMove>('/moves/current')
    return data
  } catch (e: unknown) {
    console.error(e)
  }
}

export const pollGetUsersCurrentMove = async (callback?: (result: CurrentMove) => void) => {
  let timer: ReturnType<typeof setTimeout>
  let finished = false

  timer = setTimeout(async function poll() {
    try {
      const data = await fetchInstance<CurrentMove>('/moves/current')

      finished = data.addressStatus === 'ready' || data.addressStatus === 'empty'

      if (callback) {
        callback(data)
      }

      clearTimeout(timer)

      if (!finished) {
        timer = setTimeout(poll, 3000)
      }
    } catch (e: unknown) {
      clearTimeout(timer)
      console.error(e)
    }
  }, 3000)
}

export const startNewMove = async (): Promise<CurrentMove> => {
  const fetchInstance = createFetchInstance('POST')
  const data = await fetchInstance<CurrentMove>('/moves/current/archive')
  return data
}
