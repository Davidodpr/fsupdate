'use client'

import { UseFormRegister, UseFormGetValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import ImageKit from '@/components/atoms/ImageKit'
import Input from '@/components/atoms/Input'
import Text from '@/components/atoms/Text'
import InfoBoxColored from '../InfoBoxColored'
import { Modal, ModalContent } from '../Modal'
import { apartmentNumberVariants } from './ApartmentNumber.variants'


export interface ApartmentNumberProps {
  showModal: boolean
  apartmentNumberError: { valid: boolean; message: string }
  setShowModal: (value: boolean) => void
  getValues: UseFormGetValues<AddresschangeFormValues>
  handleApartmentNumberChange: (value: string) => void
  register: UseFormRegister<AddresschangeFormValues>
}

export const ApartmentNumber = ({ showModal, apartmentNumberError, setShowModal, getValues, handleApartmentNumberChange, register }: ApartmentNumberProps) => {
  const { t } = useTranslation(['addresschange', 'common'])
  const variants = apartmentNumberVariants()

  return (
    <>
      <div className={variants.inputWrapper()} style={{ width: '50%' }}>
        <Input
          defaultValue={getValues().apartmentNumber}
          type="text"
          label={t('common:apartmentNumber')}
          {...register('apartmentNumber')}
          onBlur={(e) => handleApartmentNumberChange(e.target.value)}
          error={
            (!apartmentNumberError.valid &&
              apartmentNumberError.message.length > 0 &&
              (apartmentNumberError.message === 'NON_EXISTING' ? t('error:nonExistingApartmentNumber') : t('error:apartmentNumber'))) ||
            undefined
          }
        />
      </div>
      <div className={variants.infoBoxWrapper()}>
        <InfoBoxColored type="info" showIcon>
          <Text spacing="none" variant="bodySmall">
            {t('addresschange:ADDRESS.apartmentNumberInfo')}{' '}
            <Link
              href=""
              style={{ fontWeight: 'bold' }}
              onClick={(e) => {
                e.preventDefault()
                setShowModal(true)
              }}
            >
              {t('addresschange:ADDRESS.viewOurGuide')}
            </Link>
          </Text>
        </InfoBoxColored>
      </div>
      <Modal open={showModal}>
        <ModalContent setShowModal={setShowModal} withCloseButton={true}>
          <Text variant={'extraLargeBold'}>{t('common:apartmentNumber')}</Text>
          <div className={variants.modalTextWrapper()}>
            <div dangerouslySetInnerHTML={{ __html: t('addresschange:ADDRESS.apartmentNumberInfoModal') }} />
            <ImageKit
              src={'/Products/Addresschange/apt-number-guide_z9YzPzXL4.svg?updatedAt=1687770125381'}
              width={213}
              height={439}
              alt={t('addresschange:ADDRESS.apartmentNumberInfo')}
            />
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}
