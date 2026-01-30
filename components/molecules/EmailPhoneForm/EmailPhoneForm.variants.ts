import { cva } from 'class-variance-authority'

export const emailPhoneFormVariants = () => ({
  cardWrapper: cva(['w-full', 'h-full', 'md:mx-auto']),

  cardHeaderWrapper: cva(['pb-7']),

  innerWrapper: cva([
    'p-4',
    'max-w-full',
    'flex',
    'flex-col',
    'bg-white',
    'rounded-[var(--radius-border-radius-main)]',
    'relative',
    'shadow-[var(--shadow-regular)]',
    'mb-4',
    'md:p-8',
  ]),

  inputWrapper: cva(['mb-6', 'sm:w-1/2'], {
    variants: {
      error: {
        true: ['mb-[25px]'],
      },
      fullInputWidth: {
        true: ['sm:w-full'],
      },
    },
  }),

  title: cva(['mt-8', 'pb-4', 'font-bold', 'text-[15px]']),

  cardTitle: cva(['flex', 'flex-row', 'justify-center', 'items-center', 'font-extrabold', 'leading-[25px]', 'text-center', 'text-[var(--color-text-main)]']),

  separator: cva(['h-px', 'bg-[var(--color-border-gray)]', 'transform', 'rotate-180', 'flex-none', 'order-1', 'self-stretch', 'flex-grow-0']),

  cardTitleText: cva([
    'h-[18px]',
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

    // Font feature settings
    '[font-feature-settings:"pnum"_on,"lnum"_on]',
  ]),
})
