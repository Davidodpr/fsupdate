import React, { ReactNode, useEffect } from 'react'
import ReactGA from 'react-ga4'
import Flex from '@/components/atoms/Flex'
import clsx from 'clsx'
import Text from '@/components/atoms/Text'
import useResponsive from '@/hooks/useResponsive'
import ArrowRightThin from '@/public/images/ArrowRight_thin.svg'
import {
  activityItemVariants,
  activityIconVariants,
  activityTitleVariants,
  activityDescriptionVariants,
  activityContentVariants,
  statusTextVariants,
  activityIconCompactVariants,
  type ActivityItemVariants,
} from './ActivityItem.variants'

interface Props {
  description: string
  title: string
  icon: ReactNode
  className?: ActivityItemVariants['status']
  buttonText: string
  handleButton?: () => void
  nextBestActionEvent?: string
  isConfirmationPage?: boolean
  isNextBestAction?: boolean
}

export const ActivityItem = ({
  className = 'not_started',
  description,
  title,
  icon,
  buttonText,
  handleButton,
  nextBestActionEvent,
  isConfirmationPage = false,
  isNextBestAction = false,
}: Props) => {
  const { isTabletPortraitOrGreater } = useResponsive()

  useEffect(() => {
    if (nextBestActionEvent) {
      ReactGA.event(nextBestActionEvent)
    }
  }, [nextBestActionEvent])

  return (
    <Flex alignItems="center" justifyContent="space-between" onClick={handleButton} className={clsx(activityItemVariants({ status: className, isNextBestAction }))}>
      <Flex alignItems="center">
        <Flex alignItems="center">
          {icon && !isConfirmationPage && <div className={clsx(activityIconVariants())}>{icon}</div>}
          {icon && isConfirmationPage && <div className={clsx(activityIconCompactVariants({ nextBestAction: isNextBestAction }))}>{icon}</div>}
          <div className={clsx(activityContentVariants(), statusTextVariants({ status: className }))}>
            <div className={clsx(activityTitleVariants(), 'activity-title')}>{title}</div>
            <div className={clsx(activityDescriptionVariants())}>{description}</div>
          </div>
        </Flex>
      </Flex>
      <Flex justifyContent="center" alignItems="center" className="text-[var(--color-secondary-main)]">
        {isTabletPortraitOrGreater && <Text className="pr-1 underline">{buttonText}</Text>}
        <ArrowRightThin />
      </Flex>
    </Flex>
  )
}

export default ActivityItem
