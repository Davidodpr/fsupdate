import React from 'react'
import Spinner from '@/components/atoms/Spinner/Spinner'
import { overlayContainerVariants, loadingContentVariants, loadingTitleVariants, loadingSubtextVariants } from './LoadingOverlay.variants'

interface LoadingOverlayProps {
  isVisible: boolean
  title: string
  subtitle?: string
  'aria-label'?: string
  spinnerColor?: 'green' | 'white'
  spinnerScale?: 1 | 1.5 | 2 | 3
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isVisible, title, subtitle, 'aria-label': ariaLabel, spinnerColor = 'green', spinnerScale = 2 }) => {
  if (!isVisible) return null

  return (
    <div className={overlayContainerVariants()} role="status" aria-live="polite" aria-label={ariaLabel || title}>
      <Spinner color={spinnerColor} scale={spinnerScale} data-testid="loading-spinner" />
      <div className={loadingContentVariants()}>
        <div className={loadingTitleVariants()}>{title}</div>
        {subtitle && <div className={loadingSubtextVariants()}>{subtitle}</div>}
      </div>
    </div>
  )
}

export default LoadingOverlay
