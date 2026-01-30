import { cva } from 'class-variance-authority'

export const containerVariants = cva(['flex justify-center items-center', 'min-h-screen p-5'])

export const wrapperVariants = cva(['w-full max-w-[800px]'])

export const paperVariants = cva(['bg-white rounded-[var(--radius-main)]', 'p-8 shadow-[0px_4px_32px_rgba(0,0,0,0.07)]'])

export const textVariants = cva(['text-sm leading-[1.6] text-[var(--color-text-main)]'])
