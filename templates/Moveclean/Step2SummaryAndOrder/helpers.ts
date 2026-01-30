import formatDate from '@/appComponents/format'
import { MoveServiceHourlyOrder, Order } from '@/common/api/book'
import { ExtendedMoveService, MoveServiceOrder } from '@/common/enums/MoveServicesEnum'

interface DoOrderProps {
  cleaningDate?: Date
  movehelpDate?: Date
  packagingSelected: boolean
  movehelpSelected: boolean
  movecleanSelected: boolean
  user: User
  doOrder: (data: MoveServiceHourlyOrder) => Promise<Order | undefined>
  standardMoveAbVariant?: string | number | undefined | null
  emailAndPhone?: { email: string; phone: string }
  isFb?: boolean
}

export const placeOrderHelper = async ({
  cleaningDate,
  movehelpDate,
  packagingSelected,
  movehelpSelected,
  movecleanSelected,
  doOrder,
  standardMoveAbVariant,
  emailAndPhone,
  user,
  isFb,
}: DoOrderProps) => {
  const {
    currentMove: {
      fromResidenceSize,
      residenceSize,
      residenceType,
      fromAddress: { additionalSpace },
    },
  } = user
  const moveclean = {
    deliveryDate: cleaningDate ? formatDate(cleaningDate, 'yyyy-MM-dd') : undefined,
    service: MoveServiceOrder.CLEANING,
  }
  const movehelp = {
    deliveryDate: movehelpDate ? formatDate(movehelpDate, 'yyyy-MM-dd') : undefined,
    service: MoveServiceOrder.MOVING,
  }
  const packaging = {
    service: MoveServiceOrder.PACKAGING,
    deliveryDate: movehelpDate ? formatDate(movehelpDate, 'yyyy-MM-dd') : cleaningDate ? formatDate(cleaningDate, 'yyyy-MM-dd') : undefined,
  }

  const getType = (): ExtendedMoveService | undefined => {
    if (movehelpSelected && movecleanSelected) {
      return ExtendedMoveService.MOVEHELP_COMBINED
    } else if (movehelpSelected) {
      return ExtendedMoveService.MOVEHELP
    } else if (movecleanSelected) {
      return ExtendedMoveService.MOVECLEAN
    }
    return undefined
  }

  const moveServiceOrder = {
    type: getType(),
    standardMoveAbVariant,
    seenHourlyPrices: true,
    isQuotation: false,
    fromResidence: {
      size: parseInt(fromResidenceSize ? fromResidenceSize.toString() : '0', 10),
      sizeOfAdditionalSpace: parseInt(additionalSpace ? additionalSpace.toString() : '0', 10),
    },
    toResidence: {
      size: parseInt(residenceSize ? residenceSize.toString() : '0', 10),
      residenceType: residenceType,
    },
    movehelp: movehelpSelected ? movehelp : undefined,
    moveclean: movecleanSelected ? moveclean : undefined,
    packaging: packagingSelected ? packaging : undefined,
    emailAndPhone: !!emailAndPhone?.email?.length || !!emailAndPhone?.phone?.length ? emailAndPhone : undefined,
    meta: {
      wantsHandyman: false,
      wantsStorage: false,
      wantsDisposal: false,
      wantsPackaging: false,
      heavyLifting: false,
    },
    isFb,
  }

  const order = await doOrder(moveServiceOrder)
  return order ?? undefined
}
