import { cva } from 'class-variance-authority'

export const step4BankIdWrapperVariants = cva(['w-full', 'h-full', 'px-4', 'pb-[50px]', 'md:max-w-[744px]', 'md:mx-auto', 'md:p-0', '[&_b:hover]:cursor-pointer'])

export const innerWrapperVariants = cva([
  'p-4',
  'w-full',
  'max-w-[822px]',
  'mt-4',
  'flex',
  'flex-col',
  'bg-white',
  'rounded-[var(--radius-main)]',
  'relative',
  'justify-center',
  'items-center',
  'shadow-[rgba(0,0,0,0.07)_0px_4px_32px]',
  'md:p-8',
])

export const headerVariants = cva(['text-2xl', 'font-black', 'mb-2.5', 'mt-0', 'text-center', 'sm:text-4xl'])

export const largeButtonWrapperVariants = cva(['w-[300px]', 'h-12', 'flex', 'justify-center', 'items-center', 'my-[60px]', 'md:w-[300px]'], {
  variants: {
    variant: {
      fb: ['w-auto'],
      fortum: [],
      normal: [],
    },
  },
})

export const goBackButtonVariants = cva([
  'bg-white',
  'border-b-2',
  'border-[var(--color-tertiary-text-color)]',
  'text-[var(--color-text-main)]',
  'w-[65px]',
  'text-center',
  'h-6',
  'mb-[5px]',
  'hover:cursor-pointer',
])

export const collectWrapperVariants = cva([
  'flex-grow-0',
  'max-w-[90%]',
  'flex-[66%]',
  'mx-auto',
  'rounded-[var(--radius-main)]',
  'bg-white',
  'shadow-[rgb(0_0_0)]',
  'w-full',
  'h-auto',
  'py-16',
  'px-8',
  'min-h-[400px]',
  '[&_a]:text-[var(--color-primary-main)]',
  '[&_a]:font-bold',
  '[&_a]:max-w-[820px]',
  'sm:max-w-[820px]',
  'sm:py-16',
  'sm:px-8',
])
