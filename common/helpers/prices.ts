import { SupplierDetail, TailoredMoveSupplierDetail, ShowCleaningSupplierDetail } from 'types/price'
import formatDate from '@/appComponents/format'
import { MoveServiceOrder } from '../enums/MoveServicesEnum'
import { checkDateForHoliday } from './date'

interface GetMovehelpOrMovecleanPriceProps {
  isFixedPrice: boolean
  supplier?: SupplierDetail | TailoredMoveSupplierDetail | ShowCleaningSupplierDetail | undefined
  date?: Date
  forceHolidayPrice?: boolean
  holidays?: string[]
}

export const isTailoredMoveSupplier = (toBeDetermined: SupplierDetail | TailoredMoveSupplierDetail): toBeDetermined is TailoredMoveSupplierDetail => {
  if ((toBeDetermined as TailoredMoveSupplierDetail)?.price) {
    return true
  }
  return false
}

export const isShowCleaningSupplier = (toBeDetermined: SupplierDetail | TailoredMoveSupplierDetail | ShowCleaningSupplierDetail): toBeDetermined is ShowCleaningSupplierDetail => {
  if ((toBeDetermined as ShowCleaningSupplierDetail)?.price && (toBeDetermined as ShowCleaningSupplierDetail)?.serviceTypes?.includes(MoveServiceOrder.SHOW_CLEANING)) {
    return true
  }
  return false
}

export const isMovehelpOrMovecleanSupplier = (toBeDetermined: SupplierDetail | TailoredMoveSupplierDetail | ShowCleaningSupplierDetail): toBeDetermined is SupplierDetail => {
  if ((toBeDetermined as SupplierDetail)?.prices) {
    return true
  }
  return false
}

export const getHolidayPrice = (isFixedPrice: boolean, supplier?: SupplierDetail | TailoredMoveSupplierDetail | ShowCleaningSupplierDetail): number => {
  if (supplier) {
    if (isShowCleaningSupplier(supplier)) {
      return supplier?.holidayPrice
    }
    const price = getMovehelpOrMovecleanPrice({ supplier, isFixedPrice })
    const percentage = supplier.addons?.holiday
    if (isTailoredMoveSupplier(supplier) && !!supplier?.price?.fixed?.[0]?.quotationHolidayPrice) {
      return supplier?.price?.fixed?.[0]?.quotationHolidayPrice
    }
    if (!isTailoredMoveSupplier(supplier)) {
      if (isFixedPrice) {
        return Math.round(percentage ? price * (1 + percentage / 100) : price)
      } else {
        return supplier.prices?.hourly?.holiday || 0
      }
    }
    return 0
  } else {
    return 0
  }
}

export const getMovehelpOrMovecleanPrice = ({ isFixedPrice, supplier, date, forceHolidayPrice, holidays }: GetMovehelpOrMovecleanPriceProps): number => {
  if (supplier) {
    let isHoliday = false
    if (date) {
      isHoliday =
        Number(formatDate(date, 'e')) === 6 ||
        Number(formatDate(date, 'e')) === 7 ||
        checkDateForHoliday(formatDate(date, 'yyyy-MM-dd'), holidays || []) ||
        forceHolidayPrice ||
        false
      if (isHoliday) {
        return getHolidayPrice(isFixedPrice, supplier)
      }
    }

    if (isShowCleaningSupplier(supplier)) {
      return supplier?.price
    }

    const fixedPrices = (!isTailoredMoveSupplier(supplier) && supplier?.prices?.fixed) || (isTailoredMoveSupplier(supplier) && supplier?.price?.fixed)
    const hourlyPrices = !isTailoredMoveSupplier(supplier) && supplier?.prices?.hourly
    if (fixedPrices) {
      const fixedPriceItem = fixedPrices[0]
      if (isFixedPrice) {
        return fixedPriceItem.price
      } else if (!isTailoredMoveSupplier(supplier) && hourlyPrices) {
        return hourlyPrices?.base || 0
      }
    }
  }
  return 0
}
