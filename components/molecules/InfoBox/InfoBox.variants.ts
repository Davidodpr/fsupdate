import { cva } from 'class-variance-authority'

export const infoBoxVariants = cva(
  // Base styles
  'my-5 max-w-full w-full flex flex-col items-center p-3 rounded-[10px] relative border border-solid',
  {
    variants: {
      // Currently no variants, but prepared for future use
      // Could add variants like: size, theme, etc.
    },
    defaultVariants: {},
  },
)

export const titleSectionVariants = cva('h-[25px] w-full flex items-center')

export const iconWrapperVariants = cva('w-[25px] h-[25px] relative hover:cursor-pointer')

export const titleTextVariants = cva('pl-[15px] font-black text-[var(--color-black-main)]')

export const textSectionVariants = cva('w-full font-normal text-[15px] tracking-[0.02em]')

export const buttonsWrapperVariants = cva('flex w-full justify-between gap-[10px]')

export const buttonWrapperVariants = cva('flex-[0_0_50%]')

export type InfoBoxVariants = Parameters<typeof infoBoxVariants>[0]
