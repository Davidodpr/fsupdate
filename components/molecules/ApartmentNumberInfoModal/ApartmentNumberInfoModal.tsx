import React from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/legacy/image'
import { IMAGEKIT_IMAGES } from '@/common/enums/ImageKitImageEnum'
import useResponsive from '@/common/hooks/useResponsive'
import Text from '@/components/atoms/Text'
import { Modal, ModalContent, ModalTitle } from '../Modal'
import { modalHeaderWrapperVariants, modalContentWrapperVariants, modalContentTextWrapperVariants, modalContentTextVariants } from './ApartmentNumberInfoModal.variants'

export interface ApartmentNumberInfoModalProps {
  showModal: boolean
  setShowModal: (value: boolean) => void
}

const ApartmentNumberInfoModal = ({ showModal, setShowModal }: ApartmentNumberInfoModalProps) => {
  const { isTabletPortraitOrGreater } = useResponsive()
  const { t } = useTranslation(['common'])

  return (
    <Modal open={showModal}>
      <ModalContent withCloseButton setShowModal={setShowModal} size={isTabletPortraitOrGreater ? 'large' : 'medium'}>
        <div className={modalHeaderWrapperVariants()}>
          <ModalTitle>
            <Text variant="largeBold" spacing="none">
              {t('APARTMENTINFOMODAL.title')}
            </Text>
          </ModalTitle>
        </div>
        <div className={modalContentWrapperVariants()}>
          <div className={modalContentTextWrapperVariants()}>
            <div className={modalContentTextVariants()}>
              <Text variant="body">{t('APARTMENTINFOMODAL.text1')}</Text>
            </div>
            <div className={modalContentTextVariants()}>
              <Text variant="body">{t('APARTMENTINFOMODAL.text2')}</Text>
            </div>
            <div className={modalContentTextVariants()}>
              <Text variant="body">{t('APARTMENTINFOMODAL.text3')}</Text>
            </div>
          </div>
          <Image src={IMAGEKIT_IMAGES.APARTMENT_NUMBER_GUIDE} alt="Apartment number guide" width={150} height={isTabletPortraitOrGreater ? 350 : 200} />
        </div>
      </ModalContent>
    </Modal>
  )
}

export default ApartmentNumberInfoModal
