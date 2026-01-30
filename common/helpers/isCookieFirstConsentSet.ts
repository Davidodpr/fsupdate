import Cookies from 'js-cookie'

export const isCookieFirstConsentSet = (): boolean => {
  return Cookies.get('cookiefirst-consent') !== undefined
}
