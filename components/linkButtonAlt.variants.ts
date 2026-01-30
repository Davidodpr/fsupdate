import { cva } from 'class-variance-authority'

export const linkButtonAltVariants = cva(
  [
    // Base styles
    'font-bold text-[var(--color-secondary-main)] cursor-pointer',
    'border-transparent bg-transparent leading-none',
    // SVG styles for icons
    '[&_svg_*]:stroke-[var(--color-text-main)]',
  ],
  {
    variants: {
      noUnderline: {
        true: ['border-b-0', 'hover:border-transparent'],
        false: ['border-b-2 border-b-solid', 'hover:border-b-[var(--color-secondary-main)]'],
      },
      isDisabled: {
        true: ['cursor-not-allowed opacity-50'],
      },
    },
    defaultVariants: {
      noUnderline: false,
    },
  },
)
