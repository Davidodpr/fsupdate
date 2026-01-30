'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import ExitActivityButton from '@/components/atoms/ExitActivityButton'
import Text from '@/components/atoms/Text'
import { serviceAlreadyBookedVariants } from './ServiceAlreadyBooked.variants'

interface ServiceAlreadyBookedProps {
  isServiceUnavailable?: boolean
}

const ServiceAlreadyBooked = ({ isServiceUnavailable }: ServiceAlreadyBookedProps) => {
  const { t } = useTranslation(['common', 'error'])
  const { theme } = useThemeContext()
  const variants = serviceAlreadyBookedVariants()

  const getSubtitleText = () => {
    if (isServiceUnavailable) {
      return t('serviceUnavialableText')
    }
    if (theme === ThemeEnum.FASTIGHETSBYRAN) {
      return t('error:alreadyDoneSubTitleFb')
    } else {
      return t('error:alreadyDoneSubTitleFs')
    }
  }

  return (
    <div className={variants.serviceAlreadyBookedWrapper()}>
      <div className={variants.serviceAlreadyBookedInnerWrapper()}>
        <h1 className={variants.header()}>{isServiceUnavailable ? t('serviceUnavialable') : t('error:alreadyDone')}</h1>
        <Text variant="large" className={variants.styledText()}>
          {getSubtitleText()}
        </Text>
        <div className={variants.largeButtonWrapper()}>
          <ExitActivityButton />
        </div>
      </div>
    </div>
  )
}

export default ServiceAlreadyBooked
