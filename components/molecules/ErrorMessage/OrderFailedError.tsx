import React from 'react'
import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'
import { usePathname } from 'next/navigation'
import Button from '@/components/atoms/Button'
import Flex from '@/components/atoms/Flex'
import Text from '@/components/atoms/Text'
import XCircle from '@/public/images/XCircle.svg'

export interface OrderFailErrorProps {
  show: () => void
  setOrderError?: (value: boolean) => void
  cancel?: () => void
}

const OrderFailError = ({ show, setOrderError, cancel }: OrderFailErrorProps) => {
  const { t } = useTranslation(['common'])
  const pathname = usePathname()
  const isQuotationPage = pathname.includes('quotation')
  const isElectricityPage = pathname.includes('electricity')

  return (
    <div
      className={clsx(
        'font-[var(--font-family-main)] text-[var(--color-text-main)] w-full flex-1 flex flex-col',
        isQuotationPage && 'bg-[#E8EDF0]',
        isElectricityPage && 'bg-transparent',
      )}
    >
      <div className="flex flex-col items-center w-full flex-1 px-4 py-8 md:w-full md:max-w-[464px] md:flex md:flex-col md:items-center md:mx-auto md:mt-8 md:mb-4">
        <Flex
          justifyContent="center"
          alignItems="center"
          direction="column"
          className="mx-auto w-full p-4 relative rounded-[var(--radius-border-radius-main)] shadow-[0px_4px_32px_0px_rgba(0,0,0,0.07)] h-auto bg-[var(--color-background-secondary)] mt-4 flex-col md:px-8 md:py-6 sm:max-w-[629px]"
          style={{ padding: 32, marginTop: 0 }}
        >
          <Text spacing="none" style={{ marginBottom: '16px', fontWeight: 'bold', fontSize: 24, lineHeight: '32px', textAlign: 'center' }}>
            {t('common:tryAgain')}
          </Text>
          <XCircle />
          <Text spacing="none" style={{ marginTop: '16px', fontSize: '18px', paddingTop: 4, fontWeight: 400, color: 'var(--color-text-secondary)' }}>
            {t('common:somethingWrong')}
          </Text>
          <Text spacing="none" style={{ marginTop: '32px', fontSize: '18px', textAlign: 'center', fontWeight: 400, color: 'var(--color-text-secondary)' }}>
            {t('common:contactUsIfStillError')}
          </Text>
        </Flex>
        <div className="max-w-[240px] w-[240px] mx-auto mt-8">
          <Button onClick={() => (setOrderError ? setOrderError(false) : cancel ? cancel() : null)} text={t('common:tryAgain')} padding="8px 32px !important" withFullWidth />
        </div>
        <div className="max-w-[240px] w-[240px] mx-auto mt-2.5">
          <Button variant="outline" onClick={() => show()} text={t('common:contactUs')} padding="8px 32px !important" withFullWidth />
        </div>
      </div>
    </div>
  )
}

export default OrderFailError
