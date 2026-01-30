import { SkatteverketStatusEnum } from '../enums/SkatteverketEnum'
import createFetchInstance from '../utils/api'
import getDomesticServicesBalance from './getDomesticServicesBalance'

const updateDomesticServicesBalance = async (callback?: (result: DomesticServicesBalance) => void): Promise<void> => {
  let timer: ReturnType<typeof setTimeout>
  let finished = false

  const fetchInstance = createFetchInstance('GET')

  // Make sure we show loading spinner as soon as possible
  if (callback) {
    callback({
      isBankIdLoading: true,
      status: { tag: SkatteverketStatusEnum.STARTED },
    })
  }

  timer = setTimeout(async function poll() {
    try {
      const { status } = await fetchInstance<{ status: { tag: SkatteverketStatusEnum; reason?: string } }>('/skatteverket/domestic-services-balance/status')

      const tag = status.tag

      finished = tag === SkatteverketStatusEnum.COMPLETED || tag === SkatteverketStatusEnum.CANCELLED

      if (tag === SkatteverketStatusEnum.COMPLETED) {
        const balance = await getDomesticServicesBalance()

        if (callback)
          callback({
            isBankIdLoading: false,
            data: balance,
          })
      }

      if (tag === SkatteverketStatusEnum.CANCELLED) {
        if (callback && status.reason)
          callback({
            isBankIdLoading: false,
            error: status.reason as SkatteverketLoginError,
          })
      }

      clearTimeout(timer)

      if (!finished) {
        timer = setTimeout(poll, 2000)

        if (callback && status) {
          callback({
            isBankIdLoading: true,
            status: (() => {
              switch (status.tag) {
                case SkatteverketStatusEnum.STARTED:
                  return { tag: SkatteverketStatusEnum.STARTED }
                case SkatteverketStatusEnum.BANK_ID_REQUIRED:
                  return { tag: SkatteverketStatusEnum.BANK_ID_REQUIRED, qr: '', autoStartToken: '' }
                case SkatteverketStatusEnum.PENDING:
                  return { tag: SkatteverketStatusEnum.PENDING }
                case SkatteverketStatusEnum.COMPLETED:
                  return { tag: SkatteverketStatusEnum.COMPLETED }
                case SkatteverketStatusEnum.CANCELLED:
                  return { tag: SkatteverketStatusEnum.CANCELLED, reason: status.reason as SkatteverketLoginError }
                default:
                  return { tag: SkatteverketStatusEnum.STARTED }
              }
            })(),
          })
        }
      }
    } catch (e: unknown) {
      clearTimeout(timer)

      if (callback)
        callback({
          isBankIdLoading: false,
          status: { tag: SkatteverketStatusEnum.STARTED },
        })
    }
  }, 2000)
}

export default updateDomesticServicesBalance
