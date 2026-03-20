'use client'

import { useEffect, useState, KeyboardEvent } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import Link from 'next/link'
import useResponsive from '@/common/hooks/useResponsive'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Text from '@/components/atoms/Text'
import LinkButton from '@/components/linkButton'
import LoginAndSignupBase from '@/components/molecules/LoginAndSignupBase'
import BankId from '@/public/images/BankId.svg'
import Info from '@/public/images/Info.svg'
import {
  buttonWrapperVariants,
  headerSubtitleVariants,
  headerVariants,
  iconWrapperVariants,
  infoWrapperVariants,
  initWrapperVariants,
  innerWrapperVariants,
  inputAndButtonsWrapperVariants,
  largeButtonWrapperVariants,
  textWrapperVariants,
  thisDeviceButtonWrapperVariants,
} from '@/templates/LoginTemplate/Init/Init.variants'

export default function DemoLoginPreview() {
  const { t } = useTranslation(['login'])
  const { isTabletPortraitOrGreater } = useResponsive()
  const [isBankIdOnThisDeviceLogin, setIsBankIdOnThisDeviceLogin] = useState(true)
  const [personalNumber, setPersonalNumber] = useState('')

  useEffect(() => {
    if (isTabletPortraitOrGreater) {
      setIsBankIdOnThisDeviceLogin(false)
    }
  }, [isTabletPortraitOrGreater])

  const handleKeypress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      e.preventDefault()
    }
  }

  return (
    <LoginAndSignupBase>
      <div className={initWrapperVariants()}>
        <h1 className={headerVariants()}>{t('header')}</h1>
        <Text className={headerSubtitleVariants()} spacing="bottom">
          {t('headerSubtitle')}
        </Text>
        <Text className="mb-6 rounded-full bg-[var(--color-primary-main)]/10 px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-primary-main)]" variant="details">
          Visual demo
        </Text>
        <div className={innerWrapperVariants()}>
          {isBankIdOnThisDeviceLogin ? (
            <>
              <div className={thisDeviceButtonWrapperVariants()}>
                <div className={largeButtonWrapperVariants()}>
                  <Button variant="primaryAlt" iconRight={<BankId />} text={t('login')} className="!text-md" withFullWidth padding="10px 10px" />
                </div>
              </div>
              <LinkButton
                sx={{ fontSize: 12, fontWeight: '200', borderBottom: '1px solid', marginTop: 15 }}
                noUnderline={false}
                onClick={() => setIsBankIdOnThisDeviceLogin(false)}
              >
                {t('bankIdOtherDevice')}
              </LinkButton>
            </>
          ) : (
            <div className={inputAndButtonsWrapperVariants()}>
              <Input handleKeypress={handleKeypress} label={t('pno')} type="text" value={personalNumber} onChange={(e) => setPersonalNumber(e.currentTarget.value)} />
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
                  />
                </div>
              </div>
              <LinkButton
                sx={{ fontSize: 12, fontWeight: '200', borderBottom: '1px solid', marginTop: 8 }}
                noUnderline={false}
                onClick={() => setIsBankIdOnThisDeviceLogin(true)}
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
        {typeof navigator !== 'undefined' && navigator.userAgent.includes('SamsungBrowser') && (
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
