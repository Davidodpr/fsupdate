import React from 'react'
import { useTranslation } from 'react-i18next'
import { useIntercom } from 'react-use-intercom'
import Link from 'next/link'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import Button from '@/components/atoms/Button'
import Flex from '@/components/atoms/Flex'
import Text from '@/components/atoms/Text'
import { titleVariants, wrapperVariants, additionalInfoVariants, phoneVariants, buttonWrapperVariants } from './ContactSection.variants'

const ContactSection = () => {
  const { t } = useTranslation('footer')
  const { show } = useIntercom()
  const { theme } = useThemeContext()

  return (
    <div className={wrapperVariants()}>
      <div className={titleVariants()}>
        {t('needHelp')} <div className={theme}>{t('contactFlyttsmart')}</div>
      </div>
      <Flex justifyContent="center" alignItems="center">
        <div className={buttonWrapperVariants()}>
          <Button text={t('chat')} variant="outline" onClick={show} />
        </div>
      </Flex>
      <Text style={{ marginTop: 24, marginBottom: 4 }}>{t('orCallUs')}</Text>
      <div className={phoneVariants()}>
        <Link href="tel:0812008822" className="!font-bold" style={{ color: 'var(--fs-colors-primaryMain)', textDecoration: 'underline' }}>
          {t('call')}
        </Link>
      </div>
      <div className={additionalInfoVariants()}>{t('openingHours')}</div>
      {/* Code below is used for different opening hours, save for easy change */}
      {/* <Flex direction="column" style={{ gap: 4, marginTop: 8 }}>
        <Text spacing="none">{t('differentOpeningHours')}</Text>
        <Text spacing="none">{t('differentOpeningHoursDates')}</Text>
        <Text spacing="none">{t('differentOpeningHoursTimes')}</Text>
      </Flex> */}
      {/* <AdditionalInfo>{t('monday')} 8-17</AdditionalInfo>
      <AdditionalInfo>{t('tuesday')} 8-17</AdditionalInfo>
      <AdditionalInfo>{t('wednesday')} 8-17</AdditionalInfo>
      <AdditionalInfo>{t('thursday')} 8-17</AdditionalInfo>
      <AdditionalInfo>{t('friday')} 8-16</AdditionalInfo> */}
    </div>
  )
}

export default ContactSection
