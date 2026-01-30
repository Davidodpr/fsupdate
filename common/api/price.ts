import { SupplierDetail, ShowCleaningSupplierDetail } from 'types/price'
import { TailoredMoveSupplierDetail, MovehelpAndMovecleanAndPackagingSupplier } from 'types/price'
import { MoveServiceSuppliersErrorCode } from '@/constants/errorCodes'
import createFetchInstance from '../utils/api'

const fetchGet = createFetchInstance('GET')

export const getProviders = async (type: string): Promise<MoveServiceSuppliers> => {
  return fetchGet<MoveServiceSuppliers>(`/web/supplier/${type}`)
}

export const getShowcleaningProviders = async (): Promise<ShowCleaningSuppliers> => {
  return fetchGet<ShowCleaningSuppliers>(`/web/supplier/showCleaning`)
}

export const getMovehelpAndMovecleanAndPackagingProviders = async (): Promise<MovehelpAndMovecleanAndPackagingSupplier> => {
  return fetchGet<MovehelpAndMovecleanAndPackagingSupplier>(`web/supplier/hourly`)
}

export const getTailoredMoveProvider = async (): Promise<TailoredMoveServiceSupplier> => {
  return fetchGet<TailoredMoveServiceSupplier>('/web/order/move-service/quotation')
}

export type MoveServiceSuppliers = {
  messageKey?: MoveServiceSuppliersErrorCode
  suppliers: SupplierDetail[]
  city?: string
}

export type ShowCleaningSuppliers = {
  messageKey?: MoveServiceSuppliersErrorCode
  suppliers: ShowCleaningSupplierDetail[]
  city?: string
}

export type TailoredMoveServiceSupplier = {
  messageKey?: MoveServiceSuppliersErrorCode
  suppliers: TailoredMoveSupplierDetail[]
}

export default getProviders
