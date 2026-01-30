import { cva } from 'class-variance-authority'

export const wrapperVariants = cva(['w-full', 'max-w-[744px]', 'mx-auto', 'relative', 'h-full', 'flex', 'items-center', 'flex-col', 'p-4', 'md:p-0'])

export const priceAndDiscountTextBoldVariants = cva(['!font-bold'])

export const movingPriceBoxVariants = cva(['py-2', 'px-3', 'rounded-lg', 'h-fit', 'min-w-fit'], {
  variants: {
    isFixed: {
      true: ['bg-[var(--color-standard-move-section-background)]', '!text-[var(--color-secondary-main)]'],
      false: ['bg-[#FFF1E5]', '!text-[#DB4F00]'],
    },
  },
})

export const buttonsWrapperVariants = cva(['w-full', 'justify-center', 'items-center', 'p-0', 'mt-8', 'md:p-0'])

export const arrowWrapperVariants = cva([
  'flex',
  'justify-center',
  'items-center',
  'my-4',
  'absolute',
  'left-4',
  'top-0',
  'cursor-pointer',
  'md:flex',
  'md:relative',
  'md:left-auto',
  'md:top-auto',
  'md:justify-center',
  'md:items-center',
  'md:pr-4',
  'md:h-8',
  'md:my-4',
  'md:mr-auto',
  'md:ml-0',
])

export const customModalWrapperVariants = cva([
  'border-b',
  'border-[#fdf6ee]',
  'pb-4',
  'flex',
  'flex-row',
  'justify-between',
  'items-center',
  '[&_h2]:mb-0',
  '[&_h2]:font-[var(--font-main)]',
  '[&_h2]:text-[var(--color-text-main)]',
  '[&_h2]:!text-[22px]',
  '[&_svg]:cursor-pointer',
])

export const headerWrapperVariants = cva([
  'flex',
  'border-b',
  'border-[var(--color-background-default)]',
  'relative',
  'items-center',
  'w-full',
  'justify-between',
  'pb-[15px]',
  'flex-wrap',
  'md:w-full',
  'md:p-0',
  'md:pb-4',
  'md:border-b',
  'md:border-[#21476633]',
  'md:text-[32px]',
  'md:[&>p]:text-[32px]',
  'md:[&>p]:font-bold',
])

export const innerWrapperVariants = cva(
  [
    'p-4',
    'w-[822px]',
    'max-w-full',
    'mt-4',
    'flex',
    'flex-col',
    'bg-white',
    'rounded-[var(--radius-border-radius-main)]',
    'relative',
    'shadow-[var(--shadow-regular)]',
    'md:py-8',
    'md:mt-0',
    'md:px-12',
  ],
  {
    variants: {
      withLessMarginTop: {
        true: ['md:mt-4'],
      },
    },
  },
)

export const largeButtonWrapperVariants = cva(['w-full', 'h-12', 'm-0', 'md:p-0', 'md:w-[311px]'])

export const mainWrapperVariants = cva(['!flex-col', 'md:py-4'])

export const inputWrapperVariants = cva(['!flex-col md:flex-row', 'md:max-w-[45%]', 'md:[&_.extraMargin]:mt-4'])

export const apartmentNumberInfoVariants = cva([
  'mt-4',
  'py-2.5',
  'px-4',
  'pr-2',
  'rounded-[var(--radius-border-radius-small)]',
  'w-full',
  '!bg-[var(--color-primary-extra-light)]',
  '[&_.link]:text-[var(--color-card-link)]',
  '[&_.link]:cursor-pointer',
  'md:mt-0',
])

export const selectFlatWrapperVariants = cva(['w-full', 'mb-4', 'mt-2'])

export const selectFlatInputWrapperVariants = cva(['w-full', 'mb-4', 'md:w-[200px]', 'md:mb-0', 'md:mr-4'])

export const iconWrapperVariants = cva(['mx-2.5'])

export const linkTextVariants = cva(['text-[var(--color-card-link)]', 'cursor-pointer', 'font-bold'])

// New variants for date validation feature
export const dateInputRowVariants = cva(['flex', 'flex-col', 'gap-4', 'mt-2', 'md:flex-row', 'md:items-start'])

export const datePickerWrapperVariants = cva(['w-full', 'md:w-[45%]', 'md:flex-shrink-0'], {
  variants: {
    hasError: {
      true: ['[&_input]:!border-[#E93C3C]', '[&_input]:!border-2', '[&>div>div]:!border-[#E93C3C]', '[&>div>div>div]:!border-[#E93C3C]'],
    },
  },
})

export const dateErrorInfoDesktopVariants = cva([
  'p-2.5',
  'px-4',
  'rounded-[var(--radius-border-radius-small)]',
  'w-full',
  'bg-[#FFF1F3]',
  'border',
  'border-[#FFD6DC]',
  'mt-0 mb-4',
  '[&_svg_path]:fill-[#E93C3C]',
  '[&_.link]:text-[var(--color-card-link)]',
  '[&_.link]:cursor-pointer',
  'md:mt-0',
  'md:flex-1',
])

export const apartmentInputRowVariants = cva(['flex', 'flex-col', 'gap-4', 'md:flex-row', 'md:items-start'])

export const apartmentInputWrapperVariants = cva(['w-full', 'md:w-[45%]', 'md:flex-shrink-0'])

export const apartmentNumberInfoDesktopVariants = cva([
  'p-2.5',
  'px-4',
  'rounded-[var(--radius-border-radius-small)]',
  'w-full',
  'bg-[var(--color-primary-extra-light)]',
  'mt-4',
  '[&_.link]:text-[var(--color-card-link)]',
  '[&_.link]:cursor-pointer',
  'md:mt-0',
  'md:flex-1',
])

export const iconErrorWrapperVariants = cva(['mx-0', 'mr-2.5', 'flex', 'items-center', 'justify-center'])

export const linkTextErrorVariants = cva(['text-[#E93C3C]', 'cursor-pointer', '!font-bold', 'hover:underline'])

export const dateRestrictionModalContentVariants = cva(['flex', 'flex-col', 'items-center', 'py-6', 'gap-5', 'md:flex-row', 'md:items-start'])

export const dateRestrictionIconWrapperVariants = cva([
  'flex',
  'justify-center',
  'items-center',
  'p-4',
  'rounded-full',
  'bg-[#FFF1F3]',
  'flex-shrink-0',
  '[&_svg_path]:fill-[#E93C3C]',
])

export const dateRestrictionTextContentVariants = cva(['flex', 'flex-col', 'w-full', 'gap-2'])
