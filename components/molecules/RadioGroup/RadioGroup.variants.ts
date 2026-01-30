import { cva } from 'class-variance-authority'

export const radioGroupVariants = cva('w-full')

export const radioItemVariants = cva(
  [
    // Reset styles
    'flex flex-row justify-center items-center',
    'w-[18px] h-[18px] min-w-[18px] ml-[10px]',
    'border border-solid border-[var(--color-radio-border)] rounded-full',
    'bg-[var(--color-white-main)]',
    'hover:cursor-pointer',
    // Checked state - keep white background with colored border
    'data-[state=checked]:border-[var(--color-primary-main)] data-[state=checked]:bg-[var(--color-white-main)]',
  ],
  {
    variants: {
      whiteMain: {
        true: ['ml-0', 'data-[state=checked]:border-[var(--color-primary-main)] data-[state=checked]:bg-[var(--color-white-main)]'],
        false: '',
      },
      MoveDownItem: {
        true: 'mt-3',
        false: '',
      },
    },
    defaultVariants: {
      whiteMain: false,
      MoveDownItem: false,
    },
  },
)

export const radioIndicatorVariants = cva(
  [
    'flex items-center justify-center w-full h-full relative',
    // After pseudo-element for the inner dot
    'after:content-[""] after:block after:w-2.5 after:h-2.5',
    'after:rounded-full after:bg-[var(--color-primary-main)]',
  ],
  {
    variants: {
      whiteMain: {
        true: 'after:bg-[var(--color-primary-main)]',
        false: 'after:bg-[var(--color-white-main)]',
      },
    },
    defaultVariants: {
      whiteMain: false,
    },
  },
)

export const radioLabelVariants = cva(['w-full max-w-full flex flex-row items-center h-full', 'hover:cursor-pointer'])

export type RadioItemVariants = Parameters<typeof radioItemVariants>[0]
export type RadioIndicatorVariants = Parameters<typeof radioIndicatorVariants>[0]
