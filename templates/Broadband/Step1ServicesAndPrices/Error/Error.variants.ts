import { cva } from 'class-variance-authority'

export const failedWrapperVariants = cva([
  'flex',
  'flex-col',
  'items-center',
  'text-center',
  'mt-2',
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
  'sm:max-w-[629px]',
])

export const innerWrapperVariants = cva(['mt-5', 'text-center', 'sm:w-[350px]'])

export const subButtonWrapperVariants = cva(['flex', 'w-full', 'justify-center', 'text-xs', 'flex-col', 'my-2.5', 'sm:flex-row', 'lg:flex-row'])

export const subLargeButtonWrapperVariants = cva(['h-12', 'm-[5px]', 'min-w-[260px]'])

export const errorMessageFrameVariants = cva(['flex', 'flex-col', 'items-center', 'p-4', 'gap-4', 'md:py-8 md:px-2.5'], {
  variants: {
    variant: {
      fb: 'bg-[var(--color-background-default)]',
      fortum: '',
      normal: '',
    },
  },
})
