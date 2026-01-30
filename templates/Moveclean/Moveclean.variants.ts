import { cva, type VariantProps } from 'class-variance-authority'

export const wrapperVariants = cva([
  'bg-[var(--color-background-default)]',
  'font-[var(--font-family-main)]',
  'text-[var(--color-text-main)]',
  'w-full',
  'flex-1',
  'flex',
  'flex-col',
])

export const contentContainerVariants = cva(['flex', 'flex-col', 'items-center', 'w-full', 'flex-1', 'md:w-full', 'md:flex', 'md:flex-col', 'md:items-center'])

export const accordionButtonWrapperVariants = cva(
  [
    'w-full',
    'text-[15px]',
    '!text-left',
    'md:text-[20px]',
    // Button styles nested
    '[&_button]:bg-[#DCEFFF]',
    '[&_button]:p-4',
    '[&_button]:font-[var(--font-weight-bold)]',
    '[&_button]:overflow-visible',
    '[&_button[data-state="open"]]:bg-[#DCEFFF]',
    '[&_button[data-state="closed"]]:bg-[#DCEFFF]',
    'md:[&_button]:py-3',
    'md:[&_button]:px-8',
    // SVG styles nested
    '[&_svg_path]:stroke-[var(--color-text-main)]',
  ],
  {
    variants: {
      isCustomButton: {
        true: ['[&_button]:m-0', '[&_button]:overflow-visible'],
      },
    },
  },
)

export const buttonWrapperVariants = cva([
  'min-w-[168px]',
  'w-full',
  'mt-4',
  '[&_button]:bg-[#DCEFFF]',
  '[&_button]:hover:bg-[#DCEFFF]',
  'md:mt-0',
  'md:min-w-[168px]',
  'md:w-max',
  'md:min-h-[48px]',
  'md:ml-6',
])

export const accordionContentWrapperVariants = cva([
  '[&_div]:bg-[#DCEFFF]',
  '[&_div]:text-[var(--color-secondary-main)]',
  '[&_div]:text-[16px]',
  '[&_ul]:m-0',
  '[&_a]:text-[var(--color-primary-main)]',
  '[&_a]:!text-[var(--color-primary-main)]',
])

export const imageWrapperVariants = cva([
  'flex',
  'w-[82px]',
  'h-[110px]',
  'justify-end',
  'items-end',
  'flex-shrink-0',
  'rounded-[var(--radius-border-radius-main)]',
  'bg-cover',
  'relative',
  'bg-center',
  'border',
  'border-gray-400',
  'mb-6',
  'md:w-[120px]',
  'md:h-[120px]',
  'md:ml-8',
  'md:mb-6',
])

export const accordianWrapperVariants = cva([
  'flex',
  'flex-col',
  'items-center',
  'text-[var(--color-text-main)]',
  'w-full',
  'mb-16',
  'px-4',
  '[&>div]:p-0',
  'md:px-0',
  'md:w-[740px]',
])

export const spinnerBgWrapperVariants = cva(['w-screen', 'h-screen', 'bg-[var(--color-background-default)]'])

export const contactMeCardWrapperVariants = cva(['mt-4'])

export const faqWrapperVariants = cva([
  'flex',
  'flex-col',
  'items-center',
  'px-4',
  'mb-6',
  'bg-[var(--color-background-default)]',
  'gap-4',
  'md:flex',
  'md:flex-row',
  'md:px-0',
  'md:items-center',
  'md:w-[629px]',
  'md:max-w-[629px]',
])

export const topWrapperVariants = cva(['flex', 'flex-col', 'items-start', 'relative', 'bg-[var(--color-background-secondary)]', 'md:items-center'])

export const calendarWrapperVariants = cva([
  'flex',
  'flex-col',
  'items-start',
  'py-4',
  'pl-4',
  'pr-0',
  'gap-2.5',
  'self-stretch',
  'md:flex-row',
  'md:justify-center',
  'md:items-center',
  'md:py-4',
  'md:px-0',
  'md:gap-8',
  'md:w-[629px]',
  'md:self-center',
])

export const carouselWrapperVariants = cva(['flex', 'flex-col', 'items-start', 'py-4', 'px-0', 'gap-2.5', 'w-full', 'h-[116px]', 'md:w-[629px]'])

export type WrapperVariants = VariantProps<typeof wrapperVariants>
export type ContentContainerVariants = VariantProps<typeof contentContainerVariants>
export type AccordionButtonWrapperVariants = VariantProps<typeof accordionButtonWrapperVariants>
export type ButtonWrapperVariants = VariantProps<typeof buttonWrapperVariants>
export type AccordionContentWrapperVariants = VariantProps<typeof accordionContentWrapperVariants>
export type ImageWrapperVariants = VariantProps<typeof imageWrapperVariants>
export type AccordianWrapperVariants = VariantProps<typeof accordianWrapperVariants>
export type SpinnerBgWrapperVariants = VariantProps<typeof spinnerBgWrapperVariants>
export type ContactMeCardWrapperVariants = VariantProps<typeof contactMeCardWrapperVariants>
export type FaqWrapperVariants = VariantProps<typeof faqWrapperVariants>
export type TopWrapperVariants = VariantProps<typeof topWrapperVariants>
export type CalendarWrapperVariants = VariantProps<typeof calendarWrapperVariants>
export type CarouselWrapperVariants = VariantProps<typeof carouselWrapperVariants>
