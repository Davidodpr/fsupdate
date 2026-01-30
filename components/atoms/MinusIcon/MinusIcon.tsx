import React from 'react'
import { clsx } from 'clsx'

export interface Props {
  color?: string
  onClick?: () => void
  disabled?: boolean
}

const MinusIcon = ({ color = 'var(--color-secondary-main)', onClick, disabled }: Props) => {
  const customColor = disabled ? '#BEBEC0' : color

  return (
    <svg
      data-testid="minus-icon"
      onClick={onClick}
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx('w-8 h-8', onClick && 'cursor-pointer')}
    >
      <path
        d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z"
        stroke={customColor}
        strokeWidth="2"
        strokeMiterlimit="10"
        data-testid="icon-path"
      />
      <path d="M11 16H21" stroke={customColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default MinusIcon
