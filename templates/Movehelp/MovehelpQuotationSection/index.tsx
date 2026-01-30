'use client'

import { useEffect } from 'react'
import Cookie from 'js-cookie'
import { useRouter, useSearchParams } from 'next/navigation'
import { sendRequestStartedUser, sendRequestStartedLead } from '@/common/api/requestQuotation'
import { useLeadContext } from '@/common/context/lead/LeadProvider'
import { useUserContext } from '@/common/context/user/UserProvider'
import RequestQuotation from '../RequestQoutation'

export const MovehelpQuotation = () => {
  const router = useRouter()
  const inviteCodeQuery = useSearchParams().get('inviteCode')
  const hasSentRequest = useSearchParams().get('hasSentRequest')
  const serviceQuery = useSearchParams().get('service')
  const userIdQuery = useSearchParams().get('userId')
  const userToken = Cookie.get('userToken')
  const { setInvitationCode } = useLeadContext()
  const {
    user: {
      profile: { id },
    },
  } = useUserContext()

  useEffect(() => {
    if (id && hasSentRequest !== 'true') sendRequestStartedUser(id)
  }, [id, hasSentRequest])

  useEffect(() => {
    if (!!userIdQuery?.length && !userToken) {
      sendRequestStartedUser(userIdQuery as string)
      router.push('/login?ref=/movehelp-quotation')
    } else if (!userIdQuery?.length && !userToken && !inviteCodeQuery?.length) {
      router.push('/login?ref=/movehelp-quotation')
    }
  }, [userIdQuery, userToken])

  useEffect(() => {
    if (!!inviteCodeQuery?.length) {
      setInvitationCode(inviteCodeQuery as string)
      sendRequestStartedLead(inviteCodeQuery as string)
    }
  }, [inviteCodeQuery])

  return <RequestQuotation onCloseButtonClick={() => router.push('/app/movehelp')} type={serviceQuery === 'movehelpAndCleaning' ? 'movehelpAndmoveclean' : 'movehelp'} />
}

export default MovehelpQuotation
