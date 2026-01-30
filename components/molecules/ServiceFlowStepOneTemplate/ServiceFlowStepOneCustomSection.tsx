import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/legacy/image'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import useResponsive from '@/common/hooks/useResponsive'
import { ActivityEnum } from '@/common/types/activity'
import Flex from '@/components/atoms/Flex'
import Text from '@/components/atoms/Text'
import { Modal, ModalContent } from '@/components/molecules/Modal'
import Clock from '@/public/images/Clock.svg'
import Close from '@/public/images/Close.svg'
import {
  sectionWrapperVariants,
  textWrapperVariants,
  bottomTextWrapperVariants,
  clockWrapperVariants,
  readMoreVariants,
  modalTextDescriptionVariants,
} from './ServiceFlowStepOneCustomSection.variants'

export interface ServiceFlowStepOneCustomSectionProps {
  variant: ActivityEnum.POWER | ActivityEnum.INTERNET | ActivityEnum.INSURANCE
}

const ServiceFlowStepOneCustomSection = ({ variant }: ServiceFlowStepOneCustomSectionProps) => {
  const { t } = useTranslation(['electricity', 'broadband', 'common'])
  const { isTabletPortraitOrGreater } = useResponsive()
  const { iconSet } = useThemeContext()
  const [showModal, setShowModal] = useState(false)
  const topImageLink = iconSet.ELECTRICITY_FLOW_1
  const middleImageLink = iconSet.ELECTRICITY_FLOW_2

  const broadbandTopImageLink = iconSet.BROADBAND_WIFI_ICON
  const broadbandMiddleImageLink = iconSet.BROADBAND_WIFI_WITH_ARROW_ICON
  const broadbandBottomImageLink = iconSet.BROADBAND_ROUTER_ICON
  return (
    <>
      {variant === ActivityEnum.POWER && (
        <Flex className={sectionWrapperVariants()} justifyContent="start" direction="column">
          <Flex alignItems="center">
            {isTabletPortraitOrGreater && topImageLink && <Image src={topImageLink} alt={'Lightning'} width={30} height={30} />}
            <Text variant="largeBlack" spacing="none" style={{ paddingLeft: 10 }}>
              {t('STEPONE.fixesHeader')}
            </Text>
          </Flex>
          <div className={textWrapperVariants()}>
            <Text variant="body">{t('STEPONE.fixesTextSectionOne')}</Text>
            <Text variant="body" spacing="none">
              - {t('STEPONE.fixesListItemOne')}
            </Text>
            <Text variant="body" spacing="less">
              - {t('STEPONE.fixesListItemTwo')}
            </Text>
            <Text spacing="top" variant="body">
              {t('STEPONE.fixesTextSectionTwo')}
            </Text>
          </div>
          <Flex alignItems="center" style={{ marginTop: 40 }}>
            {isTabletPortraitOrGreater && middleImageLink && <Image src={middleImageLink} alt={'Lightning'} width={30} height={30} />}
            <Text variant="largeBlack" spacing="none" style={{ paddingLeft: 10 }}>
              {t('STEPTWO.getItDone')}
            </Text>
          </Flex>
          <div className={bottomTextWrapperVariants()}>
            <Text variant="body" spacing="less">
              - {t('STEPTWO.fixesListItemOne')}
            </Text>
            <Text variant="body" spacing="less">
              - {t('STEPTWO.fixesListItemTwo')}
            </Text>
            <Text spacing="less" variant="body">
              - {t('STEPTWO.fixesListItemThree')}
            </Text>
            <Text spacing="less" variant="body">
              - {t('STEPTWO.fixesListItemFour')}
            </Text>
          </div>
        </Flex>
      )}

      {variant === ActivityEnum.INTERNET && (
        <Flex className={sectionWrapperVariants()} justifyContent="start" direction="column">
          <Flex alignItems="center">
            {isTabletPortraitOrGreater && broadbandTopImageLink && <Image src={broadbandTopImageLink} alt={'Lightning'} width={30} height={30} />}
            <Text variant="largeBlack" spacing="none" style={{ paddingLeft: 10 }}>
              {t('broadband:STEPONE.fixesHeader')}
            </Text>
          </Flex>
          <div className={textWrapperVariants()} style={{ paddingTop: 17 }}>
            <Text variant="body" spacing="none">
              - {t('broadband:STEPONE.fixesListItemOne')}
            </Text>
            <Text variant="body" spacing="less">
              - {t('broadband:STEPONE.fixesListItemTwo')}
            </Text>
            <Text variant="body" spacing="less">
              - {t('broadband:STEPONE.fixesListItemThree')}
            </Text>
          </div>
          <Flex alignItems="center">
            {isTabletPortraitOrGreater && broadbandMiddleImageLink && <Image src={broadbandMiddleImageLink} alt={'Lightning'} width={30} height={30} />}
            <Text variant="largeBlack" spacing="top" style={{ paddingLeft: 10 }}>
              {t('broadband:STEPONE.fixesTextSectionTwoTitle')}
            </Text>
          </Flex>
          <div className={textWrapperVariants()} style={{ maxWidth: 650, paddingBottom: 17 }}>
            <Text>{t('broadband:STEPONE.fixesTextSectionTwo')}</Text>
            <span className={readMoreVariants()} onClick={() => setShowModal(!showModal)}>
              {t('common:readMore')}
            </span>
          </div>
          <Flex alignItems="center">
            {isTabletPortraitOrGreater && broadbandBottomImageLink && <Image src={broadbandBottomImageLink} alt={'Lightning'} width={30} height={30} />}
            <Text variant="largeBlack" spacing="top" style={{ paddingLeft: 10 }}>
              {t('broadband:STEPONE.fixesListItemThreeTitle')}
            </Text>
          </Flex>
          <div className={textWrapperVariants()} style={{ paddingTop: 17, maxWidth: 650 }}>
            <Text variant="body" spacing="none">
              - {t('broadband:STEPONE.fixesListItemThreeItemOne')}
            </Text>
            <Text variant="body" spacing="less">
              - {t('broadband:STEPONE.fixesListItemThreeItemTwo')}
            </Text>
            <Text variant="body" spacing="less">
              - {t('broadband:STEPONE.fixesListItemThreeItemThree')}
            </Text>
          </div>
        </Flex>
      )}

      <Modal open={showModal}>
        <ModalContent setShowModal={setShowModal}>
          <Flex direction="row" justifyContent="space-between" alignItems="center">
            <Text variant="largeBold" style={{ fontWeight: '$bold' }}>
              {t('broadband:STEPONE.bindingTimeDescriptionTitle')}
            </Text>
            <Close width={14} height={14} onClick={() => setShowModal(false)} style={{ cursor: 'pointer' }} />
          </Flex>
          <hr />
          <Flex direction="row" justifyContent="space-between" alignItems="center">
            <div>
              <Text className={modalTextDescriptionVariants()} spacing="top" variant="medium">
                {t('broadband:STEPONE.bindingTimeDescriptionPartOne')}
              </Text>
              <Text className={modalTextDescriptionVariants()} spacing="top" variant="bodyBold">
                {t('broadband:STEPONE.bindingTimeDescriptionPartTwo')}
              </Text>
              <Text className={modalTextDescriptionVariants()} spacing="top" variant="medium">
                {t('broadband:STEPONE.bindingTimeDescriptionPartThree')}
              </Text>
            </div>
            <div className={clockWrapperVariants()}>
              <Clock />
            </div>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ServiceFlowStepOneCustomSection
