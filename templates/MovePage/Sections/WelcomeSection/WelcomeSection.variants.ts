import { cva } from 'class-variance-authority'

export const welcomeSectionWrapperVariants = cva([
  'flex justify-start items-center',
  'rounded-[var(--radius-main)] bg-white relative',
  'mt-8 md:mx-auto p-[30px_16px_24px_24px] text-center',
  'shadow-[0px_4px_8px_rgba(0,0,0,0.08)]',
  '[&_svg]:text-white [&_svg]:stroke-white',
  'md:max-w-[818px] mx-[15px] md:mt-12',
])

export const currentForYourMoveWrapperVariants = cva(['flex justify-center items-center', 'relative mx-auto pt-8 pb-3', 'md:max-w-[818px] md:pt-12 md:pb-3 md:justify-start'])

export const closeWrapperVariants = cva(['absolute right-2 top-2', 'hover:cursor-pointer', 'md:right-4 md:top-3'])

export const styledFlexVariants = cva(['flex justify-center items-center', 'gap-6 pt-4', 'md:gap-8 md:pt-3 md:pr-4'])
