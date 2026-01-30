import { cva } from 'class-variance-authority'

export const modalContentWrapperVariants = cva([
  'flex',
  'flex-col',
  'items-center',
  'justify-center',
  'p-6',
])

export const modalImageWrapperVariants = cva([
  'flex',
  'justify-center',
  'items-center',
  'mb-6',
])

export const modalTextWrapperVariants = cva([
  'text-center',
  'mb-6',
  'max-w-[400px]',
])

export const modalButtonWrapperVariants = cva([
  'flex',
  'flex-col',
  'gap-3',
  'w-full',
  'max-w-[300px]',
])

export const modalHeaderVariants = cva([
  'px-6',
  'py-4',
])

export const modalDividerVariants = cva([
  'w-full',
  'h-px',
  'bg-gray-200',
  'mb-4',
])