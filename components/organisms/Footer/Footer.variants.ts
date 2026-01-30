import { cva, type VariantProps } from 'class-variance-authority'

export const speechBubbleVariants = cva(
  [
    'relative w-full rounded-2xl mb-2 text-left p-4',
    'bg-[var(--color-standard-move-section-background)] text-[var(--color-text-main)]',
    'md:w-[600px] md:p-6',
    // Default speech bubble tail
    'before:absolute before:bottom-[-20px] before:left-[60px] before:block before:content-[url(/images/speechBubbleTail.svg)]',
  ],
  {
    variants: {
      theme: {
        default: {},
        fb: {
          // Fastighetsbyran theme uses different speech bubble tail
          'before:content-[url(/images/speechBubbleTailFb.svg)]': true,
        },
      },
    },
    defaultVariants: {
      theme: 'default',
    },
  },
)

export const prosFooterWrapperVariants = cva(['flex flex-col items-start w-full mb-8 max-w-[600px]', 'md:flex-row md:justify-start md:mb-0 md:max-w-none md:w-auto'], {
  variants: {
    center: {
      true: 'md:justify-center',
      false: '',
    },
  },
  defaultVariants: {
    center: false,
  },
})

export const contactButtonWrapperVariants = cva(['h-12 w-full mt-4', 'md:w-auto md:mt-auto md:ml-auto'])

export const speechBubbleTextWrapperVariants = cva(['w-full', 'md:w-auto md:flex-1'])

export const innerSpeechBubbleWrapperVariants = cva(['flex flex-col', 'md:flex-row md:items-center md:gap-4'])

export const faqWrapperVariants = cva(['flex flex-col max-w-full w-full', 'md:flex md:flex-col md:w-auto md:mb-0 md:ml-0'])

export const movingExpertWrapperVariants = cva(['flex items-center text-[var(--color-secondary-contrast-text)] mt-4'])

export const darkFooterWrapperVariants = cva([
  'flex items-start w-full flex-col gap-8 p-6 pb-16',
  'bg-[var(--color-footer-background)] text-[var(--color-white-main)]',
  'md:flex-row md:p-12 md:pb-12 md:justify-center md:items-start',
])

export const speechBubbleHeaderVariants = cva(['!text-xl !font-bold pb-4 w-full'])

export type SpeechBubbleVariants = VariantProps<typeof speechBubbleVariants>
export type ProsFooterWrapperVariants = VariantProps<typeof prosFooterWrapperVariants>
