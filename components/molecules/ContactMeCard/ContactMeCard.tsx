import Image from 'next/image'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import Button from '@/components/atoms/Button'
import { DESCRIPTION_MOVING } from '@/constants/order'
import { ContactMePartial } from '@/utils/userHelpers'
import {
  contactCardWrapperVariants,
  contactWrapperVariants,
  contactFrameVariants,
  contactTitleVariants,
  contactDescriptionVariants,
  contactButtonFrameVariants,
  contactButtonWrapperVariants,
} from './ContactMeCard.variants'
import ContactMeDialog from './ContactMeDialog'
import { contactMeContentVariants } from './ContactMeDialog.variants'

type ContactMeCardProps = {
  usage?: 'movehelpClean'
  hideAvatar?: boolean
  chatDescription?: React.ReactNode | string
  title: string
  description: string
  contactMeDialogButtonText: string
  buttonText: string
  isModalUsed?: boolean
  showModal: boolean
  contactMeDialogEnabled?: boolean
  setShowModal: (show: boolean) => void
}
export const ContactMeCard = ({
  usage,
  hideAvatar,
  title,
  description,
  contactMeDialogButtonText,
  buttonText,
  isModalUsed,
  showModal,
  setShowModal,
  contactMeDialogEnabled,
}: ContactMeCardProps) => {
  const { theme, iconSet } = useThemeContext()
  const onclick = async () => {
    setShowModal(!showModal)
    if (isModalUsed) {
      await ContactMePartial()
    }
  }

  return (
    <>
      {showModal && contactMeDialogEnabled !== false && (
        <ContactMeDialog setShowModal={setShowModal} title={contactMeDialogButtonText} showModal={showModal} isHelpModal serviceType={DESCRIPTION_MOVING} />
      )}
      <div className={contactCardWrapperVariants({ usage: usage as 'movehelpClean' | undefined })}>
        <div className={contactWrapperVariants()}>
          <div className={contactFrameVariants()}>
            {!hideAvatar && iconSet.PUZZLE_ICON && <Image src={iconSet.PUZZLE_ICON} alt="Pussle ikon" width={40} height={40} />}
            <div className={contactTitleVariants({ usage: usage as 'movehelpClean' | undefined })}>{title}</div>
          </div>
          <div className={contactMeContentVariants()}>
            <div className={contactDescriptionVariants({ usage: usage as 'movehelpClean' | undefined })}>{description}</div>
            <div className={contactButtonFrameVariants()}>
              <div className={contactButtonWrapperVariants({ usage: usage as 'movehelpClean' | undefined })}>
                <Button padding="0px 30px !important" fontSize={15} text={buttonText} onClick={() => onclick()} variant={theme === ThemeEnum.FASTIGHETSBYRAN ? 'fb' : 'ghost'} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
