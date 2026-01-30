import { cva } from 'class-variance-authority'

export const step3SummaryWrapperVariants = cva(['w-full', 'h-full', 'px-4 pb-20', 'md:max-w-[744px]', 'md:mx-auto', 'md:p-0'])

export const priceAndDiscountTextVariants = cva(['md:!text-[20px]', 'font-normal'])

export const priceAndDiscountTextBoldVariants = cva(['md:!text-[16px] text-[16px]', '!font-bold'])

export const modalHeaderWrapperVariants = cva(['flex', 'flex-col', 'w-full', 'md:mb-4'])

export const modalContentWrapperVariants = cva(['flex', 'flex-col', 'w-full', 'items-start'])

export const modalContentTextWrapperVariants = cva(['text-left', 'text-[var(--color-text-main)]', 'mb-4'])

export const bottomSectionTitleWrapperVariants = cva([
  'flex',
  'items-center',
  'justify-center',
  'w-full',
  'relative',
  'text-[var(--color-text-main)]',
  '[&_svg]:text-[var(--color-text-main)]',
  'hover:cursor-pointer',
  'md:w-full',
  'md:my-4',
  'md:h-8',
])

export const arrowWrapperVariants = cva(['absolute', 'left-0', 'flex', 'justify-center', 'items-center', 'md:flex', 'md:justify-center', 'md:items-center', 'md:pr-4'])

export const agreementSectionWrapperVariants = cva(['flex', 'flex-col', 'text-[var(--color-text-main)]', 'mb-0', 'md:mb-0', 'max-w-full', 'mt-6 md:mt-0', 'md:max-w-[60%]'])

export const agreementSectionVariants = cva([
  'flex',
  'items-center',
  'w-full',
  'p-3',
  'rounded-lg',
  'bg-[var(--color-primary-extra-light)]',
  '[&_a]:text-[var(--color-primary-main)]',
  '[&_a]:underline',
  '[&_a:hover]:text-[var(--color-primary-dark)]',
])

export const movingPriceBoxVariants = cva(['px-3 py-2', 'rounded-lg', 'bg-[var(--color-standard-move-section-background)]', 'h-fit', 'ml-4'])

export const hourlyPriceBoxVariants = cva(['px-3 py-2', 'rounded-lg', 'bg-[#befbff]', 'h-fit', 'ml-4'])

export const questionIconWrapperVariants = cva(['w-6', 'h-6', 'text-[var(--color-question-icon-color)]', 'hover:cursor-pointer'])

export const largeButtonWrapperVariants = cva(['h-12', 'm-0', 'md:p-0'])

export const buttonsWrapperVariants = cva(['flex', 'w-full', 'items-center', 'mt-8'])

export const headerWrapperVariants = cva([
  'flex',
  'border-b border-[var(--color-background-default)]',
  'relative',
  'items-center',
  'w-full',
  'justify-between',
  'pb-4',
  'flex-wrap',
  'md:w-full',
  'md:p-0',
  'md:pb-4',
  'md:border-b md:border-[#21476633]',
  'md:text-[32px]',
  '[&>p]:md:text-[32px]',
  '[&>p]:md:font-bold',
])

export const mainWrapperVariants = cva(['flex', 'py-4 px-0', 'flex-col', 'md:pt-4 md:pb-0'])

export const innerWrapperVariants = cva([
  'p-4',
  'w-[822px]',
  'max-w-full',
  'flex',
  'flex-col',
  'bg-white',
  'rounded-[var(--radius-main)]',
  'relative',
  'shadow-[var(--shadow-regular)]',
  'md:p-8 md:px-12',
])
