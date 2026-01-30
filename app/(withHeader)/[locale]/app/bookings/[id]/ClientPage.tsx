'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import BookingDetailTemplate from '@/templates/BookingsPage/BookingDetailTemplate'

const BookingDetailClientPage = () => {
  const params = useParams()
  const bookingId = params?.id as string

  return <BookingDetailTemplate bookingId={bookingId} />
}

export default BookingDetailClientPage
