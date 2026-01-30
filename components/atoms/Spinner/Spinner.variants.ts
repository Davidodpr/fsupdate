import { cva, type VariantProps } from 'class-variance-authority'

// Wrapper component for scaling
export const spinnerWrapperVariants = cva('relative flex items-center justify-center', {
  variants: {
    scale: {
      1: 'scale-100',
      1.5: 'scale-150',
      2: 'scale-200',
      3: 'w-[55px] h-[55px]', // Special handling for scale 3 - changes the SVG size directly
    },
  },
  defaultVariants: {
    scale: 1,
  },
})

// Main spinner container
export const spinnerContainerVariants = cva('h-6 w-6 relative', {
  variants: {
    percentage: {
      true: 'flex flex-col justify-center items-center h-auto',
    },
  },
})

// SVG variants
export const spinnerSvgVariants = cva(['animate-spinner-rotator', 'stroke-[var(--color-black-main)]', 'stroke-[4px]'], {
  variants: {
    color: {
      default: 'stroke-[var(--color-black-main)]',
      green: 'stroke-[var(--color-tertiary-main)]',
      white: 'stroke-[var(--color-white-main)]',
    },
    bolder: {
      true: '!stroke-[6px]',
    },
    scale: {
      3: '!w-[55px] !h-[55px]', // Override size for scale 3
    },
  },
  defaultVariants: {
    color: 'default',
  },
})

// Circle path variants
export const spinnerCircleVariants = cva(['block', 'stroke-linecap-round', 'animate-spinner-dash', 'origin-center'], {
  variants: {},
})

// Percentage text variants
export const spinnerPercentageTextVariants = cva(['text-[length:var(--font-size-2)]', 'font-bold', 'absolute', 'flex', 'items-center', 'justify-center'])

// Positioned wrapper (equivalent to old SpinnerWrapper)
export const spinnerPositionedWrapperVariants = cva('absolute top-[200px] left-1/2 -translate-x-1/2')

export type SpinnerWrapperVariants = VariantProps<typeof spinnerWrapperVariants>
export type SpinnerContainerVariants = VariantProps<typeof spinnerContainerVariants>
export type SpinnerSvgVariants = VariantProps<typeof spinnerSvgVariants>
export type SpinnerCircleVariants = VariantProps<typeof spinnerCircleVariants>
export type SpinnerPercentageTextVariants = VariantProps<typeof spinnerPercentageTextVariants>
export type SpinnerPositionedWrapperVariants = VariantProps<typeof spinnerPositionedWrapperVariants>
