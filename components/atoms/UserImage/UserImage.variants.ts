import { cva, type VariantProps } from 'class-variance-authority'

export const userImageVariants = cva('rounded-full bg-cover bg-center', {
  variants: {
    size: {
      sm: 'w-8 h-8',
      md: 'w-12 h-12', // 48px - default size used in Footer
      lg: 'w-16 h-16',
      xl: 'w-20 h-20',
      custom: '', // Allows custom size via className
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type UserImageVariants = VariantProps<typeof userImageVariants>
