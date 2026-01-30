import React, { ReactElement } from 'react'
import Image from 'next/legacy/image'
import Button from '@/components/atoms/Button'
import CheckMark from '@/public/images/Checkmark.svg'
import {
  infoBoxVariants,
  titleSectionVariants,
  iconWrapperVariants,
  titleTextVariants,
  textSectionVariants,
  buttonsWrapperVariants,
  buttonWrapperVariants,
} from './InfoBox.variants'

export interface InfoBoxProps {
  icon?: string
  alt?: string
  title: string
  text: ReactElement
  borderColor?: string
  callText: string
  chatText: string
  openChat: () => void
  phoneIcon?: ReactElement<{ color?: string }> | null
}

const InfoBox = ({ icon, alt = 'Checkmark', title, text, borderColor, callText, chatText, openChat, phoneIcon }: InfoBoxProps) => {
  const onClickCall = () => {
    if (typeof window !== 'undefined') window.open('tel:+46812008822')
  }
  const onClickChat = () => {
    openChat()
  }

  return (
    <div className={infoBoxVariants()} style={{ borderColor }} data-testid="Infobox-container">
      {/* Title Section */}
      <div className={titleSectionVariants()}>
        {/* Icon Wrapper */}
        <div className={iconWrapperVariants()}>{icon ? <Image src={icon} objectFit="contain" layout="fill" alt={alt} /> : <CheckMark alt="Checkmark" />}</div>
        {/* Title Text */}
        <span className={titleTextVariants()}>{title}</span>
      </div>

      {/* Text Section */}
      <div className={textSectionVariants()}>{text}</div>

      {/* Buttons Wrapper */}
      <div className={buttonsWrapperVariants()}>
        {/* Call Button */}
        <div className={buttonWrapperVariants()}>
          <Button text={callText} onClick={onClickCall} fontSize={12} padding="8px !important" variant="ghost" iconLeft={phoneIcon} />
        </div>
        {/* Chat Button */}
        <div className={buttonWrapperVariants()}>
          <Button text={chatText} onClick={onClickChat} fontSize={12} />
        </div>
      </div>
    </div>
  )
}

export default InfoBox
