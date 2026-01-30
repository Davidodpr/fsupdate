import React from 'react'
import { Booking } from '@/types/booking'
import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'
import ImageKit from '@/components/atoms/ImageKit'
import { capitalizeFirstLetter } from '@/common/utils/text'
import { ActivitiesIcons, IconsUrls } from '@/enums/ActivitiesIconsEnum'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { ORDER_TYPE_POWER, ORDER_TYPE_TERMINATE_POWER } from '@/constants/order'
import {
  BOOKING_STATUS_UPCOMING,
  BOOKING_STATUS_CONFIRMED,
  BOOKING_STATUS_COMPLETED,
  BOOKING_STATUS_CANCELLED,
  BOOKING_STATUS_PERFORMED,
  BOOKING_STATUS_EXECUTED,
  BOOKING_TYPE_MOVEHELP,
  BOOKING_TYPE_PACKING,
  BOOKING_TYPE_MOVECLEAN,
  BOOKING_TYPE_BROADBAND,
  BOOKING_TYPE_ELECTRICITY,
  BOOKING_TYPE_INSURANCE,
  BOOKING_SECTION_UPCOMING,
  BOOKING_SECTION_PREVIOUS,
  ACTIVITY_ICON_MOVEHELP,
  ACTIVITY_ICON_MOVECLEAN,
  ACTIVITY_ICON_INTERNET,
  ACTIVITY_ICON_POWER,
  ACTIVITY_ICON_INSURANCE,
} from '@/constants/booking'
import { FORTUM, SKEKRAFT, VATTENFALL, TIBBER } from '@/constants/electricity'
import { TFunction } from 'i18next'

export interface BookingCardProps {
  booking: Booking
  locale: string
  onClick: (booking: Booking) => void
  section?: typeof BOOKING_SECTION_UPCOMING | typeof BOOKING_SECTION_PREVIOUS
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

const BookingCard: React.FC<BookingCardProps> = ({ booking, onClick, section }) => {
  const { t } = useTranslation(['bookings', 'common', 'electricity'])
  const { theme } = useThemeContext()

  // Get electricity provider name for el bookings (same logic as in BookingDetailModal)
  const getElectricityProviderName = () => {
    if (booking.type !== BOOKING_TYPE_ELECTRICITY || !booking.supplier) return null

    // Map supplier name to translation key
    const supplierName = booking.supplier.name.toLowerCase()
    let supplierKey = ''

    if (supplierName.includes('skellefteå') || supplierName.includes(SKEKRAFT)) {
      supplierKey = SKEKRAFT
    } else if (supplierName.includes(FORTUM)) {
      supplierKey = FORTUM
    } else if (supplierName.includes(VATTENFALL)) {
      supplierKey = VATTENFALL
    } else if (supplierName.includes(TIBBER)) {
      supplierKey = TIBBER
    }

    if (supplierKey) {
      return t(`electricity:STEP4SUMMARY.PROVIDERS.${supplierKey}Choice`, { defaultValue: booking.supplier.name })
    }

    return booking.supplier.name
  }

  const formatDate = (date: string) => {
    const d = new Date(date)
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      weekday: 'long',
    }
    return d.toLocaleDateString('sv-SE', options)
  }

  const getStatusBadge = () => {
    const statusConfig = {
      [BOOKING_STATUS_CONFIRMED]: {
        label: t('bookings:status.confirmed'),
        className: 'bg-[#c5ede6]  text-[#1f6156]',
      },
      [BOOKING_STATUS_UPCOMING]: {
        label: t('bookings:status.upcoming'),
        className: 'bg-[#dcefff] text-[#214766]',
      },
      [BOOKING_STATUS_COMPLETED]: {
        label: t('bookings:status.completed'),
        className: 'bg-[#eeeef0] text-[#214766]',
      },
      [BOOKING_STATUS_CANCELLED]: {
        label: t('bookings:status.cancelled'),
        className: 'bg-[#ffebe8] text-[#f25a43]',
      },
      [BOOKING_STATUS_PERFORMED]: {
        label: t('bookings:status.performed'),
        className: 'bg-[#c5ede6] text-[#1f6156]',
      },
      [BOOKING_STATUS_EXECUTED]: {
        label: t('bookings:status.executed'),
        className: 'bg-[#c5ede6] text-[#1f6156]',
      },
    }

    // Determine display status based on section
    let displayStatus = booking.status

    if (section === BOOKING_SECTION_UPCOMING) {
      // All orders in upcoming section show as confirmed
      displayStatus = BOOKING_STATUS_CONFIRMED
    } else if (section === BOOKING_SECTION_PREVIOUS) {
      // Orders in previous section show as executed, except cancelled ones
      if (booking.status !== BOOKING_STATUS_CANCELLED) {
        displayStatus = BOOKING_STATUS_EXECUTED
      }
    } else {
      // Fallback logic when section is not provided
      // Internet orders with completed status should show as confirmed
      if (booking.type === BOOKING_TYPE_BROADBAND && booking.status === BOOKING_STATUS_COMPLETED) {
        displayStatus = BOOKING_STATUS_CONFIRMED
      }
    }

    const config = statusConfig[displayStatus]
    return <span className={clsx('px-2 sm:px-3 text-[11px] sm:text-[13px] py-1 sm:py-1.5 rounded-full font-semibold', config.className)}>{config.label}</span>
  }

  const activityType = getActivityTypeKey(booking.type)
  const serviceName = getServiceNameTranslation(booking.type, booking.orderType, t)

  return (
    <div
      onClick={() => onClick(booking)}
      className="bg-white rounded-[16px] p-6 border-2 border-[#eeeef0] hover:border-[#51c8b4] shadow-[0px_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0px_4px_12px_rgba(0,0,0,0.12)] transition-all cursor-pointer mb-4"
    >
      {/* Top row: Date/Time and Status Badge */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <p className="text-[16px] text-[#214766] font-bold mb-1">{capitalizeFirstLetter(formatDate(booking.date))}</p>
          {booking.type !== BOOKING_TYPE_ELECTRICITY && booking.type !== BOOKING_TYPE_BROADBAND && <p className="text-[16px] text-[#214766] font-bold">{booking.time}</p>}
        </div>
        <div className="flex flex-col items-end gap-2">
          {getStatusBadge()}
          {booking.bookingNumber && <span className="text-[12px] text-[#767678]">#{booking.bookingNumber}</span>}
        </div>
      </div>

      {/* Service Info Row */}
      <div className="flex gap-3 items-center mb-2">
        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0">
          {theme && <ImageKit src={`${ActivitiesIcons?.[theme]?.[activityType]}`} alt={booking.type} width={48} height={48} objectFit="contain" />}
        </div>
        <div className="flex-1">
          <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#214766]">{serviceName}</h3>
          {booking.type === BOOKING_TYPE_ELECTRICITY && booking.orderType !== ORDER_TYPE_TERMINATE_POWER && (
            <p className="text-[13px] sm:text-[14px] text-[#767678]">{getElectricityProviderName()}</p>
          )}
          {booking.type === BOOKING_TYPE_BROADBAND && booking.supplier && (
            <p className="text-[13px] sm:text-[14px] text-[#767678]">{capitalizeFirstLetter(booking.supplier.name)}</p>
          )}
          {booking.type === BOOKING_TYPE_BROADBAND && booking.details.description && (
            <p className="text-[13px] sm:text-[14px] text-[#767678]">{capitalizeFirstLetter(booking.details.description)}</p>
          )}
          {booking.details.volume && <p className="text-[13px] sm:text-[14px] text-[#767678]">{booking.details.volume}</p>}
          {booking.details.area && <p className="text-[13px] sm:text-[14px] text-[#767678]">{booking.details.area}</p>}
        </div>
      </div>

      {/* Price Row */}
      <div className="mb-5 pl-[52px] sm:pl-[60px]">
        {booking.orderType === ORDER_TYPE_TERMINATE_POWER || booking.orderType === ORDER_TYPE_POWER || booking.type === BOOKING_TYPE_ELECTRICITY ? (
          <p className="text-[15px] sm:text-[16px] font-bold text-[#214766]">{formatDate(booking.date)}</p>
        ) : booking.type === BOOKING_TYPE_BROADBAND ? (
          <div className="flex items-baseline gap-2">
            <p className="text-[18px] sm:text-[20px] font-bold text-[#214766]">
              {booking.price.total.toLocaleString('sv-SE')} {booking.price.currency}
            </p>
            <p className="text-[12px] text-[#767678]">{t('bookings:detail.perMonth')}</p>
          </div>
        ) : booking.type === BOOKING_TYPE_MOVEHELP && booking.status === BOOKING_STATUS_UPCOMING ? (
          <>
            <p className="text-[12px] text-[#767678] mb-0.5">{t('bookings:detail.quoteRequested')}</p>
            <p className="text-[15px] sm:text-[16px] font-bold text-[#214766]">{formatDate(booking.date)}</p>
          </>
        ) : booking.type === BOOKING_TYPE_MOVEHELP && booking.status === BOOKING_STATUS_PERFORMED ? (
          <>
            <p className="text-[12px] text-[#767678] mb-0.5">{t('bookings:detail.quoteSent')}</p>
            <p className="text-[15px] sm:text-[16px] font-bold text-[#214766]">{formatDate(booking.date)}</p>
          </>
        ) : (
          <>
            {booking.price.rutDeduction && (
              <div className="flex items-baseline gap-3 flex-wrap">
                <p className="text-[18px] sm:text-[20px] font-bold text-[#214766]">
                  {booking.price.total.toLocaleString('sv-SE')} {booking.price.currency}
                </p>
                <p className="text-[12px] text-[#767678]">
                  {t('bookings:detail.beforeRut')} {booking.price.subtotal.toLocaleString('sv-SE')} {booking.price.currency}
                </p>
              </div>
            )}
            {!booking.price.rutDeduction && (
              <p className="text-[18px] sm:text-[20px] font-bold text-[#214766]">
                {booking.price.subtotal.toLocaleString('sv-SE')} {booking.price.currency}
              </p>
            )}
          </>
        )}
      </div>

      {/* Supplier Row */}
      {booking.supplier && booking.orderType !== ORDER_TYPE_TERMINATE_POWER && (
        <div className="mb-4">
          <div className="bg-[#E8F9F6] rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#214766] flex items-center justify-center text-white font-bold text-[13px]">
                  {booking.supplier.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#214766]">{capitalizeFirstLetter(booking.supplier.name)}</p>
                  {(booking.type === BOOKING_TYPE_MOVEHELP || booking.type === BOOKING_TYPE_MOVECLEAN) && booking.supplier.phone && (
                    <a
                      href={`tel:${booking.supplier.phone.replace(/\s/g, '')}`}
                      className="text-[15px] font-medium text-[#214766] hover:text-[#51c8b4] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {booking.supplier.phone}
                    </a>
                  )}
                  {booking.type !== BOOKING_TYPE_MOVEHELP && booking.type !== BOOKING_TYPE_MOVECLEAN && booking.supplier.phone && (
                    <p className="text-[12px] text-[#767678]">{booking.supplier.phone}</p>
                  )}
                </div>
              </div>

              {booking.type !== BOOKING_TYPE_BROADBAND && booking.type !== BOOKING_TYPE_ELECTRICITY && booking.supplier?.phone && (
                <button
                  className="w-10 h-10 rounded-full bg-[#51c8b4] hover:bg-[#37ae9a] flex items-center justify-center transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    window.location.href = `tel:${booking.supplier?.phone}`
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Info Text */}
      <div className="flex border-t-1 border-[#f5f5f5] pt-4 items-center justify-center gap-2 text-[13px] text-[#767678]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="16" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12.01" y2="8" />
        </svg>
        <span>{t('bookings:detail.clickForFullDetails')}</span>
      </div>
    </div>
  )
}

export default BookingCard
