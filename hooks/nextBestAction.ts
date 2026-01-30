import { useEffect, useState, useCallback } from 'react'
import { getMoveNextBestAction } from '@/common/api/checklist'
import { useUserContext } from '@/common/context/user/UserProvider'
import { ReducedServiceTypes, OrderServiceType, ORDER_TYPE_POWER, ORDER_TYPE_INSURANCE } from '@/constants/order'
import { SERVICE_DENY_LIST } from '@/constants/serviceDenyList'

const useNextBestAction = () => {
  const [nextBestAction, setNextBestAction] = useState<OrderServiceType | null>(null)
  const [state, setState] = useState<'loading' | 'error' | 'success'>()
  const {
    user: {
      profile: { leadDetails, partnerDetails },
    },
  } = useUserContext()
  const partnerId = leadDetails?.brokerOfficeId ?? partnerDetails?.partnerId ?? ''
  const partnerName = leadDetails?.brokerOfficeName ?? ''
  const isExcludedBroker = useCallback((value: string) => partnerName?.toLowerCase()?.includes(value?.toLowerCase()), [partnerName])

  const isUserExcludedFromService = (service: ReducedServiceTypes | null) => {
    if (!service) return false
    return (
      (!!partnerId?.length && SERVICE_DENY_LIST[service]?.length && SERVICE_DENY_LIST[service]?.includes(partnerId)) ||
      (!!partnerId?.length && isExcludedBroker('Notar') && (service === ORDER_TYPE_POWER || service === ORDER_TYPE_INSURANCE))
    )
  }

  useEffect(() => {
    const fetchData = async () => {
      setState('loading')

      try {
        const response = await getMoveNextBestAction()
        if (!isUserExcludedFromService(response.nextBestAction as ReducedServiceTypes)) {
          setNextBestAction(response.nextBestAction)
          setState('success')
        }
      } catch (err: unknown) {
        setState('error')
      }
    }

    fetchData()
  }, [])

  return { nextBestAction, state }
}

export default useNextBestAction
