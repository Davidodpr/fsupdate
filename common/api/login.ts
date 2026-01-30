import ReactGA4 from 'react-ga4'
import Cookies from 'js-cookie'
import { clearIntervalAsync, setIntervalAsync } from 'set-interval-async'
import { BANK_ID_STATUS_FAILED, BANK_ID_STATUS_COMPLETE } from '@/constants/bankid'
import { ERRORCODES } from '@/constants/errorCodes'
import { getCookieDomain } from '../helpers/domain'
import createFetchInstance from '../utils/api'

type LoginInitType = {
  orderRef: string
  autoStartToken: string | null
  qrStartSecret: null | string
  qrStartToken: null | string
}

const fetchPost = createFetchInstance('POST')

export const initLogin = async (isMobile: boolean, userPno?: string): Promise<LoginInitType> => {
  if (userPno) {
    return fetchPost<LoginInitType>('/users/login/init', {
      body: JSON.stringify({ pno: userPno }),
    })
  } else return fetchPost<LoginInitType>(`/users/login/init?startMethod=${isMobile ? 'autoStart' : 'qrCode'}`)
}

type CustomAttributes = {
  customAttributes: { sign_up_channel: string }
}

type CollectLoginType = {
  status: string
  token: string
  userCreated: boolean
}

type CollectLoginProps = {
  orderRef: string
  intercomEvent: (arg0: string) => void
  intercomUpdate: (arg0: CustomAttributes) => void
  callback: (arg0: string) => void
  setIsUserCreated: (arg0: boolean) => void
}

export const collectLogin = async ({ orderRef, intercomEvent, intercomUpdate, callback, setIsUserCreated }: CollectLoginProps): Promise<() => void> => {
  const { location } = window
  let retryCount = 0
  let isCompleted = false
  let isCancelled = false
  let callbackHasBeenCalled = false
  let timer: ReturnType<typeof setIntervalAsync> | null = null

  // Wrap the callback to ensure it's only called once
  const safeCallback = (status: string) => {
    if (callbackHasBeenCalled) {
      return
    }
    callbackHasBeenCalled = true
    callback(status)
  }

  const performLogin = async () => {
    // Check if already completed or cancelled before proceeding
    if (isCompleted || isCancelled) {
      return
    }

    try {
      const { status, token, userCreated } = await fetchPost<CollectLoginType>('/users/login/collect', {
        body: JSON.stringify({ orderRef }),
      })

      // Check again after async operation completes
      if (isCompleted || isCancelled) {
        return
      }

      if (status === BANK_ID_STATUS_FAILED) {
        ReactGA4.event('login_error')
        isCompleted = true
        if (timer) clearIntervalAsync(timer)
        safeCallback(status)
      } else if (status === BANK_ID_STATUS_COMPLETE && token) {
        const domain = getCookieDomain(location.hostname)
        Cookies.set('userToken', token, { expires: 365, domain })
        if (userCreated) {
          setIsUserCreated(true)
          intercomUpdate({
            customAttributes: {
              sign_up_channel: 'signup through "login"',
            },
          })
          intercomEvent('signup_success')
        }
        isCompleted = true
        if (timer) clearIntervalAsync(timer)
        safeCallback(status)
      }
      // If status is pending, we just let the interval continue
    } catch (e: unknown) {
      // Check if already completed or cancelled before handling error
      if (isCompleted || isCancelled) {
        return
      }

      const castedError = e as ErrorType

      // Increment retry count for any error
      retryCount++

      if (castedError?.statusCode === 404) {
        ReactGA4.event('login_error')
        isCompleted = true
        if (timer) clearIntervalAsync(timer)
        safeCallback(ERRORCODES.NOTEXIST)
      } else if (castedError?.statusCode === 403) {
        ReactGA4.event('login_error')
        isCompleted = true
        if (timer) clearIntervalAsync(timer)
        safeCallback(ERRORCODES.USER_BLOCKED)
      } else if (castedError?.statusCode === 400) {
        ReactGA4.event('login_error')
        isCompleted = true
        if (timer) clearIntervalAsync(timer)
        safeCallback(ERRORCODES.ORDERCANCELED)
      } else if (retryCount >= 5) {
        // Generic error after too many retries
        ReactGA4.event('login_error')
        isCompleted = true
        if (timer) clearIntervalAsync(timer)
        safeCallback(BANK_ID_STATUS_FAILED)
      }
      // If we haven't hit the retry limit and it's not a specific error,
      // just let the interval continue and retry
    }
  }

  // Start polling immediately
  performLogin()

  // Then continue polling every 3 seconds
  timer = setIntervalAsync(performLogin, 3000)

  // Return a cleanup function
  return () => {
    isCancelled = true
    if (timer) clearIntervalAsync(timer)
  }
}

export const pollQrData = async (orderRef: string): Promise<string | undefined> => {
  const { qrData } = await fetchPost<{ qrData: string }>('/users/login/poll/qr-data', {
    body: JSON.stringify({ orderRef }),
  })
  return qrData
}

export const cancelLogin = async (orderRef: string): Promise<void> => {
  try {
    await fetchPost<void>('/users/login/cancel', {
      body: JSON.stringify({ orderRef }),
    })
  } catch (error: unknown) {
    const castedError = error as ErrorType
    throw castedError
  }
}
