'use client'

import { usePathname } from 'next/navigation'
import Text from '@/components/atoms/Text'
import LoggedInTopNav from '@/components/molecules/LoggedInTopNav'

export default function PageLayoutClientHeader() {
  const pathname = usePathname()
  const noHeader = ['sso', 'movehelp-quotation'].includes(pathname)
  return (
    <>
      {!noHeader && (
        <header className="sticky z-[99] top-0 shadow-[0px_4px_12px_rgba(0,0,0,0.08)]">
          {process.env.NEXT_PUBLIC_ERROR_MESSAGE_ACTIVE === 'true' && (
            <div className="w-full min-h-10 py-2 bg-[var(--color-error-red)] text-[var(--color-white-main)] sticky z-[100] flex justify-center items-center font-bold top-0">
              <Text className="text-center whitespace-pre-line">{process.env.NEXT_PUBLIC_ERROR_MESSAGE?.toString()}</Text>
            </div>
          )}
          <LoggedInTopNav />
        </header>
      )}
    </>
  )
}
