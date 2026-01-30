import { cva, type VariantProps } from 'class-variance-authority'

export const wrapperVariants = cva([
  'w-full',
  'h-full',
  'bg-[var(--color-background-default)]',
  'p-4',
  'md:px-10',
  'md:py-4',
  'lg:px-[10%]',
  'lg:py-4',
  '[&_a]:text-[var(--color-primary-main)]',
  '[&_a]:font-bold',
])

export const mainSectionWrapperVariants = cva(['flex', 'justify-center', 'w-full', 'h-full'])

export const quotationStartWrapperVariants = cva(['flex', 'flex-col', 'items-center', 'gap-4', 'md:py-8', 'md:px-[10px]'], {
  variants: {
    variant: {
      fb: 'bg-[var(--color-background-default)]',
      fortum: '',
      normal: '',
    },
  },
  defaultVariants: {
    variant: 'normal',
  },
})

export const isLoadingContainerVariants = cva(['flex', 'flex-col', 'relative', 'items-center', 'py-6', 'px-4', 'min-h-[100px]', 'h-[400px]', 'w-full', 'md:h-[220px]'])

export type WrapperVariants = VariantProps<typeof wrapperVariants>
export type MainSectionWrapperVariants = VariantProps<typeof mainSectionWrapperVariants>
export type QuotationStartWrapperVariants = VariantProps<typeof quotationStartWrapperVariants>
export type IsLoadingContainerVariants = VariantProps<typeof isLoadingContainerVariants>
