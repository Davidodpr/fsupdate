'use client'

import { useTranslation } from 'react-i18next'
import Spinner from '@/components/atoms/Spinner/Spinner'
import {
  containerVariants,
  titleVariants,
  descriptionVariants,
  contentVariants,
  instructionTextVariants,
  requirementTextVariants,
  requirementItemVariants,
  uploadSectionVariants,
  loadingOverlayVariants,
  loadingContentVariants,
  loadingSubtextVariants,
  headerVariants,
  logoVariants,
  headerLineVariants,
  contactInfoVariants,
  contactTextVariants,
  contactEmailVariants,
} from './Elavtal.variants'
import Image from 'next/image'
// Components
import { DocumentPreview } from './components/ElavtalDocumentPreview'
import { StatusMessage } from './components/StatusMessage'
import { UploadActions } from './components/UploadActions'
import { useDocumentAnalysis } from './hooks/useDocumentAnalysis'
// Hooks
import { useDocumentScanner } from './hooks/useDocumentScanner'
import { useFileHandler } from './hooks/useFileHandler'

export const ElavtalTemplate = () => {
  const { t } = useTranslation('elavtal')

  // Custom hooks
  const { isScanning, startScanning } = useDocumentScanner()
  const { fileInputRef, selectedFiles, selectedImages, handleFileChange, setFileData, removeFile, getBase64Data, hasFiles } = useFileHandler({
    validationConfig: {
      maxSize: 5 * 1024 * 1024, // 5MB
      acceptedTypes: ['image/'],
    },
    onValidationError: (error) => {
      console.error('File validation error:', error)
    },
  })
  const { isLoading, uploadSuccess, uploadError, incompleteSigners, analyzeDocumentFile, resetState } = useDocumentAnalysis()

  // Handle scanning
  const handleScanStart = async () => {
    resetState()
    const result = await startScanning()
    if (result) {
      setFileData(result)
    }
  }

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    resetState()
    await handleFileChange(event)
  }

  // Handle removing file
  const handleRemoveImage = () => {
    removeFile()
    resetState()
  }

  // Handle sending document for analysis
  const handleSend = async () => {
    if (selectedFiles.length === 0 || !hasFiles) {
      return
    }

    const base64DataArray = await getBase64Data()
    // Send all pages for analysis
    await analyzeDocumentFile(base64DataArray, selectedFiles[0].name, selectedFiles[0].type)
  }

  return (
    <div className={containerVariants()}>
      {isLoading && (
        <div className={loadingOverlayVariants()} role="status" aria-live="polite" aria-label={t('sending')}>
          <Spinner color="green" scale={2} data-testid="document-analysis-spinner" />
          <div className={loadingContentVariants()}>
            <div>{t('sending')}</div>
            <div className={loadingSubtextVariants()}>{t('analyzingDocument')}</div>
          </div>
        </div>
      )}
      <div className={contentVariants()}>
        <div className={headerVariants()}>
          <Image className={logoVariants()} src="/images/mh-logo-black.svg" alt="Mäklarhuset" width={200} height={100} />
          <div className={headerLineVariants()} />
        </div>

        <h1 className={titleVariants()}>{t('title')}</h1>
        <p className={descriptionVariants()}>{t('description')}</p>

        <div className={uploadSectionVariants()}>
          <StatusMessage uploadError={uploadError} incompleteSigners={incompleteSigners} />

          {selectedImages.length > 0 && <DocumentPreview imageUrls={selectedImages} files={selectedFiles} onRemove={handleRemoveImage} />}

          <UploadActions
            hasFile={hasFiles}
            isScanning={isScanning}
            isLoading={isLoading}
            uploadSuccess={uploadSuccess}
            fileInputRef={fileInputRef}
            onScanStart={handleScanStart}
            onFileChange={handleFileUpload}
            onSend={handleSend}
          />

          <h2 className={instructionTextVariants()}>{t('instruction')}</h2>
          <ul className={requirementTextVariants()}>
            <li className={requirementItemVariants()} data-number="1">
              {t('requirement1')}
            </li>
            <li className={requirementItemVariants()} data-number="2">
              {t('requirement2')}
            </li>
            <li className={requirementItemVariants()} data-number="3">
              {t('requirement3')}
            </li>
            <li className={requirementItemVariants()} data-number="4">
              {t('requirement4')}
            </li>
          </ul>
        </div>

        <div className={contactInfoVariants()}>
          <p className={contactTextVariants()}>{t('alternativeMethod')}</p>
          <a className={contactEmailVariants()} href="mailto:el@flyttsmart.se?subject=Fullmakt för elhantering">
            ✉️ el@flyttsmart.se
          </a>
        </div>
      </div>
    </div>
  )
}
