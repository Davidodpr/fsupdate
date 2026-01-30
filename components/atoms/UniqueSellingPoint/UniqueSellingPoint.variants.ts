import { cva, type VariantProps } from 'class-variance-authority'

export const wrapperVariants = cva(['w-[300px]', 'h-[300px]', 'flex', 'flex-col', 'items-center', 'text-center'])

export const iconWrapperVariants = cva(['w-[100px]', 'h-[100px]', 'relative'])

export const headerWrapperVariants = cva(['text-lg', 'text-[var(--color-white-main)]', 'mb-2.5', 'font-extrabold'])

export const textWrapperVariants = cva(['text-[var(--color-white-main)]', 'font-thin'])

export type WrapperVariants = VariantProps<typeof wrapperVariants>
export type IconWrapperVariants = VariantProps<typeof iconWrapperVariants>
export type HeaderWrapperVariants = VariantProps<typeof headerWrapperVariants>
export type TextWrapperVariants = VariantProps<typeof textWrapperVariants>
