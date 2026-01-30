import { cva, type VariantProps } from 'class-variance-authority'

export const groupDealCardWrapperVariants = cva(['bg-white', 'p-0', 'w-full', 'rounded-[var(--border-radius-small)]', 'shadow-[var(--shadow-regular)]'])

export const groupDealBannerVariants = cva([
  'w-full',
  'text-center',
  'bg-[var(--color-group-deal-banner)]',
  '[&_p]:py-1',
  '[&_p]:px-[2px]',
  '[&_p]:text-[var(--color-group-deal-banner-color)]',
  'md:text-left',
  'md:max-w-[280px]',
  'md:pl-2',
])

export const groupDeadTitleVariants = cva([
  'px-4',
  'mb-4',
  'border-b',
  'border-b-[#E5E5E5]',
  '[&_h3]:text-[var(--font-size-3)]',
  '[&_h3]:font-[var(--font-family-secondary)]',
  '[&_h3]:m-0',
  'sm:[&_h3]:text-[var(--font-size-4)]',
  'md:px-4',
  'md:[&_h3]:text-[var(--font-size-7)]',
])

export type GroupDealCardWrapperVariants = VariantProps<typeof groupDealCardWrapperVariants>
export type GroupDealBannerVariants = VariantProps<typeof groupDealBannerVariants>
export type GroupDeadTitleVariants = VariantProps<typeof groupDeadTitleVariants>
