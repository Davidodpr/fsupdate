'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import Link from '@/components/molecules/Link'
import { backgroundVariants, containerVariants, wrapperVariants, paperVariants, titleVariants } from './CodeOfConduct.variants'


export const CodeOfConductPage = () => {
  const { t } = useTranslation(['common'])

  return (
    <div className={backgroundVariants()}>
      <div className={containerVariants()}>
        <div className={wrapperVariants()}>
          <div className={paperVariants()}>
            <div className={titleVariants()}>{t('codeOfConduct')}</div>
            <Link href={t('codeOfConductLink')} underline>
              {t('codeOfConductText')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
