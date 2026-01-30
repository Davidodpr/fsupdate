import { cva } from 'class-variance-authority'

export const serviceAlreadyBookedVariants = () => ({
  serviceAlreadyBookedWrapper: cva(['w-screen', 'h-screen', 'pt-[100px]']),

  serviceAlreadyBookedInnerWrapper: cva([
    'p-4',
    'w-[722px]',
    'max-w-[90%]',
    'mx-auto',
    'my-0',
    'flex',
    'flex-col',
    'justify-center',
    'items-center',
    'bg-white',
    'rounded-[var(--radius-border-radius-main)]',
    'relative',
    '!shadow-[var(--shadow-regular)]',

    'md:py-8',
    'md:px-4',
  ]),

  styledText: cva(['w-[330px]', 'leading-[30px]', 'text-center', 'mb-[52px]']),

  largeButtonWrapper: cva(['w-[220px]', 'h-12', 'm-0', 'md:p-0', 'md:w-[220px]']),

  header: cva(['text-3xl', '!font-black', '!font-[var(--font-family-secondary)]', 'my-5', 'mt-5', 'mb-[10px]', 'sm:!text-4xl']),
})
