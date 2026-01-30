import { cva } from 'class-variance-authority'

export const buttonWrapperVariants = cva(['w-full h-12 mt-5 flex items-end justify-between', '[&_button]:w-full'], {
  variants: {
    justifyContent: {
      start: 'justify-start',
      center: 'items-center',
      end: 'sm:justify-end',
      between: ['[&_button]:w-auto', '[&>div]:w-auto', 'justify-between'],
    },
  },
})

export const wrapperVariants = cva(['[&_a]:text-[var(--color-primary-main)]', '[&_a]:font-bold'])

export const mainWrapperVariants = cva([
  'bg-[var(--color-background-default)]',
  'min-h-screen',
  'font-[var(--font-family-main)]',
  'text-[var(--color-text-main)]',
  'md:min-h-[unset]',
  'md:pb-[1px]',
  '[&_a]:text-[var(--color-tertiary-main)]',
])

export const smallButtonWrapperVariants = cva([
  'w-full md:w-[200px] mb-[10px]',
  '[&_button]:w-full',
  '[&_button]:md:w-[200px]',
  '[&_button]:md:text-[16px]',
  '[&_button]:md:!text-[16px]',
])

export const styledInputVariants = cva(['w-1/2 mb-[15px]', 'md:w-1/4'])

export const endButtonWrapperVariants = cva(['w-full h-12 mt-5 flex items-end justify-between', '[&_button]:w-full', '[&_button]:md:w-[200px]'])

export const goBackButtonVariants = cva([
  'bg-[var(--color-white-main)]',
  'border-b-2 border-[var(--color-tertiary-text)]',
  'text-[var(--color-text-main)]',
  'w-[65px]',
  'text-center',
  'h-10',
  'mb-[5px]',
  'hover:cursor-pointer',
])

export const imageWrapperVariants = cva(['flex flex-col', 'w-full', 'justify-center', 'items-center', 'text-center', 'py-[10px]'])

export const stepTemplateWrapperVariants = cva(['w-full h-full', 'px-4', 'md:max-w-[822px]', 'md:mx-auto', 'md:px-0'])

export const loginTextWrapperVariants = cva(['flex justify-between', 'sm:[&_p]:grow-0', 'sm:[&_p]:max-w-[50%]', 'sm:[&_p]:basis-1/2'])

export const innerWrapperVariants = cva([
  'px-4 py-6',
  'w-[822px] max-w-full',
  'my-4 mb-8',
  'flex flex-col gap-4',
  'bg-[var(--color-white-main)]',
  'rounded-[var(--radius-border-radius-main)]',
  'relative',
  'shadow-[var(--shadow-regular)]',
  'md:p-8',
])

export const checkboxWrapperVariants = cva(['pt-[3px] px-[18px] pb-0 pl-2', 'mb-[15px]'])

export const checkboxLabelVariants = cva(['ml-2'])

export const inputWrapperVariants = cva(['mb-6', 'sm:w-1/2'], {
  variants: {
    error: {
      true: 'mb-[25px]',
    },
  },
})

export const summaryWrapperVariants = cva(['flex', 'border border-[var(--color-background-default)]', 'flex-col', 'p-4', 'mb-5'])

export const summaryItemVariants = cva(['flex justify-between', '[&:nth-child(2)]:text-right', 'items-start', '[&_p]:mt-0', '[&_p]:w-1/2'])

export const formWrapperVariants = cva(['flex flex-wrap justify-between', 'md:w-1/2'])

export const infoBoxWrapperVariants = cva(['mt-[10px]', 'sm:w-1/2'])

export const radioGroupWrapperVariants = cva(['flex mb-[15px]'])

export const radioItemLabelVariants = cva(['ml-2'])

export const styledTextVariants = cva(['my-[10px]'])

export const styledHeaderTextVariants = cva([
  'font-[var(--font-family-secondary)]',
  'text-[42px]',
  '!text-[42px]',
  'py-[10px]',
  'text-[var(--color-info-missing-text)]',
  'my-[10px]',
])

export const styledTitleVariants = cva(['text-[32px]', 'font-black', 'm-0'])

export const labelVariants = cva(['max-w-full', 'text-[15px]', 'mr-[10px]', 'w-fit', 'flex flex-row', 'items-start', 'hover:cursor-pointer'], {
  variants: {
    leftmargined: {
      true: 'ml-4',
    },
  },
})

export const checkBoxWrapperVariants = cva(['flex relative', 'justify-start', 'items-center', 'flex-1', 'grow'])

export const modalTextWrapperVariants = cva(['flex flex-col', 'sm:[&_p]:shrink-10', 'sm:flex-row'])

export const coloredTextVariants = cva(['text-[var(--color-primary-main)]'])

export const horizontalLineVariants = cva(['w-full h-[1px]', 'bg-[var(--color-background-default)]'])

export const summaryTitleWrapperVariants = cva(['text-center mb-5'])

export const infoBoxWrapperDivVariants = cva(['[&_p]:m-0'])
