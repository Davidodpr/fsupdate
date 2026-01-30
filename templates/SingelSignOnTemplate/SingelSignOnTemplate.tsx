'use client'

import { useEffect, useState, useRef } from 'react'
import ReactGA4 from 'react-ga4'
import { useTranslation } from 'react-i18next'
import { useIntercom } from 'react-use-intercom'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { createSsoUser } from '@/common/api/singelSignOn'
import { loginSso, validateToken } from '@/common/api/singelSignOn'
import { useUserContext } from '@/common/context/user/UserProvider'
import { BirdError } from '@/components/atoms/BirdError'
import Button from '@/components/atoms/Button'
import Flex from '@/components/atoms/Flex'
import Spinner from '@/components/atoms/Spinner'
import Text from '@/components/atoms/Text'
import useResponsive from '@/hooks/useResponsive'
import FlyttsmartBlue from '@/public/images/flyttsmart_blue.svg'
import { ssoWrapperVariants, spinnerWrapperVariants, buttonWrapperVariants, styledFlexVariants, imageWrapperVariants, noAddressBackgroundVariants } from './SSO.variants'
import SSOModal from './SSOModal/SSOModal'
import { getUrl, getFBRefUrl } from './helpers'


export const SingelSignOnTemplate = () => {
  const router = useRouter()
  const { show } = useIntercom()
  const { isTabletPortraitOrGreater } = useResponsive()
  const [openModal] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const initialized = useRef(false)
  const tokenQuery = useSearchParams().get('token')
  const TOKENQuery = useSearchParams().get('TOKEN')
  const token = tokenQuery || TOKENQuery
  const refUrlQuery = useSearchParams().get('refUrl')
  const [isNewUser, setIsNewUser] = useState(false)
  const [triggerCreateNewUser, setTriggerCreateNewUser] = useState(false)
  const [isTokenValid, setIsTokenValid] = useState<boolean>()
  const { t } = useTranslation(['sso', 'common', 'error'])
  const [userIsBlocked, setUserIsBlocked] = useState(false)
  const ANIMATION_TEXTS = [t('LOGIN_TEXTS.1'), t('LOGIN_TEXTS.2'), t('LOGIN_TEXTS.3'), t('LOGIN_TEXTS.4'), t('LOGIN_TEXTS.5')]

  const {
    setUserTokenCookie,
    user: { hasFetchedData },
  } = useUserContext()
  const [hasCreatedUserAndSetCookie, setHasCreatedUserAndSetCookie] = useState(false)
  const [hasStartedCheck, setHasStartedCheck] = useState(false)
  const [animationText, setAnimationText] = useState(ANIMATION_TEXTS[0])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const interval = setInterval(() => {
        const newAnimationText = ANIMATION_TEXTS[Math.floor(Math.random() * ANIMATION_TEXTS.length)]
        setAnimationText(newAnimationText)
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [])

  const validateAndLoginOrCreateUser = async (tokenParam: string) => {
    try {
      const isValid = await validateToken(tokenParam)
      if (!!isValid) {
        const loginResponse = await loginSso(tokenParam, setUserTokenCookie)
        if (!!loginResponse) {
          refUrlQuery ? router.push(`${getFBRefUrl(refUrlQuery as string)}`) : router.push('/app/movepage')
        }
      } else {
        setIsNewUser(true)
      }
    } catch (e: unknown) {
      setTimeout(() => {
        setIsError(true)
        if ((e as { statusCode?: number })?.statusCode === 401) {
          setIsTokenValid(false)
          ReactGA4.event('sso_error_401', { nonInteraction: true })
        }
        if ((e as { statusCode?: number })?.statusCode === 403) {
          setUserIsBlocked(true)
        }
      }, 5000)
    }
  }

  useEffect(() => {
    if (!!token?.length && !hasStartedCheck) {
      if (!initialized.current) {
        initialized.current = true
        setHasStartedCheck(true)
        validateAndLoginOrCreateUser(token as string)
      }
    }
  }, [token])

  useEffect(() => {
    if (!openModal) {
      setIsLoading(true)
      router.push('/')
    }
  }, [openModal, router])

  useEffect(() => {
    if (hasFetchedData && hasCreatedUserAndSetCookie) {
      refUrlQuery ? router.push(`${getUrl()}${getFBRefUrl(refUrlQuery as string)}`) : router.push(`${getUrl()}/app/movepage`)
    }
  }, [hasFetchedData, hasCreatedUserAndSetCookie])

  useEffect(() => {
    const createUser = async () => {
      await createSsoUser(token as string)
      const responseLogin = await loginSso(token as string, setUserTokenCookie)
      if (!!responseLogin) {
        setHasCreatedUserAndSetCookie(true)
      }
    }
    if (triggerCreateNewUser) {
      setIsNewUser(false)
      createUser()
    }
  }, [triggerCreateNewUser])

  if (isLoading && !isError) {
    return (
      <Flex justifyContent="center" alignItems="center">
        <div className={spinnerWrapperVariants()}>
          <Spinner scale={2} color="green" />
        </div>
      </Flex>
    )
  }

  if (isNewUser && !isError) {
    return (
      <div style={{ width: '100vw', height: '100%', overflow: 'hidden', position: 'fixed' }}>
        <div className={styledFlexVariants()}>
          <div className={imageWrapperVariants()}>
            <Image
              src={'/images/Fastighetsbyran-logo.svg'}
              fill
              alt="Broker image"
              style={{ objectFit: 'contain', padding: isTabletPortraitOrGreater ? '24px 16px' : '12px 16px' }}
            />
          </div>
          <div className={noAddressBackgroundVariants()} />
          <SSOModal setTriggerCreateNewUser={setTriggerCreateNewUser} />
        </div>
      </div>
    )
  }

  return (
    <div className={ssoWrapperVariants()}>
      {isError && <FlyttsmartBlue />}
      <Flex direction="column" alignItems="center" justifyContent="start" className="h-full pt-[100px]">
        {isError ? (
          <>
            <BirdError />
            {isTokenValid || userIsBlocked ? (
              <>
                <Text className="!text-4xl leading-6 font-secondary">{userIsBlocked ? t('error:userBlockedHeader') : t('common:tryAgain')}</Text>
                {!userIsBlocked && <Text className="m-0">{t('tryAgainText')}</Text>}
                <Text className="mt-[5px] mb-0 mx-0">{userIsBlocked ? t('error:userBlockedText') : t('contactUsText')}</Text>
                {!userIsBlocked && (
                  <div className={buttonWrapperVariants()}>
                    <Button
                      variant="primaryAlt"
                      text={t('common:tryAgain')}
                      onClick={() => {
                        setIsLoading(false)
                        setIsError(false)
                        validateAndLoginOrCreateUser(token as string)
                      }}
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                <Text className="!text-4xl !leading-11 text-center md:text-left pt-10 font-secondary">{t('loginFailed')}</Text>
                <Text className="!mt-8 !md:mt-10 max-w-[480px]">{t('loginFailedText')}</Text>
                <div className={buttonWrapperVariants()}>
                  <Button
                    variant="primaryAlt"
                    text={t('login')}
                    withFullWidth
                    onClick={() => {
                      router.push('/login')
                    }}
                  />
                </div>
              </>
            )}
            {!userIsBlocked && (
              <div className={buttonWrapperVariants()}>
                <Button withFullWidth variant="ghost" text={t('common:contactUs')} onClick={() => show()} />
              </div>
            )}
          </>
        ) : (
          <>
            <div className={spinnerWrapperVariants()}>
              <Spinner />
            </div>
            <Text variant="largeBold" spacing="none" className="mt-[50px] text-secondary-main">
              {animationText}
            </Text>
            <Text variant="body" spacing="none" className="mt-1 text-secondary-main italic">
              {t('10Seconds')}
            </Text>
          </>
        )}
      </Flex>
    </div>
  )
}

export default SingelSignOnTemplate
