'use client'

import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { useIntercom } from 'react-use-intercom'
import BackToMovepageButton from '@/components/atoms/BackToMovepageButton'
import BookingCard from '@/components/molecules/BookingCard'
import BookingDetailModal from '@/components/organisms/BookingDetailModal'
import { Booking } from '@/types/booking'
import { clsx } from 'clsx'
import PhoneIcon from '@/public/images/Phone.svg'
import {
  BOOKING_STATUS_UPCOMING,
  BOOKING_STATUS_CONFIRMED,
  BOOKING_STATUS_COMPLETED,
  BOOKING_STATUS_CANCELLED,
  BOOKING_STATUS_PERFORMED,
  BOOKING_TYPE_MOVEHELP,
  BOOKING_TYPE_MOVECLEAN,
} from '@/constants/booking'

interface BookingsTemplateProps {
  initialBookings: Booking[]
}

const BookingsTemplate: React.FC<BookingsTemplateProps> = ({ initialBookings }) => {
  const { t } = useTranslation(['bookings', 'common'])
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { show } = useIntercom()
  const locale = (params?.locale as string) || 'sv'
  const [activeTab, setActiveTab] = useState<'upcoming' | 'previous'>('upcoming')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Check for bookingId in URL parameters and auto-open modal
  useEffect(() => {
    const bookingId = searchParams.get('bookingId')
    if (bookingId) {
      const booking = initialBookings.find((b) => b.id === bookingId)
      if (booking) {
        setSelectedBooking(booking)
        setIsModalOpen(true)

        // Set the correct tab based on booking status
        if (booking.status === BOOKING_STATUS_COMPLETED || booking.status === BOOKING_STATUS_CANCELLED || booking.status === BOOKING_STATUS_PERFORMED) {
          setActiveTab('previous')
        } else {
          setActiveTab('upcoming')
        }

        // Remove the bookingId parameter from URL after opening modal
        router.replace(`/${locale}/app/bookings`, { scroll: false })
      }
    }
    // Only run this effect when bookingId is present in URL, don't reset tab otherwise
  }, [searchParams, initialBookings, locale, router])

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedBooking(null), 200) // Clear after animation
  }

  // Filter bookings based on status and delivery date
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Reset to start of day for accurate comparison

  // Transform movehelp/moveclean bookings with upcoming status and past delivery date to 'performed' status
  const processedBookings = initialBookings.map((booking) => {
    const deliveryDate = new Date(booking.date)
    deliveryDate.setHours(0, 0, 0, 0)
    const hasPassed = deliveryDate < today

    // If movehelp or moveclean with 'upcoming' status and past date, change to 'performed'
    if ((booking.type === BOOKING_TYPE_MOVEHELP || booking.type === BOOKING_TYPE_MOVECLEAN) && booking.status === BOOKING_STATUS_UPCOMING && hasPassed) {
      return { ...booking, status: BOOKING_STATUS_PERFORMED as typeof booking.status }
    }

    return booking
  })

  const upcomingBookings = processedBookings.filter((booking) => {
    const deliveryDate = new Date(booking.date)
    deliveryDate.setHours(0, 0, 0, 0)

    const isBeforeOrToday = deliveryDate >= today
    const isUpcoming = booking.status === BOOKING_STATUS_UPCOMING || booking.status === BOOKING_STATUS_CONFIRMED
    const isCompletedButNotPassed = booking.status === BOOKING_STATUS_COMPLETED && isBeforeOrToday

    return isUpcoming || isCompletedButNotPassed
  })

  const previousBookings = processedBookings.filter((booking) => {
    const deliveryDate = new Date(booking.date)
    deliveryDate.setHours(0, 0, 0, 0)

    const hasPassed = deliveryDate < today
    const isCancelled = booking.status === BOOKING_STATUS_CANCELLED
    const isCompletedAndPassed = booking.status === BOOKING_STATUS_COMPLETED && hasPassed
    const isPerformed = booking.status === BOOKING_STATUS_PERFORMED

    return isCancelled || isCompletedAndPassed || isPerformed
  })

  const displayedBookings = activeTab === 'upcoming' ? upcomingBookings : previousBookings

  return (
    <div className="min-h-screen bg-[#f8faf9] pb-10">
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <div className="mb-6">
          <BackToMovepageButton />
        </div>

        <div className="mb-6">
          <h1 className="text-[28px] font-bold text-[#214766] mb-2">{t('bookings:title')}</h1>
          <p className="text-[14px] text-[#767678]">{t('bookings:subtitle')}</p>
        </div>

        <div className="mb-6 bg-white rounded-[10px] p-4 shadow-[0px_4px_8px_rgba(0,0,0,0.08)] border border-[#eeeef0]">
          <h2 className="text-[18px] font-bold text-[#214766] mb-2">{t('bookings:questions.title')}</h2>
          <p className="text-[14px] text-[#767678] mb-0">{t('bookings:questions.subtitle')}</p>
          <p className="text-[14px] text-[#767678] mb-3">{t('bookings:questions.hours')}</p>
          <a href="tel:0812008822" className="text-[16px] text-[#51c8b4] font-bold hover:text-[#37ae9a] no-underline flex items-center gap-2 mb-1">
            <PhoneIcon width={20} height={20} className="text-[#51c8b4]" />
            {t('bookings:questions.phone')}
          </a>
          <p className="text-[14px] text-[#767678] mt-4 mb-3">{t('bookings:questions.callSupplier')}</p>

          <div className="flex gap-2 justify-around md:justify-start sm:gap-4">
            <a
              href="https://ik.imagekit.io/flyttsmart/PDF/Allma%CC%88nna%20villkor%20fo%CC%88r%20Flyttsmart%20-%20Konsumenter%20_%20Na%CC%88ringsidkare%20(1)_MkIfrKaDI.pdf?updatedAt=1763131018941"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] sm:text-[16px] mt-0.5 md:mt-0 text-[#51c8b4] font-bold hover:text-[#37ae9a] no-underline"
              style={{ color: '#51c8b4', fontWeight: 'bold' }}
            >
              {t('bookings:actions.generalTerms')}
            </a>
            <span className="text-[#eeeef0]">•</span>
            <button onClick={show} className="!text-[13px] sm:!text-[16px] hover:cursor-pointer text-[#51c8b4] font-bold hover:text-[#37ae9a]">
              {t('bookings:actions.contactSupport')}
            </button>
          </div>
        </div>

        <div className="flex gap-0 mb-6 bg-white rounded-[10px] p-1 shadow-[0px_2px_4px_rgba(0,0,0,0.06)]">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={clsx(
              'flex-1 py-3 hover:cursor-pointer px-6 rounded-[8px] font-semibold text-[16px] transition-all',
              activeTab === 'upcoming' ? 'bg-[#214766] text-white' : 'bg-transparent text-[#767678] hover:text-[#214766]',
            )}
          >
            {t('bookings:tabs.upcoming')}
          </button>
          <button
            onClick={() => setActiveTab('previous')}
            className={clsx(
              'flex-1 py-3 hover:cursor-pointer px-6 rounded-[8px] font-semibold text-[16px] transition-all',
              activeTab === 'previous' ? 'bg-[#214766] text-white' : 'bg-transparent text-[#767678] hover:text-[#214766]',
            )}
          >
            {t('bookings:tabs.previous')}
          </button>
        </div>

        <div>
          {displayedBookings.length === 0 ? (
            <div className="bg-white rounded-[10px] p-8 shadow-[0px_4px_8px_rgba(0,0,0,0.08)] text-center">
              <p className="text-[16px] text-[#767678]">{activeTab === 'upcoming' ? t('bookings:empty.upcoming') : t('bookings:empty.previous')}</p>
            </div>
          ) : (
            displayedBookings.map((booking) => <BookingCard key={booking.id} booking={booking} locale={locale} onClick={handleBookingClick} section={activeTab} />)
          )}
        </div>

        <BookingDetailModal booking={selectedBooking} isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </div>
  )
}

export default BookingsTemplate
