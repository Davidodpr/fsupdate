import { Order } from '@/pageTypes/orders'
import createFetchInstance from '../utils/api'

const fetchGetInstance = createFetchInstance('GET')

/**
 * Fetches all orders for the current user's active move
 * @returns Promise<Order[]> Array of orders with comprehensive data
 */
export const getMyOrders = async (): Promise<Order[]> => {
  return fetchGetInstance<Order[]>('/web/order/my-orders')
}

export default getMyOrders
