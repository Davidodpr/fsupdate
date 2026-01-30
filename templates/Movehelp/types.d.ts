import { MoveServiceOrder } from '@/common/enums/MoveServicesEnum'

export type Step1ServicesAndPricesValues = {
  movehelp: boolean
  moveclean: boolean
  packaging: boolean
}
export type UpdatedMoveValues = {
  sqm?: number | null
  additionalSpace?: string | null
  toAddress?: {
    street: string
    zip: string
    city: string
    apartmentNumber?: string | null
    apartmentType?: string | null
    residenceSize?: number | null
    residenceType?: string | null
  }
  fromAddress?: {
    street: string
    zip: string
    city: string
  }
}
export type ServiceType = MoveServiceOrder.MOVEHELP | MoveServiceOrder.MOVECLEAN | MoveServiceOrder.PACKAGING
