'use server'

import { cookies } from 'next/headers'

export const getUser = async () => {
  const domain = location.hostname === 'localhost' ? location.hostname : 'flyttsmart.se'
  const cookieStore = await cookies()
  const userToken = cookieStore.get('userToken')
  const usersMe = async () => {
    const data = await fetch(`${process.env.API_URL}${domain}/user/me`, { headers: { Authorization: `Bearer ${userToken}` } })
    return { data: await data.json() }
  }
  const movesCurrent = async () => {
    const data = await fetch(`${process.env.API_URL}${domain}/moves/current`, { headers: { Authorization: `Bearer ${userToken}` } })
    return { data: await data.json() }
  }
  const usersContact = async () => {
    const data = await fetch(`${process.env.API_URL}${domain}/users/contact`, { headers: { Authorization: `Bearer ${userToken}` } })
    return { data: await data.json() }
  }
  if (userToken) {
    const [{ data: user }, { data: currentMove }, { data: contact }] = await Promise.all([usersMe(), movesCurrent(), usersContact()])
    const { domesticServicesBalance, ...profile } = user
    cookieStore.set('trackerID', user.id, { expires: 365, domain })
    return {
      currentMove,
      profile,
      contact,
      domesticServicesBalance: { data: domesticServicesBalance, isBankIdLoading: false },
      currentMoveLoading: false,
      hasFetchedData: true,
    }
  }
}
