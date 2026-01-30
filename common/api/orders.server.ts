import { cookies } from 'next/headers'
import { Order } from '@/pageTypes/orders'

/**
 * Server-side function to fetch orders
 * Uses cookies to get the auth token from the request
 */
export async function getMyOrdersServer(): Promise<Order[]> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('userToken')?.value

    if (!token) {
      console.warn('No auth token found in cookies')
      return []
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.flyttsmart.se'
    const response = await fetch(`${apiUrl}/web/order/my-orders`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error(`Failed to fetch orders: ${response.status} ${response.statusText}`)
      return []
    }

    const orders = await response.json()

    if (!Array.isArray(orders)) {
      console.warn('API returned non-array response:', orders)
      return []
    }

    return orders
  } catch (error) {
    console.error('Error fetching orders on server:', error)
    return []
  }
}
