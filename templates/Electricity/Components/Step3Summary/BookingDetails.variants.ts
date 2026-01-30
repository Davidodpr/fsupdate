import { cva } from 'class-variance-authority'

export const inputSectionWrapperVariants = cva(['flex', 'flex-col', 'gap-4', 'p-0', 'md:flex-row', 'md:gap-0', 'md:justify-between', 'md:p-4'])

export const penWrapperVariants = cva(['w-[18px]', 'h-[18px]', 'text-[var(--color-secondary-main)]', 'hover:cursor-pointer'])

export const buttonWrapperVariants = cva(['w-full', 'md:w-[160px]', 'md:h-12'])

export const inputWrapperVariants = cva(['flex', 'flex-col', 'gap-4', 'w-full', 'md:gap-0', 'md:flex-row', 'md:justify-between', 'md:max-w-[60%]'])

export const cardTitleVariants = cva([
  'flex',
  'flex-col',
  'bg-[var(--color-summary-card-bg)]',
  'border border-[var(--color-border-light)]',
  'rounded-t-[var(--radius-main)]',
  'text-[var(--color-text-main)]',
  'py-4 px-6',
  'gap-1',
  'md:p-6 md:gap-2',
])

export const cardTitleTextVariants = cva(['text-xl', 'font-bold', 'leading-6', 'text-[var(--color-text-main)]', 'mb-0', 'md:text-2xl md:leading-7'])

export const textSectionVariants = cva([
  'flex',
  'flex-col',
  'bg-white',
  'border-x border-b border-[var(--color-border-light)]',
  'rounded-b-[var(--radius-main)]',
  'py-4 px-6',
  'gap-4',
  'md:p-6 md:gap-6',
])

export const emailAndPhoneSectionVariants = cva(['flex', 'flex-col', 'gap-2', 'md:gap-4'])

export const boldTextVariants = cva(['!font-bold'])

export const largerTextVariants = cva(['!text-lg'])
