import { cva, type VariantProps } from 'class-variance-authority'

export const failedWrapperVariants = cva([
  'flex-grow-0',
  'max-w-[90%]',
  'flex-basis-[66%]',
  'mx-auto',
  'rounded-[var(--border-radius-main)]',
  'bg-white',
  'shadow-[rgb(0_0_0)]',
  'w-full',
  'h-auto',
  'p-8',
  'min-h-[400px]',
  '[&_a]:text-[var(--color-primary-main)]',
  '[&_a]:font-bold',
  'sm:max-w-[820px]',
])

export const largeButtonWrapperVariants = cva(['w-[260px]', 'h-12'])

export const buttonWrapperVariants = cva(['flex', 'w-full', 'justify-center', 'text-xs'])

export const innerWrapperVariants = cva(['w-full', 'mt-5', 'text-center', 'sm:w-[500px]'])

export const headerVariants = cva(['text-2xl', 'font-black', 'my-0', 'mb-[10px]', 'sm:text-4xl'])

export type FailedWrapperVariants = VariantProps<typeof failedWrapperVariants>
export type LargeButtonWrapperVariants = VariantProps<typeof largeButtonWrapperVariants>
export type ButtonWrapperVariants = VariantProps<typeof buttonWrapperVariants>
export type InnerWrapperVariants = VariantProps<typeof innerWrapperVariants>
export type HeaderVariants = VariantProps<typeof headerVariants>
