import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ShortLocale } from '@/common/enums/LocaleEnum'
import useChangeLanguage from '@/common/hooks/useChangeLanguage'
import useResponsive from '@/common/hooks/useResponsive'
import Text from '@/components/atoms/Text'
import Select from '@/components/molecules/Select'

export const LanguageSelect = () => {
  const { submitLocale } = useChangeLanguage()
  const { i18n } = useTranslation()
  const currentLocale = i18n.language
  const { isClient } = useResponsive()

  const changeLocale = useCallback(
    (value: string) => {
      submitLocale(value as ShortLocale)
    },
    [submitLocale],
  )

  if (!isClient) {
    return (
      <Text
        style={{
          fontSize: 15,
          padding: '0 20px 0 12px',
          fontWeight: 700,
          color: 'var(--color-secondary-main)',
        }}
      >
        Svenska
      </Text>
    )
  }

  return (
    <Select
      defaultValue="sv"
      value={currentLocale}
      onValueChange={changeLocale}
      items={[
        {
          value: ShortLocale.EN,
          label: 'English',
        },
        {
          value: ShortLocale.SV,
          label: 'Svenska',
        },
      ]}
      noBorder
      filter
    />
  )
}
