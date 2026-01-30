import { cva, type VariantProps } from 'class-variance-authority'

export const selectTriggerVariants = cva(
  // Base styles
  'inline-flex items-center bg-[var(--color-background-default)] justify-center rounded-[4px] font-bold px-[14px] py-4 text-[15px] leading-none gap-[5px] text-secondary-main border border-[rgba(0,0,0,0.23)] w-full text-left outline-none font-main cursor-pointer transition-colors data-[state=open]:data-[chevron]:rotate-180',
  {
    variants: {
      noBorder: {
        true: 'border-none',
      },
      withBiggerFont: {
        true: 'text-[20px]',
      },
      filter: {
        true: 'bg-transparent text-text-main justify-center md:justify-end',
      },
    },
    defaultVariants: {
      noBorder: false,
      withBiggerFont: false,
      filter: false,
    },
  },
)

export const selectItemVariants = cva(
  // Base styles
  'leading-none text-[rgba(0,0,0,0.87)] flex items-center relative select-none text-[15px] px-4 py-[6px] min-h-[38px] h-auto cursor-pointer font-main data-[highlighted]:outline-none data-[highlighted]:bg-tertiary-light',
  {
    variants: {
      fbTheme: {
        true: 'text-text-main',
      },
    },
    defaultVariants: {
      fbTheme: false,
    },
  },
)

export const chevronVariants = cva(
  'w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-[rgba(0,0,0,0.54)] transition-transform duration-200',
  {
    variants: {},
    defaultVariants: {},
  },
)

export type SelectTriggerVariants = VariantProps<typeof selectTriggerVariants>
export type SelectItemVariants = VariantProps<typeof selectItemVariants>
export type ChevronVariants = VariantProps<typeof chevronVariants>
