import React, { useState } from 'react'
import ReactGA from 'react-ga4'
import { useTranslation } from 'react-i18next'
import Popup from '@/components/atoms/Popup'
import LinkIcon from '@/public/images/LinkIcon.svg'
import { clsx } from 'clsx'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
  'box-border w-full  h-full font-[var(--font-family-button)] rounded-[var(--radius-button)] flex justify-center items-center font-bold text-base !important cursor-pointer',
  {
    variants: {
      variant: {
        outlineHoverInverted: clsx(
          '!bg-white !no-underline !border-2 !border-[var(--color-secondary-main)] !text-[var(--color-secondary-main)]',
          'active:!bg-white active:!text-[var(--color-secondary-main)] active:!border-2 active:!border-[var(--color-secondary-main)]',
          'hover:!bg-[var(--color-secondary-main)] hover:!text-white hover:!border-2 hover:!border-white',
        ),
        outlineHoverInvertedAlt: clsx(
          '!bg-[var(--color-secondary-main)] !border-2 !border-white !text-white',
          'active:!bg-white active:!text-white active:!border-2 active:!border-white',
          'hover:!bg-white hover:!text-[var(--color-secondary-main)] hover:!border-2 hover:!border-[var(--color-secondary-main)]',
        ),
      },
    },
  },
)

interface Props extends VariantProps<typeof buttonVariants> {
  inviteKey: string
  buttonVariant: 'outlineHoverInverted' | 'outlineHoverInvertedAlt'
}

const INVITETEXT = 'inbjudan'

const InviteFriend = ({ inviteKey, buttonVariant }: Props) => {
  const { t } = useTranslation('footer')
  const [variant] = useState(buttonVariant)

  const inviteAction = async () => {
    await navigator.clipboard.writeText(inviteKey)
    ReactGA.event(`invite-friend-${inviteKey.includes(INVITETEXT) ? 'movepage' : 'startpage'}-clicked`)
  }

  return (
    <div className="[&_button]:!no-underline [&_button]:!decoration-none">
      <Popup
        textMargin
        noUnderline
        withFluidWidth
        text={
          <div className="text-[var(--color-secondary-main)]">
            <div className="flex flex-row">
              <LinkIcon />
              <div className="w-[107px] h-[18px] font-['Gilroy'] font-bold text-[15px] leading-[18px] ml-2.5 -mt-0.5 flex items-center text-center tracking-[0.02em] text-[#214766] flex-none order-1 flex-grow-0">
                {t('INVITE.tooltipTitle')}
              </div>
            </div>
            <div className="font-['Gilroy'] font-normal text-[15px] tracking-[0.02em] text-[#214766]">{t('INVITE.tooltipMessage')}</div>
            <div className="font-['Gilroy'] font-normal text-[15px] tracking-[0.02em] text-[#214766]">
              {inviteKey.includes(INVITETEXT) ? t('INVITE.linkInbjudan') : t('INVITE.linkInbjudning')}
            </div>
          </div>
        }
      >
        <div className="box-border flex flex-row justify-center items-center gap-2 w-[311px] h-12 rounded-[22.5px] flex-none order-1 flex-grow-0 [&_button]:border-2 [&_button]:border-[#214766] [&_button]:!no-underline [&_button]:!text-decoration-none">
          <div className="w-full h-12">
            <div className="h-full w-full relative flex items-end justify-end">
              <div className={`${buttonVariants({ variant })} no-underline`} onClick={inviteAction}>
                <p className="no-underline">{t('INVITE.buttonText')}</p>
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  )
}

export default InviteFriend
