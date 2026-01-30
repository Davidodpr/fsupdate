import { cva, type VariantProps } from 'class-variance-authority'

export const activityItemVariants = cva(
  [
    'p-3.5 rounded-[var(--radius-border-radius-main)] shadow-[0px_4px_8px_rgba(0,0,0,0.08)]',
    'border-2 mb-2 h-[68px] relative cursor-pointer w-full mx-auto',
    'bg-[var(--color-white-main)]',
    'sm:w-[821px] sm:max-w-full',
    'md:h-[84px]',
  ],
  {
    variants: {
      status: {
        not_started: {
          'bg-[var(--color-white-main)]': true,
        },
        locked: {
          'cursor-default bg-[var(--color-orange-light)] border-[var(--color-accent-icon)]': true,
        },
        completed: {
          'cursor-default bg-[var(--color-tertiary-light-background)] border-[var(--color-completed-activity-item-border)]': true,
        },
      },
      isNextBestAction: {
        true: '!border-[var(--color-primary-main)] hover:!shadow-[0px_4px_16px_rgba(0,0,0,0.12)] !transition-shadow',
        false: 'border-[var(--color-white-main)]',
      },
    },
    defaultVariants: {
      status: 'not_started',
      isNextBestAction: false,
    },
  },
)

export const activityIconVariants = cva(['w-6 h-full mr-2 ml-2', 'md:mr-3.5 md:ml-3.5 md:w-9 md:h-full'])

export const activityIconCompactVariants = cva(['p-2.5 w-7 h-7 relative mr-2 ml-2', 'md:mr-2.5 md:ml-4 md:w-[34px] md:h-[34px]', '[&_img]:h-full [&_img]:w-full'], {
  variants: {
    nextBestAction: {
      true: 'md:w-[25px] md:h-[25px]',
      false: '',
    },
  },
  defaultVariants: {
    nextBestAction: false,
  },
})

export const activityTitleVariants = cva(['font-bold text-[15px] text-[var(--color-text-main)] leading-4 pb-1', 'md:text-lg'])

export const activityDescriptionVariants = cva(['font-normal sm:text-[13px] text-[var(--color-grey08)]', 'md:text-[15px]'])

export const activityContentVariants = cva(['min-h-6'])

// Status-specific text styles
export const statusTextVariants = cva('', {
  variants: {
    status: {
      not_started: '',
      locked: '[&_.activity-title]:line-through',
      completed: 'text-[var(--color-primary-dark)] [&_.activity-title]:line-through',
    },
  },
  defaultVariants: {
    status: 'not_started',
  },
})

export type ActivityItemVariants = VariantProps<typeof activityItemVariants>
export type ActivityIconCompactVariants = VariantProps<typeof activityIconCompactVariants>
