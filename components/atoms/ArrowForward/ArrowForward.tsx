import React from 'react'

export interface Props {
  color?: string
}

const ArrowForward = ({ color = 'var(--color-secondary-main)' }: Props) => {
  return (
    <svg width="18" height="18" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]">
      <path d="M18.375 9.58333H1.75" data-testid="icon-path" stroke={color} strokeWidth="1.6" />
      <path d="M14.4375 14.1667L18.375 9.58333L14.4375 5" stroke={color} strokeWidth="1.6" />
    </svg>
  )
}

export default ArrowForward
