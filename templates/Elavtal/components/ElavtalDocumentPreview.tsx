'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'
import Image from 'next/image'
import { imageContainerVariants, imagePreviewVariants, removeButtonVariants, fileInfoTextVariants } from '../Elavtal.variants'


// Page navigation styles
const pageIndicatorClasses = 'flex justify-center items-center gap-2 mb-3 text-sm text-[#4A4A4A]'
const pageDotsClasses = 'flex gap-1.5'
const navigationContainerClasses = 'flex gap-2 justify-center mb-3'
const navigationButtonClasses =
  'px-3 py-2 bg-white text-[#2B2B2B] border border-[#E8E8E8] rounded-md text-xs cursor-pointer transition-all duration-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed'

const getPageDotClasses = (active: boolean) =>
  clsx('w-2 h-2 rounded-full border-none cursor-pointer transition-all duration-200', active ? 'bg-[#2B2B2B] w-6 rounded-sm' : 'bg-[#D4D4D4] hover:bg-[#9A9A9A]')

interface DocumentPreviewProps {
  imageUrls: string[]
  files: File[]
  onRemove: () => void
}

export const DocumentPreview = ({ imageUrls, files, onRemove }: DocumentPreviewProps) => {
  const { t } = useTranslation('elavtal')
  const [currentPage, setCurrentPage] = useState(0)

  const totalSize = files.reduce((sum, file) => sum + file.size, 0)
  const hasMultiplePages = imageUrls.length > 1

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(imageUrls.length - 1, prev + 1))
  }

  const imageContainerClasses = imageContainerVariants()
  const imagePreviewClasses = imagePreviewVariants()
  const removeButtonClasses = removeButtonVariants()
  const fileInfoTextClasses = fileInfoTextVariants()

  return (
    <div className={imageContainerClasses}>
      {hasMultiplePages && (
        <>
          <div className={pageIndicatorClasses}>
            {t('page')} {currentPage + 1} / {imageUrls.length}
          </div>
          <div className={navigationContainerClasses}>
            <button className={navigationButtonClasses} onClick={handlePrevPage} disabled={currentPage === 0}>
              ← {t('previous')}
            </button>
            <button className={navigationButtonClasses} onClick={handleNextPage} disabled={currentPage === imageUrls.length - 1}>
              {t('next')} →
            </button>
          </div>
        </>
      )}

      <div className={imagePreviewClasses}>
        <Image src={imageUrls[currentPage]} alt={`${t('imagePreviewAlt')} - ${t('page')} ${currentPage + 1}`} fill style={{ objectFit: 'contain' }} />
      </div>

      {hasMultiplePages && (
        <div className={pageDotsClasses}>
          {imageUrls.map((_, index) => (
            <button key={index} className={getPageDotClasses(index === currentPage)} onClick={() => setCurrentPage(index)} aria-label={`${t('goToPage')} ${index + 1}`} />
          ))}
        </div>
      )}

      <div className={fileInfoTextClasses}>
        {hasMultiplePages
          ? `${t('totalPages')}: ${imageUrls.length} | ${t('totalSize')}: ${(totalSize / (1024 * 1024)).toFixed(2)} MB`
          : `${t('fileSize')}: ${(totalSize / (1024 * 1024)).toFixed(2)} MB`}
      </div>

      <button className={removeButtonClasses} onClick={onRemove}>
        {t('removeImage')}
      </button>
    </div>
  )
}
