import React from 'react'
import { useTranslation } from 'react-i18next'
import useNextBestAction from 'hooks/nextBestAction'
import formatDate from '@/appComponents/format'
import { useElectricityProvider } from '@/common/context/electricity/electricityContext.provider'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { useUserContext } from '@/common/context/user/UserProvider'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import Flex from '@/components/atoms/Flex'
import Text from '@/components/atoms/Text'
import SuccessPageNew from '@/components/organisms/SuccessPageNew'
import { mainWrapperVariants, textWithWidthVariants, flexWithPaddingVariants } from './Step5Confirmation.variants'

const Step5Confirmation = () => {
  const { t } = useTranslation(['electricity', 'common'])
  const { theme } = useThemeContext()
  const { nextBestAction } = useNextBestAction()
  const {
    user: {
      currentMove: { toAddress },
    },
  } = useUserContext()
  const { currentProvider, startDate } = useElectricityProvider()

  return currentProvider?.provider ? (
    <Flex direction="column" justifyContent="center">
      <SuccessPageNew
        gaEventName="electricity_complete"
        nextBestAction={nextBestAction}
        isLoggedIn={true}
        moreInfo={t('CONFIRMATIONPAGE.confirmationSubtitle')}
        subtitle={t('CONFIRMATIONPAGE.confirmationText', { provider: t(`STEP4SUMMARY.PROVIDERS.${currentProvider?.provider}`) })}
        title={t('CONFIRMATIONPAGE.title')}
        buttonText={t('CONFIRMATIONPAGE.toTheMovePage')}
        titleSpecial={t('CONFIRMATIONPAGE.titleSpecial')}
        customCtaText={theme === ThemeEnum.FASTIGHETSBYRAN ? t('CONFIRMATIONPAGE.customCtaText') : undefined}
      >
        <Flex className={mainWrapperVariants()} direction="column">
          <Flex className={flexWithPaddingVariants()} justifyContent="space-between" alignItems="center">
            <Text variant="bodyBold" spacing="none">
              {t('STEP4SUMMARY.electricityChoice')}
            </Text>
            <Text className={textWithWidthVariants()} variant="body" spacing="none">
              {t(`STEP4SUMMARY.PROVIDERS.${currentProvider.provider}Choice`)}
            </Text>
          </Flex>
          <Flex className={flexWithPaddingVariants()} justifyContent="space-between" alignItems="center">
            <Text variant="bodyBold" spacing="none">
              {t('CONFIRMATIONPAGE.startingDate')}
            </Text>
            <Text variant="body" spacing="none">
              {formatDate(startDate, 'dd MMMM yyyy')}
            </Text>
          </Flex>
          {!!currentProvider.discountPeriod && currentProvider?.discountPeriod > 0 && (
            <Flex className={flexWithPaddingVariants()} justifyContent="space-between">
              <Text variant="bodyBold" spacing="none">
                {t('STEP4SUMMARY.flyttsmartDiscount', { months: currentProvider?.discountPeriod })}
              </Text>
              <Text variant="body" spacing="none">
                -{currentProvider?.subscriptionFeeDiscount} {t('moneyMonth')}
              </Text>
            </Flex>
          )}

          {!!currentProvider?.kwhDiscount && currentProvider?.kwhDiscount > 0 && (
            <Flex className={flexWithPaddingVariants()} justifyContent="space-between">
              <Text spacing="none" variant="bodyBold">
                {t('STEP4SUMMARY.electricityPriceDiscount', { months: currentProvider?.discountPeriod })}
              </Text>
              <Text spacing="none" variant="body">{`-${currentProvider.kwhDiscount} ${t(`PROVIDERDETAILS.pennyKwh`)}`}</Text>
            </Flex>
          )}
          {!!currentProvider?.campaignDiscountWithVAT && (
            <Flex className={flexWithPaddingVariants()} justifyContent="space-between">
              <Text spacing="none" variant="bodyBold">
                {t('STEP4SUMMARY.campaignDiscount', { months: currentProvider?.discountPeriod })}
              </Text>
              <Text spacing="none" variant="body">{`-${currentProvider.campaignDiscountWithVAT} ${t('moneyMonth')}`}</Text>
            </Flex>
          )}
          <Flex className={flexWithPaddingVariants()} justifyContent="space-between" alignItems="center">
            <Text variant="bodyBold" spacing="none">
              {t('STEP4SUMMARY.address')}
            </Text>
            <Text className={textWithWidthVariants()} variant="body" spacing="none">
              {`${toAddress?.street}, ${toAddress?.zip} ${toAddress?.city}`}
            </Text>
          </Flex>
        </Flex>
      </SuccessPageNew>
    </Flex>
  ) : null
}

export default Step5Confirmation
