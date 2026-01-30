import Cookies from 'js-cookie'
import { ActivityEnum } from '../types/activity'
import createFetchInstance from '../utils/api'
import { getRandomMcAdmin } from '../utils/mcAdminHelpers'

interface UserRespons {
  createdAt: string
  domesticServicesBalance: DomesticServicesBalance
  firstName: string
  fullName: string
  id: string
  intercomHash: string
  lastName: string
  leadDetails: LeadDetails
  meta: null
  pno: string
  updatedAt: string
  partnerDetails: {
    partnerId: string
    partnerName: string
    agentName: string
  }
  email: string
  phone: string
}

const getUser = async (): Promise<User | undefined> => {
  const domain = location.hostname === 'localhost' ? location.hostname : 'flyttsmart.se'
  const userToken = Cookies.get('userToken')
  if (userToken) {
    try {
      const withNoCache = true
      const fetchGet = createFetchInstance('GET', withNoCache)
      const [user, currentMove, contact] = await Promise.all([fetchGet<UserRespons>('/users/me'), fetchGet<CurrentMove>('/moves/current'), fetchGet<UserContact>('/users/contact')])
      const { domesticServicesBalance, ...profile } = user
      Cookies.set('trackerID', user.id, { expires: 365, domain })

      // Ensure leadDetails has assignedMcAdmin, use random if not provided
      const leadDetailsWithMcAdmin = {
        ...profile.leadDetails,
        assignedMcAdmin: profile.leadDetails?.assignedMcAdmin || getRandomMcAdmin(user.id),
      }

      return {
        currentMove,
        profile: {
          ...profile,
          leadDetails: leadDetailsWithMcAdmin,
        },
        contact,
        domesticServicesBalance: { data: domesticServicesBalance?.data, isBankIdLoading: false },
        currentMoveLoading: false,
        hasFetchedData: true,
      }
    } catch (e) {
      console.error(e)
    }
  }
}

interface IncrementMoveservicePageVisitIntercomEventProps {
  service: ActivityEnum.MOVECLEAN | ActivityEnum.MOVEHELP
}
export const incrementMoveservicePageVisitIntercomEvent = async ({ service }: IncrementMoveservicePageVisitIntercomEventProps) => {
  try {
    const withNoCache = true
    const fetchPost = createFetchInstance('POST', withNoCache)
    await fetchPost<void>(`/web/user/increment-moveservice-flow-visit/${service}`, {})
  } catch (e) {
    console.error(e)
  }
}

export const getLead = async (invitationCode: string): Promise<Lead> => {
  const withNoCache = true
  const fetchGet = createFetchInstance('GET', withNoCache)
  const data = await fetchGet<Lead>(`/users/code/${invitationCode}`)
  return data
}
export default getUser
