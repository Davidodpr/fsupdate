import React from 'react'

export interface InfoIconProps {
  width?: number
  height?: number
  color?: string
  className?: string
}

const InfoIcon = ({ width = 24, height = 24, color = 'black', className }: InfoIconProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 11C12.5523 11 13 11.4477 13 12V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V12C11 11.4477 11.4477 11 12 11ZM13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7V8C11 8.55228 11.4477 9 12 9C12.5523 9 13 8.55228 13 8V7Z"
        fill={color}
      />
    </svg>
  )
}

export default InfoIcon
