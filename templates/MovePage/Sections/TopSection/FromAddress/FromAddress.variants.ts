import { cva } from 'class-variance-authority'

export const fromAddressWrapperVariants = cva(['w-full', 'bg-white', 'rounded-[var(--radius-border-radius-main)]', 'p-2.5', 'relative', 'overflow-y-visible', '!text-[15px]'])

export const buttonWrapperVariants = cva(['w-full', 'text-sm', 'flex', 'justify-end', 'mb-1 mt-3'])

export const sqmVariants = cva(['max-w-[50%]', 'grow-0', 'p-1', 'font-normal', 'md:min-w-[50%]'])

export const inputsWrapperVariants = cva(['w-full'])

export const questionIconWrapperVariants = cva([
  'w-6 h-6',
  'text-[var(--color-question-icon-color)]',
  'text-[15px]',
  'hover:cursor-pointer',
  '[&_svg]:text-[var(--color-question-icon-color)]',
  '[&_svg_path]:text-[var(--color-question-icon-color)]',
])

export const popupWrapperVariants = cva(['text-[15px]', 'max-w-[300px]'])
