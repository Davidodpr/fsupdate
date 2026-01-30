import { sendPageVisit } from 'app/_actions/sendPageVisit'
import Cookies from 'js-cookie'
import { ContactMe } from '../../types/contact-me'
import { getCookieDomain } from '../helpers/domain'
import createFetchInstance from './api'

export const logout = (trackEvent: (arg0: string) => void) => {
  const { localStorage, location } = window
  sendPageVisit(Cookies.get('trackerID') ?? '', 'logout', Cookies.get('userToken') ?? '')
  Cookies.remove('userToken', { path: '/', domain: getCookieDomain(location.hostname) })
  Cookies.remove('lastVisitedPath')
  Cookies.remove('locale')
  trackEvent('profile_logout')
  localStorage.removeItem('channel')
  localStorage.removeItem('closeBirdSay')
  location.href = '/'
}

const fetchGet = createFetchInstance('GET')
const fetchPost = createFetchInstance('POST')

export const dailyUserActivity = async () => {
  return await fetchGet<DailyUserActivityCount>('/users/activity')
}

export const sendContactMeRequest = async (requestData: ContactMe): Promise<void> => {
  await fetchPost('/users/contact-me', {
    body: JSON.stringify(requestData),
  })
}

export const ContactMePartial = async (): Promise<void> => {
  await fetchPost('/users/contact-me/partial')
}
