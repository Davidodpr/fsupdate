import { cva } from 'class-variance-authority'

export const handymanModalWrapperVariants = cva(['w-full h-full'])

export const modalHeaderVariants = cva(['w-full flex items-center justify-between pb-2.5'])

export const modalDividerVariants = cva(['w-full border-b border-[var(--color-border-gray)]'])

export const headerAndCheckboxVariants = cva(['h-10 pt-1.25 flex justify-center items-center'])

export const largeButtonWrapperVariants = cva(['w-full h-12'])

export const buttonWrapperVariants = cva(['mt-5 flex w-full justify-between text-xs'])

export const textWrapperVariants = cva(['text-[var(--color-black-main)] text-sm'])

export const inputWrapperVariants = cva(['mt-5'])

export const phoneInputWrapperVariants = cva(['mt-3.75'])

export const messageInputWrapperVariants = cva(['mt-3.75'])

export const emailWrapperVariants = cva(['my-2.5'])

export const titleWrapperVariants = cva([
  // Empty for now, matches original comment
])

export const innerWrapperVariants = cva(['w-full mt-5 pt-3.75 px-3.75 pb-0 text-center'])

export const imageWrapperVariants = cva(['w-12.5 h-12.5'])

export const subtitleWrapperVariants = cva(['text-[13px] text-[var(--color-inactive-dark)] leading-[11px]'])

export const checkboxWrapperVariants = cva(['pt-0.75 pr-4.5 pb-0 pl-2'])

export const confirmedWrapperVariants = cva(['flex flex-col items-center justify-center relative'])

export const bottomWrapperVariants = cva(['my-3.75 w-full'])

export const textPartWrapperVariants = cva([
  'flex flex-col pt-2.5',
  '[&_p]:leading-[0.5] [&_p]:mb-1.25',
  '[&_span]:text-[var(--color-secondary-main)] [&_span]:font-[var(--fontWeights-bold)] [&_span:hover]:cursor-pointer',
])

export const chatImageWrapperVariants = cva(['absolute right-2.5 bottom-[-10px]'])

export const failedWrapperVariants = cva([
  'flex-grow-0 max-w-[90%] flex-basis-[66%] mx-auto rounded-[var(--radius-border-radius-main)]',
  'bg-[var(--color-white-main)] shadow-[rgb(0_0_0_/_7%)_0px_4px_32px] w-full h-auto p-8 min-h-[400px]',
  '[&_a]:text-[var(--color-primary-main)] [&_a]:font-[var(--fontWeights-bold)]',
  'sm:max-w-[820px]',
])

export const smallButtonWrapperVariants = cva(['w-45 h-12 px-1.25'])

export const subLargeButtonWrapperVariants = cva(['w-65 h-12'])

export const doubleButtonWrapperVariants = cva(['my-5 flex w-full justify-between text-xs px-12.5'])

export const subButtonWrapperVariants = cva(['flex w-full justify-center text-xs'])

export const headerVariants = cva(['text-2xl font-[var(--fontWeights-black)] my-2.5 mt-0', 'sm:text-4xl'])
