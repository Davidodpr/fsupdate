import { useEffect, useState, KeyboardEvent } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import Link from 'next/link'
import { initLogin } from '@/common/api/login'
import { useLogin } from '@/common/context/login/Login.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import { extractDtoValidationErrors } from '@/common/helpers/extractDtoValidationErrors'
import useResponsive from '@/common/hooks/useResponsive'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Spinner, { SpinnerWrapper } from '@/components/atoms/Spinner'
import Text from '@/components/atoms/Text'
import LinkButton from '@/components/linkButton'
import LoginAndSignupBase from '@/components/molecules/LoginAndSignupBase'
import { ERRORCODES } from '@/constants/errorCodes'
import BankId from '@/public/images/BankId.svg'
import Info from '@/public/images/Info.svg'
import InviterLogo from '@/public/images/Invite.svg'
import {
  initWrapperVariants,
  largeButtonWrapperVariants,
  buttonWrapperVariants,
  innerWrapperVariants,
  headerVariants,
  thisDeviceButtonWrapperVariants,
  inputAndButtonsWrapperVariants,
  infoWrapperVariants,
  iconWrapperVariants,
  textWrapperVariants,
  headerSubtitleVariants,
} from './Init.variants'

interface InitProps {
  leadHasAlreadyUsedInvitationLink?: boolean
}

export const Init = ({ leadHasAlreadyUsedInvitationLink = false }: InitProps) => {
  const { t } = useTranslation(['login'])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const { setIsBankIdOnThisDeviceLogin, isBankIdOnThisDeviceLogin, setLoginState, setPno } = useLogin()
  const { isTabletPortraitOrGreater } = useResponsive()
  const { user } = useUserContext()
  const [localPno, setLocalPno] = useState<string | undefined>(undefined)
  const [usePnoBankidLogin, setUsePnoBankidLogin] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== undefined) {
      if (process.env.NEXT_PUBLIC_USE_QR_BANKID_LOGIN !== 'true') setUsePnoBankidLogin(true)
    }
  }, [])

  const onSubmit = async (pno?: string) => {
    if (pno) {
      setPno(pno)
      initBankidIdentification(pno)
    } else initBankidIdentification()
  }

  useEffect(() => {
    if (isTabletPortraitOrGreater) {
      setIsBankIdOnThisDeviceLogin(false)
    }
  }, [isTabletPortraitOrGreater, setIsBankIdOnThisDeviceLogin])

  useEffect(() => {
    if (!!user?.hasFetchedData) setIsLoading(false)
  }, [user?.hasFetchedData])

  const initBankidIdentification = async (pno?: string) => {
    try {
      const response = await initLogin(isBankIdOnThisDeviceLogin, pno)
      if (response) {
        if (response.orderRef) {
          setLoginState({ step: 'collect', orderRef: response?.orderRef, autoStartToken: response?.autoStartToken ?? undefined })
        }
      }
    } catch (er: unknown) {
      if (er) {
        const castedError = er as ErrorType
        const errors = extractDtoValidationErrors(castedError)
        const errorStatusCode = errors.includes(ERRORCODES.USERUNDER18) ? ERRORCODES.FAILED : ERRORCODES.NOTFOUND
        setLoginState({ step: 'failed', statusCode: errorStatusCode })
      }
    }
  }

  const handleKeypress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      onSubmit(localPno)
    }
  }

  if (isLoading)
    return (
      <div style={{ height: '100vh' }}>
        <SpinnerWrapper>
          <Spinner scale={2} color="green" />
        </SpinnerWrapper>
      </div>
    )

  return (
    <LoginAndSignupBase>
      <div className={initWrapperVariants({ leadHasAlreadyUsedInvitationLink })}>
        <h1 className={headerVariants({ leadHasAlreadyUsedInvitationLink })}>{leadHasAlreadyUsedInvitationLink ? t('loginWithBankId') : t('header')}</h1>
        <Text className={headerSubtitleVariants()} spacing="bottom">
          {t('headerSubtitle')}
        </Text>
        {leadHasAlreadyUsedInvitationLink && <InviterLogo />}
        {leadHasAlreadyUsedInvitationLink && (
          <>
            <Text style={{ margin: '22px 0 0 0' }}>{t('invitationUsed')}</Text>
            <Text style={{ margin: '2px 0 20px 0' }}>{t('identifyWithBankId')}</Text>
          </>
        )}
        <div className={innerWrapperVariants()}>
          {isBankIdOnThisDeviceLogin ? (
            <>
              <div className={thisDeviceButtonWrapperVariants()}>
                <div className={largeButtonWrapperVariants()}>
                  <Button
                    variant="primaryAlt"
                    iconRight={<BankId />}
                    text={t('login')}
                    className="!text-md"
                    withFullWidth
                    padding="10px 10px"
                    onClick={() => {
                      initBankidIdentification()
                    }}
                  />
                </div>
              </div>
              <LinkButton
                sx={{ fontSize: 12, fontWeight: '200', borderBottom: '1px solid', marginTop: 15 }}
                noUnderline={false}
                onClick={() => setIsBankIdOnThisDeviceLogin(!isBankIdOnThisDeviceLogin)}
              >
                {t('bankIdOtherDevice')}
              </LinkButton>
            </>
          ) : (
            <div className={inputAndButtonsWrapperVariants()}>
              {usePnoBankidLogin && <Input handleKeypress={handleKeypress} label={t('pno')} type="text" onChange={(e) => setLocalPno(e.currentTarget.value)} />}
              <div className={buttonWrapperVariants()}>
                <div className={largeButtonWrapperVariants()}>
                  <Button
                    padding={isTabletPortraitOrGreater ? '10px 46px' : '10px 10px'}
                    className="w-full !text-[14px]"
                    withFullWidth
                    variant="primaryAlt"
                    iconRight={<BankId />}
                    iconColor="#000"
                    text={t('login')}
                    onClick={() => onSubmit(localPno)}
                  />
                </div>
              </div>

              <LinkButton
                sx={{ fontSize: 12, fontWeight: '200', borderBottom: '1px solid', marginTop: 8 }}
                noUnderline={false}
                onClick={() => setIsBankIdOnThisDeviceLogin(!isBankIdOnThisDeviceLogin)}
              >
                {t('bankIdThisDevice')}
              </LinkButton>
            </div>
          )}
        </div>
        <Text className="mt-8 text-center text-xs" variant="details">
          {t('termsText')}
          <Link target="_blank" href="/terms" legacyBehavior>
            <a className="!text-[var(--color-primary-main)] !font-bold">{t('termsLink')}</a>
          </Link>
        </Text>
        {navigator.userAgent.includes('SamsungBrowser') && (
          <div className={infoWrapperVariants()}>
            <div className={iconWrapperVariants()}>
              <Info />
            </div>
            <div className={textWrapperVariants()}>
              <Trans t={t} i18nKey="samsungHelpText" components={[<a key="samsungHelpText" />]} />
            </div>
          </div>
        )}
      </div>
    </LoginAndSignupBase>
  )
}
