import React from 'react'
import ReactGA4 from 'react-ga4'
import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'
import useResponsive from '@/common/hooks/useResponsive'
import Button from '@/components/atoms/Button'
import Flex from '@/components/atoms/Flex'
import H2 from '@/components/atoms/H2'
import Text from '@/components/atoms/Text'
import BirdLogo from '@/public/images/Bird.svg'
import { buttonWrapperVariants, styledHeaderVariants, styledModalVariants, termsTextVariants, termsTextLinkVariants, termsWrapperVariants } from './SSOModal.variants'

export interface SSOModalProps {
  setTriggerCreateNewUser: (arg0: boolean) => void
}

const SSOModal = ({ setTriggerCreateNewUser }: SSOModalProps) => {
  const { t } = useTranslation(['sso'])
  const { isTabletPortraitOrGreater } = useResponsive()

  return (
    <div className={styledModalVariants()}>
      <Flex direction="column" justifyContent="start" alignItems="center" style={{ height: '100%' }}>
        <BirdLogo width={34} height={46} />
        <H2 className={styledHeaderVariants()}>{t('welcomeToFlyttsmart')}</H2>
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ maxWidth: '100%', textAlign: 'center', margin: isTabletPortraitOrGreater ? '24px 0' : '16px 0' }}
        >
          <Text spacing="none" style={{ width: isTabletPortraitOrGreater ? '70%' : '90%' }}>
            {t('welcomeText')}
          </Text>
          <Text spacing="none">{t('welcomeTextFastighetsbyran')}</Text>
        </Flex>
        <Flex direction="column" style={{ marginTop: 'auto', width: '100%', padding: '0 16px' }}>
          <div className={buttonWrapperVariants()}>
            <Button
              text={t('getItDone')}
              withFullWidth
              padding="14px 16px"
              onClick={() => {
                ReactGA4.event('accept_sso_terms')
                setTriggerCreateNewUser(true)
              }}
            />
          </div>
          <Flex className={clsx(termsWrapperVariants(), 'mt-8 text-center')} alignItems="center" justifyContent="center">
            <Text className={termsTextVariants()}>{t('terms')}</Text>
            <a className={termsTextLinkVariants()} href="https://flyttsmart.se/terms" target="_blank">
              {t('termsLinkText')}
            </a>
          </Flex>
        </Flex>
      </Flex>
    </div>
  )
}

export default SSOModal
