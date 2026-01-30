'use client'

import React from 'react'
import { Modal, ModalContent, ModalTitle } from '@/components/molecules/Modal'
import MobileBottomSheet from '@/components/molecules/MobileBottomSheet'
import { useIsMobile } from '@/common/hooks/useIsMobile'
import { ChecklistItem } from '../../../types/checklist'
import Button from '@/components/atoms/Button'
import { useTranslation } from 'react-i18next'

interface ResetChecklistItemModalProps {
  item: ChecklistItem | null
  itemTitle: string
  isOpen: boolean
  onClose: () => void
  onReset: () => void
}

const ResetChecklistItemModal: React.FC<ResetChecklistItemModalProps> = ({ item, itemTitle, isOpen, onClose, onReset }) => {
  const isMobile = useIsMobile()
  const { t } = useTranslation('movePage')

  if (!item) return null

  const modalContent = (
    <>
      {isMobile && (
        <div className="flex justify-center pt-2 pb-2 bg-white rounded-t-[20px]">
          <div className="w-10 h-1 bg-[#767678]/30 rounded-full"></div>
        </div>
      )}

      <div className="p-6 bg-white">
        <h2 className="text-[20px] font-bold text-[#214766] mb-3">{itemTitle}</h2>
        <p className="text-[16px] text-[#767678] mb-6">{t('RESETCHECKLISTITEMMODAL.confirmMessage')}</p>

        <div className="flex flex-col gap-3 sm:flex-row-reverse">
          <Button onClick={onReset} variant="primary" className="w-full sm:w-auto" text={t('RESETCHECKLISTITEMMODAL.resetButton')} />
          <Button onClick={onClose} variant="outline" className="w-full sm:w-auto" text={t('RESETCHECKLISTITEMMODAL.cancelButton')} />
        </div>
      </div>
    </>
  )

  if (isMobile) {
    return (
      <MobileBottomSheet open={isOpen} onClose={onClose} withCloseButton={false} className="!p-0 flex flex-col bg-[#f8faf9]">
        <ModalTitle className="sr-only">{itemTitle}</ModalTitle>
        {modalContent}
      </MobileBottomSheet>
    )
  }
  return (
    <Modal open={isOpen}>
      <ModalContent setShowModal={onClose} withCloseButton size="small" className="!p-0 flex flex-col bg-[#f8faf9]">
        <ModalTitle className="sr-only">{itemTitle}</ModalTitle>
        {modalContent}
      </ModalContent>
    </Modal>
  )
}

export default ResetChecklistItemModal
