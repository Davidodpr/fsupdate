import React from 'react'
import {
  progressBarWrapperVariants,
  progressBarHeaderVariants,
  progressBarTitleVariants,
  progressBarCountVariants,
  progressBarContainerVariants,
  progressBarFillVariants,
} from './ProgressBar.variants'

export interface ProgressBarProps {
  title: string
  completed: number
  total: number
  countText: string
  className?: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({ title, completed, total, countText, className }) => {
  const percentage = total > 0 ? (completed / total) * 100 : 0

  return (
    <div className="w-full px-3 md:px-0 max-w-[818px]">
      <div className={progressBarWrapperVariants({ className })}>
        <div className={progressBarHeaderVariants()}>
          <h3 className={progressBarTitleVariants()}>{title}</h3>
          <span className={progressBarCountVariants()}>{countText}</span>
        </div>
        <div className={progressBarContainerVariants()}>
          <div className={progressBarFillVariants()} style={{ width: `${percentage}%` }} />
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
