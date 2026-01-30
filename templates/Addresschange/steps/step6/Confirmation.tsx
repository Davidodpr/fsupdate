import { useTranslation } from 'react-i18next'
import formatDate from '@/appComponents/format'
import { useAddresschangeContext } from '@/common/context/addresschange/addresschange.provider'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import Flex from '@/components/atoms/Flex'
import Text from '@/components/atoms/Text'
import SuccessPageNew from '@/components/organisms/SuccessPageNew'

export const Confirmation = () => {
  const { contract, orderMetaData } = useAddresschangeContext()
  const { theme } = useThemeContext()
  const { t } = useTranslation('addresschange, common')

  return (
    <Flex style={{ padding: '15px 0 30px', display: 'flex', flexDirection: 'column' }} justifyContent="center">
      <SuccessPageNew
        gaEventName="addresschange-confirmation"
        isLoggedIn={true}
        subtitle={t('addresschange:CONFIRMATION.subTitle')}
        title={t('addresschange:CONFIRMATION.title1')}
        titleSpecial={t('addresschange:CONFIRMATION.title2')}
        customCtaText={theme === ThemeEnum.FASTIGHETSBYRAN ? t('addresschange:CONFIRMATION.button') : undefined}
      >
        <div className="flex flex-col w-full px-4 py-8 md:w-[400px] md:p-4">
          <div className="flex justify-between items-center pb-4">
            <Text variant="bodyBold" spacing="none">
              {t('addresschange:SUMMARY.moveDate')}
            </Text>
            <Text variant="body" spacing="none">
              {formatDate(contract?.moveDate || new Date())}
            </Text>
          </div>
          <div className="flex justify-between items-center pb-4">
            <Text variant="bodyBold" spacing="none">
              {t('addresschange:SUMMARY.newAddress')}
            </Text>
            {contract && (
              <Text variant="body" spacing="none" className="w-[150px] text-right md:w-auto">
                {contract.newAddress.street} {contract.newAddress.streetNumber}, {contract.newAddress.zip} {contract.newAddress.city}{' '}
                {contract.newAddress.apartmentNumber && `, lgh ${contract.newAddress.apartmentNumber}`}
              </Text>
            )}
          </div>
          <div className="flex justify-between pb-4">
            <Text variant={'bodyBold'}>{t('addresschange:CONFIRMATION.receiptNumber')}</Text>
            <Text>{orderMetaData && orderMetaData.meta?.receiptNumber}</Text>
          </div>
          <Text>{t('addresschange:CONFIRMATION.information')}</Text>
        </div>
      </SuccessPageNew>
    </Flex>
  )
}
