import React from 'react'
import { clsx } from 'clsx'
import {
  spinnerWrapperVariants,
  spinnerContainerVariants,
  spinnerSvgVariants,
  spinnerCircleVariants,
  spinnerPercentageTextVariants,
  spinnerPositionedWrapperVariants,
} from './Spinner.variants'

export interface SpinnerProps {
  color?: 'default' | 'green' | 'white'
  scale?: 1 | 1.5 | 2 | 3
  bolder?: boolean
  percentage?: string
  className?: string
  dataTestId?: string
}

const Spinner = ({ color = 'default', scale = 1, bolder = false, percentage, className, dataTestId }: SpinnerProps) => {
  const wrapperClasses = spinnerWrapperVariants({ scale })
  const containerClasses = spinnerContainerVariants({
    percentage: !!percentage,
  })
  const svgClasses = spinnerSvgVariants({
    color,
    bolder,
    scale: scale === 3 ? 3 : undefined,
  })
  const circleClasses = spinnerCircleVariants()
  const percentageTextClasses = spinnerPercentageTextVariants()

  return (
    <div className={clsx(wrapperClasses, className)} data-testid={dataTestId || 'spinner-wrapper'}>
      <div className={containerClasses} data-testid="spinner">
        <svg
          className={svgClasses}
          viewBox="0 0 66 66"
          xmlns="http://www.w3.org/2000/svg"
          width={scale === 3 ? 55 : 24}
          height={scale === 3 ? 55 : 24}
          aria-label="loading spinner icon"
        >
          <circle
            className={circleClasses}
            fill="none"
            strokeLinecap="round"
            cx="33"
            cy="33"
            r="30"
            style={{
              strokeDasharray: 187,
              strokeDashoffset: 0,
            }}
          />
        </svg>
        {percentage && <div className={percentageTextClasses}>{percentage}</div>}
      </div>
    </div>
  )
}

// Positioned wrapper component (equivalent to old SpinnerWrapper)
export const SpinnerWrapper = ({ children, className, dataTestId }: { children: React.ReactNode; className?: string; dataTestId?: string }) => {
  const wrapperClasses = spinnerPositionedWrapperVariants()

  return (
    <div className={clsx(wrapperClasses, className)} data-testid={dataTestId}>
      {children}
    </div>
  )
}

export default Spinner
