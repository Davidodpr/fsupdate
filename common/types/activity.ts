import _ from 'lodash'
import {
  ORDER_SERVICE_ADDRESSCHANGE,
  ORDER_SERVICE_CLEANING,
  ORDER_SERVICE_INSURANCE,
  ORDER_SERVICE_INTERNET,
  ORDER_SERVICE_MOVING,
  ORDER_SERVICE_POWER,
  OrderServiceType,
} from '@/constants/order'

export enum ActivityEnum {
  ADDRESSCHANGE = 'addresschange',
  DIY = 'diy',
  MOVEHELP = 'movehelp',
  MOVECLEAN = 'moveclean',
  MOVEHELP_COMBINED = 'movehelpCombined',
  INTERNET = 'internet',
  POWER = 'power',
  INSURANCE = 'insurance',
  HOMEALARM = 'hemlarm',
  HOMECLEANING = 'hemstadning',
  HOMEFIX = 'homefix',
  TRANSPORTATION = 'transportation',
  PLACEHOLDER = '-',
  STATUS_COMPLETED = 'completed',
  STATUS_LOCKED = 'locked',
  STATUS_SKIPPED = 'skipped',
  STATUS_STARTED = 'started',
  STATUS_REPORTED = 'reported',
  STATUS_INVOICED = 'invoiced',
  STATUS_NOT_STARTED = 'not_started',
  STATUS_UNDER_PROCESS = 'under_process',
  SHOWCLEANING = 'showCleaning',
}

export const ACTIVITY_ORDER_SERVICE_TYPE_MAP: Partial<Record<ActivityEnum, OrderServiceType>> = {
  [ActivityEnum.MOVEHELP]: ORDER_SERVICE_MOVING,
  [ActivityEnum.MOVECLEAN]: ORDER_SERVICE_CLEANING,
  [ActivityEnum.POWER]: ORDER_SERVICE_POWER,
  [ActivityEnum.INTERNET]: ORDER_SERVICE_INTERNET,
  [ActivityEnum.INSURANCE]: ORDER_SERVICE_INSURANCE,
  [ActivityEnum.ADDRESSCHANGE]: ORDER_SERVICE_ADDRESSCHANGE,
}

export const ORDER_SERVICE_ACTIVITY_TYPE_MAP: Partial<Record<OrderServiceType, ActivityEnum>> = _.invert(ACTIVITY_ORDER_SERVICE_TYPE_MAP)
