import { cva } from 'class-variance-authority'

export const bookingCardVariants = cva([
  'p-3 md:p-4 rounded-[var(--radius-small)] shadow-[0px_4px_8px_rgba(0,0,0,0.08)]',
  'bg-white border-2 border-[var(--color-primary-main)] mb-2 flex min-h-[72px] md:min-h-[84px] relative cursor-pointer',
  'hover:shadow-[0px_4px_16px_rgba(0,0,0,0.12)]',
  'transition-shadow',
])

export const contentWrapperVariants = cva(['w-full flex justify-between items-center'])

export const leftContentVariants = cva(['flex items-center flex-1 min-w-0'])

export const iconWrapperVariants = cva(['p-[9px] w-7 h-7 relative mr-2 flex-shrink-0', '[&_img]:h-full [&_img]:w-full', 'md:mr-[14px] md:ml-[14px] md:w-9 md:h-9'])

export const infoWrapperVariants = cva(['flex-1 min-w-0 mr-2'])

export const titleVariants = cva(['font-bold  text-[var(--color-text-main)] leading-[1.3] pb-1', 'md:text-[18px] md:leading-[1.4]'], {
  variants: {
    longText: {
      true: ['text-[11px] min-[376px]:text-[15px]'],
      false: ['text-[15px]'],
    },
  },
})

export const subtitleVariants = cva(['font-normal text-[13px] !text-[#626263] leading-[1.4]', 'md:text-[15px]'])

export const arrowWrapperVariants = cva(['text-[var(--color-secondary-main)] flex justify-center items-center flex-shrink-0'])

export const checkmarkWrapperVariants = cva(['w-[13px] h-[13px] md:w-[15px] md:h-[15px] flex-shrink-0 ml-1'])
