import { cva } from 'class-variance-authority'

export const recommendationMessageVariants = () => ({
  messageWrapper: cva(
    [
      'flex',
      'flex-col',
      'items-start',
      'p-3',
      'px-4',
      'gap-2',
      'bg-[var(--color-recommended-message-background)]',
      'rounded-lg',
      'max-w-full',

      'md:items-start',
      'md:p-6',
      'md:px-8',
      'md:gap-4',
      'md:w-[343px]',
    ],
    {
      variants: {
        fullWidth: {
          true: ['md:w-full'],
        },
      },
    },
  ),

  recommenderWrapper: cva(['flex', 'flex-row', 'items-center', 'p-0', 'gap-2', 'w-auto', 'h-6', 'flex-none', 'order-0', 'flex-grow-0']),

  recommenderName: cva([
    'h-[18px]',
    'font-[Gilroy]',
    'font-bold',
    'text-[15px]',
    'leading-[120%]',
    'flex',
    'items-center',
    'tracking-[0.02em]',
    'text-[var(--color-recommended-header)]',
    'flex-none',
    'order-1',
    'flex-grow',

    // Font feature settings
    '[font-feature-settings:"pnum"_on,"lnum"_on]',
  ]),

  messageBodyWrapper: cva(['flex', 'flex-row', 'items-start', 'p-0', 'gap-2', 'flex-none', 'order-1', 'self-stretch', 'flex-grow-0']),

  messageBody: cva([
    'font-normal',
    'text-sm',
    'my-2',
    'leading-[120%]',
    'text-left',
    'w-[90%]',
    'tracking-[0.02em]',
    'text-[var(--color-recommended-header)]',
    'flex-none',
    'order-1',
    'flex-grow',

    // Font feature settings
    '[font-feature-settings:"pnum"_on,"lnum"_on]',
  ]),
})
