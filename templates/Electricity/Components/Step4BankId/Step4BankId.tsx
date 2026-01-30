import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { pollPoaQrData } from '@/common/api/poa'
import { useElectricityProvider } from '@/common/context/electricity/electricityContext.provider'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import { useInterval } from '@/common/hooks/useInterval'
import useResponsive from '@/common/hooks/useResponsive'
import Button from '@/components/atoms/Button'
import Flex from '@/components/atoms/Flex'
import QrCode from '@/components/atoms/QrCode'
import Spinner from '@/components/atoms/Spinner'
import Text from '@/components/atoms/Text'
import BankId from '@/public/images/BankId.svg'
import { goBackButtonVariants, headerVariants, innerWrapperVariants, largeButtonWrapperVariants, step4BankIdWrapperVariants } from './Step4BankId.variants'

export interface Step4BankIdProps {
  cancel: () => void
}

const Step4BankId = ({ cancel }: Step4BankIdProps) => {
  const { t } = useTranslation(['common'])
  const { orderRef, autoStartToken, collectPoaBankIdSigning } = useElectricityProvider()
  const { theme } = useThemeContext()
  const { isTabletPortraitOrGreater } = useResponsive()
  const [currentQrData, setCurrentQrData] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (autoStartToken && !isTabletPortraitOrGreater) {
      window.location.href = `bankid:///?autostarttoken=${autoStartToken}`
    }
  }, [autoStartToken, isTabletPortraitOrGreater])

  useInterval(
    async () => {
      collectPoaBankIdSigning()
    },
    orderRef ? 1000 : null,
  )

  useInterval(
    async () => {
      const qrData = await pollPoaQrData(orderRef ?? '')
      setCurrentQrData(qrData)
    },
    orderRef && isTabletPortraitOrGreater ? 1000 : null,
  )

  return (
    <div className={step4BankIdWrapperVariants()}>
      <div className={innerWrapperVariants()}>
        <h1 className={headerVariants()}>{t('BANKID.signWithBankId')}</h1>
        <Text className="mb-15" variant="body">
          {t('BANKID.signWithBankIdSubtitle')}
        </Text>
        <Flex justifyContent="center">
          {!currentQrData && <Spinner scale={1.5} color="green" />}
          {currentQrData && (
            <div style={{ width: '250px', height: '250px', marginBottom: 12 }}>
              <QrCode url={currentQrData} withParentSize />
            </div>
          )}
        </Flex>

        {autoStartToken && (
          <div className={largeButtonWrapperVariants({ variant: theme === ThemeEnum.FASTIGHETSBYRAN ? 'fb' : 'normal' })}>
            <Button
              variant={theme === ThemeEnum.FASTIGHETSBYRAN ? 'fbPrimary' : 'primaryAlt'}
              iconLeft={<BankId color={theme === ThemeEnum.FASTIGHETSBYRAN ? '#FFF' : '#000'} />}
              text={t('BANKID.signWithBankIdButton')}
              padding="12px 52px"
              onClick={() => {
                window.location.href = `bankid:///?autostarttoken=${autoStartToken}`
              }}
            />
          </div>
        )}
        <div
          className={goBackButtonVariants()}
          onClick={() => {
            cancel()
          }}
        >
          {<Text variant="linkBig">{t('cancel')}</Text>}
        </div>
      </div>
    </div>
  )
}

export default Step4BankId
