import { cva } from 'class-variance-authority'

export const wrapperVariants = cva(['bg-[var(--color-secondary-main)]', 'text-white', 'py-12 px-0', 'text-center', 'flex flex-col'])

export const buttonWrapperVariants = cva(['w-[211px]', 'h-14'])

export const phoneVariants = cva([
  'font-semibold text-base',
  'mb-3',
  'text-[var(--color-primary-main)]',
  '[&_.normal]:hidden',
  '[&_.fortum]:block',
  'sm:font-bold sm:mb-3 sm:text-xl',
])

export const titleVariants = cva(['font-semibold text-xl', 'mb-3', '[&_.normal]:hidden', '[&_.fortum]:block', 'sm:font-bold sm:mb-3 sm:text-2xl'])

export const additionalInfoVariants = cva(['text-base', 'mt-1', 'sm:text-base'])
