import { cva, type VariantProps } from 'class-variance-authority'

export const modalOverlayVariants = cva(['bg-black/30 fixed inset-0 z-[100]', 'motion-reduce:animate-none animate-modal-overlay-show'], {
  variants: {
    withOverlayClose: {
      true: 'hover:cursor-pointer',
      false: '',
    },
  },
  defaultVariants: {
    withOverlayClose: true,
  },
})

export const modalContentVariants = cva(
  [
    'bg-[var(--color-white-main)] rounded-md fixed top-1/2 left-1/2 z-[100]',
    'font-[var(--font-family-main)]',
    'w-[90vw] max-h-[95vh]',
    'opacity-0 [transform:translate(-50%,-50%)_scale(0.96)]',
    'shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]',
    'motion-reduce:animate-none animate-modal-content-show',
    '[animation-fill-mode:forwards]',
    'focus:outline-none',
    'sm:max-h-[90vh]',
  ],
  {
    variants: {
      size: {
        small: ['max-w-[360px] p-4'],
        medium: ['max-w-[450px] p-4', 'md:p-6'],
        large: ['max-w-[900px] p-4', 'sm:p-6'],
      },
      fullScreenMobile: {
        true: ['top-1/2 left-1/2 w-screen h-screen max-w-none max-h-none', 'md:top-1/2 md:left-1/2 md:w-[90vw] md:h-auto md:max-w-[360px] md:max-h-[95vh]'],
        false: '',
      },
      bottomSheet: {
        true: [
          'max-md:!top-auto max-md:!bottom-0 max-md:!left-0 max-md:!right-0',
          'max-md:!w-screen max-md:!max-w-none',
          'max-md:h-[90vh] max-md:!rounded-b-none max-md:!rounded-t-[20px]',
          'md:max-w-[700px]',
        ],
        false: '',
      },
      withAllOverflow: {
        true: 'overflow-visible',
        false: 'overflow-y-auto overflow-x-hidden',
      },
      dynamicWidth: {
        true: 'w-auto',
        false: '',
      },
      withLessPadding: {
        true: ['p-4', 'md:p-4'],
        false: '',
      },
    },
    defaultVariants: {
      size: 'large',
      fullScreenMobile: false,
      bottomSheet: false,
      withAllOverflow: false,
      dynamicWidth: false,
      withLessPadding: false,
    },
  },
)

export const modalCloseButtonVariants = cva(['border-none bg-[var(--color-white-main)] absolute', 'right-[5px] top-[5px]', 'hover:cursor-pointer', 'z-[101]', 'md:top-5'], {
  variants: {
    bigCloseButton: {
      true: ['right-[10px] top-[18px]'],
      false: '',
    },
  },
  defaultVariants: {
    bigCloseButton: false,
  },
})

export const modalTitleVariants = cva('m-0 !font-bold text-2xl')

export const modalDescriptionVariants = cva('mt-[10px] mb-5 leading-[1.5]')

export const modalWrapperVariants = cva('w-full h-full')

export type ModalOverlayVariants = VariantProps<typeof modalOverlayVariants>
export type ModalContentVariants = VariantProps<typeof modalContentVariants>
export type ModalCloseButtonVariants = VariantProps<typeof modalCloseButtonVariants>
export type ModalTitleVariants = VariantProps<typeof modalTitleVariants>
export type ModalDescriptionVariants = VariantProps<typeof modalDescriptionVariants>
export type ModalWrapperVariants = VariantProps<typeof modalWrapperVariants>
