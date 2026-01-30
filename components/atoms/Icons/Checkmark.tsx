import React from 'react'

interface CheckmarkProps {
  className?: string
  width?: number | string
  height?: number | string
  strokeWidth?: number | string
}

const Checkmark: React.FC<CheckmarkProps> = ({ className = '', width = 24, height = 24, strokeWidth = 3 }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M7 12.5L10.3333 16L17 9" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default Checkmark
