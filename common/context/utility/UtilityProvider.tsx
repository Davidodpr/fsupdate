import { HTMLAttributes, createContext, useCallback, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { usePathname } from 'next/navigation'
import { getOffers } from '@/common/api/broadband'
import getHolidays from '@/common/api/getHolidays'
import { useUserContext } from '@/common/context/user/UserProvider'
import { isActivityLockedOrCompleted } from '@/utils/activity'

const defaultValue: UtilityContextType = {
  holidayDates: [],
}

export type UtilityContextType = {
  holidayDates: string[]
}

type UtilityProviderProps = {
  context: React.Context<UtilityContextType>
} & HTMLAttributes<HTMLDivElement>

const UtilityContext = createContext(defaultValue)

export const UtilityProvider = ({ children }: UtilityProviderProps) => {
  const userData = useUserContext()
  const { currentMove } = userData.user
  const { internet } = currentMove
  const [holidayDates, setHolidayDates] = useState<string[]>([])
  const pathname = usePathname()
  const userToken = Cookies.get('userToken')
  const fetchHolidays = async () => {
    const holidaysArray = await getHolidays()
    if (holidaysArray) {
      setHolidayDates(holidaysArray)
    }
  }

  const startFetchingElectricityPrices = useCallback(() => {
    const electricityParams = {
      speed: 0,
      sortBy: 'price',
      isRouter: false,
      types: ['dsl', 'coaxial', 'fiber', 'mobile'],
      selectedPackages: {},
    }

    if (
      currentMove?.toAddress?.zip &&
      currentMove?.toAddress?.street &&
      currentMove?.toAddress?.city &&
      !isActivityLockedOrCompleted(internet?.state || '') &&
      !!userToken?.length
    ) {
      setTimeout(() => {
        getOffers(electricityParams)
      }, 3000)
    }
  }, [currentMove?.toAddress?.zip, currentMove?.toAddress?.street, currentMove?.toAddress?.city, internet?.state, userToken])

  useEffect(() => {
    if (pathname === '/app/movepage' && userToken) {
      startFetchingElectricityPrices()
    }
  }, [pathname, currentMove.toAddress?.zip, currentMove.toAddress?.street, currentMove.toAddress?.city, startFetchingElectricityPrices, userToken])

  useEffect(() => {
    if (
      ['/app/showcleaning', '/external/modules/showcleaning', '/app/movehelp', '/app/moveclean', '/external/modules/movehelp', '/external/modules/moveclean'].includes(pathname)
    ) {
      fetchHolidays()
    }
  }, [pathname])

  return <UtilityContext.Provider value={{ holidayDates }}>{children}</UtilityContext.Provider>
}

export const CreateUtilityContext = () => {
  return createContext<UtilityContextType>(defaultValue)
}

export const useUtilityContext = () => useContext(UtilityContext)
