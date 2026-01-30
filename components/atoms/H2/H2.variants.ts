import { cva, type VariantProps } from 'class-variance-authority'

export const h2Variants = cva(
  [
    // Base styles
    'font-bold text-[24px] mt-0 mb-[10px]',
    // Responsive scaling
    'sm:text-[32px]',
  ],
  {
    variants: {
      textAlign: {
        center: 'text-center',
        left: 'text-left',
        right: 'text-right',
      },
    },
    defaultVariants: {
      textAlign: 'left',
    },
  },
)

export type H2Variants = VariantProps<typeof h2Variants>
