'use client'

import { useTranslation } from 'react-i18next'
import useResponsive from '@/common/hooks/useResponsive'
import { BirdError } from '@/components/atoms/BirdError'
import Button from '@/components/atoms/Button'
import Flex from '@/components/atoms/Flex'
import H2 from '@/components/atoms/H2'
import Text from '@/components/atoms/Text'
import ArrowsCounterClockwise from '@/public/images/ArrowsCounterClockwise.svg'
import Email from '@/public/images/Email.svg'
import Phone from '@/public/images/Phone-circle.svg'
import { buttonsWrapperVariants, contactUsVariants, cookieBlockedWrapperVariants, infoWrapperVariants } from './AdblockerFallback.variants'


export const AdblockerFallback = () => {
  const { t } = useTranslation(['adblockPage'])
  const { isTabletPortraitOrGreater } = useResponsive()
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" style={{ height: isTabletPortraitOrGreater ? '100vh' : '100%', backgroundColor: '#f8f9fa' }}>
      <div className={cookieBlockedWrapperVariants()}>
        <Flex justifyContent="center" alignItems="center" style={{ marginBottom: '1rem' }}>
          <BirdError />
        </Flex>
        <Flex justifyContent="center" alignItems="center" style={{ textAlign: 'center' }}>
          <H2>{t('header')}</H2>
        </Flex>
        <Text variant="body">{t('firstInfoSection')}</Text>
        <div style={{ margin: '64px 0px' }}>
          <Text variant="bodyBold">{t('listTitle')}</Text>
          <ol>
            <li>{t('listItem1')}</li>
            <li>{t('listItem2')}</li>
          </ol>
        </div>
        <Flex direction={isTabletPortraitOrGreater ? 'row' : 'column'} justifyContent="space-between" alignItems="stretch">
          <div className={contactUsVariants()}>
            <Text variant="bodyBold" style={{ marginBottom: '1rem' }}>
              {t('contactUsTitle')}
            </Text>
            <Flex direction="row" justifyContent="start" alignItems="center">
              <Email width={25} height={25} style={{ marginRight: 4 }} />
              <Text variant="body" style={{ marginLeft: 12 }}>
                <a href="mailto:hej@flyttsmart.se">hej@flyttsmart.se</a>
              </Text>
            </Flex>
            <Flex direction="row" justifyContent="start" alignItems="center">
              <Phone width={25} height={25} style={{ marginRight: 11 }} />
              <Text variant="body" style={{ marginLeft: 4 }}>
                <a href="tel:081200882">08-12 00 88 22</a>
              </Text>
            </Flex>
          </div>
          <div className={infoWrapperVariants()}>
            <Flex direction="row" justifyContent="start" alignItems="center">
              <Text variant="bodyBold">{t('infoSectionTitle')}</Text>
            </Flex>
            <Text variant="body">{t('infoSectionText')}</Text>
          </div>
        </Flex>
        <Flex justifyContent="center" alignItems="center" style={{ marginTop: '32px' }}>
          <div className={buttonsWrapperVariants()}>
            <Button
              onClick={() => {
                window.location.reload()
              }}
              variant="green"
              padding="6px 16px !important"
              text={t('reloadPage')}
              iconLeft={<ArrowsCounterClockwise width={20} height={20} />}
            />
          </div>
        </Flex>
      </div>
    </Flex>
  )
}
