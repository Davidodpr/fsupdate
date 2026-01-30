import createFetchInstance from '../utils/api'

interface QuotationEmailData {
  locale: ShortLocale
  isRecommendedProvider: boolean
  providerId: string
  moveHelpDate: string
  moveCleanDate: string
  serviceTypes: ('moveclean' | 'movehelp' | 'packing')[]
}

const fetchPost = createFetchInstance('POST')

export const requestQuotation = async (quotationData: QuotationEmailData): Promise<void> => {
  await fetchPost<void>(`/web/order/request-quotation`, {
    body: JSON.stringify(quotationData),
  })
}

export const sendRequestStartedUser = async (userId: string): Promise<void> => {
  await fetchPost<void>(`/web/quotation/start`, {}, { userId })
}

export const sendRequestStartedLead = async (inviteCode: string): Promise<void> => {
  await fetchPost<void>(`/web/quotation/start`, {}, { inviteCode })
}

export const sendErrorRequestQuotation = async (userId: string): Promise<void> => {
  await fetchPost<void>(`/web/quotation/request`, {}, { userId })
}

export const requestQuotationFromError = async (): Promise<void> => {
  await fetchPost<void>(`/web/supplier/move-service/error/quotation-request`)
}

export default requestQuotation
