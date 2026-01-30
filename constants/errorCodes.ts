export const ERRORCODES = {
  USERUNDER18: 'user_under_18',
  NOTFOUND: 'user_not_found',
  FAILED: 'failed',
  NOTEXIST: 'not_exist',
  ORDERCANCELED: 'order_canceled',
  GENERALERROR: 'general_error',
  ORDERALREADYEXISTS: 'ORDER_ALREADY_EXISTS',
  ORDER_ERROR: 'order_error',
  USER_BLOCKED: 'user_blocked',
  MISSING_PNO: 'missing_pno',
  INVALID_PNO: 'invalid_pno',
  PNO_REQUIRED: 'pno_required',
  PNO_MISSING: 'pno_missing',
  PNO_INVALID: 'pno_invalid',
}

export const RESIDENCE_TOO_BIG = 'residence_too_big'
export const LONG_DISTANCE_MOVE = 'long_distance_move'
export const PRICE_NOT_FOUND = 'price_not_found'
export const NO_SUPPLIERS_FOUND = 'no_suppliers_found'
export const ADDRESS_NOT_FOUND = 'address_not_found'
export const INVALID_IP_ADDRESS = 'invalid_ip_address'
export const ORDER_ERROR = 'order_error'

export const MOVE_SERVICE_SUPPLIERS_ERROR_CODE = [RESIDENCE_TOO_BIG, LONG_DISTANCE_MOVE, PRICE_NOT_FOUND, NO_SUPPLIERS_FOUND, ADDRESS_NOT_FOUND, INVALID_IP_ADDRESS] as const

export type MoveServiceSuppliersErrorCode = (typeof MOVE_SERVICE_SUPPLIERS_ERROR_CODE)[number]
