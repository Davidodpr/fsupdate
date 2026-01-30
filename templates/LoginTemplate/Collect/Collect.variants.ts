import { cva } from 'class-variance-authority'

export const collectWrapperVariants = cva([
  'flex-grow-0 max-w-[90%] basis-2/3 mx-auto',
  'rounded-[var(--radius-main)] bg-white',
  'shadow-[rgb(0_0_0_/_8%)_0px_4px_8px]',
  'w-full h-auto py-16 px-8 min-h-[400px]',
  '[&_a]:text-[var(--color-primary-main)] [&_a]:font-bold [&_a]:max-w-[820px]',
  'sm:max-w-[820px] sm:py-16 sm:px-8',
])

export const innerWrapperVariants = cva(['w-[340px] mt-1.5 mb-[100px]'])

export const headerVariants = cva(['text-2xl font-black mb-2.5 text-center', 'sm:text-4xl'])
