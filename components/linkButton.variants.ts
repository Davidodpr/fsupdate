import { cva, type VariantProps } from 'class-variance-authority'

export const linkButtonVariants = cva(
  [
    // Base styles
    'font-bold text-[var(--color-secondary-main)] cursor-pointer',
    'border-transparent transition-[border-bottom] duration-500 leading-none',
    // SVG styles for icons
    '[&_svg_*]:stroke-[var(--color-text-main)]',
  ],
  {
    variants: {
      noUnderline: {
        true: ['border-b-0', 'hover:border-transparent'],
        false: ['border-b-2 border-b-solid', 'hover:border-b-[var(--color-secondary-main)]'],
      },
    },
    defaultVariants: {
      noUnderline: false,
    },
  },
)

export type LinkButtonVariants = VariantProps<typeof linkButtonVariants>
