export const TODO_TYPE_MAIL = 'mail'
export const TODO_TYPE_LOAN = 'loan'
export const TODO_TYPE_TV = 'tv'
export const TODO_TYPE_SCHOOL = 'school'
export const TODO_TYPE_PARKING = 'parking'
export const TODO_TYPE_WASTE = 'waste'
export const TODO_TYPE_GAS = 'gas'
export const TODO_TYPE_HEAT = 'heat'
export const TODO_TYPE_WATER = 'water'
export const TODO_TYPE_ALARM = 'alarm'

export const TODO_TYPE_HANDYMAN = 'handyman'
export const TODO_TYPE_HOME_ALARM_SERVICE = 'alarmservice'
export const TODO_TYPE_ALARM_SERVICE = 'alarm'
export const TODO_TYPE_HOME_CLEANING = 'homecleaningoffer'
export const TODO_TYPE_FAMILY_LAW = 'familylaw'
export const TODO_TYPE_HOMEFIX = 'homefix'
export const TODO_TYPE_TRANSPORTATION = 'transportation'
export const TODO_TYPE_PAINTING = 'painting'
export const HOMEFIX_TALK_TO_PRO = 'homefix-pro'

export const basicTodoTypes = [
  TODO_TYPE_MAIL,
  TODO_TYPE_LOAN,
  TODO_TYPE_TV,
  TODO_TYPE_SCHOOL,
  TODO_TYPE_PARKING,
  TODO_TYPE_WASTE,
  TODO_TYPE_GAS,
  TODO_TYPE_HEAT,
  TODO_TYPE_WATER,
  TODO_TYPE_ALARM,
  TODO_TYPE_HOME_ALARM_SERVICE,
] as const

export const advancedTodoTypes = [
  TODO_TYPE_HANDYMAN,
  TODO_TYPE_HOME_ALARM_SERVICE,
  TODO_TYPE_HOME_CLEANING,
  TODO_TYPE_FAMILY_LAW,
  TODO_TYPE_HOMEFIX,
  TODO_TYPE_TRANSPORTATION,
  TODO_TYPE_PAINTING,
] as const

export const todoTypes = [...basicTodoTypes, ...advancedTodoTypes] as const
export const todoTypesNoncancelable = [TODO_TYPE_FAMILY_LAW, TODO_TYPE_HOME_CLEANING, TODO_TYPE_HOME_ALARM_SERVICE, TODO_TYPE_HOMEFIX, TODO_TYPE_TRANSPORTATION] as const

export type BasicTodoType = (typeof basicTodoTypes)[number]
export type AdvancedTodoType = (typeof advancedTodoTypes)[number]
export type TodoType = BasicTodoType | AdvancedTodoType
export type TodoActivityType = {
  type: TodoType
  skippedAt: string
  lockedAt: string
  id?: string
}

export type AlarmServiceProduct = {
  name: string
  quantity: number
  period?: 'monthly'
  price: number
}

type AlarmServiceContract = {
  package?: AlarmServiceProduct
  products?: AlarmServiceProduct[]
  customerName: string
  address: string
  additionalContact?: {
    name?: string
    email?: string
    phoneNumber: string
  }
}

type HomeCleaningOfferContract = {
  address?: string
  priceCode?: string
  instructions: string
  weekCode: number
  residenceSize: number
  bonusHours: number
  cleaningHours: number
}
type HandymanContract = {
  date: string | Date
  email: string
  phone: string
  contractData: {
    description: string
  }
}

type HomefixContract = {
  date: string | Date
  email: string
  phone: string
  price: number
  contractData: {
    name: string
    products: string[]
  }
}
type FamilylawContract = {
  date: string | Date
  email: string
  phone: string
  contractData: {
    activity: string
  }
}
type TransportationContract = {
  date: string | Date
  email: string
  phone: string
  Address: string
  residenceSize?: number
  distance?: number
  contractData: Record<string, string | number | undefined | null>
}

type PaintingContract = {
  date: string | null
  email: string
  phone: string
  contractData: {
    activities: string[]
    ceilingHeight: number
    description: string
    totalSurfaceAreaEstimate: number
  }
}

type TodoItem<T> = {
  email?: string
  phone?: string
  date?: string
  price?: number
  contractData: T
}

export type TodoCard = {
  name: string
  MODAL_DESCRIPTION: string[]
  linkText: string
  linkUrl: string
  title: string
  subtitle: string
}

export type AlarmServiceTodo = TodoItem<AlarmServiceContract>
export type HomeCleaningTodo = TodoItem<HomeCleaningOfferContract>
export type HandymanTodo = HandymanContract
export type FamilylawTodo = FamilylawContract
export type HomefixTodo = HomefixContract
export type TransportationTodo = TransportationContract
export type PaintingTodo = PaintingContract
