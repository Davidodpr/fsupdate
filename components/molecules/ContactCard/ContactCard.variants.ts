import { cva, type VariantProps } from 'class-variance-authority'

export const contactCardWrapperVariants = cva(
  'flex flex-col items-center justify-center p-3 gap-4 w-full h-auto bg-[var(--color-standard-move-section-background)] shadow-[0px_4px_32px_rgba(0,0,0,0.07)] rounded-lg flex-none order-1 flex-grow-0 md:w-1/2 md:p-3 md:shadow-none',
  {
    variants: {
      usage: {
        move: 'rounded-none bg-white md:w-[629px]',
        movehelpClean: 'md:w-1/2',
      },
      view: {
        modal: 'md:w-full',
      },
    },
    defaultVariants: {
      usage: undefined,
      view: undefined,
    },
  },
)

export const contactWrapperVariants = cva('flex flex-col items-center justify-center p-0 gap-2 w-full h-auto flex-none order-0 flex-grow-0')

export const contactFrameVariants = cva('flex flex-row items-center justify-center gap-4 w-full h-auto')

export const contactDescriptionVariants = cva('w-4/5 h-auto font-normal leading-[120%] flex items-center tracking-[0.02em] text-text-main flex-none order-1 flex-grow-0', {
  variants: {
    usage: {
      move: 'w-full',
      movehelpClean: 'md:text-[15px] md:w-[85%]',
    },
  },
  defaultVariants: {
    usage: undefined,
  },
})

export const contactButtonFrameVariants = cva('flex flex-row items-center justify-center p-0 gap-2 w-full h-[39px] flex-none order-1 flex-grow-0')

export const contactButtonWrapperVariants = cva('gap-1 w-[155.5px] h-[39px] rounded-[22.5px] flex-none order-0 flex-grow-0', {
  variants: {
    usage: {
      move: 'w-[48%]',
      movehelpClean: 'md:w-[48%]',
    },
    view: {
      modal: 'w-[140px]',
    },
  },
  defaultVariants: {
    usage: undefined,
    view: undefined,
  },
})

export type ContactCardWrapperVariants = VariantProps<typeof contactCardWrapperVariants>
export type ContactWrapperVariants = VariantProps<typeof contactWrapperVariants>
export type ContactFrameVariants = VariantProps<typeof contactFrameVariants>
export type ContactDescriptionVariants = VariantProps<typeof contactDescriptionVariants>
export type ContactButtonFrameVariants = VariantProps<typeof contactButtonFrameVariants>
export type ContactButtonWrapperVariants = VariantProps<typeof contactButtonWrapperVariants>
