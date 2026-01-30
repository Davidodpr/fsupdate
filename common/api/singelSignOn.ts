import Cookies from 'js-cookie'
import createFetchInstance from '../utils/api'

const fetchInstance = createFetchInstance('POST')
export const validateToken = async (token: string) => {
  const data = await fetchInstance<boolean>('/auth/users/login/sso/validate', {
    body: JSON.stringify({ token: token }),
  })
  return data
}

export const loginSso = async (token: string, setUserTokenCookie?: (value: string, options?: Cookies.CookieAttributes) => void) => {
  const data = await fetchInstance<Record<string, string>>('/auth/users/login/sso', {
    body: JSON.stringify({ token: token }),
  })
  const domain = location.hostname === 'localhost' ? location.hostname : 'flyttsmart.se'

  if (data?.accessToken) {
    let options: Cookies.CookieAttributes = { expires: 365, domain }
    if (domain !== 'localhost') {
      options = { ...options, secure: true, sameSite: 'None' }
    }
    setUserTokenCookie ? setUserTokenCookie(data.accessToken, options) : Cookies.set('userToken', data?.accessToken, options)
    return true
  }

  return false
}

export const createSsoUser = async (token: string) => {
  const response = await fetchInstance<{ token: string }>('/auth/users/login/sso/accept', {
    body: JSON.stringify({ token: token }),
  })
  return response
}
