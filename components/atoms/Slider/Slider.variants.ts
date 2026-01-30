import { cva, type VariantProps } from 'class-variance-authority'

export const sliderRootVariants = cva([
  // Base root styles
  'relative flex items-center select-none touch-none',
  // Horizontal orientation
  'data-[orientation=horizontal]:h-4',
  // Vertical orientation
  'data-[orientation=vertical]:flex-col data-[orientation=vertical]:w-4 data-[orientation=vertical]:h-full',
])

export const sliderTrackVariants = cva([
  // Base track styles
  'relative flex-grow bg-[#dddddd] rounded-full',
  // Horizontal orientation
  'data-[orientation=horizontal]:h-2',
  // Vertical orientation
  'data-[orientation=vertical]:w-2',
])

export const sliderRangeVariants = cva([
  // Base range styles
  'absolute bg-[var(--color-secondary-main)] rounded-full',
  // Horizontal orientation
  'data-[orientation=horizontal]:h-2',
  // Vertical orientation
  'data-[orientation=vertical]:w-2',
])

export const sliderThumbVariants = cva([
  // Base thumb styles
  'flex justify-center w-8 h-8 bg-white',
  'border-4 border-solid border-[var(--color-secondary-main)]',
  'rounded-[20px] relative outline-none shadow-[0px_4px_4px_rgba(0,0,0,0.25)]',
  'cursor-pointer',
  // Focus styles
  'focus:outline-none focus:border-[var(--color-secondary-main-dark)]',
])

export const sliderLabelVariants = cva(
  [
    // Base label styles
    'flex absolute bottom-[60px] text-[length:var(--font-size-5)]',
    'text-[var(--color-secondary-light)] font-bold leading-[15px] w-max',
  ],
  {
    variants: {
      lower: {
        true: ['text-[var(--color-accent-main)] bottom-[40px]'],
        false: '',
      },
    },
  },
)

export type SliderRootVariants = VariantProps<typeof sliderRootVariants>
export type SliderTrackVariants = VariantProps<typeof sliderTrackVariants>
export type SliderRangeVariants = VariantProps<typeof sliderRangeVariants>
export type SliderThumbVariants = VariantProps<typeof sliderThumbVariants>
export type SliderLabelVariants = VariantProps<typeof sliderLabelVariants>
