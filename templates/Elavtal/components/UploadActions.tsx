'use client'

import { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { buttonContainerVariants, scanButtonVariants, hiddenInputVariants, sendButtonVariants, buttonContentVariants, successMessageVariants } from '../Elavtal.variants'

interface UploadActionsProps {
  hasFile: boolean
  isScanning: boolean
  isLoading: boolean
  uploadSuccess: boolean
  fileInputRef: React.RefObject<HTMLInputElement | null>
  onScanStart: () => void
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSend: () => void
}

export const UploadActions = ({ hasFile, isScanning, isLoading, uploadSuccess, fileInputRef, onScanStart, onFileChange, onSend }: UploadActionsProps) => {
  const { t } = useTranslation('elavtal')

  const buttonContainerClasses = buttonContainerVariants()
  const scanButtonClasses = scanButtonVariants({ disabled: isScanning })
  const hiddenInputClasses = hiddenInputVariants()
  const sendButtonClasses = sendButtonVariants({ disabled: !hasFile || isLoading || uploadSuccess })
  const buttonContentClasses = buttonContentVariants()
  const successMessageClasses = successMessageVariants()

  return (
    <>
      {!hasFile && (
        <div className={buttonContainerClasses}>
          <button className={scanButtonClasses} onClick={onScanStart} disabled={isScanning}>
            {isScanning ? t('openingScanner') : t('scanDocument')}
          </button>
        </div>
      )}

      <input ref={fileInputRef} className={hiddenInputClasses} type="file" accept="image/*" capture="environment" onChange={onFileChange} aria-label={t('uploadDocument')} />

      {uploadSuccess && (
        <div className={successMessageClasses} role="status" aria-live="polite" style={{ marginBottom: '8px' }}>
          {t('successMessage')}
        </div>
      )}

      <button className={sendButtonClasses} onClick={onSend} disabled={!hasFile || isLoading || uploadSuccess}>
        <div className={buttonContentClasses}>
          <span>{t('sendButton')}</span>
        </div>
      </button>
    </>
  )
}
