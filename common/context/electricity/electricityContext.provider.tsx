import React, { createContext, useContext, useState, useEffect, HTMLAttributes, useCallback, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ElomradenAddressDTO } from 'types/elomraden'
import formatDate from '@/appComponents/format'
import { getElectricityPrices, getElectricityConsumption, signPower, getExternalCurrentElectricityData } from '@/common/api/electricity'
import { initPoaBankIdSign, collectPoaBankIdSign } from '@/common/api/poa'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import { extractDtoValidationErrors } from '@/common/helpers/extractDtoValidationErrors'
import { ActivityEnum } from '@/common/types/activity'
import { BANK_ID_STATUS_COMPLETE, BANK_ID_STATUS_FAILED } from '@/constants/bankid'
import { VATTENFALL } from '@/constants/electricity'
import { ORDER_SERVICE_POWER, ORDER_STATUS_LOCKED } from '@/constants/order'
import { ElectricityProviderType } from '@/pageTypes/electricity'
import { useThemeContext } from '../theme/themeContext.provider'
import { useUserContext } from '../user/UserProvider'

type ElectricityProviderContextType = {
  currentProvider: ElectricityProviderType | null
  electricityProviders: Record<string, ElectricityProviderType>
  selectProvider: (providerName: string) => void
  consumptionValue: number | string | undefined
  setConsumptionValue: (consumptionValue: number | string) => void
  yearlyElectricityConsumption: number | undefined
  getYearlyElectricityConsumption: (residenceSize: number, residenceType: string) => void
  startDate: Date
  setStartDate: (startDate: Date) => void
  apartmentNumber: number | string
  setApartmentNumber: (apartmentNumber: number | string) => void
  cancelOldContract: boolean
  setCancelOldContract: (cancelOldContract: boolean) => void
  cancelOldContractDate: Date
  setCancelOldContractDate: (cancelOldContractDate: Date) => void
  facilityId: string
  setFacilityId: (facilityId: string) => void
  initPoaBankIdSigning: (isMobile?: boolean) => void
  orderRef: string
  setOrderRef: (orderRef: string) => void
  setAutoStartToken: (autoStartToken: string) => void
  autoStartToken: string
  collectPoaBankIdSigning: () => void
  orderComplete: boolean
  poaStatus: string | undefined
  errorMessageKey: string
  setNewEmailAndPhone: (newEmailAndPhone: { email: string; phone: string }) => void
  externalCurrentElectricityData: ElomradenAddressDTO | undefined
  getCurrentExternalElectricityData: () => void
  fetchProviders: () => void
  setPoaStatus: (status: typeof BANK_ID_STATUS_COMPLETE | typeof BANK_ID_STATUS_FAILED | undefined) => void
  showOrderFailedError: boolean | undefined
  setShowOrderFailedError: (showOrderFailedError: boolean | undefined) => void
  loadingProviders: boolean
}

const ElectricityProviderContext = createContext<ElectricityProviderContextType | undefined>(undefined)

export const ElectricityProvider = ({ children }: HTMLAttributes<HTMLDivElement>) => {
  const { t } = useTranslation(['electricity', 'common'])
  const { refetchUser } = useUserContext()
  const [electricityProviders, setElectricityProviders] = useState<Record<string, ElectricityProviderType>>({})
  const [currentProvider, setCurrentProvider] = useState<ElectricityProviderType | null>(null)
  const [yearlyElectricityConsumption, setYearlyElectricityConsumption] = useState<number>()
  const [consumptionValue, setConsumptionValue] = useState<number | string>()
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [apartmentNumber, setApartmentNumber] = useState<number | string>('')
  const [cancelOldContract, setCancelOldContract] = useState<boolean>(false)
  const [cancelOldContractDate, setCancelOldContractDate] = useState<Date>(new Date())
  const [facilityId, setFacilityId] = useState<string>('')
  const [autoStartToken, setAutoStartToken] = useState<string>('')
  const [orderRef, setOrderRef] = useState<string>('')
  const [poaStatus, setPoaStatus] = useState<typeof BANK_ID_STATUS_COMPLETE | typeof BANK_ID_STATUS_FAILED | undefined>()
  const [errorMessageKey, setErrorMessageKey] = useState<string>('')
  const [orderComplete, setOrderComplete] = useState<boolean>(false)
  const [newEmailAndPhone, setNewEmailAndPhone] = useState<{ email: string; phone: string } | undefined>()
  const { theme } = useThemeContext()
  const [loadingProviders, setLoadingProviders] = useState<boolean>(false)
  const [externalCurrentElectricityData, setExternalCurrentElectricityData] = useState<ElomradenAddressDTO | undefined>()

  const [showOrderFailedError, setShowOrderFailedError] = useState<boolean | undefined>()

  const abortControllerRef = useRef<AbortController | null>(null)

  const fetchProviders = useCallback(async () => {
    setLoadingProviders(true)
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    abortControllerRef.current = new AbortController()

    if (!consumptionValue) {
      setLoadingProviders(false)
      return
    }
    const response = await getElectricityPrices(Number(consumptionValue), abortControllerRef.current?.signal ?? undefined)
    if (response) setElectricityProviders(response)
    setLoadingProviders(false)
  }, [consumptionValue])

  useEffect(() => {
    if (fetchProviders && yearlyElectricityConsumption) fetchProviders()
  }, [fetchProviders, yearlyElectricityConsumption])

  const getYearlyElectricityConsumption = async (residenceSize: number, residenceType: string) => {
    const response = await getElectricityConsumption(residenceType, residenceSize)
    if (response && response >= 0) {
      setConsumptionValue(response)
      setYearlyElectricityConsumption(response)
    }
  }

  const getCurrentExternalElectricityData = async () => {
    const data = await getExternalCurrentElectricityData()
    if (data) {
      setExternalCurrentElectricityData(data)
    }
  }

  const orderData = useMemo(() => {
    const vattenfallDiscount = currentProvider?.provider === VATTENFALL ? { discCampaign: currentProvider?.discCampaign, tlCampaign: currentProvider?.tlCampaign } : undefined
    return {
      supplierName: currentProvider?.provider || '',
      meta: {
        cancelExistingContract: cancelOldContract,
        existingProvider: '',
        endDate: cancelOldContract ? formatDate(cancelOldContractDate, 'yyyy-MM-dd') : null,
        estimatedYearlyConsumption: consumptionValue,
      },
      products: [
        {
          service: ORDER_SERVICE_POWER,
          price: currentProvider && Math.floor(currentProvider.monthlyCostWithDiscount),
          deliveryDate: formatDate(startDate, 'yyyy-MM-dd'),
          description: t(`STEP4SUMMARY.PROVIDERS.${currentProvider?.provider}Choice`),
          meta: {
            discountPeriod: currentProvider?.discountPeriod,
            areaId: '',
            facilityId: facilityId || null,
            active: null,
            vattenfall: vattenfallDiscount,
          },
        },
      ],
      emailAndPhone: newEmailAndPhone,
      isFb: theme === ThemeEnum.FASTIGHETSBYRAN,
    }
  }, [cancelOldContract, cancelOldContractDate, currentProvider, facilityId, startDate, consumptionValue, newEmailAndPhone, t, theme])

  const doElectricityOrder = useCallback(async () => {
    try {
      if (currentProvider?.provider) {
        const response = await signPower(apartmentNumber.toString(), orderData)
        if (response.status === ORDER_STATUS_LOCKED) {
          setOrderRef('')
          setAutoStartToken('')
          setOrderComplete(true)
        } else {
          setOrderComplete(false)
          setShowOrderFailedError(true)
          setPoaStatus(BANK_ID_STATUS_FAILED)
        }
      }
      if (orderData.emailAndPhone) {
        refetchUser()
      }
    } catch (error: unknown) {
      if (error as ErrorType) {
        const castedError = error as ErrorType
        if (castedError?.messageKey) setErrorMessageKey(extractDtoValidationErrors(castedError)?.[0])
        else setErrorMessageKey('error')
        setOrderRef('')
        setAutoStartToken('')
        setOrderComplete(false)
        setShowOrderFailedError(true)
        setErrorMessageKey('')
        setPoaStatus(BANK_ID_STATUS_FAILED)
      }
    }
  }, [apartmentNumber, currentProvider, orderData, refetchUser])

  useEffect(() => {
    if (poaStatus === BANK_ID_STATUS_COMPLETE) {
      doElectricityOrder()
    }
  }, [poaStatus, doElectricityOrder])

  const selectProvider = (providerName: string) => {
    const electricityProvidersMapped: ElectricityProviderType[] = []
    Object.keys(electricityProviders).forEach((key: string) => {
      if (electricityProviders[key]?.provider)
        electricityProvidersMapped.push({
          ...electricityProviders[key],
        })
    })
    const current = electricityProvidersMapped.find((provider: ElectricityProviderType) => provider.provider === providerName) || null
    setCurrentProvider(current)
  }

  const initPoaBankIdSigning = async (isMobile?: boolean) => {
    try {
      const { orderRef: orderRefFromResponse, autoStartToken: autoStartTokenFromResponse } = await initPoaBankIdSign(ActivityEnum.POWER, isMobile)
      if (orderRefFromResponse) setOrderRef(orderRefFromResponse)
      if (autoStartTokenFromResponse) setAutoStartToken(autoStartTokenFromResponse)
    } catch (e: unknown) {
      setPoaStatus(BANK_ID_STATUS_FAILED)
    }
  }

  const collectPoaBankIdSigning = async () => {
    try {
      const { status } = await collectPoaBankIdSign(orderRef)
      if ([BANK_ID_STATUS_FAILED, BANK_ID_STATUS_COMPLETE].includes(status)) {
        if (status === BANK_ID_STATUS_FAILED) setShowOrderFailedError(true)
      }
      setPoaStatus((prevStatus) => (prevStatus === BANK_ID_STATUS_COMPLETE ? BANK_ID_STATUS_COMPLETE : status))
    } catch (e: unknown) {
      // Dont switch from complete to failed if already complete
      setPoaStatus((prevStatus) => (prevStatus === BANK_ID_STATUS_COMPLETE ? BANK_ID_STATUS_COMPLETE : BANK_ID_STATUS_FAILED))
      setShowOrderFailedError(true)
    }
  }

  return (
    <ElectricityProviderContext.Provider
      value={{
        currentProvider,
        selectProvider,
        electricityProviders,
        consumptionValue,
        setConsumptionValue,
        getYearlyElectricityConsumption,
        yearlyElectricityConsumption,
        startDate,
        setStartDate,
        apartmentNumber,
        setApartmentNumber,
        cancelOldContract,
        setCancelOldContract,
        cancelOldContractDate,
        setCancelOldContractDate,
        facilityId,
        setFacilityId,
        initPoaBankIdSigning,
        orderRef,
        setOrderRef,
        autoStartToken,
        setAutoStartToken,
        collectPoaBankIdSigning,
        orderComplete,
        poaStatus,
        errorMessageKey,
        setNewEmailAndPhone,
        externalCurrentElectricityData,
        getCurrentExternalElectricityData,
        fetchProviders,
        setPoaStatus,
        showOrderFailedError,
        setShowOrderFailedError,
        loadingProviders,
      }}
    >
      {children}
    </ElectricityProviderContext.Provider>
  )
}

export const useElectricityProvider = () => {
  const context = useContext(ElectricityProviderContext)
  if (context === undefined) {
    throw new Error('useElectricityProvider must be used within an ElectricityProviderContext')
  }
  return context
}
