import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useIntercom } from 'react-use-intercom'
import { clsx } from 'clsx'
import Box from '@/components/atoms/Box'
import Flex from '@/components/atoms/Flex'
import H3 from '@/components/atoms/H3'
import Text from '@/components/atoms/Text'
import { Modal, ModalContent, ModalTitle, ModalDescription } from '@/components/molecules/Modal'
import ArrowRight from '@/public/images/ArrowRight.svg'
import ChatOutlined from '@/public/images/ChatOutlined.svg'
import PhoneOutlined from '@/public/images/PhoneOutlined.svg'

const CrossBorderMoveModal = () => {
  const { t } = useTranslation(['common'])
  const { show, update } = useIntercom()
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleModal = useCallback(() => {
    update({
      customAttributes: {
        international: true,
      },
    })

    setIsOpen((x) => !x)
  }, [setIsOpen, update])

  return (
    <>
      <span
        className="font-bold text-[var(--color-secondary-main)] cursor-pointer border-transparent transition-[border-bottom_500ms] leading-none underline flex items-center text-base font-normal px-1.5 mb-4 [&_svg_*]:stroke-[var(--color-text-main)]"
        onClick={handleToggleModal}
      >
        <Box className="mr-1">{t('MOVEPROFILE.CROSSBORDERMOVEMODAL.linkText')}</Box>
        <ArrowRight />
      </span>
      <Modal open={isOpen}>
        <ModalContent setShowModal={setIsOpen} withCloseButton bigCloseButton size="medium">
          <div className="flex flex-col gap-6 p-2">
            {/* Title Section */}
            <div className="border-b border-[rgba(33,71,102,0.15)] pb-4">
              <ModalTitle asChild>
                <H3 className="text-2xl font-semibold text-[var(--color-text-main)] m-0">
                  {t('MOVEPROFILE.CROSSBORDERMOVEMODAL.header')}
                </H3>
              </ModalTitle>
            </div>

            {/* Description Section */}
            <ModalDescription asChild>
              <Text className="text-base leading-relaxed text-[var(--color-text-secondary)] -mt-2">
                {t('MOVEPROFILE.CROSSBORDERMOVEMODAL.description')}
              </Text>
            </ModalDescription>

            {/* CTA Section */}
            <div className="flex flex-col gap-4 pt-2">
              <Text variant="button" className="text-lg font-semibold text-[var(--color-text-main)]">
                {t('MOVEPROFILE.CROSSBORDERMOVEMODAL.CTAHeader')}
              </Text>

              {/* Chat Option */}
              <Flex
                alignItems="center"
                className="p-4 rounded-lg bg-[var(--color-background-subtle,rgba(33,71,102,0.05))] hover:bg-[var(--color-background-subtle-hover,rgba(33,71,102,0.08))] transition-colors cursor-pointer group"
                onClick={() => show()}
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-secondary-main)] mr-4">
                  <ChatOutlined className="w-5 h-5 text-white" />
                </div>
                <span className="text-base font-semibold text-[var(--color-secondary-main)] group-hover:underline">
                  {t('MOVEPROFILE.CROSSBORDERMOVEMODAL.chatWithUs')}
                </span>
              </Flex>

              {/* Phone Option */}
              <a
                href={`tel:${t('common:CONTACT.phone')}`}
                className="no-underline"
              >
                <Flex
                  alignItems="center"
                  className="p-4 rounded-lg bg-[var(--color-background-subtle,rgba(33,71,102,0.05))] hover:bg-[var(--color-background-subtle-hover,rgba(33,71,102,0.08))] transition-colors group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-primary-main)] mr-4">
                    <PhoneOutlined className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-base font-semibold text-[var(--color-primary-main)] group-hover:underline">
                    {t('MOVEPROFILE.CROSSBORDERMOVEMODAL.callUs')}
                  </span>
                </Flex>
              </a>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CrossBorderMoveModal
