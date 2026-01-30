import { ContactMeTypeEnum } from '@/enums/ContactMeTypeEnum'

export type ContactMe = {
  type: ContactMeTypeEnum
  email: string
  content: string
  phone?: string
  callMethod?: null | string
  serviceType: string
}
