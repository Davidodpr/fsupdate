import { BANK_ID_STATUS_COMPLETE, BANK_ID_STATUS_FAILED } from '@/constants/bankid'
import createFetchInstance from '../utils/api'

const fetchPost = createFetchInstance('POST')

export const cancelPoaBankIdSign = async (orderRef: string) => {
  await fetchPost<boolean>('/poa/cancel', { body: JSON.stringify({ orderRef }) })
  return true
}

export const initPoaBankIdSign = async (context: string, isMobile?: boolean): Promise<BankIdInit> => {
  return fetchPost<BankIdInit>(`/poa?startMethod=${isMobile ? 'autoStart' : 'qrCode'}`, { body: JSON.stringify({ context }) })
}

export const pollPoaQrData = async (orderRef: string): Promise<string | undefined> => {
  const { qrData } = await fetchPost<{ qrData: string }>('/poa/poll/qr-data', {
    body: JSON.stringify({ orderRef }),
  })
  return qrData
}

export const collectPoaBankIdSign = async (orderRef: string): Promise<BankIdCollect> => {
  return fetchPost<BankIdCollect>('/poa/collect', { body: JSON.stringify({ orderRef }) })
}
type BankIdInit = {
  orderRef: string
  autoStartToken: string
}
type BankIdCollect = {
  status: typeof BANK_ID_STATUS_COMPLETE | typeof BANK_ID_STATUS_FAILED
}
