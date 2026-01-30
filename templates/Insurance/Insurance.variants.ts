import { cva } from 'class-variance-authority'

export const wrapperVariants = cva([
  'bg-[var(--color-background-default)]',
  'min-h-screen',
  'font-[var(--font-family-main)]',
  'text-[var(--color-text-main)]',
  'md:min-h-[unset]',
  'md:pb-8',
])

export const spinnerBgWrapperVariants = cva(['w-screen', 'h-screen', 'bg-[var(--color-background-default)]'])

export const headerTextBlueVariants = cva(['font-black', 'text-2xl', 'text-[var(--color-text-main)]', 'leading-6', 'pt-1.5', 'md:text-[32px]', 'md:leading-8'], {
  variants: {
    small: {
      true: ['!text-[22px]', '!leading-[22px]', 'md:leading-6', '!md:text-[22px]'],
    },
  },
})

export const headerTextGreenVariants = cva(['font-black', 'text-2xl', 'text-[var(--color-tertiary-main)]', 'pl-1.5', 'leading-6', 'pt-1.5', 'md:text-[32px]'])

export const topHeaderTextWrapperVariants = cva(['flex', 'flex-row', 'sm:text-[30px]', 'sm:font-black', 'sm:items-center'])

export const textWrapperVariants = cva(['md:max-w-[450px]'])

export const buttonsWrapperVariants = cva(['flex', 'mt-auto'], {
  variants: {
    withoutBackButton: {
      true: 'justify-end',
    },
  },
})

export const imageWrapperVariants = cva(['absolute', 'top-2.5', 'right-4', 'md:top-14', 'md:right-[100px]'])

export const largeButtonWrapperVariants = cva(['h-12', 'pl-8', 'pr-0', 'py-0', 'md:px-4'])

export const goBackButtonVariants = cva([
  'bg-white',
  'border-b-2',
  'border-[var(--color-tertiary-text-color)]',
  'text-[var(--color-text-main)]',
  'w-[65px]',
  'text-center',
  'h-10',
  'hover:cursor-pointer',
])

export const serviceFlowStepOneTemplateWrapperVariants = cva(['w-full', 'h-full', 'px-4', 'md:max-w-[822px]', 'md:mx-auto', 'md:p-0'])

export const innerWrapperVariants = cva(
  [
    'p-4',
    'w-[822px]',
    'max-w-full',
    'min-h-[488px]',
    'my-8',
    'flex',
    'flex-col',
    'bg-white',
    'rounded-[var(--radius-main)]',
    'relative',
    'shadow-[var(--shadow-regular)]',
    'md:py-8',
    'md:px-16',
  ],
  {
    variants: {
      withoutMinHeight: {
        true: 'min-h-0',
      },
    },
  },
)
