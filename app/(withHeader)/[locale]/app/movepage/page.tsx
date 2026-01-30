import MovepageClient from './clientPage'
import { getMyOrdersServer } from '@/common/api/orders.server'
import { transformOrdersToBookings, sortOrdersByDate } from '@/common/utils/bookingMapper'
import initTranslations from 'i18n'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const { t } = await initTranslations(locale, ['common', 'bookings'])

  const orders = await getMyOrdersServer()
  const sortedOrders = sortOrdersByDate(orders)
  const completedBookings = transformOrdersToBookings(sortedOrders, t)

  return (
    <main style={{ display: 'flex', flexGrow: '1' }}>
      <MovepageClient completedBookings={completedBookings} />
    </main>
  )
}
