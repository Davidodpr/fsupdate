'use client'

import TopNav from 'app/_components/topNav'
import { usePathname } from 'next/navigation'
import { useUserContext } from '@/common/context/user/UserProvider'
import Text from '@/components/atoms/Text'
import LoggedInTopNav from '@/components/molecules/LoggedInTopNav'

export default function PageLayoutClientHeader({ isServerMobile }: { isServerMobile: boolean }) {
  const pathname = usePathname()
  const noHeader = ['sso', 'movehelp-quotation'].includes(pathname)
  const noMenu = ['cookie', 'partnervilkor', 'privacy_policy', 'uppforandekod'].includes(pathname)
  const isCoordinatorPage = pathname.includes('/coordinator/')
  const {
    user: { currentMove },
  } = useUserContext()

  return (
    <>
      {!noHeader && (
        <header className="sticky z-[99] top-0 shadow-[0px_4px_12px_rgba(0,0,0,0.08)]">
          {process.env.NEXT_PUBLIC_ERROR_MESSAGE_ACTIVE === 'true' && (
            <div className="w-full min-h-10 py-2 bg-[var(--color-error-red)] text-[var(--color-white-main)] sticky z-[100] flex justify-center items-center font-bold top-0">
              <Text className="text-center whitespace-pre-line">{process.env.NEXT_PUBLIC_ERROR_MESSAGE?.toString()}</Text>
            </div>
          )}
          {currentMove?.id ? (
            <LoggedInTopNav />
          ) : (
            <TopNav isServerMobile={isServerMobile} noMenu={noMenu} onlyLogin={isCoordinatorPage || (pathname !== '/' && pathname !== '/en')} />
          )}
        </header>
      )}
    </>
  )
}
