import { cva } from 'class-variance-authority'

export const phoneLinkVariants = cva(['text-[var(--color-primary-main)] font-bold'])

export const rowWithIconVariants = cva(['mb-2', '[&_svg]:text-[var(--color-secondary-main)]', '[&_svg]:w-4 [&_svg]:h-4', '[&_svg]:mr-2.5'])
