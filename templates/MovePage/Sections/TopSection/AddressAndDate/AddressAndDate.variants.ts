import { cva } from 'class-variance-authority'

export const loadingContainerVariants = cva(['flex h-full', 'px-6 py-8', 'md:px-1.25 md:py-8'])

export const spinnerWrapperVariants = cva(['mb-3'])

export const styledAccordionItemVariants = cva(['rounded-[var(--radius-border-radius-main)]', 'w-full', 'bg-[var(--color-secondary-dark)]'])

export const startNewMoveButtonVariants = cva(['text-[var(--color-accent-main)]', 'text-[15px]', 'ml-2'])

export const addDateIconWrapperVariants = cva(['w-[33.5px] h-[30px]', 'ml-2', 'flex justify-center items-center', 'rounded-full', 'border border-white', 'hover:cursor-pointer'])

export const addressAndDateWrapperVariants = cva(
  [
    'w-full',
    'bg-[var(--color-settings-background)]',
    'p-3',
    'rounded-[var(--radius-border-radius-main)]',
    'relative',
    'sm:p-4',
    '[&_div[data-state="open"]]:bg-[var(--color-secondary-light)]',
    '[&_div[data-state="open"]]:mt-0',
    '[&_div[data-state="closed"]]:bg-[var(--color-secondary-main)]',
    '[&_div[data-state="closed"]]:mt-0',
    '[&_div[data-state="closed"]]:overflow-hidden',
  ],
  {
    variants: {
      isOneMovedate: {
        true: 'md:px-4 md:py-6',
      },
      autoCompleteUsed: {
        true: '[&_div[data-state="open"]]:overflow-visible',
        false: '[&_div[data-state="open"]]:overflow-hidden',
      },
      hasPartner: {
        true: 'min-w-[450px] max-w-[530px]',
        false: 'min-w-full md:min-w-[550px]',
      },
    },
    defaultVariants: {
      hasPartner: false,
    },
  },
)

export const accordionItemWrapperVariants = cva(['mt-1'], {
  variants: {
    withIcon: {
      true: 'w-full flex justify-center items-center',
    },
  },
})

export const accordionButtonWrapperVariants = cva(
  [
    'w-full',
    '[&_button]:bg-[var(--color-secondary-main)]',
    '[&_button]:pr-2 [&_button]:pl-0',
    '[&_button]:overflow-visible',
    '[&_button]:relative',
    '[&_button[data-state="open"]]:bg-[var(--color-settings)]',
    '[&_button[data-state="closed"]]:bg-[var(--color-secondary-main)]',
    '[&_button>svg]:absolute',
    '[&_button>svg]:right-3',
  ],
  {
    variants: {
      isCustomButton: {
        true: ['[&_button]:m-0', '[&_button]:overflow-visible'],
      },
    },
  },
)

export const toAddressTextVariants = cva([
  'w-[70px] h-[40px]',
  'pl-2.5',
  '!bg-[var(--color-secondary-light)]',
  'flex items-center',
  'text-lg',
  'rounded-tl-[var(--radius-border-radius-main)]',
  'rounded-bl-[var(--radius-border-radius-main)]',
  'text-white',
])

export const textWrapperVariants = cva(['absolute', 'left-[88px]', 'right-[40px]', 'truncate'])

export const contentVariants = cva(['text-sm'])

export const buttonWrapperVariants = cva(['w-[207px] h-9', 'mx-2 mt-2 mb-0'])

export const modalImageWrapperVariants = cva(['flex justify-center items-center', 'py-4 px-0'])
