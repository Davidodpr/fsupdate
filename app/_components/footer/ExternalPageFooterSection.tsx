import React from 'react'
import { useTranslation } from 'react-i18next'
import useResponsive from '@/common/hooks/useResponsive'
import Text from '@/components/atoms/Text'
import MoltoBene from '@/public/images/Molto_bene.svg'
import Medal from '@/public/images/Satisfied.svg'
import TalkToAPro from '@/public/images/Talk_to_a_pro_2.svg'
import { flyttsmartDarkFooterWrapperVariants, flyttsmartAboutWrapperVariants, flyttsmartProsFooterWrapperVariants, infoVariants } from './Footer.variants'

interface ExternalPageFooterSectionProps {
  aboutFlyttsmartFooterRef: React.RefObject<HTMLDivElement | null>
}

const ExternalPageFooterSection = ({ aboutFlyttsmartFooterRef }: ExternalPageFooterSectionProps) => {
  const { t } = useTranslation('external')
  const { isTabletLandscapeOrGreater } = useResponsive()
  return (
    <div className={flyttsmartDarkFooterWrapperVariants()}>
      <div ref={aboutFlyttsmartFooterRef} className={flyttsmartAboutWrapperVariants()}>
        <h2 className="text-2xl font-bold py-4">{t('ABOUT.title')}</h2>
        <p>{t('ABOUT.text1')}</p>
        <p className="mt-4">{t('ABOUT.text3')}</p>
      </div>
      <div className={flyttsmartProsFooterWrapperVariants()}>
        <div className={infoVariants()}>
          <MoltoBene />
          <Text variant="largeBold" spacing={isTabletLandscapeOrGreater ? 'bottom' : 'less'}>
            {t('PROS.satisfiedCustomer')}
          </Text>
          <Text variant="large" spacing="bottom">
            {t('PROS.text1')}
          </Text>
        </div>

        <div className={infoVariants()}>
          <Medal className="[&_path]:stroke-white" />
          <Text variant="largeBold" spacing={isTabletLandscapeOrGreater ? 'bottom' : 'less'}>
            {t('PROS.responsible')}
          </Text>
          <Text variant="large" spacing="bottom">
            {t('PROS.text2')}
          </Text>
        </div>
        <div className={infoVariants()}>
          <TalkToAPro />
          <Text variant="largeBold" spacing={isTabletLandscapeOrGreater ? 'bottom' : 'less'}>
            {t('PROS.movingExpert')}
          </Text>
          <Text variant="large" spacing="bottom">
            {t('PROS.text3')}
          </Text>
        </div>
      </div>
    </div>
  )
}

export default ExternalPageFooterSection
