import createFetchInstance from '../utils/api'

export const updateUserContactInfo = async (userContactInfo: UserContactInfoFormValues) => {
  const fetchInstance = createFetchInstance('PATCH')
  const userContactResponse = await fetchInstance<UserContact>('/users/contact', {
    body: JSON.stringify({
      email: userContactInfo.email,
      phone: userContactInfo.phone,
      firstName: userContactInfo.firstName,
      lastName: userContactInfo.lastName,
    }),
  })
  return userContactResponse
}
