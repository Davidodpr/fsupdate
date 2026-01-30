'use client'

import { useState, useRef, useCallback, ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { DOCUMENT_ERROR_CODES } from '@/constants/documentErrorCodes'


export interface FileData {
  files: File[]
  imageUrls: string[]
}

export interface FileValidationConfig {
  maxSize?: number // in bytes
  acceptedTypes?: string[]
}

export interface FileHandlerOptions {
  validationConfig?: FileValidationConfig
  onValidationError?: (error: string) => void
}

const DEFAULT_VALIDATION_CONFIG: FileValidationConfig = {
  maxSize: 5 * 1024 * 1024, // 5MB
  acceptedTypes: ['image/'],
}

// Convert blob to data URL
const blobToDataURL = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

// Extract base64 from data URL
const extractBase64FromDataURL = (dataURL: string): string => {
  return dataURL.split(',')[1]
}

// Convert blob URL to base64
const blobURLToBase64 = async (blobURL: string): Promise<string> => {
  const response = await fetch(blobURL)
  const blob = await response.blob()
  const dataURL = await blobToDataURL(blob)
  return extractBase64FromDataURL(dataURL)
}

export const useFileHandler = (options?: FileHandlerOptions) => {
  const { t } = useTranslation('elavtal')
  const config = {
    ...DEFAULT_VALIDATION_CONFIG,
    ...options?.validationConfig,
  }

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [selectedImages, setSelectedImages] = useState<string[]>([])

  // Validate a single file with configured rules
  const validateFileWithConfig = useCallback(
    (file: File): string | null => {
      // Check file type
      if (config.acceptedTypes && config.acceptedTypes.length > 0) {
        const isAccepted = config.acceptedTypes.some((type) => file.type.startsWith(type) || file.type === type)
        if (!isAccepted) {
          return t(DOCUMENT_ERROR_CODES.INVALID_FILE_TYPE)
        }
      }

      // Check file size
      if (config.maxSize && file.size > config.maxSize) {
        return t(DOCUMENT_ERROR_CODES.FILE_TOO_LARGE)
      }

      return null
    },
    [config, t],
  )

  // Handle file selection
  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>): Promise<boolean> => {
      const files = event.target.files
      if (!files || files.length === 0) return false

      const fileArray = Array.from(files)
      const validFiles: File[] = []
      const imageUrls: string[] = []

      // Validate each file
      for (const file of fileArray) {
        const validationError = validateFileWithConfig(file)
        if (validationError) {
          if (options?.onValidationError) {
            options.onValidationError(validationError)
          }
          throw new Error(validationError)
        }
        validFiles.push(file)
      }

      setSelectedFiles(validFiles)

      // Create preview URLs
      for (const file of validFiles) {
        const dataUrl = await blobToDataURL(file)
        imageUrls.push(dataUrl)
      }

      setSelectedImages(imageUrls)
      return true
    },
    [validateFileWithConfig, options, t],
  )

  // Set files programmatically
  const setFileData = useCallback(({ files, imageUrls }: FileData) => {
    setSelectedFiles(files)
    setSelectedImages(imageUrls)
  }, [])

  // Remove all files
  const removeAllFiles = useCallback(() => {
    // Clean up all blob URLs
    selectedImages.forEach((imageUrl) => {
      if (imageUrl && imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl)
      }
    })

    setSelectedImages([])
    setSelectedFiles([])

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [selectedImages])

  // Get base64 data for all selected files
  const getBase64Data = useCallback(async (): Promise<string[]> => {
    if (selectedImages.length === 0) {
      throw new Error('No images selected')
    }

    const base64DataArray: string[] = []

    for (const selectedImage of selectedImages) {
      let base64Data: string

      if (selectedImage.startsWith('data:')) {
        // Extract base64 from data URL
        base64Data = extractBase64FromDataURL(selectedImage)
      } else if (selectedImage.startsWith('blob:')) {
        // Convert blob URL to base64
        base64Data = await blobURLToBase64(selectedImage)
      } else {
        throw new Error('Invalid image format')
      }

      base64DataArray.push(base64Data)
    }

    return base64DataArray
  }, [selectedImages])

  return {
    // Refs
    fileInputRef,

    // State
    selectedFiles,
    selectedImages,
    hasFiles: selectedFiles.length > 0,

    // Actions
    handleFileChange,
    setFileData,
    removeFile: removeAllFiles,

    // Data extraction
    getBase64Data,
  }
}
