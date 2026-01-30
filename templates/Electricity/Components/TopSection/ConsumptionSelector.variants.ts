import { cva } from 'class-variance-authority'

export const buttonsWrapperVariants = cva(['flex', 'w-full', 'justify-between', 'pt-2'])

export const consumptionSwitchButtonVariants = cva(
  [
    'w-full',
    'h-[38px]',
    'rounded-[var(--radius-radio)]',
    'font-medium',
    'relative',
    'bg-[var(--color-gray)]',
    'text-black',
    'flex',
    'items-center',
    'justify-center',
    'mx-[5px] my-0',
    'hover:cursor-pointer',
  ],
  {
    variants: {
      selected: {
        true: ['bg-[var(--color-primary-main)]', 'text-white'],
      },
    },
  },
)

export const inputAndTextWrapperVariants = cva(['flex', 'justify-center', 'items-end', 'px-2 py-0', 'relative'])

export const resetVariants = cva([
  'text-[#112E46]',
  'underline',
  'absolute',
  'right-[10px]',
  'bottom-5',
  'flex',
  'justify-center',
  'items-center',
  'm-0',
  '!text-xs',
  'md:right-[10px] md:bottom-4 md:!text-xs',
  'hover:cursor-pointer',
])

export const styledConsumptionSelectorTextVariants = cva(['m-0 ml-[5px]', 'text-[var(--color-secondary-light)]', '!font-bold'])

export const consumptionSelectorWrapperVariants = cva(['h-full', 'flex', 'flex-col', 'items-center', 'md:flex-row'])

export const styledInputVariants = cva(
  [
    'all-[unset]',
    'w-[100px]',
    '!text-[30px]',
    'bg-none',
    'border-none',
    'relative',
    '!border-b-2 !border-dashed !border-[var(--color-secondary-light)]',
    'text-center',
    'text-[var(--color-secondary-light)]',
    'font-bold',
    'outline-none',
    'appearance-none',
    'pb-1',
  ],
  {
    variants: {
      withSolidUnderline: {
        true: 'border-b-2 border-solid border-[var(--color-accent-icon)]',
      },
      withFastighetsbyranColors: {
        true: 'text-[var(--color-text-main)]',
      },
    },
  },
)

export const streetTextVariants = cva(['border-b border-[var(--color-inactive-main)]', 'm-0', 'py-2 px-0', 'text-[var(--color-text-main)]'])

export const consumptionSelectorTopSectionVariants = cva([
  'flex',
  'flex-col',
  'justify-center',
  'min-w-full',
  'border border-[var(--color-inactive-main)]',
  'rounded-[var(--radius-main)]',
  'px-2 py-0',
  'mb-2',
  'md:min-w-[50%]',
])
