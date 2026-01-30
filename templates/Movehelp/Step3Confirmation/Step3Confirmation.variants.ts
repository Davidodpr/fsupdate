import { cva, type VariantProps } from 'class-variance-authority'

export const containerVariants = cva([
  'flex',
  'flex-col',
  'items-center',
  'p-0',
  'bg-[var(--color-background-default)]',
  'w-screen',
  'md:w-screen',
  'md:flex',
  'md:flex-col',
  'md:items-center',
  'md:p-0',
])

export const mainWrapperVariants = cva(['px-4', 'py-0', 'pb-6', 'flex-col', 'w-full', 'md:p-4', 'md:w-[400px]'])

export type ContainerVariants = VariantProps<typeof containerVariants>
export type MainWrapperVariants = VariantProps<typeof mainWrapperVariants>
