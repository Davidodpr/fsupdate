import { cva, type VariantProps } from 'class-variance-authority'

export const boxVariants = cva(
  '', // No base styles - just a flexible container
  {
    variants: {
      textAlign: {
        center: 'text-center',
        left: 'text-left',
        right: 'text-right',
        justify: 'text-justify',
      },
    },
  },
)

export type BoxVariants = VariantProps<typeof boxVariants>
