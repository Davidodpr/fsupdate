import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/legacy/image'
import { BirdError } from '@/components/atoms/BirdError'
import Flex from '@/components/atoms/Flex'
import Text from '@/components/atoms/Text'
import { Modal, ModalContent } from '@/components/molecules/Modal'
import useResponsive from '@/hooks/useResponsive'

export interface ShareModalProps {
  title: string
  modalList?: string[]
  showModal: boolean
  setShowModal: (arg0: boolean) => void
}

type ShareOption = {
  key: string
  value: string
  url: string
}

const ShareModal = ({ title, showModal, setShowModal }: ShareModalProps) => {
  const { t: data } = useTranslation(['shareModal', 'common'])
  const { isTabletPortraitOrGreater } = useResponsive()
  const [hasConfirmed, setHasConfirmed] = useState(false)
  const onSubmit = () => {
    setHasConfirmed(true)
  }

  const shareOptions = data('shareOptions', { returnObjects: true }) as Array<ShareOption>

  return (
    <form onSubmit={onSubmit}>
      <div className="w-full h-full" data-testid="share-modal-container">
        <Modal open={showModal}>
          <ModalContent withCloseButton setShowModal={setShowModal} bigCloseButton size={isTabletPortraitOrGreater ? 'medium' : 'small'}>
            {!hasConfirmed ? (
              <>
                <div className="w-full flex items-center justify-between pb-4">
                  <div className="h-10 pt-1.5 flex justify-center items-center">
                    <div className="ml-2.5">
                      <Text spacing="none" variant="largeBold">
                        {title}
                      </Text>
                    </div>
                  </div>
                </div>
                <div className="w-full border-b border-[var(--color-border-gray)]" />
                <div className="flex flex-col items-start flex-none order-2 self-stretch flex-grow-0">
                  {shareOptions.map((item) => {
                    return (
                      <div key={item.key} className="flex flex-row items-end p-0 gap-[11px] flex-none order-0 self-stretch flex-grow-0 my-4">
                        <Image src={item.url} alt={item.value} objectFit="contain" width="24" height="24" />
                        <Text spacing="none" variant="largeBold" className="leading-6">
                          {item.value}
                        </Text>
                      </div>
                    )
                  })}
                </div>
              </>
            ) : (
              <Flex
                direction="column"
                alignItems="center"
                className="flex-grow-0 max-w-[90%] flex-[0_0_66%] mx-auto rounded-[var(--radius-border-radius-main)] bg-white shadow-[rgba(0,0,0,0.07)_0px_4px_32px] w-full h-auto p-8 min-h-[400px] sm:max-w-[820px] [&_a]:text-[var(--color-primary-main)] [&_a]:font-bold"
              >
                <BirdError />
                <Flex direction="column" alignItems="center" className="w-full mt-5 text-center sm:w-[500px]">
                  <h1 className="text-2xl font-black m-0 mb-2.5 sm:text-4xl">{data('noAccount')}</h1>
                  <Text className="m-0 mb-10 text-base" variant="body">
                    {data('registerAccount')}
                  </Text>
                </Flex>
              </Flex>
            )}
          </ModalContent>
        </Modal>
      </div>
    </form>
  )
}

export default ShareModal
