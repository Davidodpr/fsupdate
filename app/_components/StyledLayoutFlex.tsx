import React from 'react'

interface StyledFlexProps {
  children: React.ReactNode
  className?: string
}

const StyledFlex = ({ children, className = '' }: StyledFlexProps) => {
  return <div className={`flex flex-col justify-between min-h-screen font-[var(--font-family-main)] ${className}`}>{children}</div>
}

export default StyledFlex
