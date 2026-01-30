import createFetchInstance from '../utils/api'

const fetchInstance = createFetchInstance('PATCH')

export const updateUserLanguage = async (userLanguage: FullLocale): Promise<void> => {
  await fetchInstance('/web/user/change-language', { body: JSON.stringify({ language: userLanguage }) })
}
