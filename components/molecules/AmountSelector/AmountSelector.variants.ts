import { cva } from 'class-variance-authority'

export const amountSelectorWrapperVariants = cva('flex absolute left-[5px] bottom-[5px] text-[var(--color-tertiary-main)]')

export const minusButtonVariants = cva([
  'rounded-full w-5 h-5 bg-[var(--color-white-main)]',
  'border border-solid border-[var(--color-tertiary-main)]',
  'text-[20px] flex items-center justify-center',
  'transition-colors duration-200',
  'hover:cursor-pointer hover:bg-[var(--color-tertiary-main)] hover:text-[var(--color-white-main)]',
  // Paragraph styling
  '[&_p]:select-none [&_p]:pl-px',
])

export const plusButtonVariants = cva([
  'rounded-full w-5 h-5 bg-[var(--color-white-main)]',
  'border border-solid border-[var(--color-tertiary-main)]',
  'text-[20px] flex items-center justify-center text-center',
  'transition-colors duration-200',
  'hover:cursor-pointer hover:bg-[var(--color-tertiary-main)] hover:text-[var(--color-white-main)]',
  // Paragraph styling
  '[&_p]:select-none [&_p]:pl-px [&_p]:pt-px',
])

export const amountDisplayVariants = cva('px-[5px] font-bold w-[18px]', {
  variants: {
    large: {
      true: 'w-[23px]',
      false: '',
    },
  },
  defaultVariants: {
    large: false,
  },
})

export type AmountDisplayVariants = Parameters<typeof amountDisplayVariants>[0]
