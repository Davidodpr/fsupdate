import React, { ReactNode } from 'react'
import Image from 'next/legacy/image'
import { clsx } from 'clsx'
import {
  wrapperVariants,
  iconWrapperVariants,
  headerWrapperVariants,
  textWrapperVariants,
  type WrapperVariants,
  type IconWrapperVariants,
  type HeaderWrapperVariants,
  type TextWrapperVariants,
} from './UniqueSellingPoint.variants'

export interface USPProps extends WrapperVariants, IconWrapperVariants, HeaderWrapperVariants, TextWrapperVariants {
  icon: string
  header: string
  text: ReactNode
  className?: string
}

const UniqueSellingPoint = ({ icon, header, text, className }: USPProps) => (
  <div className={clsx(wrapperVariants(), className)}>
    <div className={clsx(iconWrapperVariants())}>{icon && <Image src={icon} objectFit="contain" layout="fill" alt={header} />}</div>
    <div className={clsx(headerWrapperVariants())}>{header}</div>
    <div className={clsx(textWrapperVariants())}>{text}</div>
  </div>
)

export default UniqueSellingPoint
