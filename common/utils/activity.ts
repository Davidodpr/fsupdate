import { ActivityEnum } from '../types/activity'

export const isActivityLockedOrCompleted = (state: string) =>
  [ActivityEnum.STATUS_COMPLETED, ActivityEnum.STATUS_LOCKED, ActivityEnum.STATUS_REPORTED, ActivityEnum.STATUS_INVOICED].includes(
    state as ActivityEnum.STATUS_LOCKED | ActivityEnum.STATUS_REPORTED | ActivityEnum.STATUS_COMPLETED | ActivityEnum.STATUS_INVOICED,
  )
export const isTodoBooked = (state: string) =>
  [ActivityEnum.STATUS_LOCKED, ActivityEnum.STATUS_UNDER_PROCESS].includes(state as ActivityEnum.STATUS_LOCKED | ActivityEnum.STATUS_UNDER_PROCESS)
export const isActivityLockedOrSkipped = (state: string) =>
  [ActivityEnum.STATUS_LOCKED, ActivityEnum.STATUS_SKIPPED].includes(state as ActivityEnum.STATUS_COMPLETED | ActivityEnum.STATUS_SKIPPED)
export const isActivityLockedOrReported = (state: string) =>
  [ActivityEnum.STATUS_LOCKED, ActivityEnum.STATUS_REPORTED, ActivityEnum.STATUS_INVOICED].includes(
    state as ActivityEnum.STATUS_COMPLETED | ActivityEnum.STATUS_REPORTED | ActivityEnum.STATUS_INVOICED,
  )
export const isActivityBooked = (state: string) =>
  [
    ActivityEnum.STATUS_COMPLETED,
    ActivityEnum.STATUS_LOCKED,
    ActivityEnum.STATUS_SKIPPED,
    ActivityEnum.STATUS_REPORTED,
    ActivityEnum.STATUS_INVOICED,
    ActivityEnum.STATUS_UNDER_PROCESS,
  ].includes(
    state as
      | ActivityEnum.STATUS_COMPLETED
      | ActivityEnum.STATUS_SKIPPED
      | ActivityEnum.STATUS_LOCKED
      | ActivityEnum.STATUS_REPORTED
      | ActivityEnum.STATUS_INVOICED
      | ActivityEnum.STATUS_UNDER_PROCESS,
  )
export const isActivitySkipped = (state: string) => state === ActivityEnum.STATUS_SKIPPED
export const isActivityStarted = (state: string) => state === ActivityEnum.STATUS_STARTED
export const isActivityStartedOrNotStarted = (state: string) =>
  [ActivityEnum.STATUS_STARTED, ActivityEnum.STATUS_NOT_STARTED].includes(state as ActivityEnum.STATUS_STARTED | ActivityEnum.STATUS_NOT_STARTED)
export const isMoveServiceActivity = (type: string) =>
  [ActivityEnum.MOVEHELP, ActivityEnum.MOVECLEAN, ActivityEnum.MOVEHELP_COMBINED].includes(type as ActivityEnum.MOVEHELP | ActivityEnum.MOVECLEAN | ActivityEnum.MOVEHELP_COMBINED)

/**
 * All moveservice activities share one controller and in the context of the activites component
 * we can distinguish them by their type. However in the movehelp flow we only have service.
 */
export const getMoveServiceActivityType = (service: string) => {
  switch (service) {
    case 'moving':
      return ActivityEnum.MOVEHELP
    case 'cleaning':
      return ActivityEnum.MOVECLEAN
    case 'cleaningAndMoving':
      return ActivityEnum.MOVEHELP_COMBINED
    default:
      return ''
  }
}
