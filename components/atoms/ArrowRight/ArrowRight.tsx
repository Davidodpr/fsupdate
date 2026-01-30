import React from 'react'

export interface Props {
  color?: string
}

const ArrowRight = ({ color = '#214766' }: Props) => {
  return (
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[17px] h-4">
      <path d="M2.71484 8H13.7148" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.21484 3.5L13.7148 8L9.21484 12.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default ArrowRight
