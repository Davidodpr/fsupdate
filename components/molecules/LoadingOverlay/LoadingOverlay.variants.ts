import { cva } from 'class-variance-authority'

export const overlayContainerVariants = cva(['fixed inset-0', 'bg-white/95 backdrop-blur-sm', 'flex flex-col items-center justify-center', 'z-[9999] gap-6'])

export const loadingContentVariants = cva(['text-center', 'text-[#2B2B2B]', 'font-[var(--font-family-main)]'])

export const loadingTitleVariants = cva(['text-lg font-light', 'text-[#2B2B2B]'])

export const loadingSubtextVariants = cva(['text-sm', 'text-[#666]', 'mt-2', 'font-light'])
