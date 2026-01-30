import { cva } from 'class-variance-authority'

export const moduleWrapperVariants = cva(
  [
    'w-full',
    'h-fit',
    'font-[var(--font-family-main)]',
    'bg-[var(--color-background-default)]',
    'text-[var(--color-main-font-color)]',
    'p-4',
    '[&_h1]:text-[var(--fs-fontSizes-7)]',
    '[&_h1]:font-[var(--font-family-secondary)]',
    '[&_h1]:font-bold',
    'md:[&_h1]:text-[26px]',
    'md:px-16',
    'md:py-[var(--fs-space-5)]',
    'md:text-[var(--fs-fontSizes-5)]',
  ],
  {
    variants: {
      withoutPadding: {
        true: ['p-0', 'pt-4', 'md:p-0', 'md:pt-4'],
      },
    },
  },
)

export const bookedOrdersWrapperVariants = cva(['w-full', 'flex', 'flex-wrap', 'gap-[var(--fs-space-1)]', 'justify-between', 'items-baseline', 'md:gap-[var(--fs-space-5)]'])
