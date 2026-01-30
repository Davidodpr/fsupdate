'use client'

import { useEffect } from 'react'
import ReactGA4 from 'react-ga4'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { MOVEPAGEURL } from '@/constants/urls'
import Spinner from '@/components/atoms/Spinner'

export const WelcomePage = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!pathname || typeof window === 'undefined') return

    // Clear session storage
    sessionStorage.removeItem('REF_URL')
    sessionStorage.removeItem('REQUEST_SENT')

    // Track analytics event
    const userCreated = searchParams.get('userCreated')
    ReactGA4.event(userCreated === 'true' ? 'signup_success_user' : 'login_success_user')

    // Determine redirect destination
    const refUrl = searchParams.get('refUrl')
    const hasSentRequest = searchParams.get('hasSentRequest')

    if (!refUrl || ['/', '/en'].includes(refUrl)) {
      router.push(MOVEPAGEURL)
    } else {
      const queryString = hasSentRequest ? `?hasSentRequest=${hasSentRequest}` : ''
      router.push(`${refUrl}${queryString}`)
    }
  }, [pathname, router, searchParams])

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Spinner />
    </div>
  )
}

export default WelcomePage
