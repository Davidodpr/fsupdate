import React from 'react'

export interface Props {
  color?: string
  onClick?: () => void
}

const ArrowMobileIcon = ({ color = '#214766', onClick }: Props) => {
  return (
    <svg onClick={onClick} width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.2">
        <path d="M8 18H27.5556M27.5556 18L19.5556 10M27.5556 18L19.5556 26" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="18" cy="18" r="17.25" stroke={color} strokeWidth="1.5" />
      </g>
    </svg>
  )
}

export default ArrowMobileIcon
