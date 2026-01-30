'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import Link from '@/components/molecules/Link'
import { containerVariants, paperVariants, textVariants, wrapperVariants } from './privacy-policy.variants'


export const PrivacyPolicyPage = () => {
  const { t } = useTranslation(['common'])

  return (
    <div className={containerVariants()}>
      <div className={wrapperVariants()}>
        <div className={paperVariants()}>
          <div className={textVariants()}>{t('privacyPolicy')}</div>
          <Link href={t('privacyPolicyLink')} underline>
            {t('privacyPolicyText')}
          </Link>
        </div>
      </div>
    </div>
  )
}
