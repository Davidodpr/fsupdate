import { cva } from 'class-variance-authority'

export const failedWrapperVariants = cva([
  'flex',
  'flex-col',
  'items-center',
  'flex-grow-0',
  'max-w-[95%]',
  'basis-[66%]',
  'mx-auto',
  'p-4',
  'rounded-[var(--radius-border-radius-main)]',
  'w-full',
  'h-auto',
  'bg-white',
  '[&_a]:text-[var(--color-primary-main)]',
  '[&_a]:font-bold',
  'sm:max-w-[740px]',
])

export const innerWrapperVariants = cva(['flex', 'flex-col', 'items-center', 'mt-5', 'text-center', 'sm:w-[80%]'])
