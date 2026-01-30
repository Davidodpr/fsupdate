import React from 'react'
import { useTranslation } from 'react-i18next'
import { Booking } from '@/types/booking'
import ImageKit from '@/components/atoms/ImageKit'
import Flex from '@/components/atoms/Flex'
import RoundCheckmark from '@/components/atoms/RoundCheckmark'
import ArrowRightThin from '@/public/images/ArrowRight_thin.svg'
import { ActivitiesIcons, IconsUrls } from '@/enums/ActivitiesIconsEnum'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import {
  bookingCardVariants,
  leftContentVariants,
  iconWrapperVariants,
  infoWrapperVariants,
  titleVariants,
  subtitleVariants,
  arrowWrapperVariants,
  checkmarkWrapperVariants,
} from './CompletedBookingActivityCard.variants'
import { ORDER_TYPE_POWER, ORDER_TYPE_TERMINATE_POWER } from '@/constants/order'
import {
  BOOKING_TYPE_MOVEHELP,
  BOOKING_TYPE_PACKING,
  BOOKING_TYPE_MOVECLEAN,
  BOOKING_TYPE_ELECTRICITY,
  BOOKING_TYPE_BROADBAND,
  BOOKING_TYPE_INSURANCE,
  BOOKING_STATUS_UPCOMING,
  BOOKING_STATUS_CONFIRMED,
  BOOKING_STATUS_COMPLETED,
  ACTIVITY_ICON_MOVEHELP,
  ACTIVITY_ICON_MOVECLEAN,
  ACTIVITY_ICON_INTERNET,
  ACTIVITY_ICON_POWER,
  ACTIVITY_ICON_INSURANCE,
} from '@/constants/booking'
import { TFunction } from 'i18next'

interface CompletedBookingActivityCardProps {
  booking: Booking
  onClick: (booking: Booking) => void
}

const getActivityTypeKey = (bookingType: string): keyof IconsUrls => {
  const typeMap: Record<string, keyof IconsUrls> = {
    [BOOKING_TYPE_MOVEHELP]: ACTIVITY_ICON_MOVEHELP,
    [BOOKING_TYPE_PACKING]: ACTIVITY_ICON_MOVEHELP,
    [BOOKING_TYPE_MOVECLEAN]: ACTIVITY_ICON_MOVECLEAN,
    [BOOKING_TYPE_BROADBAND]: ACTIVITY_ICON_INTERNET,
    [BOOKING_TYPE_ELECTRICITY]: ACTIVITY_ICON_POWER,
    [BOOKING_TYPE_INSURANCE]: ACTIVITY_ICON_INSURANCE,
  }
  return typeMap[bookingType] || ACTIVITY_ICON_MOVEHELP
}

const getServiceNameTranslation = (bookingType: string, orderType: string | undefined, t: TFunction): string => {
  if (orderType === ORDER_TYPE_TERMINATE_POWER) {
    return t('bookings:detail.terminatePowerService')
  }

  const translationMap: Record<string, string> = {
    [BOOKING_TYPE_MOVEHELP]: t('common:ACTIVITIES.movehelp'),
    [BOOKING_TYPE_PACKING]: t('common:ACTIVITIES.packaging'),
    [BOOKING_TYPE_MOVECLEAN]: t('common:ACTIVITIES.movecleaning'),
    [BOOKING_TYPE_BROADBAND]: t('common:internetLabel'),
    [BOOKING_TYPE_ELECTRICITY]: t('common:powerLabel'),
    [BOOKING_TYPE_INSURANCE]: t('common:insuranceLabel'),
  }
  return translationMap[bookingType] || bookingType
}

const CompletedBookingActivityCard: React.FC<CompletedBookingActivityCardProps> = ({ booking, onClick }) => {
  const { t } = useTranslation(['bookings', 'movePage', 'common'])
  const { theme } = useThemeContext()

  const formatDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString('sv-SE', {
      day: 'numeric',
      month: 'long',
    })
  }

  const activityType = getActivityTypeKey(booking.type)
  const serviceName = getServiceNameTranslation(booking.type, booking.orderType, t)

  const getSubtitle = () => {
    const date = formatDate(booking.date)

    // For all power/electricity orders (including terminate_power), show only date
    if (booking.orderType === ORDER_TYPE_TERMINATE_POWER || booking.orderType === ORDER_TYPE_POWER || booking.type === BOOKING_TYPE_ELECTRICITY) {
      return date
    }

    // For flytthjälp with upcoming status (quotated), show "Quote Requested"
    if (booking.type === BOOKING_TYPE_MOVEHELP && booking.status === BOOKING_STATUS_UPCOMING) {
      return `${date} • ${t('bookings:detail.quoteRequested')}`
    }

    // For broadband, show price with per month suffix
    if (booking.type === BOOKING_TYPE_BROADBAND) {
      const price = `${booking.price.total.toLocaleString('sv-SE')} ${booking.price.currency}${t('bookings:detail.perMonth')}`
      return `${date} • ${price}`
    }

    // For all other services, show normal price
    const price = `${booking.price.total.toLocaleString('sv-SE')} ${booking.price.currency}`
    return `${date} • ${price}`
  }

  return (
    <div onClick={() => onClick(booking)} className={bookingCardVariants()}>
      <Flex style={{ width: '100%' }} justifyContent="space-between" alignItems="center">
        <div className={leftContentVariants()}>
          <Flex alignItems="center">
            <div className={iconWrapperVariants()}>{theme && <ImageKit src={`${ActivitiesIcons?.[theme]?.[activityType]}`} alt={booking.type} />}</div>
            <div className={infoWrapperVariants()}>
              <div className={titleVariants({ longText: serviceName.length > 20 })}>
                <Flex alignItems="center" gap={1}>
                  {serviceName}
                  {(booking.status === BOOKING_STATUS_CONFIRMED || booking.status === BOOKING_STATUS_COMPLETED) && (
                    <div className={checkmarkWrapperVariants()}>
                      <RoundCheckmark />
                    </div>
                  )}
                </Flex>
              </div>
              <div className={subtitleVariants()}>{getSubtitle()}</div>
            </div>
          </Flex>
        </div>
        <Flex className={arrowWrapperVariants()} justifyContent="center" alignItems="center" gap={2}>
          <span className="hidden md:block text-[15px] text-[var(--color-secondary-main)]">{t('movePage:CHECKLIST_SECTION.clickForDetails')}</span>
          <ArrowRightThin className="w-5 h-5 md:w-6 md:h-6" />
        </Flex>
      </Flex>
    </div>
  )
}

export default CompletedBookingActivityCard
