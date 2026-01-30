import { cva } from 'class-variance-authority'

export const textSectionVariants = cva(['py-[30px]', 'pr-0', 'pb-5', 'pl-2.5', 'flex', 'md:py-[30px]', 'md:pr-0', 'md:pb-5', 'md:pl-10'])

export const buttonsWrapperVariants = cva(['p-0', 'pl-2.5', 'flex', 'md:pr-[50px]', 'md:pl-20', 'md:pb-0', 'md:pt-0'], {
  variants: {
    withoutBackButton: {
      true: ['justify-end'],
    },
  },
})

export const imageWrapperVariants = cva(['absolute', 'top-5', 'right-[100px]'])

export const largeButtonWrapperVariants = cva(['w-[200px]', 'h-12', 'pl-8', 'pr-0', 'my-2.5', 'md:px-4', 'md:w-[232px]'])

export const goBackButtonVariants = cva([
  'bg-white',
  'border-b-2',
  'border-[var(--color-tertiary-text-color)]',
  'text-[var(--color-text-main)]',
  'w-[60px]',
  'text-center',
  'h-10',
  'hover:cursor-pointer',
])

export const serviceFlowStepOneTemplateWrapperVariants = cva(['w-full', 'h-full', 'px-4', 'md:max-w-[822px]', 'md:mx-auto', 'md:p-0'])

export const innerWrapperVariants = cva([
  'p-4',
  'w-full',
  'max-w-[822px]',
  'mt-4',
  'flex',
  'flex-col',
  'bg-white',
  'rounded-[var(--radius-main)]',
  'relative',
  'shadow-[var(--shadows-regular)]',
  'md:py-8',
  'md:px-4',
])
