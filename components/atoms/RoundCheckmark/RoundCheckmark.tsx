import React from 'react'

export interface Props {
  color?: string
}

const RoundCheckmark = ({ color }: Props) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="8" fill={color || 'var(--color-primary-main)'} />
      <path d="M4.33301 7.92L7.03301 10.8L11.533 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default RoundCheckmark
