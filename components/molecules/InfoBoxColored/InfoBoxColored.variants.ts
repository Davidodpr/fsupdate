import { cva } from 'class-variance-authority'

export const infoBoxColoredWrapperVariants = cva(['flex w-full items-center rounded-lg p-4', 'text-[length:var(--font-size-1)] bg-[var(--color-primary-extra-light)]'], {
  variants: {
    color: {
      green: 'bg-[var(--color-primary-extra-light)]',
      blue: 'bg-[var(--color-standard-move-section-background)]',
      red: 'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)]',
    },
    textAlign: {
      center: 'justify-center',
      left: 'justify-start',
      right: 'justify-end',
    },
  },
  defaultVariants: {
    textAlign: 'center',
  },
})

export const infoBoxColoredIconWrapperVariants = cva('mr-[10px] w-6 h-6 flex-shrink-0')

export const infoBoxColoredTextWrapperVariants = cva('text-left')

export type InfoBoxColoredWrapperVariants = Parameters<typeof infoBoxColoredWrapperVariants>[0]
