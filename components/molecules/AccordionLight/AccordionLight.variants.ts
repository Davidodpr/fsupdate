import { cva, type VariantProps } from 'class-variance-authority'

export const accordionRootVariants = cva('w-full px-5 md:px-[10px]')

export const accordionItemVariants = cva('overflow-hidden rounded-[var(--radius-border-radius-small,4px)] focus-within:relative focus-within:z-[1]')

export const accordionHeaderVariants = cva('flex')

export const accordionTriggerVariants = cva(
  'font-inherit bg-transparent py-2 rounded-[var(--radius-border-radius-small,4px)] h-6 flex-1 relative flex-row flex items-center justify-center transition-all duration-100 ease-in-out text-[15px] font-normal text-text-main leading-none hover:cursor-pointer md:w-full data-[state=closed]:bg-inactive-quite-light data-[state=open]:bg-inactive-quite-light',
  {
    variants: {
      withBlueColorTrigger: {
        true: 'data-[state=closed]:bg-[var(--color-standard-move-section-background)] data-[state=open]:bg-[var(--color-standard-move-section-background)]',
      },
    },
    defaultVariants: {
      withBlueColorTrigger: false,
    },
  },
)

export const accordionContentVariants = cva(
  'overflow-hidden text-lg lg:text-[15px] text-text-main bg-white rounded-[var(--radius-border-radius-small,4px)] border border-inactive-quite-light sm:w-full data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up',
  {
    variants: {
      iOS: {
        true: 'h-auto data-[state=open]:animate-none data-[state=closed]:animate-none',
      },
    },
    defaultVariants: {
      iOS: false,
    },
  },
)

export const imageWrapperVariants = cva('w-6 h-6 text-tertiary-main p-2 flex justify-start hover:cursor-pointer')

export const headerContentWrapperVariants = cva('w-full flex items-center')

export const chevronWrapperVariants = cva('absolute right-[10px] w-6 h-6 flex justify-center')

export const contentTextVariants = cva('', {
  variants: {
    noPadding: {
      true: 'p-0',
      false: 'p-4',
    },
  },
  defaultVariants: {
    noPadding: false,
  },
})

export const chevronVariants = cva('flex justify-center transition-transform duration-300 ease-out flex-shrink-0 data-[state=open]:rotate-180')

export type AccordionRootVariants = VariantProps<typeof accordionRootVariants>
export type AccordionItemVariants = VariantProps<typeof accordionItemVariants>
export type AccordionHeaderVariants = VariantProps<typeof accordionHeaderVariants>
export type AccordionTriggerVariants = VariantProps<typeof accordionTriggerVariants>
export type AccordionContentVariants = VariantProps<typeof accordionContentVariants>
export type ImageWrapperVariants = VariantProps<typeof imageWrapperVariants>
export type HeaderContentWrapperVariants = VariantProps<typeof headerContentWrapperVariants>
export type ChevronWrapperVariants = VariantProps<typeof chevronWrapperVariants>
export type ContentTextVariants = VariantProps<typeof contentTextVariants>
export type ChevronVariants = VariantProps<typeof chevronVariants>
