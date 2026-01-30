import { cva, type VariantProps } from 'class-variance-authority'

export const h1Variants = cva(
  [
    // Base styles
    'font-[900] text-[32px] leading-normal',
    // Responsive scaling - using md: breakpoint to match original behavior
    'md:text-[64px]',
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

export type H1Variants = VariantProps<typeof h1Variants>
