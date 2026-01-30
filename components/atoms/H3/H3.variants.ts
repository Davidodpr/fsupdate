import { cva, type VariantProps } from 'class-variance-authority'

export const h3Variants = cva(
  [
    // Base styles
    'font-bold text-[18px] mt-0 mb-[10px]',
    // Responsive scaling
    'sm:text-[20px]',
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

export type H3Variants = VariantProps<typeof h3Variants>
