import Cookies from 'js-cookie'

const createFetchInstance = (method: 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT', withNoCache?: boolean, withoutAuth?: boolean) => {
  const baseURL = process.env.NEXT_PUBLIC_API_URL
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(!withoutAuth && { Authorization: `Bearer ${Cookies.get('userToken')}` }),
    cache: withNoCache ? 'no-store' : 'force-cache',
  }

  const fetchInstance = async <T>(url: string, options: RequestInit = {}, params?: Record<string, string | number | undefined | boolean | string[]>): Promise<T> => {
    const queryString = params
      ? '?' +
        new URLSearchParams(
          Object.entries(params).reduce(
            (acc, [key, value]) => {
              if (value !== undefined) {
                acc[key] = String(value)
              }
              return acc
            },
            {} as Record<string, string>,
          ),
        ).toString()
      : ''

    const response = await fetch(`${baseURL}${url}${queryString}`, {
      signal: AbortSignal.timeout(30000),
      method,
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    })

    if (!response.ok) {
      const data = await response.json()
      const statusCode = data?.statusCode
      const messageKey = data?.messageKey || data?.message
      const err: ErrorType = { statusCode, messageKey }
      return Promise.reject(err)
    }

    if (response.status === 204 || !response) {
      return Promise.resolve({} as T)
    }

    const responseText = await response.text()
    const responseToReturn = responseText ? (JSON.parse(responseText) as T) : ({} as T)

    return responseToReturn
  }
  return fetchInstance
}

export default createFetchInstance
