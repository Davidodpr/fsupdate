import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'
import { ShortLocale } from '@/common/enums/LocaleEnum'
import useChangeLanguage from '@/common/hooks/useChangeLanguage'
import Flex from '@/components/atoms/Flex'
import Text from '@/components/atoms/Text'
import Globe from '@/public/images/Globe.svg'

interface LanguageSelectProps {
  variant?: 'primary' | 'secondary' | 'secondaryBlack'
}

const LanguageSelect = ({ variant = 'primary' }: LanguageSelectProps) => {
  const { submitLocale } = useChangeLanguage()
  const { i18n } = useTranslation()
  const locale = i18n.language

  const changeLocale = useCallback(
    (value: string) => {
      submitLocale(value as ShortLocale)
    },
    [submitLocale],
  )

  const items = [
    {
      value: ShortLocale.SV,
      label: 'Svenska',
    },
    {
      value: ShortLocale.EN,
      label: 'English',
    },
  ]

  return (
    <div className="flex items-center justify-start relative h-full cursor-pointer">
      {variant === 'primary' && (
        <>
          <Text
            data-testid={locale === items[0].value ? 'active-swedish' : 'swedish'}
            className={clsx('!text-[15px]', locale === items[0].value ? '!text-[var(--color-primary-main)] !font-bold' : 'hover:text-[var(--color-primary-main)]')}
            onClick={() => changeLocale(items[0].value)}
            spacing="none"
          >
            {[items[0].label]}
          </Text>
          <Text spacing="none" style={{ padding: '0 4px' }}>
            /
          </Text>
          <Text
            data-testid={locale === items[1].value ? 'active-english' : 'english'}
            className={clsx('!text-[15px]', locale === items[1].value ? '!text-[var(--color-primary-main)] !font-bold' : 'hover:text-[var(--color-primary-main)]')}
            onClick={() => changeLocale(items[1].value)}
            spacing="none"
          >
            {[items[1].label]}
          </Text>
        </>
      )}
      {['secondary', 'secondaryBlack']?.includes(variant) && (
        <Flex
          justifyContent="center"
          alignItems="center"
          onClick={() => {
            changeLocale(locale === items[1].value ? items[0].value : items[1].value)
          }}
        >
          <Globe width={24} height={24} style={{ marginRight: 5, color: variant === 'secondaryBlack' ? 'black' : 'white' }} />
          <Text style={{ color: variant === 'secondaryBlack' ? 'black' : 'white', fontSize: 'var(--fs-fontSizes-6' }}>{locale === items[1].value ? 'SWE' : 'ENG'}</Text>
        </Flex>
      )}
    </div>
  )
}

export default LanguageSelect
