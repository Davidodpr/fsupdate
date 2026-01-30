import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useIntercom } from 'react-use-intercom'
import { clsx } from 'clsx'
import Box from '@/components/atoms/Box'
import Flex from '@/components/atoms/Flex'
import H3 from '@/components/atoms/H3'
import Text from '@/components/atoms/Text'
import LinkButton from '@/components/linkButton'
import { Modal, ModalContent } from '@/components/molecules/Modal'
import ArrowRight from '@/public/images/ArrowRight_v2.svg'
import ChatOutlined from '@/public/images/ChatOutlined.svg'
import PhoneOutlined from '@/public/images/PhoneOutlined.svg'
import { phoneLinkVariants, rowWithIconVariants } from './CrossBorderMoveModal.variants'

const CrossBorderMoveModal = () => {
  const { t } = useTranslation(['movePage', 'common'])
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
      <LinkButton
        sx={{
          textDecoration: 'underline',
          display: 'flex',
          alignItems: 'center',
          fontSize: 16,
          fontWeight: 'normal',
          padding: '0 5px',
          marginBottom: '16px',
        }}
        noUnderline
        onClick={handleToggleModal}
      >
        <Box className="mr-1">{t('common:MOVEPROFILE.CROSSBORDERMOVEMODAL.linkText')}</Box>
        <ArrowRight />
      </LinkButton>
      <Modal open={isOpen}>
        <ModalContent setShowModal={setIsOpen} withCloseButton bigCloseButton size="small">
          <Box className="border-b border-[rgba(33,71,102,0.1)]">
            <H3 className="my-2 mb-4 text-lg">{t('common:MOVEPROFILE.CROSSBORDERMOVEMODAL.header')}</H3>
          </Box>
          <Text>{t('common:MOVEPROFILE.CROSSBORDERMOVEMODAL.description')}</Text>
          <Text variant="button">{t('common:MOVEPROFILE.CROSSBORDERMOVEMODAL.CTAHeader')}</Text>
          <Flex className={rowWithIconVariants()} alignItems="center">
            <ChatOutlined />
            <LinkButton noUnderline onClick={() => show()}>
              {t('common:MOVEPROFILE.CROSSBORDERMOVEMODAL.chatWithUs')}
            </LinkButton>
          </Flex>
          <Flex className={rowWithIconVariants()} alignItems="center">
            <PhoneOutlined />
            <a className={phoneLinkVariants()} href={`tel:${t('common:CONTACT.phone')}`}>
              {t('common:MOVEPROFILE.CROSSBORDERMOVEMODAL.callUs')}
            </a>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CrossBorderMoveModal
