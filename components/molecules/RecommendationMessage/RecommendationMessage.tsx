'use client'

import { UserImage } from '@/components/atoms/UserImage'
import { recommendationMessageVariants } from './RecommendationMessage.variants'

type RecommendationMessageProps = {
  userImage: string
  userName: string
  fullWidth?: boolean
  children: React.ReactNode
}

export const RecommendationMessage = ({ userImage, userName, fullWidth, children }: RecommendationMessageProps) => {
  const userIconData = { imageUrl: userImage, size: 34 }
  const variants = recommendationMessageVariants()

  return (
    <div className={variants.messageWrapper({ fullWidth })}>
      <div className={variants.recommenderWrapper()}>
        <UserImage {...userIconData} />
        <p className={variants.recommenderName()}>{userName}</p>
      </div>
      <div className={variants.messageBodyWrapper()}>
        <div className={variants.messageBody()}>{children}</div>
      </div>
    </div>
  )
}
