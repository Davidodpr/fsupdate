import React from 'react'
import BookingsClientPage from './ClientPage'
import { getMyOrdersServer } from '@/common/api/orders.server'
import { transformOrdersToBookings, sortOrdersByDate } from '@/common/utils/bookingMapper'
import initTranslations from 'i18n'

export default async function BookingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const { t } = await initTranslations(locale, ['common', 'bookings'])

  const orders = await getMyOrdersServer()
  const sortedOrders = sortOrdersByDate(orders)
  const bookings = transformOrdersToBookings(sortedOrders, t)

  return <BookingsClientPage initialBookings={bookings} />
}
