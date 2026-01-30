import { cva, type VariantProps } from 'class-variance-authority'

export const headerFrameVariants = cva('flex flex-col items-center h-[79px] bg-background-secondary w-full')

export const headerWrapperVariants = cva('flex flex-row justify-center items-center pt-[25px] pr-0 pb-4 pl-0 gap-[10px] h-[79px] bg-background-secondary', {
  variants: {
    withoutSpacingTop: {
      true: 'pt-0',
    },
  },
  defaultVariants: {
    withoutSpacingTop: false,
  },
})

export const headerTextVariants = cva('h-[38px] font-bold text-[length:var(--font-size-9,32px)] leading-[120%] flex items-center text-[var(--color-text-main)]', {
  variants: {
    withoutSpacingTop: {
      true: 'mt-0',
    },
  },
  defaultVariants: {
    withoutSpacingTop: false,
  },
})

export type HeaderFrameVariants = VariantProps<typeof headerFrameVariants>
export type HeaderWrapperVariants = VariantProps<typeof headerWrapperVariants>
export type HeaderTextVariants = VariantProps<typeof headerTextVariants>
