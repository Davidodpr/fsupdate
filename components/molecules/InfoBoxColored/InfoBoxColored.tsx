import React from 'react'
import { clsx } from 'clsx'
import Checkmark from '@/public/images/Checkmark.svg'
import CircleWithX from '@/public/images/CircleWithX.svg'
import Info from '@/public/images/Info.svg'
import Warning from '@/public/images/Warning.svg'
import { infoBoxColoredWrapperVariants, infoBoxColoredIconWrapperVariants, infoBoxColoredTextWrapperVariants } from './InfoBoxColored.variants'

export interface InfoBoxColoredProps {
  type?: 'success' | 'warning' | 'error' | 'info'
  showIcon?: boolean
  color?: 'blue' | 'green' | 'red'
  children: React.ReactNode
  textAlign?: 'left' | 'center' | 'right'
  className?: string
}

const InfoBoxColored = ({ type, showIcon, color, children, textAlign = 'center', className }: InfoBoxColoredProps) => {
  const InfoBoxIcon = () => {
    switch (type) {
      case 'warning':
        return <Warning />
      case 'error':
        return <CircleWithX />
      case 'success':
        return <Checkmark />
      case 'info':
      default:
        return <Info fill="var(--color-secondary-main)" />
    }
  }

  return (
    <div
      className={clsx(
        infoBoxColoredWrapperVariants({
          color,
          textAlign,
        }),
        className,
      )}
      data-testid="Infobox-container"
    >
      {showIcon && (
        <div className={infoBoxColoredIconWrapperVariants()}>
          <InfoBoxIcon />
        </div>
      )}
      <div className={infoBoxColoredTextWrapperVariants()}>{children}</div>
    </div>
  )
}

export default InfoBoxColored
