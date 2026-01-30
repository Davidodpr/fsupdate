import { useContext, createContext, useState, useEffect, useCallback } from 'react'
import { SupplierDetail } from 'types/price'
import addBooking, { Order, OrderDataType } from '@/common/api/book'
import { incrementMoveservicePageVisitIntercomEvent } from '@/common/api/getUser'
import { getProviders, MoveServiceSuppliers } from '@/common/api/price'
import { MoveServiceOrder } from '@/common/enums/MoveServicesEnum'
import { ActivityEnum } from '@/common/types/activity'
import { NO_SUPPLIERS_FOUND } from '@/constants/errorCodes'
import { useUserContext } from '../user/UserProvider'

type MovecleanProviderContextType = {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  error: string | undefined
  setError: (error: string | undefined) => void
  movecleanProviders: SupplierDetail[] | undefined
  fetchData: (triggerLoading?: boolean) => void
  isLoadingInfoMissingFetch: boolean
  setIsLoadingInfoMissingFetch: (isLoading: boolean) => void
  sendMovecleanPageVisitIntercomEvent: () => void
  selectedProvider?: SupplierDetail
  setSelectedProvider?: (selectedProvider: SupplierDetail) => void
  orderMoveclean: (data: OrderDataType) => Promise<string | undefined>
  orderData: Order | undefined
  fetchAndSetNewPriceForSelectedProvider: () => void
}

const defaultValue: MovecleanProviderContextType = {
  isLoading: true,
  setIsLoading: () => null,
  error: undefined,
  movecleanProviders: undefined,
  setError: () => null,
  fetchData: () => null,
  isLoadingInfoMissingFetch: false,
  setIsLoadingInfoMissingFetch: () => null,
  sendMovecleanPageVisitIntercomEvent: () => null,
  selectedProvider: undefined,
  setSelectedProvider: () => null,
  orderMoveclean: async () => undefined,
  orderData: undefined,
  fetchAndSetNewPriceForSelectedProvider: () => null,
}

const MovecleanContext = createContext<MovecleanProviderContextType>(defaultValue)
type MoveServicesDynamicPricePerHourProps = {
  children: React.ReactNode
}

export const MovecleanProvider = ({ children }: MoveServicesDynamicPricePerHourProps) => {
  const { user } = useUserContext()
  const [error, setError] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(true)
  const [movecleanProviders, setMovecleanProviders] = useState<SupplierDetail[]>()
  const [isLoadingInfoMissingFetch, setIsLoadingInfoMissingFetch] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<SupplierDetail | undefined>()
  const [orderData, setOrderData] = useState<Order>()

  const sendMovecleanPageVisitIntercomEvent = async () => {
    await incrementMoveservicePageVisitIntercomEvent({ service: ActivityEnum.MOVECLEAN })
  }

  const fetchAndSetNewPriceForSelectedProvider = async () => {
    if (selectedProvider) {
      const response = await getProviders(MoveServiceOrder.CLEANING)
      if (checkAndSetError(response)) {
        const updatedSelectedProvider = response.suppliers.find((provider) => provider.id === selectedProvider.id)
        if (updatedSelectedProvider?.id?.length) setSelectedProvider(updatedSelectedProvider)
        else setSelectedProvider(undefined)
      }
    }
  }

  const fetchData = useCallback(
    async (triggerLoading?: boolean) => {
      try {
        triggerLoading && setIsLoadingInfoMissingFetch(true)
        const response = await getProviders(MoveServiceOrder.CLEANING)

        if (checkAndSetError(response)) {
          setMovecleanProviders(response.suppliers)
        }
      } catch (e: unknown) {
        setError(NO_SUPPLIERS_FOUND)
      }
      setIsLoading(false)
      triggerLoading && setIsLoadingInfoMissingFetch(false)
    },
    [setMovecleanProviders, setError],
  )

  const orderMoveclean = async (movecleanOrderData: OrderDataType) => {
    if (selectedProvider) {
      if (movecleanOrderData) {
        const order = await addBooking(movecleanOrderData)
        if (order.id) {
          setOrderData(order)
          setIsLoading(false)
          return order.id
        }
      }
    }
    return undefined
  }

  const checkAndSetError = (supplierData: MoveServiceSuppliers): boolean => {
    const messageKey = supplierData.messageKey
    if (messageKey) {
      setError(messageKey)
      return false
    } else if (!supplierData.suppliers?.length) {
      setError(NO_SUPPLIERS_FOUND)
      return false
    } else setError(undefined)
    return true
  }

  useEffect(() => {
    if (!movecleanProviders && !!user?.currentMove?.fromAddress?.street?.length) {
      fetchData()
    } else {
      setIsLoading(false)
    }
  }, [fetchData, movecleanProviders, user?.currentMove?.fromAddress?.street?.length])

  const contextValue: MovecleanProviderContextType = {
    movecleanProviders,
    isLoading,
    error,
    setError,
    setIsLoading,
    fetchData,
    isLoadingInfoMissingFetch,
    setIsLoadingInfoMissingFetch,
    sendMovecleanPageVisitIntercomEvent,
    selectedProvider,
    setSelectedProvider,
    orderMoveclean,
    orderData,
    fetchAndSetNewPriceForSelectedProvider,
  }
  return <MovecleanContext.Provider value={contextValue}>{children}</MovecleanContext.Provider>
}

export const useMovecleanContext = () => useContext(MovecleanContext)
