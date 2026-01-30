'use client'

import { HTMLAttributes, createContext, useCallback, useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { getUsersCurrentMove, startNewMove } from '@/common/api/currentMove'
import getUser from '@/common/api/getUser'
import initDomesticServicesBalanceLogin from '@/common/api/initDomesticServicesBalanceLogin'
import { patchMovingDate } from '@/common/api/patchMovingDate'
import { updateCurrentMove } from '@/common/api/updateCurrentMove'
import updateDomesticServicesBalance from '@/common/api/updateDomesticServicesBalance'
import { updateFromAddress } from '@/common/api/updateFromAddress'
import { updateToAddress } from '@/common/api/updateToAddress'
import { updateUserContactInfo } from '@/common/api/updateUser'
import { UpdatedMoveValues } from '@/templates/Moveclean/types'

/* eslint-disable @typescript-eslint/no-empty-function */
const defaultValue: UserContextType = {
  user: {
    hasFetchedData: false,
    currentMove: {} as CurrentMove,
    profile: {} as UserProfile,
    contact: {} as UserContact,
    currentMoveLoading: true,
    domesticServicesBalance: {} as DomesticServicesBalance,
  },
  refetchUser: () => {},
  updateMovingDate: () => {},
  updateCurrentFromAddress: () => new Promise<CurrentMove | undefined>(() => {}),
  updateCurrentToAddress: async () => new Promise<CurrentMove | undefined>(() => {}),
  updateCurrentMoveData: async () => new Promise<CurrentMove | undefined>(() => {}),
  getCurrentMove: () => {},
  domesticServicesBalanceLogin: () => {},
  archiveMove: async (): Promise<void> => {},
  updateUserInfo: () => {},
  setUserTokenCookie: () => {},
}

export type UserContextType = {
  user: User
  refetchUser: () => void
  updateMovingDate: (arg0: Date, arg1?: Date) => void
  updateCurrentFromAddress: (arg0?: FromAddress, arg1?: number | null, arg2?: number | null) => Promise<CurrentMove | undefined>
  updateCurrentToAddress: (arg0: ToAddressConnectedTypes) => Promise<CurrentMove | undefined>
  getCurrentMove: () => void
  updateCurrentMoveData: (arg0: UpdatedMoveValues) => Promise<CurrentMove | undefined>
  domesticServicesBalanceLogin: (ssn: string) => void
  archiveMove: () => Promise<void>
  updateUserInfo: (arg0: UserContactInfoFormValues) => void
  setUserTokenCookie: (value: string, options?: Cookies.CookieAttributes) => void
}

export type UserProviderProps = {
  defaultValueUser?: User
  context: React.Context<UserContextType>
} & HTMLAttributes<HTMLDivElement>

const UserContext = createContext(defaultValue)

export const UserProvider = ({ children, defaultValueUser }: UserProviderProps) => {
  const [currentUserState, setCurrentUserState] = useState<User>(defaultValueUser ? defaultValueUser : defaultValue.user)
  const [domesticServicesBalance, setDomesticServicesBalance] = useState<DomesticServicesBalance | null>(null)
  const [userToken, setUserToken] = useState(Cookies.get('userToken'))

  const updateMovingDate = async (movingDate: Date, movingInDate?: Date) => {
    const newMovingDate = new Date() > movingDate ? new Date(new Date().setDate(new Date().getDate() + 1)) : movingDate
    const response = await patchMovingDate(newMovingDate, movingInDate)
    const newState = { ...currentUserState, currentMove: response || ({} as CurrentMove) }
    if (response) setCurrentUserState(newState)
  }

  // Function to set cookie in order for user provider to be notified to refetch user
  const setUserTokenCookie = (value: string, options?: Cookies.CookieAttributes | undefined) => {
    const userTokenCookie = Cookies.set('userToken', value, options)
    setUserToken(value)
    setCurrentUserState({ ...currentUserState, hasFetchedData: false })
    return userTokenCookie
  }

  const updateCurrentFromAddress = async (value?: FromAddress, residenceSize?: number | null, additionalSpace?: number | null) => {
    const response = await updateFromAddress(
      value?.street ? { ...value, additionalSpace: additionalSpace ?? value?.additionalSpace } : { ...currentUserState?.currentMove?.fromAddress },
      residenceSize || currentUserState?.currentMove?.fromResidenceSize,
    )
    if (response) {
      setCurrentUserState((prevState) => ({
        ...prevState,
        currentMove: {
          ...currentUserState.currentMove,
          fromAddress: response.fromAddress,
          fromResidenceSize: response.fromResidenceSize,
          distance: response.distance,
          additionalSpace: response.additionalSpace,
        },
      }))
      return response
    }
    return undefined
  }

  const updateCurrentToAddress = async (value: ToAddressConnectedTypes) => {
    // Allow saving even if street is empty - user might want to save other fields
    const residenceSizeParam = value?.residenceSize === 0 ? undefined : (value?.residenceSize?.toString() ?? undefined)
    const response = await updateToAddress({ ...value }, residenceSizeParam)
    if (response) {
      setCurrentUserState((prevState) => ({ ...prevState, currentMove: { ...prevState.currentMove, ...response } }))
      return response
    }
  }

  const updateCurrentMoveData = async (data: UpdatedMoveValues) => {
    if (!data?.toAddress?.street?.length) {
      const response = updateCurrentFromAddress(data?.fromAddress, data?.sqm, Number(data?.additionalSpace) ?? 0)
      return response
    } else {
      const response = await updateCurrentMove(data)
      if (response) {
        const newState = {
          ...currentUserState,
          currentMove: response,
        }
        setCurrentUserState(newState)
        return response
      }
    }
  }

  const getCurrentMove = async () => {
    const response = await getUsersCurrentMove()
    if (response) {
      const newState = {
        ...currentUserState,
        currentMove: response,
      }
      setCurrentUserState(newState)
    }
  }

  const getDomesticServicesBalanceLoginStatus = useCallback(async (): Promise<void> => {
    await updateDomesticServicesBalance((balance) => setDomesticServicesBalance(balance))
  }, [])

  const domesticServicesBalanceLogin = async (ssn: string) => {
    await initDomesticServicesBalanceLogin(ssn)
    await getDomesticServicesBalanceLoginStatus()
  }

  useEffect(() => {
    if (domesticServicesBalance) {
      const newState = {
        ...currentUserState,
        domesticServicesBalance,
      }
      setCurrentUserState(newState)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domesticServicesBalance])

  const updateUserInfo = async (values: UserContactInfoFormValues) => {
    if (values) {
      const response = await updateUserContactInfo({ ...values })
      if (response) {
        const newState = {
          ...currentUserState,
          contact: response,
        }
        setCurrentUserState(newState)
      }
    }
  }

  const archiveMove = async () => {
    const response = await startNewMove()
    if (response) {
      const newState = {
        ...currentUserState,
        currentMove: response,
      }
      setCurrentUserState(newState)
    }
  }

  useEffect(() => {
    const getUserResponse = async () => {
      if (!!userToken) {
        const userResponse = await getUser()
        if (userResponse) {
          setCurrentUserState(userResponse)
        } else {
          setCurrentUserState({ ...defaultValue.user, hasFetchedData: true })
        }
      } else {
        setCurrentUserState({ ...defaultValue.user, hasFetchedData: true })
      }
    }
    if (!currentUserState.hasFetchedData) {
      getUserResponse()
    }
  }, [currentUserState.hasFetchedData, userToken])

  const refetchUser = useCallback(() => {
    setCurrentUserState((prevState) => ({ ...prevState, hasFetchedData: false }))
  }, [])

  const contextValue: UserContextType = {
    user: currentUserState,
    refetchUser,
    archiveMove: archiveMove,
    getCurrentMove: getCurrentMove,
    updateMovingDate: updateMovingDate,
    updateCurrentFromAddress: updateCurrentFromAddress,
    updateCurrentToAddress: updateCurrentToAddress,
    domesticServicesBalanceLogin: domesticServicesBalanceLogin,
    updateUserInfo: updateUserInfo,
    setUserTokenCookie,
    updateCurrentMoveData,
  }

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}

export const CreateUserContext = () => {
  return createContext<UserContextType>(defaultValue)
}

export const useUserContext = () => useContext(UserContext)
