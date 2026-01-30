import { cva } from 'class-variance-authority'

export const toAddressWrapperVariants = cva(['w-full', 'bg-white', 'rounded-[var(--radius-border-radius-main)]', 'p-2.5', '!text-[15px]'])

export const buttonWrapperVariants = cva(['w-full', 'text-sm', 'flex', 'justify-end', 'my-1'])

export const sqmVariants = cva(['max-w-[40%]', 'grow-0', 'p-1', 'h-[60px]', 'font-normal', 'mb-[30px]'])

export const inputsWrapperVariants = cva(['w-full', 'max-h-[220px]'])

export const imageWrapperVariants = cva(['w-5 h-5', 'text-[var(--color-tertiary-main)]'])

export const livingSelectionVariants = cva(['w-full', 'flex justify-center items-center', 'flex-col', 'pb-2.5 px-0 pt-0', '[&_p]:mt-0'])

export const buttonsWrapperVariants = cva(['flex w-full', 'justify-between'])

export const livingSelectionButtonWrapperVariants = cva(
  [
    'w-full h-[34px]',
    'rounded-[var(--radius-radio)]',
    'text-xs font-semibold',
    'relative',
    'bg-[var(--color-inactive-main)]',
    'text-[var(--color-secondary-main)]',
    'flex items-center justify-center',
    'hover:cursor-pointer',
  ],
  {
    variants: {
      selected: {
        true: ['bg-[var(--color-tertiary-main)]', 'text-white'],
      },
    },
  },
)

export const textWrapperVariants = cva([
  'text-[var(--color-primary-dark)]',
  'text-xs font-normal',
  'bg-[#ecf9f7]',
  'p-2.5',
  'rounded-[var(--radius-border-radius-main)]',
  'flex flex-row items-center',
  'mb-5',
  '[&_p]:m-0 [&_p]:ml-2.5',
  '[&_a]:!text-[var(--color-tertiary-main)]',
  '[&_a]:font-semibold',
  '[&_a]:ml-1.25',
  '[&_a:hover]:cursor-pointer',
])

export const selectionWrapperVariants = cva([])

export const apartmentNumberVariants = cva(['w-[60%]', 'mt-3.5 mb-4', 'font-normal'])
