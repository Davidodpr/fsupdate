import React from 'react'

export interface CheckmarkProps {
  color?: string
}

const Checkmark = ({ color = 'black' }: CheckmarkProps) => {
  return (
    <svg height="100%" width="100%" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <path d="M7 12.5L10.3333 16L17 9" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default Checkmark
