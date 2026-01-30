import { useIntercom } from 'react-use-intercom'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import useResponsive from '@/common/hooks/useResponsive'
import Button from '@/components/atoms/Button'
import Chat from '@/public/images/Chat_icon.svg'
import PhoneIcon from '@/public/images/Phone.svg'
import {
  contactCardWrapperVariants,
  contactWrapperVariants,
  contactFrameVariants,
  contactDescriptionVariants,
  contactButtonFrameVariants,
  contactButtonWrapperVariants,
  type ContactCardWrapperVariants,
  type ContactDescriptionVariants,
  type ContactButtonWrapperVariants,
} from './ContactCard.variants'

type ContactCardProps = ContactCardWrapperVariants &
  ContactDescriptionVariants &
  ContactButtonWrapperVariants & {
    usage?: 'move' | 'movehelpClean'
    hideAvatar?: boolean
    chatDescription?: React.ReactNode | string
    view?: 'modal'
  }

export const ContactCard = ({ usage, hideAvatar, chatDescription, view }: ContactCardProps) => {
  const { show } = useIntercom()
  const { theme, iconSet } = useThemeContext()
  const { t } = useTranslation(['common'])
  const { isDesktopOrGreater } = useResponsive()

  const chatWithAgent = () => {
    show()
  }

  const callWithAgent = () => {
    window.open(`tel:${t('callCenterNumber')}`)
  }

  return (
    <div className={contactCardWrapperVariants({ usage, view })}>
      <div className={contactWrapperVariants()}>
        <div className={contactFrameVariants()}>
          {!hideAvatar && iconSet.CONTACT_AVATAR && <Image src={iconSet.CONTACT_AVATAR} alt="" width={35} height={35} />}
          <div className={contactDescriptionVariants({ usage })}>{chatDescription || t('chatDescription')}</div>
        </div>
        <div className={contactButtonFrameVariants()}>
          <div className={contactButtonWrapperVariants({ usage, view })}>
            <Button fontSize={12} iconLeft={<Chat />} text={t('chatButtonText')} onClick={chatWithAgent} variant={theme === ThemeEnum.FASTIGHETSBYRAN ? 'fb' : 'ghost'} />
          </div>
          <div className={contactButtonWrapperVariants({ usage, view })}>
            <Button
              fontSize={12}
              iconLeft={<PhoneIcon width={22} height={21} />}
              text={isDesktopOrGreater ? t('callCenterNumber') : t('callButtonText')}
              onClick={callWithAgent}
              variant={theme === ThemeEnum.FASTIGHETSBYRAN ? 'fbNoPadding' : 'ghost'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
