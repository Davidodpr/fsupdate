'use client'

import { useContext, createContext, useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useSearchParams } from 'next/navigation'
import formatDate from '@/appComponents/format'
import { quotationOrder, quotationOrderLead } from '@/common/api/book'
import { incrementMoveservicePageVisitIntercomEvent } from '@/common/api/getUser'
import { useUserContext } from '@/common/context/user/UserProvider'
import { ActivityEnum } from '@/common/types/activity'
import { ORDER_SERVICE_MOVING, ORDER_SERVICE_CLEANING } from '@/constants/order'
import { ORDER_TYPE_MOVEHELP } from '@/constants/order'
import { useChecklistContext } from '../checklist/checklistContext.provider'
import { useLeadContext } from '../lead/LeadProvider'
import { APARTMENT } from '@/constants/residenceTypes'

export const YES = 'yes'
export const NO = 'no'
export const UNKNOWN = 'unknown'
export const LARGEELEVATOR = 'Stor hiss'
export const SMALLELEVATOR = 'Liten hiss'
export const NOELEVATOR = 'Ingen hiss'
const USER_TYPE_SELLER = 'seller'
const USER_TYPE_BUYER = 'buyer'
const ELEVATOR_TYPE_LARGE = 'large'
const ELEVATOR_TYPE_SMALL = 'small'
const ELEVATOR_TYPE_NONE = 'none'

type MovehelpProviderContextType = {
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  sendMovehelpPageVisitIntercomEvent: () => void
  orderMovehelp: (isMovehelpAndMoveclean: boolean) => void
  checkedActivites: Record<string, boolean>
  setCheckedActivites: (checkedActivites: Record<string, boolean>) => void
  fromData: MoveValues
  setFromData: (fromData: MoveValues) => void
  toData: MoveValues
  setToData: (toData: MoveValues) => void
  movecleanDate?: Date
  setMovecleanDate: (date: Date) => void
  movehelpDate?: Date
  setMovehelpDate: (date: Date) => void
  parkingAnswerFromAddress: string
  setParkingAnswerFromAddress: (answer: string) => void
  parkingAnswerToAddress: string
  setParkingAnswerToAddress: (answer: string) => void
  heavyItemAnswer: string
  setHeavyItemAnswer: (answer: string) => void
  heavyItemTextAreaValue: string
  setHeavyItemTextAreaValue: (value: string) => void
  fromElevatorValue: string
  setFromElevatorValue: (value: string) => void
  selectedToResidenceType: string
  setSelectedToResidenceType: (value: string) => void
  selectedFromResidenceType: string
  setSelectedFromResidenceType: (value: string) => void
  additionalSpace: string
  setAdditionalSpace: (value: string) => void
  additionalSpaceText?: string
  setAdditionalSpaceText?: (value: string) => void
  fromResidenceTypeStairsValue: string
  setFromResidenceTypeStairsValue: (value: string) => void
  parkingTextAnswerFromAddress?: string
  setParkingTextAnswerFromAddress?: (value: string) => void
  parkingTextAnswerToAddress?: string
  setParkingTextAnswerToAddress?: (value: string) => void
  otherComment?: string
  setOtherComment?: (value: string) => void
  hasSetInitialValues: boolean
  toElevatorValue: string
  setToElevatorValue: (value: string) => void
  toResidenceTypeStairsValue: string
  setToResidenceTypeStairsValue: (value: string) => void
  emailAndPhone: { email: string; phone: string }
  setEmailAndPhone: (emailAndPhone: { email: string; phone: string }) => void
  hasOrdered: boolean
  orderError: boolean
  setOrderError: (value: boolean) => void
}

const defaultValue: MovehelpProviderContextType = {
  isLoading: true,
  setIsLoading: () => null,
  sendMovehelpPageVisitIntercomEvent: () => null,
  orderMovehelp: async () => undefined,
  checkedActivites: {
    packing: false,
    movingBoxes: false,
    recycling: false,
    storage: false,
    assembly: false,
    moveclean: false,
  },
  setCheckedActivites: () => null,
  fromData: {
    sqm: null,
    additionalSpace: null,
    toAddress: { street: '', zip: '', city: '' },
    fromAddress: { street: '', zip: '', city: '' },
  },
  setFromData: () => null,
  toData: {
    sqm: null,
    additionalSpace: null,
    toAddress: { street: '', zip: '', city: '' },
    fromAddress: { street: '', zip: '', city: '' },
  },
  setToData: () => null,
  movecleanDate: undefined,
  setMovecleanDate: () => null,
  movehelpDate: undefined,
  setMovehelpDate: () => null,
  parkingAnswerFromAddress: YES,
  setParkingAnswerFromAddress: () => null,
  parkingAnswerToAddress: YES,
  setParkingAnswerToAddress: () => null,
  heavyItemAnswer: NO,
  setHeavyItemAnswer: () => null,
  heavyItemTextAreaValue: '',
  setHeavyItemTextAreaValue: () => null,
  fromElevatorValue: NOELEVATOR,
  setFromElevatorValue: () => null,
  selectedToResidenceType: '',
  setSelectedToResidenceType: () => null,
  selectedFromResidenceType: '',
  setSelectedFromResidenceType: () => null,
  additionalSpace: '',
  setAdditionalSpace: () => null,
  additionalSpaceText: '',
  setAdditionalSpaceText: () => null,
  fromResidenceTypeStairsValue: '',
  setFromResidenceTypeStairsValue: () => null,
  parkingTextAnswerFromAddress: '',
  setParkingTextAnswerFromAddress: () => null,
  parkingTextAnswerToAddress: '',
  setParkingTextAnswerToAddress: () => null,
  otherComment: '',
  setOtherComment: () => null,
  hasSetInitialValues: false,
  toElevatorValue: NOELEVATOR,
  setToElevatorValue: () => null,
  toResidenceTypeStairsValue: '',
  setToResidenceTypeStairsValue: () => null,
  emailAndPhone: { email: '', phone: '' },
  setEmailAndPhone: () => null,
  hasOrdered: false,
  orderError: false,
  setOrderError: () => null,
}

export type MoveValues = {
  sqm?: number | null
  additionalSpace?: string | null
  toAddress?: {
    street: string
    zip: string
    city: string
  }
  fromAddress?: {
    street: string
    zip: string
    city: string
  }
}

const MovehelpContext = createContext<MovehelpProviderContextType>(defaultValue)
type MoveServicesDynamicPricePerHourProps = {
  children: React.ReactNode
}

export const MovehelpProvider = ({ children }: MoveServicesDynamicPricePerHourProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasSetInitialValues, setHasSetInitialValues] = useState(false)
  const { skipChecklistItem, activitiesList } = useChecklistContext()
  const inviteCodeQuery = useSearchParams().get('inviteCode')

  const {
    user: { currentMove, hasFetchedData, profile },
    user: { currentMove: { fromResidenceSize, fromAddress, residenceType, toAddress, residenceSize } = {} },
  } = useUserContext()

  const userToken = Cookies.get('userToken')
  const {
    lead: { hasFetchedData: hasFetchedLeadData, leadDetails },
  } = useLeadContext()

  const [fromData, setFromData] = useState<MoveValues>({
    sqm: null,
    additionalSpace: null,
    toAddress: { street: '', zip: '', city: '' },
    fromAddress: { street: '', zip: '', city: '' },
  })
  const [toData, setToData] = useState<MoveValues>({
    sqm: null,
    additionalSpace: null,
    toAddress: { street: '', zip: '', city: '' },
    fromAddress: { street: '', zip: '', city: '' },
  })
  const [checkedActivites, setCheckedActivites] = useState<Record<string, boolean>>({
    packing: false,
    movingBoxes: false,
    recycling: false,
    storage: false,
    assembly: false,
    moveclean: false,
  })

  const currentDate = currentMove?.movingDate ? new Date(currentMove.movingDate) : new Date()
  const [movecleanDate, setMovecleanDate] = useState<Date | undefined>(currentMove?.movingDate ? new Date(currentDate.setDate(currentDate.getDate() + 1)) : new Date())
  const [movehelpDate, setMovehelpDate] = useState<Date | undefined>(currentMove?.movingDate ? new Date(currentMove.movingDate) : new Date())
  const [parkingAnswerFromAddress, setParkingAnswerFromAddress] = useState<string>(YES)
  const [parkingTextAnswerFromAddress, setParkingTextAnswerFromAddress] = useState<string>('')
  const [parkingTextAnswerToAddress, setParkingTextAnswerToAddress] = useState<string>('')
  const [parkingAnswerToAddress, setParkingAnswerToAddress] = useState<string>(YES)
  const [heavyItemAnswer, setHeavyItemAnswer] = useState<string>(NO)
  const [heavyItemTextAreaValue, setHeavyItemTextAreaValue] = useState<string>('')
  const [fromElevatorValue, setFromElevatorValue] = useState<string>(LARGEELEVATOR)
  const [toElevatorValue, setToElevatorValue] = useState<string>(LARGEELEVATOR)
  const [selectedToResidenceType, setSelectedToResidenceType] = useState<string>(residenceType ?? '')
  const [selectedFromResidenceType, setSelectedFromResidenceType] = useState<string>('')
  const [additionalSpace, setAdditionalSpace] = useState<string>(NO)
  const [additionalSpaceText, setAdditionalSpaceText] = useState<string>('')
  const [fromResidenceTypeStairsValue, setFromResidenceTypeStairsValue] = useState<string>('')
  const [toResidenceTypeStairsValue, setToResidenceTypeStairsValue] = useState<string>('')
  const [otherComment, setOtherComment] = useState<string>('')
  const [emailAndPhone, setEmailAndPhone] = useState<{ email: string; phone: string }>({ email: '', phone: '' })
  const [hasOrdered, setHasOrdered] = useState(false)
  const [orderError, setOrderError] = useState<boolean>(false)

  useEffect(() => {
    if (hasFetchedData && userToken) {
      setFromData({
        sqm: fromResidenceSize,
        additionalSpace: fromAddress?.additionalSpace ? fromAddress?.additionalSpace?.toString() : '0',
        toAddress: { street: '', zip: '', city: '' },
        fromAddress: { street: fromAddress?.street || '', zip: fromAddress?.zip || '', city: fromAddress?.city || '' },
      })
      setToData({
        sqm: residenceSize,
        additionalSpace: '',
        toAddress: { street: toAddress?.street ?? '', zip: toAddress?.zip ?? '', city: toAddress?.city ?? '' },
        fromAddress: { street: '', zip: '', city: '' },
      })
      setHasSetInitialValues(true)
    }
  }, [hasFetchedData, userToken])

  useEffect(() => {
    if (!userToken && hasFetchedLeadData && leadDetails && leadDetails?.type === USER_TYPE_BUYER) {
      setToData({
        sqm: null,
        additionalSpace: null,
        fromAddress: { street: '', zip: '', city: '' },
        toAddress: { street: leadDetails.address?.street || '', zip: leadDetails.address?.zip || '', city: leadDetails.address?.city || '' },
      })
      setMovehelpDate(!!leadDetails?.movingDate ? new Date(leadDetails?.movingDate) : new Date())
      setHasSetInitialValues(true)
    }

    if (!userToken && hasFetchedLeadData && leadDetails && leadDetails?.type === USER_TYPE_SELLER) {
      setToData({
        sqm: null,
        additionalSpace: null,
        toAddress: { street: '', zip: '', city: '' },
        fromAddress: { street: leadDetails?.address?.street || '', zip: leadDetails?.address?.zip || '', city: leadDetails?.address?.city || '' },
      })
      setMovehelpDate(leadDetails?.movingDate ? new Date(leadDetails.movingDate) : new Date())
      setHasSetInitialValues(true)
    }
  }, [hasFetchedLeadData, leadDetails, userToken])

  const sendMovehelpPageVisitIntercomEvent = async () => {
    if (userToken) await incrementMoveservicePageVisitIntercomEvent({ service: ActivityEnum.MOVEHELP })
  }

  const getElevatorValue = (elevator: string) => {
    if (elevator === LARGEELEVATOR) return ELEVATOR_TYPE_LARGE
    if (elevator === SMALLELEVATOR) return ELEVATOR_TYPE_SMALL
    return ELEVATOR_TYPE_NONE
  }

  const orderMovehelp = async (isMovehelpAndMoveclean: boolean) => {
    const movehelpQuotationOrderData = {
      fromAddress: { street: fromData.fromAddress?.street ?? '', zip: fromData?.fromAddress?.zip ?? '', city: fromData?.fromAddress?.city ?? '' },
      toAddress: { street: toData?.toAddress?.street ?? '', zip: toData?.toAddress?.zip ?? '', city: toData?.toAddress?.city ?? '' },
      movehelp: { deliveryDate: (movehelpDate && formatDate(movehelpDate, 'yyyy-MM-dd')) ?? formatDate(new Date(), 'yyyy-MM-dd'), service: ORDER_SERVICE_MOVING },
      ...((isMovehelpAndMoveclean || !!checkedActivites.moveclean) && {
        moveclean: { deliveryDate: (movecleanDate && formatDate(movecleanDate, 'yyyy-MM-dd')) ?? formatDate(new Date(), 'yyyy-MM-dd'), service: ORDER_SERVICE_CLEANING },
      }),
      emailAndPhone: { ...emailAndPhone },
      fromResidence: {
        residenceSize: fromData.sqm ?? 0,
        isAdditionalSpace: additionalSpace === YES,
        ...(additionalSpace === YES && { additionalSpaceComment: !!additionalSpaceText?.length ? additionalSpaceText : '' }),
        residenceType: selectedFromResidenceType,
        ...(selectedFromResidenceType === APARTMENT && { elevator: getElevatorValue(fromElevatorValue) }),
        ...(fromResidenceTypeStairsValue?.length && {
          amountOfStairs: fromResidenceTypeStairsValue ? Number(fromResidenceTypeStairsValue.replace(' ', '').replace(',', '.')) : 0,
        }),
        limitedAccessOptions: parkingAnswerFromAddress,
        ...((parkingAnswerFromAddress == NO || parkingAnswerFromAddress == UNKNOWN) && { limitedAccessComment: parkingTextAnswerFromAddress }),
      },
      toResidence: {
        residenceSize: toData.sqm ?? 0,
        residenceType: selectedToResidenceType,
        ...(selectedToResidenceType === APARTMENT && { elevator: getElevatorValue(toElevatorValue) }),
        ...(!!toResidenceTypeStairsValue?.length && {
          amountOfStairs: toResidenceTypeStairsValue ? Number(toResidenceTypeStairsValue.replace(' ', '').replace(',', '.')) : 0,
        }),
        limitedAccessOptions: parkingAnswerToAddress,
        ...((parkingAnswerToAddress === NO || parkingAnswerToAddress === UNKNOWN) && { limitedAccessComment: parkingTextAnswerToAddress }),
      },
      isHeavyLifting: heavyItemAnswer === YES,
      ...(heavyItemAnswer === YES && { heavyLiftingComment: heavyItemTextAreaValue?.length ? heavyItemTextAreaValue : '' }),
      ...(!!otherComment?.length && { customerComment: otherComment }),
      ...(Object.keys(checkedActivites).some((key, value) => !!value && key !== ActivityEnum.MOVECLEAN) && {
        otherServiceRequests: {
          wantsStorage: checkedActivites.storage,
          wantsDisposal: checkedActivites.recycling,
          wantsPackaging: checkedActivites.packing,
          wantsDisassemblyOrAssemblyOfFurniture: checkedActivites.assembly,
          wantsMovingBoxes: checkedActivites.movingBoxes,
        },
      }),
    }
    try {
      if (userToken) {
        const response = await quotationOrder(movehelpQuotationOrderData, profile?.id)
        if (!!response?.success?.length) {
          const movehelpItem = activitiesList.find((item) => item.type === ORDER_TYPE_MOVEHELP)
          skipChecklistItem(ORDER_TYPE_MOVEHELP, movehelpItem?.id || '', movehelpItem?.status !== ActivityEnum.STATUS_NOT_STARTED)
          setHasOrdered(true)
        } else setOrderError(true)
      } else {
        const leadResponse = await quotationOrderLead(movehelpQuotationOrderData, inviteCodeQuery as string)
        if (!leadResponse.success) {
          setOrderError(true)
        } else {
          setHasOrdered(true)
        }
      }
    } catch (error: unknown) {
      console.error('Error ordering movehelp', error)
      setOrderError(true)
    }
  }

  const contextValue: MovehelpProviderContextType = {
    isLoading,
    setIsLoading,
    sendMovehelpPageVisitIntercomEvent,
    orderMovehelp,
    checkedActivites,
    setCheckedActivites,
    fromData,
    setFromData,
    toData,
    setToData,
    movecleanDate,
    setMovecleanDate,
    movehelpDate,
    setMovehelpDate,
    parkingAnswerFromAddress,
    parkingAnswerToAddress,
    setParkingAnswerFromAddress,
    setParkingAnswerToAddress,
    heavyItemAnswer,
    setHeavyItemAnswer,
    heavyItemTextAreaValue,
    setHeavyItemTextAreaValue,
    fromElevatorValue,
    setFromElevatorValue,
    selectedToResidenceType,
    setSelectedToResidenceType,
    selectedFromResidenceType,
    setSelectedFromResidenceType,
    additionalSpace,
    setAdditionalSpace,
    setAdditionalSpaceText,
    additionalSpaceText,
    fromResidenceTypeStairsValue,
    setFromResidenceTypeStairsValue,
    parkingTextAnswerFromAddress,
    setParkingTextAnswerFromAddress,
    parkingTextAnswerToAddress,
    setParkingTextAnswerToAddress,
    otherComment,
    setOtherComment,
    hasSetInitialValues,
    toElevatorValue,
    setToElevatorValue,
    toResidenceTypeStairsValue,
    setToResidenceTypeStairsValue,
    emailAndPhone,
    setEmailAndPhone,
    hasOrdered,
    orderError,
    setOrderError,
  }
  return <MovehelpContext.Provider value={contextValue}>{children}</MovehelpContext.Provider>
}

export const useMovehelpContext = () => useContext(MovehelpContext)
