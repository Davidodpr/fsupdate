import { cva } from 'class-variance-authority'

export const showMoreSectionVariants = cva(['flex', 'justify-center', 'items-center', 'mx-auto', 'hover:cursor-pointer'])

export const showMoreTextVariants = cva(['text-[var(--color-secondary-main-dark)]', '!text-[15px]', '!font-bold', 'md:!text-base'])

export const largeButtonWrapperVariants = cva(['h-12', 'min-w-[180px]'])

export const priceAndDiscountTextVariants = cva(['text-[20px]', 'font-normal'])

export const priceAndDiscountTextBoldVariants = cva(['text-[20px]', '!font-bold'])

export const priceAndDiscountTextRedBoldVariants = cva(['text-[20px]', '!font-bold', 'text-[var(--color-primary-dark)]'])

export const discountPriceVariants = cva([
  'text-[var(--fs-price-text)]',
  'text-[var(--color-secondary-text)]',
  'tracking-[-1px]',
  'font-[var(--font-family-primary)]',
  '!font-extrabold',
  'leading-[120%]',
])

export const discountedPriceVariants = cva([
  'text-[var(--color-primary-main)]',
  'text-[20px]',
  'tracking-[-1px]',
  'font-[var(--font-family-primary)]',
  '!font-extrabold',
  'leading-[120%]',
])

export const electricityProviderCardWrapperVariants = cva([
  'w-full',
  'min-w-full',
  'h-full',
  'flex',
  'flex-col',
  'items-center',
  'bg-white',
  'rounded-[var(--radius-main)]',
  'relative',
  'shadow-[var(--shadow-regular)]',
  'md:max-w-[640px] md:p-8',
])

export const priceAndDiscountWrapperVariants = cva(['flex', 'flex-col', 'justify-end', 'flex-1', 'text-right'])

export const movingPriceBoxVariants = cva(['px-3 py-2', 'rounded-lg', 'bg-[var(--color-standard-move-section-background)]', 'h-fit', 'min-w-fit'])

export const discountBoxVariants = cva(['px-3 py-2', 'rounded-lg', 'bg-[var(--color-primary-light)]', 'h-fit', 'min-w-fit', '!text-[14px]'])

export const hourlyPriceBoxVariants = cva(['px-3 py-2', 'rounded-lg', 'bg-[#befbff]', 'h-fit', 'min-w-fit', '!text-[14px]'])

export const noDiscountBoxVariants = cva(['px-3 py-2', 'rounded-lg', 'bg-[#E8EDF0]', 'text-[var(--color-secondary-main)]', 'h-fit', 'min-w-fit'])

export const priceAndDiscountInfoWrapperVariants = cva([
  'flex',
  'w-full',
  'flex-col',
  'justify-between',
  'text-left',
  'items-center',
  'p-4',
  'flex-1',
  'gap-4',
  'md:justify-start md:pt-4 md:px-0 md:pb-0 md:gap-2.5 md:flex-row',
])

export const electricityProviderCardHeaderContentVariants = cva([
  'flex',
  'border-b border-[var(--color-inactive-light)]',
  'relative',
  'justify-between',
  'py-4 px-0',
  'flex-wrap',
  'w-[90%]',
  'md:w-full md:p-0 md:border-b-0 md:items-center',
])
