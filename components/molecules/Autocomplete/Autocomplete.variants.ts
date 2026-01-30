import { cva } from 'class-variance-authority'

export const autocompleteVariants = () => ({
  wrapper: cva(['relative']),

  menu: cva([
    'list-none',
    'shadow-[0px_8px_16px_rgba(0,0,0,0.08)]',
    'rounded-[8px]',
    'p-0',
    'my-[1px]',
    'mx-0',
    'z-[5000]',
    'bg-white',
    'absolute',
    'w-full',
    'rounded-b-[var(--radius-border-radius-main)]',

    // List item styles
    '[&_li]:py-2',
    '[&_li]:px-4',
  ]),

  item: cva(
    [
      'hover:cursor-pointer',

      // Last item default styling (link style)
      'last:text-[var(--color-error-red)]',
      'last:underline',
      'last:rounded-b-[var(--radius-border-radius-main)]',
    ],
    {
      variants: {
        active: {
          true: ['bg-[var(--color-tertiary-very-light)]'],
        },
        noHits: {
          true: ['text-center', 'text-[var(--color-error-red)]'],
        },
        noLastLink: {
          true: [
            // Override the last item link styling
            'last:text-[var(--color-text-main)]',
            'last:no-underline',
            'last:rounded-b-[var(--radius-border-radius-main)]',
          ],
        },
      },
    },
  ),
})
