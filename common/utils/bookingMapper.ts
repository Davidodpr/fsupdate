import { Order, MoveServiceOrder, MoveServiceOrderProduct, InternetProductMeta } from '@/pageTypes/orders'
import {
  Booking,
  BookingType,
  BookingStatus,
  BookingAddress,
  BookingSupplier,
  BookingPrice,
  BookingDetails,
  BookingCampaignPrice,
  BookingAdditionalProduct,
} from '@/common/types/booking'
import { TFunction } from 'i18next'
import {
  ORDER_TYPE_MOVE_SERVICE,
  ORDER_TYPE_POWER,
  ORDER_TYPE_TERMINATE_POWER,
  ORDER_TYPE_INTERNET,
  ORDER_TYPE_INSURANCE,
  ORDER_STATUS_QUOTATED,
  ORDER_STATUS_LOCKED,
  ORDER_STATUS_COMPLETED,
  ORDER_STATUS_REPORTED,
  ORDER_STATUS_REPORTED_APPROVED,
  ORDER_STATUS_INVOICED,
  ORDER_STATUS_CANCELED,
  ORDER_STATUS_DECLINED,
  ORDER_SERVICE_MATERIAL,
  ORDER_SERVICE_TRANSPORT,
  ORDER_SERVICE_MOVING_ADDON,
  ORDER_SERVICE_CLEANING_ADDON,
  ORDER_SERVICE_DISCOUNT,
  ORDER_SERVICE_STORAGE,
  ORDER_SERVICE_PACKAGING,
  ORDER_SERVICE_CLEANING,
  ORDER_SERVICE_SHOW_CLEANING,
  ORDER_SERVICE_WINDOW_CLEANING,
  ORDER_SERVICE_MOVING,
  ORDER_SERVICE_HANDYMAN,
  ORDER_SERVICE_DISPOSAL,
  ORDER_SERVICE_DISPOSAL_FOR_REUSE,
  UNITS_TYPE_HOURS,
  UNITS_TYPE_SQM,
} from '@/constants/order'
import {
  BOOKING_STATUS_UPCOMING,
  BOOKING_STATUS_CONFIRMED,
  BOOKING_STATUS_COMPLETED as BOOKING_COMPLETED,
  BOOKING_STATUS_CANCELLED,
  BOOKING_TYPE_MOVEHELP,
  BOOKING_TYPE_MOVECLEAN,
  BOOKING_TYPE_ELECTRICITY,
  BOOKING_TYPE_BROADBAND,
  BOOKING_TYPE_INSURANCE,
} from '@/constants/booking'

/**
 * Maps API order types to frontend booking types
 */
export function mapOrderTypeToBookingType(orderType: string, products?: MoveServiceOrderProduct[]): BookingType {
  switch (orderType) {
    case ORDER_TYPE_MOVE_SERVICE:
      // Determine if it's moving or cleaning based on products
      // NOTE: Packaging is ALWAYS an addon to flytthjälp, never its own booking type
      if (products && products.length > 0) {
        // Find the primary service product (not an addon or auxiliary service)
        const mainProduct = products.find(
          (p) =>
            ![
              ORDER_SERVICE_MATERIAL,
              ORDER_SERVICE_TRANSPORT,
              ORDER_SERVICE_MOVING_ADDON,
              ORDER_SERVICE_CLEANING_ADDON,
              ORDER_SERVICE_DISCOUNT,
              ORDER_SERVICE_STORAGE,
              ORDER_SERVICE_PACKAGING,
            ].includes(p.service),
        )

        if (mainProduct) {
          const mainService = mainProduct.service
          if (mainService === ORDER_SERVICE_CLEANING || mainService === ORDER_SERVICE_SHOW_CLEANING || mainService === ORDER_SERVICE_WINDOW_CLEANING) {
            return BOOKING_TYPE_MOVECLEAN
          }
        }
      }
      // Default to flytthjälp for all moving services (including when packaging is present)
      return BOOKING_TYPE_MOVEHELP

    case ORDER_TYPE_POWER:
    case ORDER_TYPE_TERMINATE_POWER:
      return BOOKING_TYPE_ELECTRICITY

    case ORDER_TYPE_INTERNET:
      return BOOKING_TYPE_BROADBAND

    case ORDER_TYPE_INSURANCE:
      return BOOKING_TYPE_INSURANCE

    default:
      return BOOKING_TYPE_MOVEHELP
  }
}

/**
 * Maps API order status to frontend booking status
 */
export function mapOrderStatusToBookingStatus(status: string): BookingStatus {
  switch (status) {
    case ORDER_STATUS_QUOTATED:
      return BOOKING_STATUS_UPCOMING
    case ORDER_STATUS_LOCKED:
      return BOOKING_STATUS_CONFIRMED
    case ORDER_STATUS_COMPLETED:
    case ORDER_STATUS_REPORTED:
    case ORDER_STATUS_REPORTED_APPROVED:
    case ORDER_STATUS_INVOICED:
      return BOOKING_COMPLETED
    case ORDER_STATUS_CANCELED:
    case ORDER_STATUS_DECLINED:
      return BOOKING_STATUS_CANCELLED
    default:
      return BOOKING_STATUS_UPCOMING
  }
}

/**
 * Extracts date and time from deliveryDate
 */
function extractDateTime(deliveryDate?: Date | string | null): { date: string; time: string } {
  if (!deliveryDate) {
    return { date: new Date().toISOString().split('T')[0], time: '00:00' }
  }

  const date = new Date(deliveryDate)
  const dateStr = date.toISOString().split('T')[0]
  const timeStr = date.toTimeString().slice(0, 5)

  return { date: dateStr, time: timeStr }
}

/**
 * Maps API OrderAddress to BookingAddress
 */
function mapAddress(address?: { street?: string; zip?: string; city?: string; size?: number | null }): BookingAddress | undefined {
  if (!address || !address.street) {
    return undefined
  }

  return {
    street: address.street,
    city: address.city || '',
    postalCode: address.zip,
    size: address.size,
  }
}

/**
 * Creates BookingSupplier from order data
 * Returns undefined if no supplier information is available
 */
function mapSupplier(order: Order): BookingSupplier | undefined {
  // If no supplier name, don't create a supplier object
  if (!order.supplierName) {
    return undefined
  }

  return {
    id: order.supplierId || '',
    name: order.supplierName,
    phone: order.supplierPhone || '',
    email: order.supplierEmail || undefined,
  }
}

/**
 * Calculates RUT deduction for a set of products
 * NOTE: Backend sends RUT product prices already reduced by 50%.
 * Since we double those prices for display, the RUT deduction (50%) equals the original backend price.
 * Example: Backend price 1000 kr → Display 2000 kr → RUT deduction (50%) = 1000 kr
 */
function calculateRutDeduction(products: MoveServiceOrderProduct[]): number {
  // Sum up the backend prices of RUT products - this IS the 50% deduction amount
  const rutDeduction = products.filter((p) => p.isRutService).reduce((sum, p) => sum + (p.price || 0), 0)

  return Math.round(rutDeduction)
}

/**
 * Maps products array to price structure
 * NOTE: Backend sends RUT product prices already reduced by 50%.
 * We need to double them to show the original price before RUT deduction.
 */
function mapProductsToPrice(products: MoveServiceOrderProduct[], t: TFunction, currency = 'kr'): BookingPrice {
  const items = products.map((product) => {
    const backendPrice = product.price || 0
    // If product has RUT, backend price is already 50% off, so double it to get original price
    const displayAmount = product.isRutService ? backendPrice * 2 : backendPrice

    return {
      label: getProductLabel(product, t),
      amount: displayAmount,
      isIncludedInRut: product.isRutService,
    }
  })

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0)
  const rutDeduction = calculateRutDeduction(products)
  const total = subtotal - rutDeduction

  return {
    items,
    subtotal,
    rutDeduction: rutDeduction > 0 ? rutDeduction : undefined,
    rutPercentage: rutDeduction > 0 ? 50 : undefined,
    total,
    currency,
  }
}

/**
 * Gets a human-readable label for a product
 */
function getProductLabel(product: MoveServiceOrderProduct, t: TFunction): string {
  const service = product.service
  const description = product.description

  // Use description if available
  if (description) {
    return description
  }

  // Map service types to translation keys
  const serviceTranslationKeys: Record<string, string> = {
    [ORDER_SERVICE_MOVING]: 'ACTIVITIES.movehelp',
    [ORDER_SERVICE_CLEANING]: 'ACTIVITIES.movecleaning',
    [ORDER_SERVICE_SHOW_CLEANING]: 'ACTIVITIES.showCleaning',
    [ORDER_SERVICE_WINDOW_CLEANING]: 'ACTIVITIES.windowCleaning',
    [ORDER_SERVICE_PACKAGING]: 'ACTIVITIES.packaging',
    [ORDER_SERVICE_HANDYMAN]: 'ACTIVITIES.handyman',
    [ORDER_SERVICE_DISPOSAL]: 'ACTIVITIES.removal',
    [ORDER_SERVICE_DISPOSAL_FOR_REUSE]: 'ACTIVITIES.removalForReuse',
    [ORDER_SERVICE_STORAGE]: 'ACTIVITIES.storage',
    [ORDER_SERVICE_TRANSPORT]: 'ACTIVITIES.transport',
    [ORDER_SERVICE_MATERIAL]: 'ACTIVITIES.material',
    [ORDER_SERVICE_MOVING_ADDON]: 'ACTIVITIES.addon',
    [ORDER_SERVICE_CLEANING_ADDON]: 'ACTIVITIES.addon',
    [ORDER_SERVICE_DISCOUNT]: 'ACTIVITIES.discount',
  }

  const translationKey = serviceTranslationKeys[service]
  let label = translationKey ? t(translationKey) : service

  // Add units information if available
  if (product.units > 1) {
    label += ` (${product.units}`
    if (product.unitsType === UNITS_TYPE_HOURS) {
      label += ` ${t('UNITS.hours')}`
    } else if (product.unitsType === UNITS_TYPE_SQM) {
      label += ` ${t('UNITS.squareMeter')}`
    }
    label += ')'
  }

  // Add volume or area information
  if (product.volume) {
    label += ` (${product.volume} ${t('UNITS.cubicMeter')})`
  } else if (product.area) {
    label += ` (${product.area} ${t('UNITS.squareMeter')})`
  }

  return label
}

/**
 * Extracts details from move service products
 */
function extractMoveServiceDetails(products: MoveServiceOrderProduct[], t: TFunction) {
  if (!products || products.length === 0) {
    return {}
  }

  // Find the main service product (not materials, transport, or addons)
  const mainProduct = products.find(
    (p) =>
      ![
        ORDER_SERVICE_MATERIAL,
        ORDER_SERVICE_TRANSPORT,
        ORDER_SERVICE_MOVING_ADDON,
        ORDER_SERVICE_CLEANING_ADDON,
        ORDER_SERVICE_DISCOUNT,
        ORDER_SERVICE_STORAGE,
        ORDER_SERVICE_PACKAGING,
      ].includes(p.service),
  )

  if (!mainProduct) {
    return {}
  }

  // Extract volume (for moving services)
  let volume: string | undefined
  if (mainProduct.volume) {
    volume = `${mainProduct.volume} ${t('UNITS.cubicMeter')}`
  }

  // Extract area (for cleaning services)
  let area: string | undefined
  if (mainProduct.area) {
    area = `${mainProduct.area} ${t('UNITS.squareMeter')}`
  }

  // Extract duration (for time-based services)
  let duration: string | undefined
  if (mainProduct.unitsType === UNITS_TYPE_HOURS && mainProduct.units) {
    duration = `${mainProduct.units} ${t('UNITS.hours')}`
  }

  return {
    volume,
    area,
    duration,
    materialIncluded: products.some((p) => p.service === ORDER_SERVICE_MATERIAL),
  }
}

/**
 * Main transformation function: Order → Booking
 */
export function transformOrderToBooking(order: Order, t: TFunction): Booking | null {
  try {
    // Extract basic info
    const bookingType = mapOrderTypeToBookingType(order.type || '', (order as MoveServiceOrder).products)
    const status = mapOrderStatusToBookingStatus(order.status || ORDER_STATUS_QUOTATED)

    // Get date and time from first product's delivery date
    let dateTime = { date: '', time: '' }
    if ('products' in order && order.products && order.products.length > 0) {
      dateTime = extractDateTime(order.products[0].deliveryDate)
    }

    // Map addresses
    const fromAddress = mapAddress(order.address?.from)
    const toAddress = mapAddress(order.address?.to)

    // Handle single address services
    const singleAddress = !fromAddress && !toAddress ? mapAddress(order.address?.to || order.address?.from) : undefined

    // Map supplier - for broadband, check offerDetails.company first
    let supplier = mapSupplier(order)
    if (order.type === ORDER_TYPE_INTERNET && 'products' in order) {
      const internetOrder = order as Order
      const product = internetOrder.products?.[0]
      const meta = product?.meta as InternetProductMeta
      const offerDetails = meta?.offerDetails

      if (offerDetails?.company && supplier) {
        supplier = {
          ...supplier,
          name: offerDetails.company,
        }
      }
    }

    // Map price and products
    let price: BookingPrice
    let details: BookingDetails = {}
    let serviceDescription: string | undefined

    if (order.type === ORDER_TYPE_MOVE_SERVICE && 'products' in order) {
      const moveOrder = order as MoveServiceOrder
      price = mapProductsToPrice(moveOrder.products, t)
      details = extractMoveServiceDetails(moveOrder.products, t)

      // Add service description for RUT
      if (price.rutDeduction) {
        serviceDescription = t('bookings:detail.rutDescription', { percentage: price.rutPercentage })
      }
    } else if (order.type === ORDER_TYPE_INTERNET && 'products' in order) {
      // For broadband orders, extract enriched offer details
      const internetOrder = order
      const product = internetOrder.products?.[0]
      const meta = product?.meta as InternetProductMeta
      const offerDetails = meta?.offerDetails

      // Extract campaign pricing
      let campaignPrices: BookingCampaignPrice[] | undefined
      let currentPrice = product?.price || 0
      const monthlyAmounts = offerDetails?.price?.monthlyAmounts

      if (monthlyAmounts && monthlyAmounts.length > 0) {
        campaignPrices = monthlyAmounts.map((period) => ({
          start: period.start,
          end: period.end,
          amount: period.amount,
        }))
        // Current price is the first period's price
        currentPrice = monthlyAmounts[0].amount
      }

      // Extract additional products - only include selected ones
      let additionalProducts: BookingAdditionalProduct[] | undefined
      if (offerDetails?.additionalProducts && offerDetails.additionalProducts.length > 0) {
        const selectedAddons = offerDetails.additionalProducts.filter((addon) => addon.selected === true)

        if (selectedAddons.length > 0) {
          additionalProducts = selectedAddons.map((addon) => ({
            id: addon.id,
            name: addon.name || '',
            monthlyPrice: addon.price?.monthlyAmounts?.[0]?.amount,
            oneTimeAmount: addon.price?.oneTimeAmount,
            campaignPrices: addon.price?.monthlyAmounts?.map((period) => ({
              start: period.start,
              end: period.end,
              amount: period.amount,
            })),
          }))
        }
      }

      // Calculate total price including additional products (only monthly recurring)
      const additionalProductsTotal = additionalProducts?.reduce((sum, addon) => sum + (addon.monthlyPrice || 0), 0) || 0
      const totalPrice = currentPrice + additionalProductsTotal

      price = {
        items: [],
        subtotal: totalPrice,
        total: totalPrice,
        currency: 'kr',
      }

      // Build description from company + title
      let description = product?.description || undefined
      if (offerDetails?.company && offerDetails?.title) {
        description = `${offerDetails.title}`
      } else if (offerDetails?.name) {
        description = offerDetails.name
      }

      details = {
        description,
        campaignPrices,
        additionalProducts,
        contractMonths: offerDetails?.contractMonths,
      }
    } else {
      // For other order types, create simplified price structure
      price = {
        items: [],
        subtotal: order.totalPrice || 0,
        total: order.totalPrice || 0,
        currency: 'kr',
      }
    }

    // Combine notes
    const notes = [order.notes?.customer, order.notes?.flyttsmart].filter(Boolean).join(' ')

    // Build booking object
    const booking: Booking = {
      id: order.id || '',
      type: bookingType,
      status,
      date: dateTime.date?.length ? dateTime.date : order?.orderDate?.toString().split('T')[0] || '',
      time: dateTime.time,
      fromAddress,
      toAddress,
      address: singleAddress,
      supplier,
      price,
      details,
      notes: notes || undefined,
      bookingNumber: order.orderNumber ? String(order.orderNumber) : undefined,
      serviceDescription,
      orderType: order.type, // Store original order type
    }

    return booking
  } catch (error) {
    console.error('Error transforming order to booking:', error, order)
    return null
  }
}

/**
 * Transforms an array of orders to bookings, filtering out any that fail
 */
export function transformOrdersToBookings(orders: Order[], t: TFunction): Booking[] {
  if (!Array.isArray(orders)) {
    console.warn('transformOrdersToBookings: Expected array, got:', typeof orders)
    return []
  }

  return orders.map((order) => transformOrderToBooking(order, t)).filter((booking): booking is Booking => booking !== null)
}

/**
 * Filters orders by status (completed, confirmed, etc.)
 */
export function filterCompletedOrders(orders: Order[]): Order[] {
  if (!Array.isArray(orders)) {
    console.warn('filterCompletedOrders: Expected array, got:', typeof orders)
    return []
  }

  return orders.filter((order) => {
    const status = order.status?.toLowerCase() || ''
    return [ORDER_STATUS_COMPLETED.toLowerCase(), ORDER_STATUS_REPORTED.toLowerCase(), ORDER_STATUS_INVOICED.toLowerCase(), ORDER_STATUS_LOCKED.toLowerCase()].includes(status)
  })
}

/**
 * Filters orders by type
 */
export function filterOrdersByType(orders: Order[], orderType: string): Order[] {
  if (!Array.isArray(orders)) {
    console.warn('filterOrdersByType: Expected array, got:', typeof orders)
    return []
  }

  return orders.filter((order) => order.type === orderType)
}

/**
 * Sorts orders by delivery date (newest first)
 */
export function sortOrdersByDate(orders: Order[]): Order[] {
  if (!Array.isArray(orders)) {
    console.warn('sortOrdersByDate: Expected array, got:', typeof orders)
    return []
  }

  return [...orders].sort((a, b) => {
    const getDate = (order: Order) => {
      if ('products' in order && order.products && order.products.length > 0) {
        return order.products[0].deliveryDate
      }
      return order.orderDate
    }

    const dateA = getDate(a)
    const dateB = getDate(b)

    if (!dateA || !dateB) return 0
    return new Date(dateB).getTime() - new Date(dateA).getTime()
  })
}
