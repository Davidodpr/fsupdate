import createFetchInstance from '../utils/api'

export interface CreateConversationDto {
  message: string
  phone: string
  email: string
  when: string
}

export type AddressableList = {
  type: 'list'
  data: Array<AddressableObject>
  url: string
  total_count: number
  has_more: boolean
}
export type AddressableObject = {
  type: 'company' | 'note' | 'tag'
  id: string
  url: string
}

export interface IntercomConversationResponse {
  type: string
  id: string
  created_at: number
  updated_at: number
  source: {
    type: string
    id: string
    delivered_as?: string
    subject?: string
    body?: string
    author?: {
      type: string
      id: string
      name?: string
      email?: string
    }
  }
  contacts?: {
    type: string
    contacts: Array<{
      type: string
      id: string
    }>
  }
  first_contact_reply?: {
    created_at: number
    type: string
    url: string
  }
  admin_assignee_id?: number
  team_assignee_id?: number
  open?: boolean
  state?: string
  read?: boolean
  waiting_since?: number
  snoozed_until?: number
  tags?: AddressableList
  priority?: string
  sla_applied?: {
    type: string
    sla_name: string
    sla_status: string
  }
  statistics?: {
    type: string
    time_to_assignment?: number
    time_to_admin_reply?: number
    time_to_first_close?: number
    time_to_last_close?: number
    median_time_to_reply?: number
    first_contact_reply_at?: number
    first_assignment_at?: number
    first_admin_reply_at?: number
    first_close_at?: number
    last_assignment_at?: number
    last_assignment_admin_reply_at?: number
    last_contact_reply_at?: number
    last_admin_reply_at?: number
    last_close_at?: number
    last_closed_by_id?: number
    count_reopens?: number
    count_assignments?: number
    count_conversation_parts?: number
  }
}

export interface CreateConversationResponse {
  result: IntercomConversationResponse
}

const fetchPost = createFetchInstance('POST')

export const createConversation = async (data: CreateConversationDto): Promise<CreateConversationResponse> => {
  return await fetchPost<CreateConversationResponse>('/web/intercom/conversation', {
    body: JSON.stringify(data),
  })
}

export default createConversation
