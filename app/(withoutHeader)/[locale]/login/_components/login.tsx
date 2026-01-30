'use client'

import React, { useEffect, useState } from 'react'
import { useIntercom } from 'react-use-intercom'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLogin } from '@/common/context/login/Login.provider'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import Spinner from '@/components/atoms/Spinner'
import { ERRORCODES } from '@/constants/errorCodes'
import { MOVEPAGEURL } from '@/constants/urls'
import { Collect } from '@/templates/LoginTemplate/Collect/Collect'
import { Failed } from '@/templates/LoginTemplate/Failed/Failed'
import { Init } from '@/templates/LoginTemplate/Init/Init'

const LoginMain = () => {
  const router = useRouter()
  const refQuery = useSearchParams().get('ref')
  const partnerQuery = useSearchParams().get('partner')
  const oldNewUserQuery = useSearchParams().get('oldNewUser')
  const { loginState, setRefUrl, setHasSentRequest, setLoginState } = useLogin()
  const { boot } = useIntercom()
  const { setNewTheme } = useThemeContext()
  const [leadHasAlreadyUsedInvitationLink, setLeadHasAlreadyUsedInvitationLink] = useState(false)
  const {
    user: { currentMove },
  } = useUserContext()

  useEffect(() => {
    setTimeout(() => {
      boot()
    }, 100)
  }, [boot])

  useEffect(() => {
    if (!!currentMove?.id) router.push(MOVEPAGEURL)
  }, [currentMove, router])

  useEffect(() => {
    if (!!refQuery) {
      setRefUrl(refQuery as string)
      setHasSentRequest('true')
      router.push('/login')
    }
    if (partnerQuery === 'fortum') setNewTheme(ThemeEnum.FORTUM)
    if (oldNewUserQuery) {
      setLeadHasAlreadyUsedInvitationLink(true)
    }
  }, [refQuery, setRefUrl, router, setNewTheme, oldNewUserQuery, partnerQuery, setHasSentRequest])

  useEffect(() => {
    if (loginState?.step === 'init' && loginState?.statusCode === ERRORCODES.ORDERCANCELED) {
      setLeadHasAlreadyUsedInvitationLink(false)
      setTimeout(() => {
        setLoginState(() => ({ step: 'init', statusCode: undefined }))
      }, 2000)
    }
  }, [loginState, setLoginState])

  if (loginState?.step === 'init' && loginState?.statusCode === ERRORCODES.ORDERCANCELED) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner scale={2} color="green" />
      </div>
    )
  }

  if (loginState?.step === 'collect') return <Collect />
  if (loginState?.step === 'failed') return <Failed />
  if (loginState?.step === 'init') return <Init leadHasAlreadyUsedInvitationLink={leadHasAlreadyUsedInvitationLink} />
  return <div></div>
}

export default LoginMain
