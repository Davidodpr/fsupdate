import createFetchInstance from '../utils/api'

const withNoCache = true
const fetchInstance = createFetchInstance('POST', withNoCache)

export const autoSignup = async (code: string, withoutNewAddress?: boolean) => {
  const data = await fetchInstance<Record<string, string | number>>('/users/signup/auto', {
    body: JSON.stringify({ invitationCode: code, withoutNewAddress }),
  })
  return data
}
