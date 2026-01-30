'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Booking } from '@/types/booking'
import { Modal, ModalContent, ModalTitle } from '@/components/molecules/Modal'
import MobileBottomSheet from '@/components/molecules/MobileBottomSheet'
import { useIsMobile } from '@/common/hooks/useIsMobile'
import { capitalizeFirstLetter } from '@/common/utils/text'
import MapPinIcon from '@/public/images/MapPin_large.svg'
import PhoneIcon from '@/public/images/PhoneOutlined.svg'
import InfoIcon from '@/components/atoms/InfoIcon'
import Chevron from '@/public/images/Chevron.svg'
import clsx from 'clsx'
import { ORDER_TYPE_POWER, ORDER_TYPE_TERMINATE_POWER } from '@/constants/order'
import {
  BOOKING_TYPE_MOVEHELP,
  BOOKING_TYPE_PACKING,
  BOOKING_TYPE_MOVECLEAN,
  BOOKING_TYPE_BROADBAND,
  BOOKING_TYPE_ELECTRICITY,
  BOOKING_TYPE_INSURANCE,
  BOOKING_STATUS_UPCOMING,
} from '@/constants/booking'
import { FORTUM, SKEKRAFT, VATTENFALL, TIBBER } from '@/constants/electricity'
import { TFunction } from 'i18next'

interface BookingDetailModalProps {
  booking: Booking | null
  isOpen: boolean
  onClose: () => void
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

const BookingDetailModal: React.FC<BookingDetailModalProps> = ({ booking, isOpen, onClose }) => {
  const { t } = useTranslation(['bookings', 'common', 'electricity'])
  const isMobile = useIsMobile()
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const priceRef = useRef<HTMLDivElement>(null)

  // Reset scroll indicator when modal opens
  useEffect(() => {
    if (isOpen) {
      setShowScrollIndicator(true)
    }
  }, [isOpen])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    if (target.scrollTop > 100) {
      setShowScrollIndicator(false)
    }
  }

  const scrollToPrices = () => {
    if (priceRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const priceElement = priceRef.current
      const offsetTop = priceElement.offsetTop - container.offsetTop
      container.scrollTo({ top: offsetTop, behavior: 'smooth' })
      setShowScrollIndicator(false)
    }
  }

  if (!booking) return null

  const serviceName = getServiceNameTranslation(booking.type, booking.orderType, t)

  const handleServiceDescriptionClick = () => {
    const serviceLinks: Record<string, string> = {
      [BOOKING_TYPE_MOVECLEAN]: 'https://help.flyttsmart.se/sv/articles/5226636-vad-ingar-i-flyttstadningen',
      [BOOKING_TYPE_MOVEHELP]: 'https://help.flyttsmart.se/sv/articles/5226611-vad-ingar-i-flytthjalpen',
    }

    const link = serviceLinks[booking.type]
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer')
    }
  }

  const getElectricityProviderName = () => {
    if (booking.type !== BOOKING_TYPE_ELECTRICITY || !booking.supplier) return null

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
    return d.toLocaleDateString('sv-SE', {
      day: 'numeric',
      month: 'long',
      weekday: 'long',
    })
  }

  const formatPriceLabel = (label: string, isIncludedInRut?: boolean) => {
    const biareaMatch = label.match(/\+\s*(\d+)\s*(kvm|m2|m²)/i)
    const biarea = biareaMatch ? `${biareaMatch[1]} m²` : null

    const cleanLabel = label
      .replace(/\s*[-–]\s*\d+\s*(kbm|kvm|m3|m2|m³|m²)/gi, '')
      .replace(/\s*\+\s*\d+\s*(kvm|m2|m²)/gi, '')
      .trim()

    const rutSuffix = isIncludedInRut === false ? ` (${t('bookings:detail.notIncludedInRut')})` : ''

    if (booking.type === BOOKING_TYPE_MOVEHELP && cleanLabel.toLowerCase().includes('flytt')) {
      const volume = booking.details.volume?.replace('kbm', 'm³').replace('m3', 'm³')
      return volume ? `${t('bookings:detail.basePrice')} ${cleanLabel} (${volume})${rutSuffix}` : `${t('bookings:detail.basePrice')} ${cleanLabel}${rutSuffix}`
    }

    if (booking.type === BOOKING_TYPE_MOVECLEAN && cleanLabel.toLowerCase().includes('städ')) {
      const area = booking.details.area?.replace('kvm', 'm²').replace('m2', 'm²')
      const addressArea = !area && booking.fromAddress?.size ? `${booking.fromAddress.size} m²` : null
      const finalArea = area || addressArea

      if (finalArea && biarea) {
        return `${t('bookings:detail.basePrice')} ${cleanLabel} (${finalArea} + ${biarea})${rutSuffix}`
      }
      return finalArea ? `${t('bookings:detail.basePrice')} ${cleanLabel} (${finalArea})${rutSuffix}` : `${t('bookings:detail.basePrice')} ${cleanLabel}${rutSuffix}`
    }

    return `${cleanLabel}${rutSuffix}`
  }

  const modalContent = (
    <div className="relative flex flex-col h-full">
      <div className="flex-shrink-0 px-4 pt-0 pb-4 sm:p-6 md:pt-0 border-b border-[#eeeef0] bg-white">
        <h1 className="text-[24px] font-bold text-[#214766] !mb-0 !mt-0 md:!mt-4">{serviceName}</h1>
        <p className="text-[14px] text-[#767678] mb-2">
          {formatDate(booking.date)}
          {booking.type !== BOOKING_TYPE_ELECTRICITY && booking.type !== BOOKING_TYPE_BROADBAND && (
            <>
              {' • '}
              {booking.time}
            </>
          )}
        </p>
        {booking.bookingNumber && (
          <p className="text-[13px] text-[#767678] mb-3">
            {t('bookings:detail.orderNumber')}: {booking.bookingNumber}
          </p>
        )}

        {booking.serviceDescription && (
          <button onClick={handleServiceDescriptionClick} className="!text-[14px] text-[#51c8b4] hover:cursor-pointer flex items-center gap-2 font-semibold hover:text-[#37ae9a]">
            <InfoIcon width={20} height={20} color="#51c8b4" className="flex-shrink-0" />
            {t(booking.type === BOOKING_TYPE_MOVECLEAN ? 'detail.whatIsIncludedCleaning' : 'detail.whatIsIncluded')}
          </button>
        )}
      </div>

      <div ref={scrollContainerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto p-4 sm:p-6 pb-12">
        {(booking.fromAddress || booking.toAddress || booking.address) && (
          <div className="mb-3">
            <h2 className="text-[14px] font-bold text-[#767678] uppercase mb-3 tracking-wide">
              {booking.type === BOOKING_TYPE_MOVECLEAN ? t('detail.address') : t('detail.addresses')}
            </h2>
            <div className="bg-[#F5F6F7]/50 rounded-[10px] p-3">
              {booking.type === BOOKING_TYPE_MOVEHELP && booking.fromAddress && booking.toAddress ? (
                <>
                  <div className="hidden md:block">
                    <div className="relative">
                      <div className="grid grid-cols-[1fr_auto_1fr] gap-0">
                        <div className="p-3 flex justify-center">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(33,71,102,0.12)]">
                              <MapPinIcon width={32} height={32} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] font-bold text-[#51c8b4] uppercase tracking-[0.08em] mb-2.5 leading-none">{t('detail.from')}</p>
                              <p className="text-[16px] font-semibold text-[#214766] leading-[1.4] mb-1">{booking.fromAddress.street}</p>
                              <p className="text-[14px] text-[#767678] leading-[1.4]">{booking.fromAddress.city}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-center px-8 relative">
                          <svg width="120" height="2" className="absolute top-1/2 -translate-y-1/2" style={{ left: '50%', transform: 'translate(-50%, -50%)' }}>
                            <line x1="0" y1="1" x2="120" y2="1" stroke="#51c8b4" strokeWidth="2" strokeDasharray="4,6" opacity="0.4" />
                          </svg>

                          <div className="relative z-10 flex items-center gap-3">
                            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-[0_4px_16px_rgba(81,200,180,0.2)] border-[3px] border-[#51c8b4]/30">
                              <span className="text-[32px] inline-block scale-x-[-1]">🚚</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 flex justify-center">
                          <div className="flex items-center w-fit gap-4">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(33,71,102,0.12)]">
                              <MapPinIcon width={32} height={32} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[11px] font-bold text-[#51c8b4] uppercase tracking-[0.08em] mb-2.5 leading-none">{t('detail.to')}</p>
                              <p className="text-[16px] font-semibold text-[#214766] leading-[1.4] mb-1">{booking.toAddress.street}</p>
                              <p className="text-[14px] text-[#767678] leading-[1.4]">{booking.toAddress.city}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:hidden">
                    <div>
                      <div className="p-3">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(33,71,102,0.12)]">
                            <MapPinIcon width={32} height={32} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-bold text-[#51c8b4] uppercase tracking-[0.08em] mb-2.5 leading-none">{t('detail.from')}</p>
                            <p className="text-[16px] font-semibold text-[#214766] leading-[1.4] mb-1">{booking.fromAddress.street}</p>
                            <p className="text-[14px] text-[#767678] leading-[1.4]">{booking.fromAddress.city}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-center py-4 relative">
                        <svg width="2" height="80" className="absolute left-1/2 -translate-x-1/2" style={{ top: '50%', transform: 'translate(-50%, -50%)' }}>
                          <line x1="1" y1="0" x2="1" y2="80" stroke="#51c8b4" strokeWidth="2" strokeDasharray="4,6" opacity="0.4" />
                        </svg>

                        <div className="relative z-10 flex flex-col items-center gap-3">
                          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-[0_4px_16px_rgba(81,200,180,0.2)] border-[3px] border-[#51c8b4]/30 rotate-90">
                            <span className="text-[32px] inline-block scale-x-[-1]">🚚</span>
                          </div>

                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="flex-shrink-0">
                            <path d="M16 4V28M16 28L8 20M16 28L24 20" stroke="#51c8b4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>

                      <div className="p-3">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(33,71,102,0.12)]">
                            <MapPinIcon width={32} height={32} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-bold text-[#51c8b4] uppercase tracking-[0.08em] mb-2.5 leading-none">{t('detail.to')}</p>
                            <p className="text-[16px] font-semibold text-[#214766] leading-[1.4] mb-1">{booking.toAddress.street}</p>
                            <p className="text-[14px] text-[#767678] leading-[1.4]">{booking.toAddress.city}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {booking.type === BOOKING_TYPE_MOVECLEAN && booking.fromAddress && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(33,71,102,0.12)]">
                        <MapPinIcon width={32} height={32} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold text-[#51c8b4] uppercase tracking-[0.08em] mb-2.5 leading-none">{t('detail.addressToClean')}</p>
                        <p className="text-[16px] font-semibold text-[#214766] leading-[1.4] mb-1">{booking.fromAddress.street}</p>
                        <p className="text-[14px] text-[#767678] leading-[1.4]">{booking.fromAddress.city}</p>
                      </div>
                    </div>
                  )}

                  {booking.orderType === ORDER_TYPE_TERMINATE_POWER && booking.fromAddress && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(33,71,102,0.12)]">
                        <MapPinIcon width={32} height={32} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold text-[#51c8b4] uppercase tracking-[0.08em] mb-2.5 leading-none">{t('detail.address')}</p>
                        <p className="text-[16px] font-semibold text-[#214766] leading-[1.4] mb-1">{booking.fromAddress.street}</p>
                        <p className="text-[14px] text-[#767678] leading-[1.4]">{booking.fromAddress.city}</p>
                      </div>
                    </div>
                  )}

                  {booking.type !== BOOKING_TYPE_MOVEHELP && booking.type !== BOOKING_TYPE_MOVECLEAN && booking.orderType !== ORDER_TYPE_TERMINATE_POWER && booking.toAddress && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(33,71,102,0.12)]">
                        <MapPinIcon width={32} height={32} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold text-[#51c8b4] uppercase tracking-[0.08em] mb-2.5 leading-none">{t('detail.to')}</p>
                        <p className="text-[16px] font-semibold text-[#214766] leading-[1.4] mb-1">{booking.toAddress.street}</p>
                        <p className="text-[14px] text-[#767678] leading-[1.4]">{booking.toAddress.city}</p>
                      </div>
                    </div>
                  )}

                  {booking.address && !booking.fromAddress && !booking.toAddress && (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_rgba(33,71,102,0.12)]">
                        <MapPinIcon width={32} height={32} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-bold text-[#51c8b4] uppercase tracking-[0.08em] mb-2.5 leading-none">{t('detail.address')}</p>
                        <p className="text-[16px] font-semibold text-[#214766] leading-[1.4] mb-1">{booking.address.street}</p>
                        <p className="text-[14px] text-[#767678] leading-[1.4]">{booking.address.city}</p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {booking.supplier && booking.orderType !== ORDER_TYPE_TERMINATE_POWER && (
          <div className="mb-3">
            <h2 className="text-[14px] font-bold text-[#767678] uppercase mb-3 tracking-wide">{t('detail.supplier')}</h2>
            <div className="bg-[#E8F9F6] rounded-[10px] p-3">
              <div className={clsx('flex items-center gap-3 ', booking.type !== BOOKING_TYPE_BROADBAND && booking.type !== BOOKING_TYPE_ELECTRICITY ? 'mb-4' : '')}>
                <div className="w-12 h-12 rounded-full bg-[#214766] flex items-center justify-center text-white font-bold">
                  {booking.supplier.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className={clsx('text-[16px] font-semibold text-[#214766]', !!booking?.supplier?.phone ? 'mb-1' : '')}>{capitalizeFirstLetter(booking.supplier.name)}</p>
                  {booking.supplier.phone && (
                    <a href={`tel:${booking.supplier.phone.replace(/\s/g, '')}`} className="text-[15px] font-medium text-[#214766] hover:text-[#51c8b4] transition-colors">
                      {booking.supplier.phone}
                    </a>
                  )}
                </div>
              </div>

              {booking.type !== BOOKING_TYPE_BROADBAND && booking.type !== BOOKING_TYPE_ELECTRICITY && booking.supplier?.phone && (
                <button
                  onClick={() => (window.location.href = `tel:${booking.supplier?.phone?.replace(/\s/g, '')}`)}
                  className="w-full hover:cursor-pointer py-2 bg-[#51c8b4] text-white rounded-full font-semibold hover:bg-[#37ae9a] flex items-center justify-center gap-2"
                >
                  <PhoneIcon width={30} height={30} className="text-white" />
                  {t('detail.callNow')}
                </button>
              )}
            </div>
          </div>
        )}

        <div ref={priceRef}>
          <h2 className="text-[11px] font-bold text-[#767678] uppercase mb-3 tracking-[0.1em]">{t('detail.fullPriceSpecification')}</h2>

          <div className="bg-yellow-50 rounded-[10px] p-4 border-2 border-yellow-200">
            <div className={clsx([BOOKING_TYPE_ELECTRICITY, ORDER_TYPE_TERMINATE_POWER]?.includes(booking.type) ? 'mb-0' : 'mb-3')}>
              <p className="text-[16px] font-bold text-[#214766]">
                {booking.orderType === ORDER_TYPE_TERMINATE_POWER
                  ? t('bookings:detail.terminatePowerServiceShort')
                  : booking.type === BOOKING_TYPE_ELECTRICITY
                    ? getElectricityProviderName()
                    : serviceName}
              </p>
              {booking.type === BOOKING_TYPE_BROADBAND && booking.supplier && <p className="text-[14px] text-[#767678] mt-1">{capitalizeFirstLetter(booking.supplier.name)}</p>}
              {booking.type === BOOKING_TYPE_BROADBAND && booking.details.description && <p className="text-[14px] text-[#767678] mt-1">{booking.details.description}</p>}
            </div>

            {booking.type === BOOKING_TYPE_BROADBAND && booking.details.campaignPrices && booking.details.campaignPrices.length > 0 && (
              <div className="space-y-2 mb-4">
                {booking.details.campaignPrices.map((period, index) => {
                  // -1 indicates "ongoing" - means this price applies from start month onwards
                  const isOngoing = period.end === -1
                  const periodText = isOngoing
                    ? `${t('bookings:detail.month')} ${period.start} ${t('bookings:detail.andOnwards')}`
                    : period.end !== period.start
                      ? `${t('bookings:detail.month')} ${period.start} - ${period.end}`
                      : `${t('bookings:detail.month')} ${period.start}`

                  return (
                    <div key={index} className="flex justify-between items-start">
                      <p className="text-[15px] text-[#2d2d2d]">{periodText}</p>
                      <p className="text-[15px] font-semibold text-[#2d2d2d]">
                        {period.amount.toLocaleString('sv-SE')} {booking.price.currency}/mån
                      </p>
                    </div>
                  )
                })}
              </div>
            )}

            {booking.type === BOOKING_TYPE_BROADBAND && booking.details.additionalProducts && booking.details.additionalProducts.length > 0 && (
              <div className="space-y-2 mb-4 border-t-2 border-yellow-300 pt-3">
                <p className="text-[13px] font-bold text-[#767678] uppercase mb-2">{t('bookings:detail.addons')}</p>
                {booking.details.additionalProducts.map((addon, index) => {
                  // Display one-time amount if present, otherwise monthly price
                  const priceDisplay = addon.oneTimeAmount
                    ? `${addon.oneTimeAmount.toLocaleString('sv-SE')} ${booking.price.currency}`
                    : addon.monthlyPrice
                      ? `${addon.monthlyPrice.toLocaleString('sv-SE')} ${booking.price.currency}/mån`
                      : '-'

                  return (
                    <div key={index} className="flex justify-between items-start">
                      <p className="text-[15px] text-[#2d2d2d]">{addon.name}</p>
                      <p className="text-[15px] font-semibold text-[#2d2d2d]">{priceDisplay}</p>
                    </div>
                  )
                })}
              </div>
            )}

            {booking.type === BOOKING_TYPE_MOVEHELP && booking.price.total === 0 ? (
              <div className="text-center py-4">
                <p className="text-[14px] text-[#767678] mb-2">{t('bookings:detail.quoteRequested')}</p>
                <p className="text-[18px] font-bold text-[#214766]">{formatDate(booking.date)}</p>
              </div>
            ) : booking.type !== BOOKING_TYPE_ELECTRICITY && booking.orderType !== ORDER_TYPE_POWER && booking.orderType !== ORDER_TYPE_TERMINATE_POWER ? (
              <>
                <div className="space-y-2 mb-4">
                  {booking.price.items.map((item, index) => {
                    return (
                      <div key={index} className="flex justify-between items-start gap-2">
                        <p className="text-[13px] sm:text-[15px] text-[#2d2d2d]">{formatPriceLabel(item.label, item.isIncludedInRut)}</p>
                        <p className="text-[13px] sm:text-[15px] font-semibold text-[#2d2d2d] text-right flex-shrink-0">
                          {item.amount > 0 ? `${item.amount.toLocaleString('sv-SE')} ${booking.price.currency}` : t('detail.included')}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </>
            ) : null}

            {!booking?.price?.items?.length && booking.price.total > 0 && booking?.type !== BOOKING_TYPE_ELECTRICITY && <div className="border-t-2 border-yellow-300  mb-3" />}

            {booking.price.rutDeduction && (
              <div className="border-t-2 border-yellow-300 pt-3 mb-3">
                <div className="flex justify-between items-start gap-2 mb-2">
                  {(() => {
                    // Get all non-RUT items
                    const nonRutItems = booking.price.items.filter((i) => i.isIncludedInRut === false)

                    if (nonRutItems.length > 0) {
                      // Extract clean product names from labels
                      const productNames = nonRutItems.map((item) => {
                        // Remove measurements and clean up the label
                        const cleanLabel = item.label
                          .replace(/\s*[-–]\s*\d+\s*(kbm|kvm|m3|m2|m³|m²)/gi, '')
                          .replace(/\s*\+\s*\d+\s*(kvm|m2|m²)/gi, '')
                          .trim()
                        return cleanLabel
                      })

                      // Join product names with comma
                      const productList = productNames.join(', ')
                      return <p className="text-[13px] sm:text-[15px] text-[#2d2d2d]">RUT-underlag (exkl. {productList})</p>
                    }

                    return <p className="text-[13px] sm:text-[15px] text-[#2d2d2d]">RUT-underlag</p>
                  })()}
                  <p className="text-[13px] sm:text-[15px] font-semibold text-[#2d2d2d] text-right flex-shrink-0">
                    {(booking.price.subtotal - booking.price.items.filter((i) => i.isIncludedInRut === false).reduce((sum, item) => sum + item.amount, 0)).toLocaleString('sv-SE')}{' '}
                    {booking.price.currency}
                  </p>
                </div>

                <div className="flex justify-between items-center gap-2 -mx-3 mb-3 bg-[#e8f9f6] px-3 py-2 rounded-[10px]">
                  <p className="text-[14px] sm:text-[16px] text-[#51c8b4] font-bold">{t('detail.rutDeduction', { percentage: booking.price.rutPercentage })}</p>
                  <p className="text-[14px] sm:text-[16px] font-bold text-[#51c8b4] text-right flex-shrink-0">
                    -{booking.price.rutDeduction.toLocaleString('sv-SE')} {booking.price.currency}
                  </p>
                </div>
              </div>
            )}

            {booking.price.total > 0 && booking.type !== BOOKING_TYPE_ELECTRICITY && booking.orderType !== ORDER_TYPE_POWER && booking.orderType !== ORDER_TYPE_TERMINATE_POWER && (
              <div className="flex justify-between items-center gap-2 mb-4">
                <p className="text-[15px] sm:text-[18px] font-bold text-[#214766]">
                  {booking.type === BOOKING_TYPE_BROADBAND ? t('bookings:detail.totalPricePerMonth') : t('detail.yourPriceAfterRut')}
                </p>
                <p className="text-[15px] sm:text-[18px] font-bold text-[#214766] text-right flex-shrink-0">
                  {booking.price.total.toLocaleString('sv-SE')} {booking.price.currency}
                  {booking.type === BOOKING_TYPE_BROADBAND && '/mån'}
                </p>
              </div>
            )}

            {booking.type === BOOKING_TYPE_BROADBAND && booking.details.contractMonths && (
              <div className="border-t-1 border-dashed border-yellow-300 pt-3">
                <p className="text-[12px] text-[#767678] leading-[1.6]">
                  {t('bookings:detail.bindingPeriod')}: {booking.details.contractMonths} {t('bookings:detail.months')}
                </p>
              </div>
            )}

            {booking.serviceDescription && booking.price.total > 0 && booking.type !== BOOKING_TYPE_BROADBAND && (
              <>
                <div className="border-t-1 border-dashed border-yellow-300 mb-3"></div>
                <p className="text-[12px] text-[#767678] leading-[1.6]">{booking.serviceDescription}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator for mobile - hide for orders without prices */}
      {isMobile &&
        showScrollIndicator &&
        booking.type !== BOOKING_TYPE_ELECTRICITY &&
        booking.orderType !== ORDER_TYPE_TERMINATE_POWER &&
        !(booking.type === BOOKING_TYPE_MOVEHELP && booking.price?.total === 0) && (
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
            {/* Gradient fade */}
            <div className="h-20 bg-gradient-to-t from-[#f8faf9] via-[#f8faf9]/80 to-transparent" />

            {/* Button container */}
            <div className="bg-[#f8faf9] pb-4 px-6 pointer-events-auto mb-4 flex justify-center">
              <button
                onClick={scrollToPrices}
                className="py-2 px-5 bg-white/90 backdrop-blur-sm text-[#214766] rounded-full font-medium text-[13px]
                         border border-[#214766]/20 hover:bg-white active:bg-gray-50 transition-colors
                         flex items-center gap-1.5 shadow-sm"
              >
                {t('bookings:detail.seePrices')}
                <Chevron className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}
    </div>
  )

  // Render mobile bottom sheet on mobile devices
  if (isMobile) {
    return (
      <MobileBottomSheet open={isOpen} onClose={onClose} withCloseButton={false} className="!p-0 flex flex-col bg-[#f8faf9]">
        <ModalTitle className="sr-only !mb-0">{serviceName}</ModalTitle>
        {modalContent}
      </MobileBottomSheet>
    )
  }

  // Render desktop modal on larger screens
  return (
    <Modal open={isOpen}>
      <ModalContent setShowModal={onClose} withCloseButton size="large" className="!p-0 flex flex-col bg-[#f8faf9]">
        <ModalTitle className="sr-only !mb-0">{serviceName}</ModalTitle>
        {modalContent}
      </ModalContent>
    </Modal>
  )
}

export default BookingDetailModal
