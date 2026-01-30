import { cva, type VariantProps } from 'class-variance-authority'

export const wrapperVariants = cva(['flex', 'justify-between', 'w-full', 'text-[15px]', 'mb-0.5', 'text-[var(--color-text-main)]'])

export const labelVariants = cva(['font-bold'])

export const descriptionVariants = cva(['text-right'])

export type WrapperVariants = VariantProps<typeof wrapperVariants>
export type LabelVariants = VariantProps<typeof labelVariants>
export type DescriptionVariants = VariantProps<typeof descriptionVariants>
