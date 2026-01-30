import { cva } from 'class-variance-authority'

export const cardWrapperVariants = cva(['w-full', 'h-full', 'md:mx-auto'])

export const inputSectionWrapperVariants = cva(['w-full', 'h-full', 'relative', 'pt-4'])

export const penWrapperVariants = cva(['absolute', 'right-0', 'top-4', 'text-[var(--color-primary-main)]', 'hover:cursor-pointer'])

export const buttonWrapperVariants = cva(['w-full', 'h-12', 'mt-2.5', 'ml-auto', 'md:w-[200px]'])

export const cardHeaderWrapperVariants = cva([])

export const innerWrapperVariants = cva([
  'p-4',
  'max-w-full',
  'flex',
  'flex-col',
  'bg-white',
  'rounded-[var(--radius-small)]',
  'relative',
  'shadow-[var(--shadows-regular)]',
  'mb-4',
  'md:p-8',
])

export const inputWrapperVariants = cva(['mb-4', 'sm:w-1/2'], {
  variants: {
    error: {
      true: ['mb-[25px]'],
    },
  },
})

export const cardTitleVariants = cva(['flex', 'flex-row', 'items-center', 'font-bold', 'leading-[25px]', 'text-left', 'justify-start', 'text-[var(--color-text-main)]', 'pb-4'], {
  variants: {
    leftJustify: {
      true: ['justify-start', 'mt-4'],
    },
  },
})

export const separatorVariants = cva(['h-px', 'bg-[var(--color-border)]', 'transform', 'scale-y-[-1]', 'flex-none', 'order-1', 'self-stretch', 'flex-grow-0'])

export const cardTitleTextVariants = cva(
  [
    'h-[18px]',
    'font-normal',
    'font-extrabold',
    'text-xl',
    'leading-[18px]',
    'flex',
    'items-center',
    'text-center',
    'text-[var(--color-text-main)]',
    'flex-none',
    'order-0',
    'flex-grow-0',
    'm-0',
  ],
  {
    variants: {
      leftMargined: {
        true: ['ml-0.5', 'text-base'],
      },
    },
  },
)

export const textSectionVariants = cva(['pb-4', 'flex', 'flex-col', 'items-start'], {
  variants: {
    noPadding: {
      true: ['pb-0'],
    },
  },
})

export const emailAndPhoneSectionVariants = cva(['flex', 'flex-col', 'items-start', 'md:flex-row'], {
  variants: {
    noPadding: {
      true: ['pb-0'],
    },
  },
})

export const boldTextVariants = cva(['text-[var(--sizes-5)]', 'font-bold', 'pb-1'])

export const largerTextVariants = cva(['text-[var(--sizes-5)]', 'pb-1'])
