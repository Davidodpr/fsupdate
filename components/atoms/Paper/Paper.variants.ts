import { cva, type VariantProps } from 'class-variance-authority'

export const paperVariants = cva(
  [
    // Base styles - matches original Paper component with CSS custom properties
    'bg-[var(--color-background-secondary)]',
    'shadow-[var(--shadow-regular)]',
    'rounded-[var(--radius-border-radius-main)]',
  ],
  {
    variants: {
      variant: {
        default: '',
        // Additional variants can be added as needed
        elevated: 'shadow-[0px_12px_24px_rgba(0,0,0,0.12)]',
        flat: 'shadow-none',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type PaperVariants = VariantProps<typeof paperVariants>
