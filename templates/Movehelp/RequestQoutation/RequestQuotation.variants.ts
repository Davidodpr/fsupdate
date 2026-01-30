import { cva } from 'class-variance-authority'

export const contentContainerVariants = cva([
  'flex flex-col items-center',
  'w-full flex-auto',
  'px-4 py-8',
  'md:w-full md:max-w-[464px]',
  'md:flex md:flex-col md:items-center',
  'md:mx-auto md:my-8 md:mb-4',
])

export const spinnerBgWrapperVariants = cva(['w-screen h-screen', 'bg-[var(--color-background-default)]'])

export const inputWrapperVariants = cva(['w-[49%]'], {
  variants: {
    fullWidth: {
      true: ['w-full', 'mb-0'],
    },
  },
})

export const buttonsWrapperVariants = cva(['flex', 'w-full', 'justify-between'])

export const buttonWrapperVariants = cva(['w-[48%]', 'h-12', 'mt-[10px]'])

export const closeButtonWrapperVariants = cva(['h-[37px]', '[&_.hover]:hidden', 'hover:cursor-pointer', 'hover:[&_.default]:hidden', 'hover:[&_.hover]:block'])

export const questionIconWrapperVariants = cva([
  'w-6 h-6',
  'text-[var(--color-question-icon)]',
  'absolute right-4 top-[14px]',
  'text-[15px]',
  'hover:cursor-pointer',
  'md:top-[22px]',
  '[&_svg]:text-[var(--color-question-icon)]',
  '[&_svg_path]:text-[var(--color-question-icon)]',
])

export const popupWrapperVariants = cva(['text-[15px]', 'text-[var(--color-secondary-dark)]', '[&_ul_li]:text-[15px]'])

export const errorWrapperVariants = cva(['text-[var(--color-error-red)]', 'absolute bottom-[10px]', 'text-[14px]', 'whitespace-nowrap', 'italic', '[&_p]:text-[14px]'])

export const continueButtonWrapperVariants = cva(['max-w-[240px] w-[240px] h-12', 'mx-auto mt-8', 'flex items-center justify-center'])

export const textButtonWrapperVariants = cva(
  [
    'w-full',
    'py-3',
    'rounded-[var(--radius-border-radius-small)]',
    'text-[15px]',
    'font-medium',
    'relative',
    'text-[var(--color-secondary-dark)]',
    'flex items-center justify-center',
    'border border-[rgba(33,71,102,0.20)]',
    'max-h-10',
    'hover:cursor-pointer',
  ],
  {
    variants: {
      selected: {
        true: ['bg-[var(--color-secondary-light)]', 'font-bold', 'text-[var(--color-white-main)]', 'border-[var(--color-secondary-light)]'],
      },
      smallerFontSize: {
        true: 'text-xs',
      },
      smallFontSize: {
        true: 'text-sm',
      },
    },
  },
)

export const livingSelectionVariants = cva(['w-full', 'flex justify-center items-center flex-col', '[&_p]:mt-0', 'mb-2'])

export const textAreaAndInputWrapperVariants = cva(['w-full', 'flex justify-center items-center flex-col', 'pt-4', '[&_p]:mt-0'])

export const wrapperVariants = cva(['bg-[#E8EDF0]', 'font-[var(--font-family-main)]', 'text-[var(--color-text-main)]', 'w-full', 'flex-auto', 'flex flex-col', 'min-h-screen'])

export const checkboxLabelVariants = cva(['ml-2', 'hover:cursor-pointer'])

export const checkboxWrapperVariants = cva(['w-full flex'])

export const checkboxItemWrapperVariants = cva(['py-2', 'hover:cursor-pointer'])

export const dataSectionWrapperVariants = cva(
  [
    'mx-auto',
    'w-full',
    'p-4',
    'relative',
    'rounded-[var(--radius-border-radius-main)]',
    'shadow-[0px_4px_32px_0px_rgba(0,0,0,0.07)]',
    'h-auto',
    'bg-[var(--color-white-main)]',
    'mt-4',
    'flex flex-col',
    '[&_a]:text-[var(--color-primary-main)]',
    '[&_a]:font-bold',
    'md:px-8 md:py-6',
    'sm:max-w-[629px]',
  ],
  {
    variants: {
      morePadding: {
        true: 'md:pb-4',
      },
      hasError: {
        true: 'pb-[34px] md:pb-[34px]',
      },
      hasInputAndError: {
        true: 'pb-9 md:pb-9',
      },
    },
  },
)
