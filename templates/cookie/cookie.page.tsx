'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import Link from '@/components/molecules/Link'
import { backgroundVariants, containerVariants, wrapperVariants, paperVariants, titleVariants, subtitleVariants, paragraphVariants } from './Cookie.variants'


export const CookiePage = () => {
  const { t } = useTranslation('cookie')
  return (
    <div className={backgroundVariants()}>
      <div className={containerVariants()}>
        <div className={wrapperVariants()}>
          <div className={paperVariants()}>
            <div className={titleVariants()}>{t('title')}</div>
            <div className={subtitleVariants()}>{t('subtitle')}</div>
            <div className={paragraphVariants({ mb: 2 })}>{t('betterExperience')}</div>
            <div className={paragraphVariants({ mb: 4 })}>{t('sessionCookie')}</div>
            <div className={subtitleVariants()}>{t('thirdParty')}</div>
            <div>{t('collectInfo')}</div>
            <div className={paragraphVariants({ mb: 2 })}>{t('services')}</div>
            <div>
              Google Analytics <Link href="https://www.google.com/policies/privacy">https://www.google.com/policies/privacy</Link>
            </div>
            <div className={paragraphVariants({ mb: 2 })}>
              Intercom <Link href="https://www.intercom.com/terms-and-policies#privacy">https://www.intercom.com/terms-and-policies#privacy</Link>
            </div>
            <div className={paragraphVariants({ mb: 4 })}>{t('otherServices')}</div>
            <div className={subtitleVariants()}>{t('blocking')}</div>
            <div>{t('browsers')}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
