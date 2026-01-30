import { MoveServiceMeta, MoveServiceOrderProduct, OrderAddress, OrderContact, OrderNotes, Product, ResidenceInfo } from 'types/book'
import createFetchInstance from '../utils/api'

export type OrderDataType = {
  supplierId: string
  supplierName: string
  type: string
  customerComment?: string | null
  meta: MoveServiceMeta
  toResidence: ResidenceInfo
  fromResidence: ResidenceInfo
  movehelp?: Product
  moveclean: Product
  isQuotation: boolean
  isFb?: boolean
}

export interface ShowCleaningOrderDataType {
  supplierId: string
  type: string
  meta: {
    wantsWindowCleaning: boolean
  }
  fromResidence: {
    elevator: string
    floor: number
    sizeOfAdditionalSpace: number
    residenceType: string
    limitedAccess: boolean
  }
  showCleaningProduct: {
    deliveryDate: string
    service: string
  }
  emailPhoneData?: {
    email: string
    phone: string
  }
  isFb?: boolean
}

export type Order = {
  id: string
  userId?: string
  moveId?: string
  status: string
  orderDate?: Date
  salespersonName?: string
  salespersonAdminId?: string
  salesChannel?: string | null
  supplierName: string
  totalPrice: number
  priceLegacy?: number
  user: OrderContact | null
  address: { to: OrderAddress; from: OrderAddress }
  notes: OrderNotes
  type: string
  meta: MoveServiceMeta
  products: MoveServiceOrderProduct[]
  standardMoveAbVariant: string | number | undefined
  orderNumber: number
  isQuotation: boolean
}

type TailoredMoveProduct = {
  deliveryDate: string
  service: string
  price: number
}

export type TailoredMoveOrder = {
  meta: {
    wantsStorage: boolean
    wantsPackaging: boolean
  }
  products: TailoredMoveProduct[]
  isFb?: boolean
}

export type MoveServiceHourlyOrder = {
  type?: string
  isQuotation: boolean
  fromResidence: {
    elevator?: string
    floor?: number
    sizeOfAdditionalSpace?: number
    residenceType?: string
    limitedAccess?: boolean
    size?: number
  }
  movehelp?: {
    deliveryDate?: Date | string
    service?: string
  }
  moveclean?: {
    deliveryDate?: Date | string
    service?: string
  }
  packaging?: {
    deliveryDate?: Date | string
    service?: string
  }
  emailPhoneData?: {
    email: string
    phone: string
  }
  seenHourlyPrices?: boolean
  isFb?: boolean
}

export type QuotationOrder = {
  fromAddress: {
    street: string
    zip: string
    city: string
  }
  toAddress: {
    street: string
    zip: string
    city: string
  }
  movehelp: {
    deliveryDate: string
    service: string
  }
  moveclean?:
    | {
        deliveryDate: string
        service: string
      }
    | undefined
  emailAndPhone: {
    email: string
    phone: string
  }
  fromResidence: {
    residenceSize: number
    isAdditionalSpace: boolean
    additionalSpaceComment?: string
    residenceType: string
    elevator?: string
    amountOfStairs?: number
    limitedAccessOptions: string
    limitedAccessComment?: string
  }
  toResidence: {
    residenceSize: number
    additionalSpaceComment?: string
    residenceType: string
    elevator?: string
    amountOfStairs?: number
    limitedAccessOptions: string
    limitedAccessComment?: string
  }
  isHeavyLifting: boolean
  heavyLiftingComment?: string
  customerComment?: string
  otherServiceRequests?: {
    wantsStorage: boolean
    wantsDisposal: boolean
    wantsPackaging: boolean
    wantsDisassemblyOrAssemblyOfFurniture: boolean
    wantsMovingBoxes: boolean
  }
}

const fetchPostInstance = createFetchInstance('POST')

export const addBooking = async (orderData: OrderDataType): Promise<Order> => {
  return fetchPostInstance<Order>(`/web/order/create/move-service`, { body: JSON.stringify(orderData) })
}

export const addShowCleaningBooking = async (orderData: ShowCleaningOrderDataType): Promise<Order> => {
  return fetchPostInstance<Order>(`/web/order/create/show-cleaning`, { body: JSON.stringify(orderData) })
}

export const tailoredMoveOrder = async (orderData: TailoredMoveOrder, orderId: string): Promise<Order> => {
  return fetchPostInstance<Order>(`/web/order/quotation/move-service/${orderId}/lock`, { body: JSON.stringify(orderData) })
}

export const moveServiceHourlyOrder = async (orderData: MoveServiceHourlyOrder): Promise<Order> => {
  return fetchPostInstance<Order>('/web/order/create/move-service-hourly', { body: JSON.stringify(orderData) })
}

export const quotationOrder = async (orderData: QuotationOrder, userId: string): Promise<{ success: string }> => {
  return fetchPostInstance<{ success: string }>(`/web/quotation/send?userId=${userId}`, { body: JSON.stringify(orderData) })
}

export const quotationOrderLead = async (orderData: QuotationOrder, invCode: string): Promise<{ success: string }> => {
  return fetchPostInstance<{ success: string }>(`/web/quotation/send?inviteCode=${invCode}`, { body: JSON.stringify(orderData) })
}

export default addBooking
