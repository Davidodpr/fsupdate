import { cva, type VariantProps } from 'class-variance-authority'

export const accordionItemWrapperVariants = cva([
  'rounded-lg w-full bg-[var(--color-secondary-main)] h-10 relative',
  'text-white text-sm font-semibold my-1 flex-col',
  'transition-[height] duration-100 ease-in-out',
  'hover:cursor-pointer',
])

export const accordionItemImageWrapperVariants = cva(['absolute left-[10px] top-2 w-[25px] h-[25px] flex justify-center', 'hover:cursor-pointer'])

export const accordionItemArrowWrapperVariants = cva(['absolute right-[10px] top-2 w-[22px] h-[22px] flex justify-center', 'hover:cursor-pointer'])

export const accordionItemQuestionWrapperVariants = cva(['h-10 w-full flex items-center px-[50px]'])

export const accordionItemAnswerWrapperVariants = cva('px-5 py-[10px] pb-5 font-normal transition-opacity duration-100', {
  variants: {
    expanded: {
      true: 'opacity-100',
      false: 'opacity-0',
    },
  },
  defaultVariants: {
    expanded: false,
  },
})

export const accordionItemIconHelperVariants = cva(['relative h-full w-full'])

export const accordionItemArrowHelperVariants = cva(['relative h-full w-full'])

export type AccordionItemWrapperVariants = VariantProps<typeof accordionItemWrapperVariants>
export type AccordionItemImageWrapperVariants = VariantProps<typeof accordionItemImageWrapperVariants>
export type AccordionItemArrowWrapperVariants = VariantProps<typeof accordionItemArrowWrapperVariants>
export type AccordionItemQuestionWrapperVariants = VariantProps<typeof accordionItemQuestionWrapperVariants>
export type AccordionItemAnswerWrapperVariants = VariantProps<typeof accordionItemAnswerWrapperVariants>
export type AccordionItemIconHelperVariants = VariantProps<typeof accordionItemIconHelperVariants>
export type AccordionItemArrowHelperVariants = VariantProps<typeof accordionItemArrowHelperVariants>
