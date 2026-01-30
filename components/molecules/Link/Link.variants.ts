import { cva } from 'class-variance-authority'

export const linkContentVariants = cva(
  [
    'font-bold cursor-pointer text-[var(--color-secondary-main)]',
    'border-b-2 border-solid transition-[border-bottom-color] duration-500',
    // Default border styling
    'border-transparent',
  ],
  {
    variants: {
      noUnderline: {
        true: 'hover:border-transparent',
        false: 'hover:border-[var(--color-secondary-main)]',
      },
      isActive: {
        true: 'border-[var(--color-secondary-main)]',
        false: '',
      },
      underline: {
        true: 'border-[var(--color-secondary-main)]',
        false: '',
      },
    },
    compoundVariants: [
      {
        noUnderline: false,
        isActive: true,
        class: 'border-[var(--color-secondary-main)]',
      },
      {
        noUnderline: false,
        underline: true,
        class: 'border-[var(--color-secondary-main)]',
      },
    ],
    defaultVariants: {
      noUnderline: false,
      isActive: false,
      underline: false,
    },
  },
)

export type LinkContentVariants = Parameters<typeof linkContentVariants>[0]
