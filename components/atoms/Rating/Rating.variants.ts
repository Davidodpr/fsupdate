import { cva, type VariantProps } from 'class-variance-authority'

export const wrapperVariants = cva(['flex', 'items-end', 'p-0', 'gap-2', 'h-4', 'flex-none', 'order-1', 'self-stretch', 'grow-0'], {
  variants: {
    asColumn: {
      true: 'flex-col h-max items-start',
      false: 'flex-row',
    },
  },
  defaultVariants: {
    asColumn: false,
  },
})

export const starRatingsVariants = cva(
  ['relative', 'm-0', 'p-0', 'w-fit', 'h-[15px]', 'font-normal', 'font-bold', 'leading-[19px]', 'text-center', 'flex-none', 'order-0', 'grow-0', 'z-0'],
  {
    variants: {
      fontSize: {
        default: 'text-base',
        small: 'text-sm',
        large: 'text-lg',
      },
    },
    defaultVariants: {
      fontSize: 'default',
    },
  },
)

export const coloredStarsVariants = cva(['p-0', 'absolute', 'z-[1]', 'block', 'top-0', 'left-0', 'overflow-hidden'])

export const blankStarsVariants = cva(['p-0', 'block', 'z-0'])

export const ratingNumberVariants = cva(['font-bold', 'leading-[19px]', 'text-center', 'no-underline'], {
  variants: {
    fontSize: {
      default: 'text-base',
      small: 'text-sm',
      large: 'text-lg',
    },
  },
  defaultVariants: {
    fontSize: 'default',
  },
})

export const ratingTextVariants = cva(['h-[15px]', 'font-normal', 'text-[13px]', 'leading-[15px]', 'flex', 'items-center', 'text-right', 'tracking-[0.02em]'], {
  variants: {
    darkFont: {
      true: 'text-[var(--color-text-main)]',
      false: 'text-[var(--color-primary-contrast-text)]',
    },
  },
  defaultVariants: {
    darkFont: false,
  },
})

export type WrapperVariants = VariantProps<typeof wrapperVariants>
export type StarRatingsVariants = VariantProps<typeof starRatingsVariants>
export type ColoredStarsVariants = VariantProps<typeof coloredStarsVariants>
export type BlankStarsVariants = VariantProps<typeof blankStarsVariants>
export type RatingNumberVariants = VariantProps<typeof ratingNumberVariants>
export type RatingTextVariants = VariantProps<typeof ratingTextVariants>
