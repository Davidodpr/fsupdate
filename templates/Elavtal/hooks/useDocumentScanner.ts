'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { setLicenseKey, scanDocument as geniusScanDocument } from '@thegrizzlylabs/web-geniusscan-sdk'


export const useDocumentScanner = () => {
  const { i18n } = useTranslation('elavtal')
  const [isScanning, setIsScanning] = useState(false)

  // Initialize GeniusScan when hook is first used
  useEffect(() => {
    const initializeGeniusScan = async () => {
      // Only use license key on production and staging environments
      const isProductionOrStaging = typeof window !== 'undefined' && (window.location.hostname === 'www.flyttsmart.se' || window.location.hostname === 'stage.flyttsmart.se')

      if (isProductionOrStaging) {
        const licenseKey = process.env.NEXT_PUBLIC_GENIUS_SCAN_LICENSE_KEY

        if (licenseKey) {
          try {
            await setLicenseKey(licenseKey)
            // License key successfully set for production/staging
          } catch (error) {
            // License key validation failed, will run in demo mode
            // In production, you might want to handle this differently
            console.error('GeniusScan license key validation failed:', error)
          }
        }
      }
      // For all other environments, runs in demo mode (60 seconds)
    }

    initializeGeniusScan()
  }, [])

  const startScanning = useCallback(async (): Promise<{ files: File[]; imageUrls: string[] } | null> => {
    if (isScanning) return null

    setIsScanning(true)

    try {
      const scanResult = await geniusScanDocument({
        multiPage: true,
        defaultFilter: 'strong_monochrome',
        jpegQuality: 100,
        availableFilters: ['none', 'strong_monochrome', 'strong_grayscale', 'soft_grayscale', 'dark_background', 'strong_color', 'soft_color', 'photo'],
        foregroundColor: '#FF3B30',
        highlightColor: '#4CD964',
        backgroundColor: '#121212',
        language: i18n.language,
      })

      if (scanResult && scanResult.length > 0) {
        const files: File[] = []
        const imageUrls: string[] = []

        scanResult.forEach((scannedBlob, index) => {
          // Convert blob to file
          const file = new File([scannedBlob], `scanned-document-page-${index + 1}.jpg`, {
            type: 'image/jpeg',
          })
          files.push(file)

          // Create preview URL from blob
          const imageUrl = URL.createObjectURL(scannedBlob)
          imageUrls.push(imageUrl)
        })

        return { files, imageUrls }
      }

      return null
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      if (errorMessage.includes('User cancelled')) {
        // User cancelled the scan, don't throw error
        return null
      }
      throw error
    } finally {
      setIsScanning(false)
    }
  }, [isScanning, i18n.language])

  return {
    isScanning,
    startScanning,
  }
}
