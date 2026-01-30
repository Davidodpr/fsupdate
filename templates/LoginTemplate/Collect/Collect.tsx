import { useEffect, useState } from 'react'
import ReactGA4 from 'react-ga4'
import { useTranslation } from 'react-i18next'
import { useIntercom } from 'react-use-intercom'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { cancelLogin, collectLogin, pollQrData } from '@/common/api/login'
import { useLogin } from '@/common/context/login/Login.provider'
import { useInterval } from '@/common/hooks/useInterval'
import Flex from '@/components/atoms/Flex'
import QrCode from '@/components/atoms/QrCode'
import Spinner from '@/components/atoms/Spinner'
import Text from '@/components/atoms/Text'
import LinkButton from '@/components/linkButton'
import LinkButtonAlt from '@/components/linkButtonAlt'
import LoginAndSignupBase from '@/components/molecules/LoginAndSignupBase'
import { BANK_ID_STATUS_COMPLETE, BANK_ID_STATUS_FAILED } from '@/constants/bankid'
import { ERRORCODES } from '@/constants/errorCodes'
import { collectWrapperVariants, headerVariants, innerWrapperVariants } from './Collect.variants'

const COMPLETE = BANK_ID_STATUS_COMPLETE

export const Collect = () => {
  const { t } = useTranslation(['login'])
  const router = useRouter()
  const { isBankIdOnThisDeviceLogin, loginState, setLoginState, getRefUrl, getHasSentRequest } = useLogin()
  const { trackEvent, update } = useIntercom()
  const [isUserCreated, setIsUserCreated] = useState<boolean>(false)
  const [currentQrData, setCurrentQrData] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isBankIdOrderCancelled, setIsBankIdOrderCancelled] = useState<boolean>(false)

  const routeUserToWelcome = () => {
    if (!!isUserCreated) {
      ReactGA4.event('signup_success')
      window.location.href = `/i/userCreated`
    } else {
      ReactGA4.event('login_success')

      const refUrl = getRefUrl()
      const hasSentRequest = getHasSentRequest()
      window.location.href = `/app/welcome?${refUrl ? `refUrl=${refUrl}` : ''}${hasSentRequest ? `&hasSentRequest=true` : ''}&${
        isUserCreated ? `userCreated=${isUserCreated}` : ''
      }`
    }
  }

  useInterval(
    async () => {
      const qrData = await pollQrData(loginState?.orderRef ?? '')
      setCurrentQrData(qrData)
    },
    loginState?.orderRef && !isBankIdOnThisDeviceLogin && process.env.NEXT_PUBLIC_USE_QR_BANKID_LOGIN === 'true' ? 1000 : null,
  )

  useEffect(() => {
    let cleanup: (() => void) | undefined

    if (!!loginState?.orderRef) {
      const props = {
        orderRef: loginState.orderRef,
        intercomEvent: trackEvent,
        intercomUpdate: update,
        callback: (newStatus: string) => {
          if (loginState.step === BANK_ID_STATUS_COMPLETE) return
          switch (newStatus) {
            case ERRORCODES.USER_BLOCKED:
              return setLoginState((_prevState) => ({ step: 'failed', statusCode: ERRORCODES.USER_BLOCKED, orderRef: undefined }))
            case ERRORCODES.ORDERCANCELED:
              return setLoginState((_prevState) => ({ step: 'init', statusCode: newStatus, orderRef: undefined }))
            case COMPLETE:
              setIsLoading(true)
              return routeUserToWelcome()
            default:
              return setLoginState((prevState) => ({ ...prevState, step: BANK_ID_STATUS_FAILED, statusCode: newStatus, orderRef: undefined }))
          }
        },
        setIsUserCreated: (newStatus: boolean) => setIsUserCreated(newStatus),
      }

      collectLogin(props).then((cleanupFn) => {
        cleanup = cleanupFn
      })
    }

    // Cleanup function to cancel the login collection when component unmounts or orderRef changes
    return () => {
      if (cleanup) {
        cleanup()
      }
    }
  }, [loginState?.orderRef])

  useEffect(() => {
    if (loginState?.autoStartToken && isBankIdOnThisDeviceLogin) {
      window.location.href = `bankid:///?autostarttoken=${loginState.autoStartToken}`
    }
  }, [loginState?.autoStartToken, isBankIdOnThisDeviceLogin, router])

  const cancel = async () => {
    try {
      await cancelLogin(loginState?.orderRef || '')
    } catch (error) {
      const castedError = error as ErrorType
      throw JSON.stringify(castedError)
    }
  }

  if (isLoading) {
    return (
      <>
        <LoginAndSignupBase>
          <Flex className={collectWrapperVariants()} direction="column" alignItems="center">
            <Spinner scale={1.5} color="green" />
          </Flex>
        </LoginAndSignupBase>
      </>
    )
  }

  return (
    <LoginAndSignupBase>
      <Flex className={collectWrapperVariants()} direction="column" alignItems="center">
        <h1 className={headerVariants()}>{t('identifyWithBankid')}</h1>
        <Text className="mb-10" variant="body">
          {t('startBankid')}
        </Text>
        {!currentQrData && (
          <Flex className={innerWrapperVariants()} direction="column" alignItems="center">
            <Spinner scale={1.5} color="green" />
            {isBankIdOrderCancelled && <Text variant="bodySmall">{t('cancelBankId')}</Text>}
          </Flex>
        )}
        {currentQrData && (
          <>
            <div style={{ width: '250px', height: '250px', marginBottom: 12 }}>
              <QrCode url={currentQrData} withParentSize />
            </div>
            {isBankIdOrderCancelled && <Text variant="bodySmall">{t('cancelBankId')}</Text>}
          </>
        )}
        <LinkButtonAlt
          noUnderline
          onClick={() => {
            setIsBankIdOrderCancelled(true)
            cancel()
          }}
          disabled={isBankIdOrderCancelled}
        >
          {t('cancel')}
        </LinkButtonAlt>
      </Flex>
    </LoginAndSignupBase>
  )
}
