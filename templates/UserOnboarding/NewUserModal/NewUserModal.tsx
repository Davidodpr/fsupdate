import React from 'react'
import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'
import Image from 'next/legacy/image'
import Button from '@/components/atoms/Button'
import Flex from '@/components/atoms/Flex'
import H2 from '@/components/atoms/H2'
import Text from '@/components/atoms/Text'
import { Modal, ModalContent, ModalOverlay } from '@/components/molecules/Modal'
import FlyttSmartCelebrate from '@/public/images/flyttsmart_celebrate.svg'
import {
  buttonWrapperVariants,
  styledHeaderVariants,
  styledModalOverlayVariants,
  styledModalVariants,
  imageWrapperVariants,
  styledHeaderBottomVariants,
  termsTextVariants,
  termsTextLinkVariants,
  termsWrapperVariants,
} from './NewUserModal.variants'

export interface NewUserModalProps {
  openModal: boolean
  onClick: () => void
  brokerOfficeLogoUrl?: string
}

const NewUserModal = ({ openModal, brokerOfficeLogoUrl, onClick }: NewUserModalProps) => {
  const { t } = useTranslation(['signup'])
  return (
    <Modal open={openModal}>
      <ModalOverlay className={styledModalOverlayVariants()} />
      <ModalContent
        className={styledModalVariants()}
        withOverlayClose={true}
        setShowModal={() => {
          onClick()
        }}
        size="medium"
      >
        <Flex direction="column" justifyContent="start" alignItems="center">
          {brokerOfficeLogoUrl && (
            <Flex className={imageWrapperVariants({ extraPadding: true })} justifyContent="center" alignItems="center">
              <Image style={{ paddingBottom: '5px' }} src={brokerOfficeLogoUrl} objectFit="contain" width="124" height="60" alt="" />
            </Flex>
          )}
          <FlyttSmartCelebrate />
          <H2 className={styledHeaderVariants()}>{t('welcomeTo')}</H2>
          <H2 className={styledHeaderBottomVariants()}>{t('flyttsmart')}</H2>
          <div className={buttonWrapperVariants()}>
            <Button text={t('getItDone')} onClick={() => onClick()} />
          </div>
          <Flex className={clsx(termsWrapperVariants(), 'mt-2.5')} alignItems="center">
            <Text className={termsTextVariants()}>{t('terms')}</Text>
            <a className={termsTextLinkVariants()} href="https://flyttsmart.se/terms" target="_blank">
              {t('termsLinkText')}
            </a>
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  )
}

export default NewUserModal
