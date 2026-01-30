import { cva, type VariantProps } from 'class-variance-authority'

export const serviceVariants = cva([
  'flex',
  'items-start',
  'flex-col',
  'rounded-2xl',
  'relative',
  'bg-[var(--color-white-main)]',
  'w-full',
  'max-w-full',
  'shadow-[var(--shadow-regular)]',
  'p-4',
  'md:h-[184px]',
  'md:w-[740px]',
  'md:flex-row',
  'md:justify-between',
  'md:p-8',
])

export const checkmarkWrapperVariants = cva(['absolute', 'bottom-5', 'right-[15px]', 'w-[33px]', 'h-[33px]'])

export const imageWrapperVariants = cva(['flex', 'w-[120px]', 'h-[120px]', 'justify-end', 'items-end', 'flex-shrink-0', 'rounded-full', 'bg-cover', 'relative', 'bg-center'])

export const iconWrapperVariants = cva(['absolute', 'right-[-10px]', 'bottom-[-30px]'])

export const nameAndButtonWrapperVariants = cva(['flex', 'flex-col', 'justify-end', 'flex-grow', 'h-full', 'ml-4', 'md:ml-8', 'md:h-[120px]', 'md:min-w-[332px]'])

export const buttonWrapperVariants = cva(['min-w-[168px]', 'w-max', 'min-h-[48px]', 'mx-auto', 'my-0', 'md:m-0'])

export const priceAndRatingWrapperVariants = cva([
  'flex',
  'justify-between',
  'flex-row-reverse',
  'items-center',
  'h-full',
  'w-full',
  'py-0',
  'px-2',
  'pb-4',
  'md:justify-between',
  'md:flex-col',
  'md:items-center',
  'md:w-max',
  'md:min-w-[150px]',
  'md:p-0',
])

export const ratingWrapperVariants = cva(['flex', 'flex-row', 'items-end', 'p-0'])

export type ServiceVariants = VariantProps<typeof serviceVariants>
export type CheckmarkWrapperVariants = VariantProps<typeof checkmarkWrapperVariants>
export type ImageWrapperVariants = VariantProps<typeof imageWrapperVariants>
export type IconWrapperVariants = VariantProps<typeof iconWrapperVariants>
export type NameAndButtonWrapperVariants = VariantProps<typeof nameAndButtonWrapperVariants>
export type ButtonWrapperVariants = VariantProps<typeof buttonWrapperVariants>
export type PriceAndRatingWrapperVariants = VariantProps<typeof priceAndRatingWrapperVariants>
export type RatingWrapperVariants = VariantProps<typeof ratingWrapperVariants>
