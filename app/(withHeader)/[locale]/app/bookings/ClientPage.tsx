'use client'

import React, { Suspense } from 'react'
import BookingsTemplate from '@/templates/BookingsPage/BookingsTemplate'
import { Booking } from '@/types/booking'

interface BookingsClientPageProps {
  initialBookings: Booking[]
}

const BookingsClientPage: React.FC<BookingsClientPageProps> = ({ initialBookings }) => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8faf9]" />}>
      <BookingsTemplate initialBookings={initialBookings} />
    </Suspense>
  )
}

export default BookingsClientPage
