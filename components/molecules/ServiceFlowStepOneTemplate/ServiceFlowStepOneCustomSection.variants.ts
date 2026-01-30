import { cva } from 'class-variance-authority'

export const sectionWrapperVariants = cva(['flex', 'flex-col', 'justify-start', 'pl-0', 'md:pl-10'])

export const textWrapperVariants = cva(['pl-2.5', 'md:pl-10', 'md:max-w-[450px]'])

export const bottomTextWrapperVariants = cva(['pl-2.5', 'md:py-2.5', 'md:pl-10', 'md:max-w-[650px]'])

export const clockWrapperVariants = cva(['ml-8'])

export const readMoreVariants = cva(['cursor-pointer', 'text-[var(--color-text-main)]', 'font-bold'])

export const modalTextDescriptionVariants = cva(['leading-5'])
