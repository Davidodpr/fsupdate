import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Skeleton from 'react-loading-skeleton'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChecklistItem } from 'types/checklist'
import { ChecklistCardItem } from 'types/checklist'
import { TodoCard } from 'types/todo'
import { useChecklistContext } from '@/common/context/checklist/checklistContext.provider'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import Text from '@/components/atoms/Text'
import { moduleWrapperVariants, bookedOrdersWrapperVariants } from './ActivitiesModule.variants'
import CompletedChecklistItems from './CompletedChecklistItems/CompletedChecklistItems'

export const ActivitiesModuleTemplate = () => {
  const { skippedTodos, skippedExternalActivitesList, hasFetchedActivites } = useChecklistContext()
  const { t } = useTranslation(['movePage', 'activitiesModule', 'todos', 'checklistItems'])
  const mergedLists = [...skippedTodos, ...skippedExternalActivitesList]
  const router = useRouter()
  const themeQuery = useSearchParams().get('theme')
  const todoItems = t('todos:TODO_ITEMS', { returnObjects: true })
  const { setNewTheme, hasSetTheme } = useThemeContext()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const cardWrapperRed = useRef<HTMLDivElement>(null)
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    if (themeQuery === ThemeEnum.FASTIGHETSBYRAN) {
      setNewTheme(ThemeEnum.FASTIGHETSBYRAN)
    }
  }, [themeQuery, router, setNewTheme])

  useEffect(() => {
    const wrapperHeight = wrapperRef.current?.clientHeight
    const cardWrapperHeight = cardWrapperRed.current?.clientHeight
    if (wrapperHeight && cardWrapperHeight) {
      window.top?.postMessage({ height: `${wrapperHeight}` }, '*')
    }
  }, [counter])

  if (!hasFetchedActivites || !hasSetTheme) {
    return <Skeleton style={{ lineHeight: 'unset' }} height={50} />
  }

  return mergedLists?.filter((activity) => !activity?.skippedAt).length !== 0 ? (
    <div className={moduleWrapperVariants()} ref={wrapperRef}>
      <div className={bookedOrdersWrapperVariants()} ref={cardWrapperRed}>
        {mergedLists
          ?.filter((activity) => !activity?.skippedAt)
          .map((completed, index) => {
            return (
              <CompletedChecklistItems
                key={index}
                item={completed as ChecklistItem}
                todoItems={todoItems as TodoCard[]}
                checklistItems={t('checklistItems:CHECKLIST_ITEMS', { returnObjects: true }) as ChecklistCardItem[]}
                counter={counter}
                setCounter={setCounter}
              />
            )
          })}
      </div>
    </div>
  ) : (
    <div className={moduleWrapperVariants({ withoutPadding: true })} ref={wrapperRef}>
      <Text spacing="none" variant="large">
        {t('activitiesModule:noBookings')}
      </Text>
    </div>
  )
}
