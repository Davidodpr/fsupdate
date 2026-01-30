import { cva } from 'class-variance-authority'

export const step2DetailsContainerVariants = cva(['relative', 'w-full', 'px-4 py-5', 'md:p-0'])

export const step2DetailsWrapperVariants = cva(['mb-6'])

export const addressDetailsWrapperVariants = cva(['mb-4'])

export const topTitleTextVariants = cva(['mx-0 mt-0 mb-4', 'text-2xl', 'leading-8', 'font-bold', 'text-[var(--color-primary-dark)]'])

export const sectionTitleTextVariants = cva(['mx-0 mt-6 mb-4', 'text-xl', 'font-semibold', 'text-[var(--color-text-main)]'])

export const descriptionTextVariants = cva(['mx-0 my-2', 'text-base', 'text-[var(--color-text-secondary)]'])

export const inputWrapperVariants = cva(['mb-4'])

export const inputLabelVariants = cva(['block', 'mb-2', 'text-sm', 'font-medium', 'text-[var(--color-text-main)]'])

export const inputFieldVariants = cva([
  'w-full',
  'px-3 py-2',
  'border',
  'border-[var(--color-border-main)]',
  'rounded-[var(--radius-main)]',
  'text-[var(--color-text-main)]',
  'focus:outline-none',
  'focus:border-[var(--color-primary-main)]',
  'focus:ring-1',
  'focus:ring-[var(--color-primary-main)]',
])

export const residenceTypeWrapperVariants = cva(['flex', 'gap-4', 'mb-6'])

export const residenceButtonVariants = cva(
  [
    'flex-1',
    'px-4 py-3',
    'border-2',
    'rounded-[var(--radius-main)]',
    'text-center',
    'font-medium',
    'transition-colors',
    'cursor-pointer',
    'bg-white',
    'border-[var(--color-border-main)]',
    'text-[var(--color-text-main)]',
    'hover:border-[var(--color-primary-main)]',
    'hover:bg-[var(--color-primary-light)]',
  ],
  {
    variants: {
      selected: {
        true: [
          'bg-[var(--color-primary-main)]',
          'border-[var(--color-primary-main)]',
          'text-white',
          'hover:bg-[var(--color-primary-dark)]',
          'hover:border-[var(--color-primary-dark)]',
        ],
      },
    },
  },
)

export const checkboxWrapperVariants = cva(['flex', 'items-start', 'gap-3', 'mb-4'])

export const checkboxInputVariants = cva([
  'mt-1',
  'w-4 h-4',
  'text-[var(--color-primary-main)]',
  'border-[var(--color-border-main)]',
  'rounded',
  'focus:ring-[var(--color-primary-main)]',
])

export const checkboxLabelVariants = cva(['text-sm', 'text-[var(--color-text-main)]', 'leading-5'])

export const errorMessageVariants = cva(['mt-1', 'text-xs', 'text-[var(--color-error-main)]'])

export const infoBoxWrapperVariants = cva(['p-4', 'mb-4', 'bg-[var(--color-info-bg)]', 'border', 'border-[var(--color-info-border)]', 'rounded-[var(--radius-main)]'])

export const infoTextVariants = cva(['text-sm', 'text-[var(--color-info-text)]'])

export const dividerVariants = cva(['w-full', 'h-px', 'my-6', 'bg-[var(--color-border-light)]'])

export const buttonWrapperVariants = cva(['flex', 'justify-end', 'gap-3', 'mt-6'])

export const formSectionVariants = cva(['space-y-4'])

export const flexRowVariants = cva(['flex', 'gap-4', 'items-center'])

export const flexColumnVariants = cva(['flex', 'flex-col', 'gap-2'])
