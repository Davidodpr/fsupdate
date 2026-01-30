import { cva } from 'class-variance-authority'

export const progressBarWrapperVariants = cva('bg-white rounded-lg py-4 px-3 mt-6 md:p-6 shadow-sm w-full max-w-[818px]', {
  variants: {},
  defaultVariants: {},
})

export const progressBarHeaderVariants = cva('flex justify-between items-center mb-3')

export const progressBarTitleVariants = cva('text-base md:text-lg font-semibold text-[var(--color-secondary-dark)]')

export const progressBarCountVariants = cva('text-sm md:text-base font-semibold text-[var(--color-secondary-main)]')

export const progressBarContainerVariants = cva('w-full h-2 bg-[#5DD3CA] rounded-full overflow-hidden')

export const progressBarFillVariants = cva('h-full bg-[#2C4C6E] rounded-full transition-all duration-300 ease-in-out')
