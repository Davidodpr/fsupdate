'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAsync } from 'react-use'
import { useIntercom } from 'react-use-intercom'
import Cookies from 'js-cookie'
import { getActiveTodos } from '@/common/api/todo'
import { ChecklistContextProvider, CreateChecklistContext } from '@/common/context/checklist/checklistContext.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import { activities } from '@/common/enums/ActivitiesEnum'
import { getCookieDomain } from '@/common/helpers/domain'
import { ActivityEnum } from '@/common/types/activity'
import Spinner, { SpinnerWrapper } from '@/components/atoms/Spinner'
import { TodoActivityType } from '@/pageTypes/todo'
import MovePage from '@/templates/MovePage'
import { Booking } from '@/types/booking'


const contextObject = CreateChecklistContext()

interface MovepageClientProps {
  completedBookings: Booking[]
}

export const MovepageClient: React.FC<MovepageClientProps> = ({ completedBookings }) => {
  const { t } = useTranslation(['movePage', 'bookings'])
  const { update } = useIntercom()
  const {
    user: {
      currentMove,
      hasFetchedData,
      profile: { id },
    },
    setUserTokenCookie,
  } = useUserContext()

  const [todoItems, setTodoItems] = useState<TodoActivityType[]>([])

  useAsync(async () => {
    if (hasFetchedData) {
      if (currentMove?.id) {
        setTodoItems(await getActiveTodos(currentMove?.id))
      }
    }
  }, [hasFetchedData, currentMove?.id])

  const isPurchased = currentMove
    ? activities.filter(
        (x) =>
          currentMove[x as AdvancedServiceOrderType]?.state === ActivityEnum.STATUS_COMPLETED || currentMove[x as AdvancedServiceOrderType]?.state === ActivityEnum.STATUS_LOCKED,
      )?.length
    : 0

  const finishedActivities = currentMove
    ? activities.filter(
        (x) =>
          currentMove[x as AdvancedServiceOrderType]?.state === ActivityEnum.STATUS_SKIPPED ||
          currentMove[x as AdvancedServiceOrderType]?.state === ActivityEnum.STATUS_COMPLETED ||
          currentMove[x as AdvancedServiceOrderType]?.state === ActivityEnum.STATUS_LOCKED,
      )
    : []

  const isFinished = [...finishedActivities, ...todoItems].length

  useEffect(() => {
    if (window && Cookies.get('userToken')) {
      const domain = getCookieDomain(location.hostname)
      setUserTokenCookie(Cookies.get('userToken') || '', { expires: 365, domain })
      window.localStorage.setItem('purchased', isPurchased.toString())
      window.localStorage.setItem('finishedActivities', isFinished.toString())
      update({
        customAttributes: {
          purchase: isPurchased,
          finished_activities: isFinished,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPurchased, isFinished])

  return (
    <div style={{ background: 'rgb(232, 237, 240)', flexGrow: '1' }}>
      {!!id ? (
        <ChecklistContextProvider context={contextObject}>
          <MovePage completedBookings={completedBookings} />
        </ChecklistContextProvider>
      ) : (
        <div style={{ height: '100vh' }}>
          <SpinnerWrapper className="absolute top-[300px] left-[44%] md:left-[48%]">
            <Spinner scale={3} color="green" />
          </SpinnerWrapper>
          <div className="text-center absolute top-[380px] left-[30%] md:left-[45%]">{t('pageLoadingText')}</div>
        </div>
      )}
    </div>
  )
}

export default MovepageClient
