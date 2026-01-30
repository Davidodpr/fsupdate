'use client'

import { useEffect } from 'react'
import { sendPageVisit } from 'app/_actions/sendPageVisit'
import Cookies from 'js-cookie'
import { usePathname } from 'next/navigation'


export function TrackPageVisit() {
  const pathname = usePathname()

  const sendPageVisitClient = async (userIdParam: string, pageName: string, userToken: string) => {
    await sendPageVisit(userIdParam, pageName, userToken || '')
  }

  useEffect(() => {
    const lastPath = window.sessionStorage.getItem('lastPath')
    const userId = Cookies.get('trackerID')

    if (!lastPath || (lastPath !== pathname && (pathname?.includes('/app/') || pathname?.includes('/external/')))) {
      if (userId && pageUrlHelper(pathname)?.length > 0) {
        sendPageVisitClient(userId, pageUrlHelper(pathname), Cookies.get('userToken') || '')
      }
    }
    window.sessionStorage.setItem('lastPath', pathname)
  }, [pathname])

  return null
}

const pageUrlHelper = (pathname: string) => {
  switch (pathname) {
    case '/app/movepage':
    case '/external/modules/movepage':
      return 'movepage'
    case '/external/modules/movehelp':
    case '/app/movehelp':
      return 'movehelp'
    case '/app/moveclean':
    case '/external/modules/moveclean':
      return 'moveclean'
    case '/app/insurance':
    case '/external/modules/insurance':
      return 'insurance'
    case '/app/electricity':
    case '/external/modules/electricity':
      return 'electricity'
    case '/app/broadband':
    case '/external/modules/broadband':
      return 'internet'
    case '/app/addresschange':
    case '/external/modules/addresschange':
      return 'addresschange'
    case '/app/welcome':
      return 'login'
    default:
      return ''
  }
}
