'use client'

import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { analyzeDocument, analyzeMultiPageDocument, ApiError, IncompleteSigner } from '@/common/api/claudeDocumentAnalyzer'


export type { IncompleteSigner }

export const useDocumentAnalysis = () => {
  const { t } = useTranslation('elavtal')
  const [isLoading, setIsLoading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [incompleteSigners, setIncompleteSigners] = useState<IncompleteSigner[] | null>(null)

  const resetState = useCallback(() => {
    setUploadSuccess(false)
    setUploadError(null)
    setIncompleteSigners(null)
  }, [])

  const getErrorMessage = useCallback(
    (error: unknown): string => {
      // Handle ApiError instances
      if (error instanceof ApiError) {
        // Translate error code if available, otherwise use message
        return error.errorCode ? t(error.errorCode) : error.message || t('errorUploadFailed')
      }

      // Handle regular Error instances (shouldn't happen with our API)
      if (error instanceof Error) {
        return error.message || t('errorUploadFailed')
      }

      // Default fallback
      return t('errorUploadFailed')
    },
    [t],
  )

  const analyzeDocumentFile = useCallback(
    async (base64DataArray: string[] | string, filename: string, mimeType: string, onProgress?: (pagesUploaded: number, totalPages: number) => void): Promise<boolean> => {
      setIsLoading(true)
      setUploadError(null)
      setIncompleteSigners(null)

      try {
        let result

        if (Array.isArray(base64DataArray)) {
          // Multiple pages - use the new multi-page API
          const pages = base64DataArray.map((base64, index) => ({
            image: base64,
            filename: `${filename}-page-${index + 1}`,
            mimeType,
          }))

          result = await analyzeMultiPageDocument(pages, onProgress)
        } else {
          // Single page - use the original API
          result = await analyzeDocument({
            image: base64DataArray,
            filename,
            mimeType,
          })
        }

        // Check if document validation was successful
        if (!result.isValid) {
          // Use error code directly as translation key
          const errorMessage = result.errorCode ? t(result.errorCode) : t('errorUploadFailed')
          setUploadError(errorMessage)

          // Store incomplete signers separately if available
          if (result.incompleteSigners && result.incompleteSigners.length > 0) {
            setIncompleteSigners(result.incompleteSigners)
          }

          return false
        }

        // Document is valid
        setUploadSuccess(true)
        return true
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error)
        setUploadError(errorMessage)

        // Check for incomplete signers in ApiError
        if (error instanceof ApiError && error.incompleteSigners) {
          setIncompleteSigners(error.incompleteSigners)
        }

        return false
      } finally {
        setIsLoading(false)
      }
    },
    [t, getErrorMessage],
  )

  return {
    isLoading,
    uploadSuccess,
    uploadError,
    incompleteSigners,
    analyzeDocumentFile,
    resetState,
  }
}
