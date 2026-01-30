import React from 'react'
import { useTranslation } from 'react-i18next'
import Button from '@/components/atoms/Button'
import Text from '@/components/atoms/Text'
import { Modal, ModalContent, ModalTitle } from '@/components/molecules/Modal'
import BirdWarning from '@/public/images/Birdwarning.svg'
import {
  modalContentWrapperVariants,
  modalImageWrapperVariants,
  modalTextWrapperVariants,
  modalButtonWrapperVariants,
  modalHeaderVariants,
  modalDividerVariants,
} from './UrgentServicesModal.variants'

interface UrgentServicesModalProps {
  isOpen: boolean
  onClose: () => void
  onContactSupport?: () => void
}

export const UrgentServicesModal = ({ isOpen, onClose, onContactSupport }: UrgentServicesModalProps) => {
  const { t } = useTranslation(['movePage', 'common'])

  return (
    <Modal open={isOpen}>
      <ModalContent withCloseButton setShowModal={onClose}>
        <div className={modalHeaderVariants()}>
          <ModalTitle>
            <Text spacing="none" className="!font-bold !text-[18px]">
              {t('movePage:URGENT_SERVICES.title')}
            </Text>
          </ModalTitle>
        </div>
        <div className={modalDividerVariants()} />
        <div className={modalContentWrapperVariants()}>
          <div className={modalImageWrapperVariants()}>
            <BirdWarning width={190} height={147} />
          </div>
          <div className={modalTextWrapperVariants()}>
            <Text variant="body" spacing="bottom">
              {t('movePage:URGENT_SERVICES.description')}
            </Text>
            <Text variant="bodyBold" spacing="less">
              {t('movePage:URGENT_SERVICES.contactSupport')}
            </Text>
          </div>
          <div className={modalButtonWrapperVariants()}>
            <Button withFullWidth onClick={onClose} padding="10px 24px" text={t('common:understood')} />
            {onContactSupport && <Button withFullWidth onClick={onContactSupport} padding="10px 24px" text={t('movePage:URGENT_SERVICES.contactButton')} variant="outline" />}
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default UrgentServicesModal
