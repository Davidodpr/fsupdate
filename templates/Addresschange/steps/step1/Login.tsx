/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAddresschangeContext } from '@/common/context/addresschange/addresschange.provider'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import { SkatteverketStatusEnum } from '@/common/enums/SkatteverketEnum'
import useResponsive from '@/common/hooks/useResponsive'
import { decodeHtmlEntities } from '@/common/utils/decodeHtml'
import Button from '@/components/atoms/Button'
import Text from '@/components/atoms/Text'
import InfoBoxColored from '@/components/molecules/InfoBoxColored'
import BankId from '@/public/images/BankId.svg'
import {
  buttonWrapperVariants,
  imageWrapperVariants,
  infoBoxWrapperVariants,
  innerWrapperVariants,
  loginTextWrapperVariants,
  stepTemplateWrapperVariants,
  styledTextVariants,
  styledTitleVariants,
  endButtonWrapperVariants,
} from '../../AddresschangePage.variants'
import { AddresschangeError } from '../../components/AddresschangeError'

export const Login = () => {
  const { t } = useTranslation(['addresschange', 'common'])
  const {
    user: { profile },
  } = useUserContext()
  const { loginStatus, qr, autoStartToken, error, loginSkatteverket } = useAddresschangeContext()
  const { iconSet } = useThemeContext()
  const router = useRouter()
  const { isTabletPortraitOrGreater } = useResponsive()
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = React.useState<boolean>(false)

  const handleLogin = () => {
    setIsLoginButtonDisabled(true)
    loginSkatteverket(profile.pno)
    if (loginStatus === SkatteverketStatusEnum.STARTED) {
      setIsLoginButtonDisabled(false)
    }
  }

  useEffect(() => {
    if (SkatteverketStatusEnum.CANCELLED || SkatteverketStatusEnum.EMPTY) {
      setIsLoginButtonDisabled(false)
    }
  }, [loginStatus])

  const showQrTitle = loginStatus === SkatteverketStatusEnum.STARTED || loginStatus === SkatteverketStatusEnum.BANK_ID_REQUIRED || loginStatus === SkatteverketStatusEnum.PENDING

  if (error) {
    return (
      <div className={stepTemplateWrapperVariants()}>
        <div className={innerWrapperVariants()}>
          <div className={infoBoxWrapperVariants()}>
            <InfoBoxColored type="warning">{t(`error:${error}`)}</InfoBoxColored>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={stepTemplateWrapperVariants()}>
      <div className={innerWrapperVariants()}>
        {(!loginStatus || (loginStatus === SkatteverketStatusEnum.COMPLETED && !qr) || loginStatus === SkatteverketStatusEnum.EMPTY) && (
          <>
            <Text className={styledTextVariants()} variant={'largerBlack'}>
              {t('LOGIN.title')}
            </Text>
            <div className={loginTextWrapperVariants()}>
              <div dangerouslySetInnerHTML={{ __html: t('LOGIN.text') }} />
              {isTabletPortraitOrGreater && iconSet.MOVING_ARROW_ICON && <Image src={iconSet.MOVING_ARROW_ICON} width={179} height={130} alt={t('LOGIN.title')} />}
            </div>
            <div className={endButtonWrapperVariants()}>
              <Button
                disabled={isLoginButtonDisabled}
                onClick={handleLogin}
                text={isLoginButtonDisabled ? t('common:loading') : t('common:continue')}
                iconLeft={<BankId />}
                padding="0 20px !important"
              />
            </div>
          </>
        )}
        <div style={{ textAlign: 'center' }}>
          {showQrTitle && <p className={styledTitleVariants()}>{t('common:AUTH.identify')}</p>}
          {loginStatus === SkatteverketStatusEnum.STARTED && <Text> {t('LOGIN.statusTextStarted')}</Text>}
          {loginStatus === SkatteverketStatusEnum.BANK_ID_REQUIRED && t('common:AUTH.qr')}
          {loginStatus === SkatteverketStatusEnum.PENDING && t('LOGIN.statusTextPending')}
        </div>
        {!!qr && (
          <div className={imageWrapperVariants()}>
            <img src={qr} width={246} height={246} alt="qr-kod" />
            <div className={buttonWrapperVariants()} style={{ justifyContent: 'center' }}>
              <div style={{ maxWidth: 300, height: '100%', display: 'flex', alignItems: 'center' }}>
                <Button
                  variant="primaryAlt"
                  onClick={() => {
                    /** "when scraping bankid link, it is html encoded from puppeteer so we do this in order to decode html encoded symbols" */
                    autoStartToken && router.push(decodeHtmlEntities(autoStartToken))
                  }}
                  text={t('common:AUTH.triggerOnThisDevice')}
                  padding="0 20px !important"
                  disabled={!!!profile.pno}
                />
              </div>
            </div>
          </div>
        )}
        {loginStatus === SkatteverketStatusEnum.CANCELLED && <AddresschangeError onLogin={handleLogin} errorText={t('LOGIN.statusTextCancelled')} />}
      </div>
    </div>
  )
}
