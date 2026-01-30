import { cva } from 'class-variance-authority'

export const contentContainerVariants = cva(['flex', 'flex-col', 'gap-4', 'py-4'])

export const titleVariants = cva(['text-sm md:text-[15px]', 'font-bold', 'm-0', 'text-[var(--color-text-main)]'])

export const descriptionVariants = cva(['text-sm md:text-[15px]', 'leading-[1.5]', 'm-0', 'text-[var(--color-secondary-main)]', 'text-right'])

export const additionalDescriptionVariants = cva(['text-sm', 'leading-[1.5]', 'text-[var(--color-secondary-main)]', 'mt-2'])
