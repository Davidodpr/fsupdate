import { useTranslation } from 'react-i18next'
import { useIntercom } from 'react-use-intercom'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { initLogin } from '@/common/api/login'
import { useLogin } from '@/common/context/login/Login.provider'
import { extractDtoValidationErrors } from '@/common/helpers/extractDtoValidationErrors'
import useResponsive from '@/common/hooks/useResponsive'
import { BirdError } from '@/components/atoms/BirdError'
import Button from '@/components/atoms/Button'
import Flex from '@/components/atoms/Flex'
import Text from '@/components/atoms/Text'
import LinkButton from '@/components/linkButton'
import LoginAndSignupBase from '@/components/molecules/LoginAndSignupBase'
import { ERRORCODES } from '@/constants/errorCodes'
import {
  failedWrapperVariants,
  innerWrapperVariants,
  headerVariants,
  largeButtonWrapperVariants,
  buttonWrapperVariants,
  smallButtonWrapperVariants,
  dubbleButtonWrapperVariants,
} from './Failed.variants'

export const Failed = () => {
  const { t } = useTranslation(['login', 'error'])
  const router = useRouter()
  const { pno, loginState, setLoginState } = useLogin()
  const { isTabletPortraitOrGreater } = useResponsive()
  const { show } = useIntercom()

  const initNewBankIdSession = async () => {
    setLoginState({ step: 'init' })
    try {
      const response = await initLogin(!isTabletPortraitOrGreater, pno || '')
      if (response) {
        if (response.orderRef) {
          setLoginState((prevState) => ({ ...prevState, step: 'collect', autoStartToken: response.autoStartToken ?? undefined, orderRef: response.orderRef ?? undefined }))
        }
      }
    } catch (er: unknown) {
      if (er) {
        const castedError = er as ErrorType
        const errors = extractDtoValidationErrors(castedError)
        setLoginState({ step: 'failed', statusCode: errors.includes(ERRORCODES.USERUNDER18) ? ERRORCODES.FAILED : ERRORCODES.NOTFOUND })
      }
    }
  }

  return (
    <LoginAndSignupBase>
      <Flex className={failedWrapperVariants()} direction="column" alignItems="center">
        <BirdError />
        {loginState?.statusCode === ERRORCODES.USER_BLOCKED && (
          <Flex className={innerWrapperVariants()} direction="column" alignItems="center">
            <h1 className={headerVariants()}>{t('error:userBlockedHeader')}</h1>
            <Text className="mb-10 text-base" variant="body">
              {t('error:userBlockedText')}
            </Text>
            <div className={buttonWrapperVariants()}>
              <div className={largeButtonWrapperVariants()}>
                <Button variant="primaryAlt" padding="14px 20px" text={t('returnToStartpage')} onClick={() => router.push('/')} />
              </div>
            </div>
          </Flex>
        )}
        {loginState?.statusCode === ERRORCODES.NOTFOUND && (
          <Flex className={innerWrapperVariants()} direction="column" alignItems="center">
            <h1 className={headerVariants()}>{t('noAccount')}</h1>
            <Text className="mb-10 text-base" variant="body">
              {t('registerAccount')}
            </Text>
            <div className={buttonWrapperVariants()}>
              <div className={largeButtonWrapperVariants()}>
                <Button variant="primaryAlt" padding="14px 20px" text={t('returnToStartpage')} onClick={() => router.push('/')} />
              </div>
            </div>
          </Flex>
        )}
        {loginState?.statusCode === ERRORCODES.FAILED && (
          <Flex className={innerWrapperVariants()} direction="column" alignItems="center">
            <h1 className={headerVariants()}>{t('tryAgain')}</h1>
            <Text className="mb-10" variant="body">
              {t('bankIdError')}
            </Text>
            <div className={dubbleButtonWrapperVariants()}>
              <div className={smallButtonWrapperVariants()}>
                <Button padding="14px 20px" withFullWidth variant="primaryAlt" text={t('tryAgain')} onClick={() => initNewBankIdSession()} />
              </div>
              <div className={smallButtonWrapperVariants()}>
                <Button padding="14px 20px" withFullWidth variant="ghost" text={t('contactUs')} onClick={() => show()} />
              </div>
            </div>
            <LinkButton noUnderline onClick={() => router.push('/')}>
              {t('back')}
            </LinkButton>
          </Flex>
        )}
        {loginState?.statusCode === ERRORCODES.GENERALERROR && (
          <Flex className={innerWrapperVariants()} direction="column" alignItems="center">
            <h1 className={headerVariants()}>{t('tryAgain')}</h1>
            <Text className="mb-10" variant="body">
              {t('generalError')}
            </Text>
            <div className={dubbleButtonWrapperVariants()}>
              <div className={smallButtonWrapperVariants()}>
                <Button withFullWidth padding="14px 20px" variant="primaryAlt" text={t('tryAgain')} onClick={() => setLoginState({ step: 'init' })} />
              </div>
              <div className={smallButtonWrapperVariants()}>
                <Button withFullWidth padding="14px 20px" variant="ghost" text={t('contactUs')} onClick={() => show()} />
              </div>
            </div>
            <LinkButton noUnderline onClick={() => router.push('/')}>
              {t('back')}
            </LinkButton>
          </Flex>
        )}
      </Flex>
    </LoginAndSignupBase>
  )
}
