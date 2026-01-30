import {
  AlarmServiceTodo,
  HomeCleaningTodo,
  TodoType,
  TodoActivityType,
  HandymanTodo,
  FamilylawTodo,
  HomefixTodo,
  TransportationTodo,
  TODO_TYPE_TRANSPORTATION,
  PaintingTodo,
} from 'types/todo'
import createFetchInstance from '../utils/api'

const get = createFetchInstance('GET')
const post = createFetchInstance('POST')
const put = createFetchInstance('PUT')
const deleteInstance = createFetchInstance('DELETE')

export const getActiveTodos = async (moveId: string): Promise<TodoActivityType[]> => {
  return get<TodoActivityType[]>(`/moves/${moveId}/todo/active`)
}

export type CreateOrder = AlarmServiceTodo | HomeCleaningTodo | HandymanTodo | FamilylawTodo | HomefixTodo | TransportationTodo | PaintingTodo

export type TodoItemType = {
  canceled: boolean
  canceledAt: Date | null
  completedAt: Date | null
  contractData: {
    address: string
    customerName: string
    name: string
    package: { name: string; price: number; quantity: number }
    products: string[]
    description: string
    weekCode?: string | number
  }
  date: string | Date
  email: string
  id: string
  lockedAt: string | Date
  moveId: string
  phone: string
  price: string
  skippedAt: Date | null
  startedAt: Date | null
  state: string
  type: string
}

export const createOrder = async (moveId: string, type: TodoType, data: CreateOrder): Promise<TodoItemType> => {
  return put<TodoItemType>(`/moves/${moveId}/todo/${type}`, { body: JSON.stringify(data) })
}

export const todoSkip = async (moveId: string, type: TodoType, rentType?: 'truck' | 'trailer') => {
  return post(`/moves/${moveId}/todo/${type}/skip`, {
    body: type === TODO_TYPE_TRANSPORTATION ? JSON.stringify({ rentType }) : undefined,
  })
}

export const todoDetails = async (moveId: string, type: TodoType): Promise<TodoItemType> => {
  const data = await get<TodoItemType[]>(`/moves/${moveId}/todo/${type}`)
  if (!!data.length) {
    const sortedAsc = data.sort((objA: TodoItemType, objB: TodoItemType) => +new Date(objB.lockedAt) - +new Date(objA.lockedAt))
    return sortedAsc[0]
  } else return data[data.length - 1]
}

export const cancelTodo = async (moveId: string, id: string, type: TodoType) => {
  return deleteInstance(`/moves/${moveId}/todo/${type}/${id}`)
}
