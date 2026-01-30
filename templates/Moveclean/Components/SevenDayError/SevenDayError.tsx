import React from 'react'
import { useTranslation } from 'react-i18next'
import { BirdError } from '@/components/atoms/BirdError/BirdError'
import Text from '@/components/atoms/Text'
import { failedWrapperVariants, innerWrapperVariants } from './SevenDayError.variants'

const SevenDayError = () => {
  const { t } = useTranslation(['moveclean', 'common'])

  return (
    <div className={failedWrapperVariants()}>
      <BirdError />
      <div className={innerWrapperVariants()}>
        <Text className="mb-5 !text-2xl !font-bolder !leading-8">{t('sevenDayErrorTitle')}</Text>
        <Text className="mb-5 text-base text-center" variant="body">
          {t('sevenDayErrorContent')}
        </Text>
        <Text className="mb-2.5 text-base text-center font-bold" variant="body">
          {t('sevenDayErrorContactHeader')}
        </Text>
        <Text className="mb-1.5 text-base text-center" variant="body">
          <strong>{t('sevenDayErrorPhone')}</strong> {t('sevenDayErrorPhoneNumber')} {t('sevenDayErrorPhoneHours')}
        </Text>
        <Text className="mb-5 text-base text-center" variant="body">
          <strong>{t('sevenDayErrorEmail')}</strong> {t('sevenDayErrorEmailAddress')}
        </Text>
        <Text className="mb-10 text-base text-center" variant="body">
          {t('sevenDayErrorHelpText')}
        </Text>
      </div>
    </div>
  )
}

export default SevenDayError
