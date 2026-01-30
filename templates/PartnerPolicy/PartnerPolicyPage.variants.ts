import { cva } from 'class-variance-authority'

export const containerVariants = cva(['min-h-[65vh]', 'bg-[var(--color-inactive-quite-light)]'])

export const wrapperVariants = cva(['w-[90%]', 'mx-auto', 'pt-[104px]', 'md:w-[60%]'])

export const paperVariants = cva(['bg-white', 'p-4', 'mb-5', 'text-[15px]', 'md:p-16'])

export const textVariants = cva(['font-[family:var(--font-secondary)]', 'text-2xl', 'leading-none', 'mb-4', 'md:text-[34px]'])
