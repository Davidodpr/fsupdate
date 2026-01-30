import React from 'react'

interface ArrowRightThinProps {
  className?: string
  width?: number | string
  height?: number | string
  strokeWidth?: number | string
}

const ArrowRightThin: React.FC<ArrowRightThinProps> = ({ className = '', width = 24, height = 25, strokeWidth = 2 }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M3.75 12.0762H20.25" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.5 5.32617L20.25 12.0762L13.5 18.8262" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default ArrowRightThin
