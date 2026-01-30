import { cva, type VariantProps } from 'class-variance-authority'

export const sellingPointItemVariants = cva(
  // Base classes
  [
    'w-full flex flex-col justify-between items-center',
    'rounded-lg p-4 px-2',
    'bg-[color:var(--color-standard-move-section-background-with-opacity)]',
    'text-[color:var(--color-text-main)]',
    'text-xs font-bold',
    'min-w-[100px]',
    // Responsive: medium screens and up
    'md:flex-row md:justify-start md:w-[198px] md:h-16',
  ],
  {
    variants: {
      withMoreWidth: {
        true: 'min-w-[127px] md:min-w-[unset]',
        false: '',
      },
      withBlueColor: {
        true: '[&_svg_*]:stroke-[color:var(--color-secondary-light)]',
        false: '',
      },
    },
    defaultVariants: {
      withMoreWidth: false,
      withBlueColor: false,
    },
  },
)

export const textWrapperVariants = cva([
  'flex text-center',
  // Target nested Text component for medium screens
  '[&_.text-component]:md:text-base',
  'md:pl-4 md:text-left',
])

export type SellingPointItemVariants = VariantProps<typeof sellingPointItemVariants>
