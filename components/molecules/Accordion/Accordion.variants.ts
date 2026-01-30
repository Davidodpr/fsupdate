import { cva } from 'class-variance-authority'

export const accordionItemVariants = cva(
  // Base styles matching StyledItem
  'overflow-hidden mt-[10px] rounded-[var(--radius-border-radius-small)] focus-within:relative focus-within:z-10',
  {
    variants: {},
    defaultVariants: {},
  },
)

export const accordionHeaderVariants = cva(
  // Base styles matching StyledHeader
  'flex relative',
)

export const accordionTriggerVariants = cva(
  // Base styles matching StyledTrigger
  [
    'font-inherit bg-transparent px-6 flex-1 flex items-center text-left justify-between',
    'text-[15px] sm:text-[20px] leading-none',
    'rounded-t-[var(--radius-border-radius-main)] hover:cursor-pointer',
    // Data states
    'data-[state=closed]:bg-[var(--color-secondary-extra-dark-4)]',
    'data-[state=open]:bg-[var(--color-secondary-light)]',
  ],
  {
    variants: {
      lessHeight: {
        true: 'h-[38px]',
        false: 'h-[45px]',
      },
      noOpenedStateStyling: {
        true: 'data-[state=open]:!bg-[var(--color-secondary-main)]',
        false: '',
      },
    },
    defaultVariants: {
      lessHeight: false,
      noOpenedStateStyling: false,
    },
  },
)

export const accordionContentVariants = cva(
  ['overflow-hidden text-[15px] sm:text-[18px] text-[var(--color-white-main)]', 'bg-[var(--color-secondary-light)]', 'rounded-b-[var(--radius-border-radius-main)]'],
  {
    variants: {
      iOS: {
        true: [
          'h-auto',
          // Disable animations on iOS
          'data-[state=open]:animate-none',
          'data-[state=closed]:animate-none',
        ],
        false: [
          // Enable slide animations
          'data-[state=open]:animate-accordion-down',
          'data-[state=closed]:animate-accordion-up',
        ],
      },
    },
    defaultVariants: {
      iOS: false,
    },
  },
)

export const accordionContentTextVariants = cva('', {
  variants: {
    noPadding: {
      true: 'p-0',
      false: 'p-[15px_20px]',
    },
  },
  defaultVariants: {
    noPadding: false,
  },
})

export const accordionChevronVariants = cva([
  'transition-transform duration-300 ease-[cubic-bezier(0.87,0,0.13,1)] flex-shrink-0',
  // Icon is rotated when accordion is open
  'group-data-[state=open]:rotate-180',
  // Arrow stroke color
  '[&_path]:stroke-[var(--color-white-main)]',
])

export type AccordionTriggerVariants = Parameters<typeof accordionTriggerVariants>[0]
export type AccordionContentVariants = Parameters<typeof accordionContentVariants>[0]
export type AccordionContentTextVariants = Parameters<typeof accordionContentTextVariants>[0]
