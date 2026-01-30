'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import Flex from '@/components/atoms/Flex'
import Link from '@/components/molecules/Link'
import { containerVariants, wrapperVariants, paperVariants, textVariants } from './PartnerPolicyPage.variants'


export const PartnerPolicyPage = () => {
  const { t } = useTranslation(['common'])

  return (
    <div className={containerVariants()}>
      <div className={wrapperVariants()}>
        <div className={paperVariants()}>
          <div className={textVariants()}>{t('common:partnerPolicy')}</div>
          <Flex direction="column" style={{ gap: 8, width: 'fit-content' }}>
            <Link href={t('common:partnerPolicyLink')} underline>
              {t('common:partnerPolicyText')}
            </Link>
            <Link href={t('common:cooperationTermsLink')} underline>
              {t('common:cooperationTermsText')}
            </Link>
          </Flex>
        </div>
      </div>
    </div>
  )
}
