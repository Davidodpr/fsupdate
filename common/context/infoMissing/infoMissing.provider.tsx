import { useContext, createContext, useState, useCallback } from 'react'
import { ActivityEnum } from '@/common/types/activity'
import { getUserInfoMissingForActivity } from '@/common/utils/checkIfInfoMissing'

export type InfoMissingType = {
  hasCheckedInfoMissing: boolean
  currentFlowMissingDetails: string[]
  checkInfoMissingForActivity: (user: User, activityType: ActivityEnum) => void
  initialInfoMissingAmount: number
}

const defaultValue: InfoMissingType = {
  hasCheckedInfoMissing: false,
  currentFlowMissingDetails: [],
  checkInfoMissingForActivity: () => null,
  initialInfoMissingAmount: 0,
}

const InfoMissingContext = createContext<InfoMissingType>(defaultValue)

export type InfoMissingProviderProps = {
  children: React.ReactNode
}

export const InfoMissingProvider = ({ children }: InfoMissingProviderProps) => {
  const [currentFlowMissingDetails, setCurrentFlowMissingDetails] = useState<string[]>([])
  const [hasCheckedInfoMissing, setHasCheckedInfoMissing] = useState(false)
  const [initialInfoMissingAmount, setInitialInfoMissingAmount] = useState(0)

  const checkInfoMissingForActivity = useCallback((user: User, activityType: ActivityEnum) => {
    if (!!user?.currentMove?.id) {
      const infoMissingDetails = getUserInfoMissingForActivity(activityType, user)
      if (infoMissingDetails?.length) {
        setCurrentFlowMissingDetails(infoMissingDetails)
        setInitialInfoMissingAmount(infoMissingDetails.length)
      } else {
        setCurrentFlowMissingDetails([])
      }
      setHasCheckedInfoMissing(true)
    }
  }, [])

  const contextValue: InfoMissingType = {
    hasCheckedInfoMissing,
    currentFlowMissingDetails,
    checkInfoMissingForActivity,
    initialInfoMissingAmount,
  }
  return <InfoMissingContext.Provider value={contextValue}>{children}</InfoMissingContext.Provider>
}

export const useInfoMissingContext = () => useContext(InfoMissingContext)
