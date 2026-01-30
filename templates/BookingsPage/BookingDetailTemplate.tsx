'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { mockBookings } from '@/common/data/mockBookings'

interface BookingDetailTemplateProps {
  bookingId: string
}

const BookingDetailTemplate: React.FC<BookingDetailTemplateProps> = ({ bookingId }) => {
  const { t } = useTranslation(['bookings', 'common'])
  const router = useRouter()

  const booking = mockBookings.find((b) => b.id === bookingId)

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[16px] text-[#767678] mb-4">{t('bookings:notFound')}</p>
          <button onClick={() => router.back()} className="px-6 py-3 bg-[#51c8b4] text-white rounded-full font-semibold hover:bg-[#37ae9a]">
            {t('common:back')}
          </button>
        </div>
      </div>
    )
  }

  const formatDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString('sv-SE', {
      day: 'numeric',
      month: 'long',
      weekday: 'long',
    })
  }

  return (
    <div className="min-h-screen bg-[#f8faf9] pb-10">
      <div className="max-w-3xl mx-auto px-4 pt-6">
        {/* Back Button */}
        <button onClick={() => router.back()} className="flex items-center gap-2 text-[#51c8b4] font-semibold mb-6 hover:text-[#37ae9a]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t('common:back')}
        </button>

        {/* Header */}
        <div className="bg-white rounded-[10px] p-6 shadow-[0px_4px_8px_rgba(0,0,0,0.08)] mb-4">
          <h1 className="text-[24px] font-bold text-[#214766] mb-2 capitalize">{booking.type}</h1>
          <p className="text-[14px] text-[#767678] mb-4">
            {formatDate(booking.date)} • {booking.time}
          </p>

          {booking.serviceDescription && (
            <button className="text-[14px] text-[#51c8b4] flex items-center gap-1 hover:text-[#37ae9a]">
              <span className="text-[16px]">ℹ️</span>
              {t('bookings:detail.whatIsIncluded')}
            </button>
          )}
        </div>

        {/* Service Information */}
        <div className="bg-white rounded-[10px] p-6 shadow-[0px_4px_8px_rgba(0,0,0,0.08)] mb-4">
          <h2 className="text-[14px] font-bold text-[#767678] uppercase mb-4 tracking-wide">{t('bookings:detail.serviceInformation')}</h2>

          {booking.details.volume && (
            <div className="mb-3">
              <p className="text-[14px] text-[#767678]">{t('bookings:detail.volume')}</p>
              <p className="text-[16px] font-semibold text-[#214766]">{booking.details.volume}</p>
            </div>
          )}

          {booking.details.area && (
            <div className="mb-3">
              <p className="text-[14px] text-[#767678]">{t('bookings:detail.area')}</p>
              <p className="text-[16px] font-semibold text-[#214766]">{booking.details.area}</p>
            </div>
          )}

          {booking.details.duration && (
            <div className="mb-3">
              <p className="text-[14px] text-[#767678]">{t('bookings:detail.time')}</p>
              <p className="text-[16px] font-semibold text-[#214766]">{booking.details.duration}</p>
            </div>
          )}
        </div>

        {/* Addresses */}
        {(booking.fromAddress || booking.toAddress || booking.address) && (
          <div className="bg-white rounded-[10px] p-6 shadow-[0px_4px_8px_rgba(0,0,0,0.08)] mb-4">
            <h2 className="text-[14px] font-bold text-[#767678] uppercase mb-4 tracking-wide">{t('bookings:detail.addresses')}</h2>

            {booking.fromAddress && (
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#ecf9f7] flex items-center justify-center flex-shrink-0">
                  <span className="text-[16px]">📍</span>
                </div>
                <div>
                  <p className="text-[14px] text-[#767678]">{t('bookings:detail.from')}</p>
                  <p className="text-[16px] font-semibold text-[#214766]">{booking.fromAddress.street}</p>
                  <p className="text-[14px] text-[#767678]">{booking.fromAddress.city}</p>
                </div>
              </div>
            )}

            {booking.fromAddress && booking.toAddress && (
              <div className="flex justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="#51c8b4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}

            {booking.toAddress && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#ecf9f7] flex items-center justify-center flex-shrink-0">
                  <span className="text-[16px]">📍</span>
                </div>
                <div>
                  <p className="text-[14px] text-[#767678]">{t('bookings:detail.to')}</p>
                  <p className="text-[16px] font-semibold text-[#214766]">{booking.toAddress.street}</p>
                  <p className="text-[14px] text-[#767678]">{booking.toAddress.city}</p>
                </div>
              </div>
            )}

            {booking.address && !booking.fromAddress && !booking.toAddress && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#ecf9f7] flex items-center justify-center flex-shrink-0">
                  <span className="text-[16px]">📍</span>
                </div>
                <div>
                  <p className="text-[14px] text-[#767678]">{t('bookings:detail.address')}</p>
                  <p className="text-[16px] font-semibold text-[#214766]">{booking.address.street}</p>
                  <p className="text-[14px] text-[#767678]">{booking.address.city}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Supplier */}
        <div className="bg-white rounded-[10px] p-6 shadow-[0px_4px_8px_rgba(0,0,0,0.08)] mb-4">
          <h2 className="text-[14px] font-bold text-[#767678] uppercase mb-4 tracking-wide">{t('bookings:detail.supplier')}</h2>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#214766] flex items-center justify-center text-white font-bold">{booking.supplier?.name.substring(0, 2).toUpperCase()}</div>
            <div>
              <p className="text-[16px] font-semibold text-[#214766]">{booking.supplier?.name}</p>
              <p className="text-[14px] text-[#767678]">{booking.supplier?.phone}</p>
            </div>
          </div>

          <button className="w-full py-3 bg-[#51c8b4] text-white rounded-full font-semibold hover:bg-[#37ae9a] flex items-center justify-center gap-2">
            <span className="text-[18px]">📞</span>
            {t('bookings:detail.callNow')}
          </button>
        </div>

        {/* Price Specification */}
        <div className="bg-[#fff1e5] rounded-[10px] p-6 shadow-[0px_4px_8px_rgba(0,0,0,0.08)]">
          <h2 className="text-[14px] font-bold text-[#767678] uppercase mb-4 tracking-wide">{t('bookings:detail.fullPriceSpecification')}</h2>

          <div className="space-y-3 mb-4">
            {booking.price.items.map((item, index) => (
              <div key={index} className="flex justify-between items-start">
                <p className="text-[14px] text-[#214766]">{item.label}</p>
                <p className="text-[14px] font-semibold text-[#214766]">
                  {item.amount > 0 ? `${item.amount.toLocaleString('sv-SE')} ${booking.price.currency}` : t('bookings:detail.included')}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-[#ffd4b3] pt-3 mb-3">
            <div className="flex justify-between items-center mb-2">
              <p className="text-[16px] font-semibold text-[#214766]">{t('bookings:detail.totalBeforeRut')}</p>
              <p className="text-[16px] font-bold text-[#214766]">
                {booking.price.subtotal.toLocaleString('sv-SE')} {booking.price.currency}
              </p>
            </div>

            {booking.price.rutDeduction && (
              <>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-[14px] text-[#214766]">{t('bookings:detail.rutExcludingTransport')}</p>
                  <p className="text-[14px] font-semibold text-[#214766]">
                    {(booking.price.subtotal - (booking.price.items.find((i) => !i.isIncludedInRut)?.amount || 0)).toLocaleString('sv-SE')} {booking.price.currency}
                  </p>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <p className="text-[14px] text-[#51c8b4] font-semibold">{t('bookings:detail.rutDeduction', { percentage: booking.price.rutPercentage })}</p>
                  <p className="text-[14px] font-bold text-[#51c8b4]">
                    -{booking.price.rutDeduction.toLocaleString('sv-SE')} {booking.price.currency}
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="bg-white rounded-[8px] p-4">
            <div className="flex justify-between items-center">
              <p className="text-[18px] font-bold text-[#214766]">{t('bookings:detail.yourPriceAfterRut')}</p>
              <p className="text-[20px] font-bold text-[#214766]">
                {booking.price.total.toLocaleString('sv-SE')} {booking.price.currency}
              </p>
            </div>
          </div>

          {booking.serviceDescription && <p className="text-[12px] text-[#767678] mt-4 leading-relaxed">{booking.serviceDescription}</p>}
        </div>
      </div>
    </div>
  )
}

export default BookingDetailTemplate
