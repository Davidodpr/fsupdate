'use client'

import React, { useContext, createContext, useState, useEffect, useCallback } from 'react'
import { BANK_ID_STATUS_COMPLETE, BANK_ID_STATUS_FAILED } from '@/constants/bankid'

type BankIdLoginStep = 'init' | 'collect' | typeof BANK_ID_STATUS_COMPLETE | typeof BANK_ID_STATUS_FAILED

export type LoginContextType = {
  getRefUrl: () => string | null
  setRefUrl: (arg0?: string) => void
  getHasSentRequest: () => string | null
  setHasSentRequest: (arg0?: string) => void
  isBankIdOnThisDeviceLogin: boolean
  setIsBankIdOnThisDeviceLogin: (arg0: boolean) => void
  pno: string | undefined
  setPno: (arg0: string) => void
  setLoginState: React.Dispatch<React.SetStateAction<BankIdLoginState>>
  loginState?: BankIdLoginState
}

/* eslint-disable @typescript-eslint/no-empty-function */
const defaultValue: LoginContextType = {
  isBankIdOnThisDeviceLogin: false,
  pno: undefined,
  getRefUrl: () => null,
  setRefUrl: () => {},
  setIsBankIdOnThisDeviceLogin: () => {},
  setPno: () => {},
  setLoginState: () => {},
  loginState: undefined,
  getHasSentRequest: () => null,
  setHasSentRequest: () => {},
}

const LoginContext = createContext<LoginContextType>(defaultValue)

export type LoginProviderProps = {
  children: React.ReactNode
  refUrlProp?: string
  orderRefProp?: string
  loginStatusProp?: string
}

interface BankIdLoginState {
  orderRef?: string | undefined
  autoStartToken?: string | undefined
  statusCode?: string | undefined
  step?: BankIdLoginStep
}

export const LoginProvider = ({ children, refUrlProp, orderRefProp, loginStatusProp }: LoginProviderProps) => {
  const [isBankIdOnThisDeviceLogin, setIsBankIdOnThisDeviceLogin] = useState<boolean>(true)
  const [pno, setPno] = useState<string | undefined>(undefined)
  const getRefUrl = () => sessionStorage.getItem('REF_URL')
  const setRefUrl = useCallback((url?: string) => {
    if (url) {
      sessionStorage.setItem('REF_URL', url)
    } else {
      sessionStorage.removeItem('REF_URL')
    }
  }, [])
  const getHasSentRequest = () => sessionStorage.getItem('REQUEST_SENT')
  const setHasSentRequest = (value?: string) => {
    if (value) {
      sessionStorage.setItem('REQUEST_SENT', value)
    } else {
      sessionStorage.removeItem('REQUEST_SENT')
    }
  }

  const [loginState, setLoginState] = useState<BankIdLoginState>({ statusCode: loginStatusProp, orderRef: orderRefProp, step: 'init' })

  useEffect(() => {
    if (refUrlProp) setRefUrl(refUrlProp)
  }, [refUrlProp, setRefUrl])

  const contextValue: LoginContextType = {
    getRefUrl,
    setRefUrl,
    isBankIdOnThisDeviceLogin,
    setIsBankIdOnThisDeviceLogin,
    pno,
    setPno,
    loginState,
    setLoginState,
    getHasSentRequest,
    setHasSentRequest,
  }
  return <LoginContext.Provider value={contextValue}>{children}</LoginContext.Provider>
}

export const useLogin = () => useContext(LoginContext)
