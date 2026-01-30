import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ChecklistCardItem } from 'types/checklist'
import { useChecklistContext } from '@/common/context/checklist/checklistContext.provider'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import { ActivityEnum } from '@/common/types/activity'
import MoltoBeneIcon from '@/components/atoms/MoltoBeneIcon'
import Spinner from '@/components/atoms/Spinner'
import Text from '@/components/atoms/Text'
import { ORDER_TYPE_INSURANCE, ORDER_TYPE_MOVECLEAN, ORDER_TYPE_POWER, ReducedServiceTypes } from '@/constants/order'
import { SERVICE_DENY_LIST } from '@/constants/serviceDenyList'
import { Themes } from '@/constants/themes'
import Activity from '@/templates/MovePage/Sections/ActivitiesSection/Activity/Activity'
import { containerVariants, emptyListVariants, spinnerWrapperVariants } from './ActivitiesSection.variants'

interface ActivitiesSectionProps {
  checklistItems: ChecklistCardItem[]
}

const ActivitiesSection = ({ checklistItems }: ActivitiesSectionProps) => {
  const {
    user: {
      currentMove: { movehelp },
      profile: { partnerDetails, leadDetails },
    },
  } = useUserContext()
  const { theme } = useThemeContext()
  const { t } = useTranslation(['serviceDenyList', 'movePage'])
  const { activitiesList, hasFetchedActivites } = useChecklistContext()

  const partnerId = leadDetails?.brokerOfficeId ?? partnerDetails?.partnerId ?? ''
  const movingDistanceTooFar = movehelp?.movingDistanceTooFar ?? false
  const partnerName = leadDetails?.brokerOfficeName ?? ''
  const isExcludedBroker = useCallback((value: string) => partnerName?.toLowerCase()?.includes(value?.toLowerCase()), [partnerName])
  const inviterLogoUrl = leadDetails?.brokerAgencyLogo

  const isEmptyList = () => {
    // Check if there are any activities that should be shown
    const visibleActivities = activitiesList.filter((item) => {
      switch (item.type) {
        case ActivityEnum.MOVEHELP:
          // Hide if moving distance is too far
          return !movingDistanceTooFar
        case ActivityEnum.MOVECLEAN:
          // Hide if partner is in moveclean deny list
          return !(SERVICE_DENY_LIST.moveclean?.length && SERVICE_DENY_LIST?.moveclean?.includes(partnerId))
        case ActivityEnum.POWER:
          // Hide power if theme is fortum
          return theme !== Themes.fortum
        default:
          // Show all other activities
          return true
      }
    })

    return visibleActivities.length === 0
  }
  if (isEmptyList() && hasFetchedActivites) {
    return (
      <div className={containerVariants()}>
        <div className={emptyListVariants()}>
          <MoltoBeneIcon />
          <div>{t('movePage:CHECKLIST_SECTION.emptyChecklistTitle')}</div>
          <Text spacing="none">{t('movePage:CHECKLIST_SECTION.emptyChecklistDescription')}</Text>
        </div>
      </div>
    )
  }

  const isUserExcludedFromService = (service: ReducedServiceTypes) => {
    return (
      (!!partnerId?.length && SERVICE_DENY_LIST[service]?.length && SERVICE_DENY_LIST[service]?.includes(partnerId)) ||
      (!!partnerId?.length && isExcludedBroker('Notar') && (service === ORDER_TYPE_POWER || service === ORDER_TYPE_INSURANCE)) ||
      (!!partnerId?.length && service === ORDER_TYPE_MOVECLEAN && SERVICE_DENY_LIST['moveclean_seperate_provider']?.includes(partnerId))
    )
  }

  return (
    <div className={containerVariants({ isFullList: activitiesList?.length === 6 })}>
      <Text className="text-[var(--color-secondary-dark)] text-lg md:text-xl leading-tight tracking-wider pb-3 text-center md:text-left" spacing="none">
        {t('movePage:CHECKLIST_SECTION.leftToDo')}
      </Text>
      {!hasFetchedActivites ? (
        <div className={spinnerWrapperVariants()}>
          <Spinner scale={2} color="green" />
        </div>
      ) : (
        <>
          {activitiesList?.map((item) => (
            <Activity
              item={item}
              key={item.id}
              logoToDisplay={isUserExcludedFromService(item.type as ReducedServiceTypes) && inviterLogoUrl ? inviterLogoUrl : undefined}
              isUserExcludedFromService={isUserExcludedFromService(item.type as ReducedServiceTypes)}
              isExternalMovecleanOfferCustomer={SERVICE_DENY_LIST.moveclean_seperate_provider?.includes(partnerId)}
              translationItem={checklistItems.find((activityItem) => {
                if (activityItem.name === item.type) return item
              })}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default ActivitiesSection
