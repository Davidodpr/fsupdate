import { cva } from 'class-variance-authority'

export const faqWrapperVariants = cva(['flex', 'flex-col', 'items-start', 'gap-0', 'w-full'])

export const faqTitleWrapperVariants = cva(['flex', 'flex-row', 'items-center', 'gap-1', 'mb-2'])

export const faqTitleVariants = cva(['font-bold', 'text-lg'])

export const qnaFrameVariants = cva(['flex', 'flex-col', 'items-start', 'gap-1', 'w-full'])

export const qFrameVariants = cva(['flex', 'flex-row', 'items-start', 'gap-1', 'hover:cursor-pointer'], {
  variants: {
    longQuestion: {
      true: ['md:items-center'],
    },
  },
})

export const questionItemVariants = cva(['w-full', 'font-normal', 'text-[15px]', 'underline', 'text-left', 'text-[var(--color-white-main)]', 'text-sm'], {
  variants: {
    withWhiteColor: {
      true: ['text-[var(--color-secondary-contrast-text)]'],
    },
  },
})
