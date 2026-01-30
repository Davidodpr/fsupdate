import React, { RefObject, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { IMAGEKIT_IMAGES } from '@/common/enums/ImageKitImageEnum'
import { MoveService } from '@/common/enums/MoveServicesEnum'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import { ActivityEnum } from '@/common/types/activity'
import { ContactMePartial } from '@/common/utils/userHelpers'
import Button from '@/components/atoms/Button'
import Text from '@/components/atoms/Text'
import { UserImage } from '@/components/atoms/UserImage'
import ContactMeDialog from '@/components/molecules/ContactMeCard/ContactMeDialog'
import { NewFAQCard } from '@/components/molecules/FAQCard'
import {
  speechBubbleVariants,
  prosFooterWrapperVariants,
  contactButtonWrapperVariants,
  speechBubbleTextWrapperVariants,
  innerSpeechBubbleWrapperVariants,
  faqWrapperVariants,
  movingExpertWrapperVariants,
  darkFooterWrapperVariants,
  speechBubbleHeaderVariants,
} from './Footer.variants'
import { getFaqForServices } from './getFaqForServices'

type FooterProps = {
  currentServiceType: (typeof ActivityEnum)[keyof typeof ActivityEnum] | 'default'
  backgroundRef?: React.RefObject<HTMLDivElement | null>
  showBackground?: boolean
  setShowBackground?: (show: boolean) => void
  aboutFlyttsmartFooterRef: RefObject<HTMLDivElement | null>
  withoutFaq?: boolean
}

const Footer = ({ currentServiceType, showBackground, setShowBackground, backgroundRef, withoutFaq }: FooterProps) => {
  const { t } = useTranslation(['footer'])
  const { theme } = useThemeContext()
  const [showContactMeDialog, setShowContactMeDialog] = useState(false)
  const userIconData = { imageUrl: IMAGEKIT_IMAGES.RECOMMENDATION_EXPERT, size: 48 }

  const onclick = async () => {
    await ContactMePartial()
    setShowContactMeDialog(!showContactMeDialog)
  }

  const buttonVariant = theme === ThemeEnum.FASTIGHETSBYRAN ? 'fb' : 'ghost'

  return (
    <>
      {showContactMeDialog && (
        <ContactMeDialog setShowModal={setShowContactMeDialog} title={t('talkToMovingExport')} showModal={showContactMeDialog} isHelpModal serviceType={MoveService.MOVEHELP} />
      )}

      <div className="w-full flex flex-col">
        <div className={clsx(darkFooterWrapperVariants())}>
          <div className={clsx(prosFooterWrapperVariants({ center: withoutFaq }))}>
            <div className="flex flex-col">
              {/* Speech Bubble */}
              <div
                className={clsx(
                  speechBubbleVariants({
                    theme: theme === ThemeEnum.FASTIGHETSBYRAN ? 'fb' : 'default',
                  }),
                )}
              >
                <div className={clsx(innerSpeechBubbleWrapperVariants())}>
                  <div className={clsx(speechBubbleTextWrapperVariants())}>
                    <Text className={clsx(speechBubbleHeaderVariants())} spacing="none">
                      {t('specialRequests')}
                    </Text>
                    <Text style={{ fontSize: 'var(--fs-fontSizes-5)' }} spacing="none">
                      {t('contactDescription')}
                    </Text>
                  </div>
                  <div className={clsx(contactButtonWrapperVariants())}>
                    <Button className="!px-8 !py-2" size="md" text={t('talkToMovingExport')} onClick={() => onclick()} variant={buttonVariant} />
                  </div>
                </div>
              </div>

              {/* Moving Expert */}
              <div className={clsx(movingExpertWrapperVariants())}>
                <UserImage {...userIconData} />
                <Text spacing="none" className="pl-2.5" variant="bodyBold">
                  {t('recommendedExpertTitle')}
                </Text>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          {!withoutFaq && (
            <div className={clsx(faqWrapperVariants())}>
              <NewFAQCard
                backgroundRef={backgroundRef}
                showBackground={showBackground}
                setShowBackground={setShowBackground}
                header={t('faqHeader')}
                faq={getFaqForServices(t, currentServiceType ?? 'default')}
                withWhiteColor
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Footer
