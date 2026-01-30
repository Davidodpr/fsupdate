import { cva } from 'class-variance-authority'

export const cancelWrapperVariants = cva(['mt-8', 'w-full', 'h-full', 'px-4 pb-[50px] pt-0', 'md:max-w-[744px] md:mx-auto md:mt-4 md:p-0'])

export const innerWrapperVariants = cva([
  'md:p-4 p-3',
  'w-[822px]',
  'max-w-full',
  'mt-5',
  'flex',
  'flex-col',
  'bg-[var(--color-white-main)]',
  'rounded-[var(--radius-main)]',
  'relative',
  'shadow-[var(--shadow-regular)]',
  'md:p-8',
])

export const mainWrapperVariants = cva(['px-2 py-4', 'w-full', 'flex-col', 'md:py-4 md:px-0'])

export const goToFindServiceButtonVariants = cva([
  'bg-[var(--color-white-main)]',
  'border-b-2',
  'border-[var(--color-text-main)]',
  'text-center',
  'mb-[5px]',
  'hover:cursor-pointer',
])

export const cancellationOptionsListVariants = cva(['[&_a]:!text-[var(--color-tertiary-main)]', '[&_a]:!font-bold'])

export const autocompleteStyledVariants = cva(['my-4', 'max-w-full', 'md:max-w-[50%]'])
