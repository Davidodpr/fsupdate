import { cva, type VariantProps } from 'class-variance-authority'

export const inputSectionWrapperVariants = cva(['w-full h-full relative'], {
  variants: {
    isOpen: {
      true: 'max-w-[400px]',
      false: 'max-w-full',
    },
  },
  defaultVariants: {
    isOpen: false,
  },
})

export const penWrapperVariants = cva(['absolute right-0 top-0 text-[var(--color-primary-main)] hover:cursor-pointer'])

export const buttonWrapperVariants = cva(['w-full h-12 mt-2.5 mr-auto', 'md:w-[200px]'])

export const inputWrapperVariants = cva(['mb-4', 'sm:w-1/2'], {
  variants: {
    error: {
      true: 'mb-6',
      false: '',
    },
  },
  defaultVariants: {
    error: false,
  },
})

export const cardTitleVariants = cva(['flex flex-row items-center font-bold leading-[25px]', 'text-left justify-start text-[var(--color-text-main)] pb-4'], {
  variants: {
    leftJustify: {
      true: 'justify-start mt-4',
      false: '',
    },
  },
  defaultVariants: {
    leftJustify: false,
  },
})

export const cardTitleTextVariants = cva(
  [
    'h-[18px] font-[var(--font-weight-bold)] text-xl leading-[18px]',
    "flex items-center text-center font-feature-settings-['pnum'_on,_'lnum'_on]",
    'text-[var(--color-text-main)] flex-none order-0 flex-grow-0 m-0',
  ],
  {
    variants: {
      leftMargined: {
        true: 'ml-0.5 text-base',
        false: '',
      },
    },
    defaultVariants: {
      leftMargined: false,
    },
  },
)

export const textSectionVariants = cva(['pb-2 flex flex-col items-start'], {
  variants: {
    noPadding: {
      true: 'pb-0',
      false: '',
    },
  },
  defaultVariants: {
    noPadding: false,
  },
})

export const emailAndPhoneSectionVariants = cva(['flex flex-col items-start'], {
  variants: {
    noPadding: {
      true: 'pb-0',
      false: '',
    },
  },
  defaultVariants: {
    noPadding: false,
  },
})

export const boldTextVariants = cva(['!text-[16px] !font-[var(--font-weight-bold)] pb-1'])

export const largerTextVariants = cva(['text-[var(--fs-fontSizes-5)] pb-1'])

export type InputSectionWrapperVariants = VariantProps<typeof inputSectionWrapperVariants>
export type InputWrapperVariants = VariantProps<typeof inputWrapperVariants>
export type CardTitleVariants = VariantProps<typeof cardTitleVariants>
export type CardTitleTextVariants = VariantProps<typeof cardTitleTextVariants>
export type TextSectionVariants = VariantProps<typeof textSectionVariants>
export type EmailAndPhoneSectionVariants = VariantProps<typeof emailAndPhoneSectionVariants>
