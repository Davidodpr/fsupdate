import { cva } from 'class-variance-authority'

export const pageWrapperVariants = cva(['flex', 'flex-col', 'items-center', 'justify-center', 'p-5', 'h-screen', 'bg-white', 'md:pb-[30%]'], {
  variants: {
    isStepTwo: {
      true: ['h-auto', '!p-0', 'items-start', 'md:pb-0'],
    },
  },
})

export const languageSelectorWrapperVariants = cva(['absolute', 'right-2.5', 'top-0', 'md:right-5', 'md:top-auto', 'md:bottom-[70px]'])

export const headerVariants = cva(['mb-[30px]', 'text-center', 'text-lg', 'md:text-[32px]'])

export const buttonWrapperVariants = cva(['w-fit', 'mx-auto', 'mt-[30px]'])

export const styledInputVariants = cva(['w-full', 'max-w-[193px]', 'min-w-[193px]', 'text-[var(--fs-colors-textMain)]'])

export const topSectionWrapperVariants = cva([
  'w-full',
  'flex',
  'flex-col',
  'px-4',
  'py-8',
  'text-center',
  'justify-center',
  'items-center',
  'bg-[var(--fs-colors-secondaryLight)]',
  'md:px-4',
  'md:py-12',
])

export const styledHeaderVariants = cva(
  [
    'm-0',
    'text-5xl',
    'text-[var(--fs-colors-whiteMain)]',
    'text-center',
    'leading-[120%]',
    'tracking-[0.72px]',
    'min-[380px]:pl-0',
    'md:text-[64px]',
    'md:whitespace-nowrap',
    'md:text-left',
  ],
  {
    variants: {
      isSecondaryFont: {
        true: ['font-secondary'],
      },
    },
  },
)

export const styledTextVariants = cva(['text-2xl', 'italic', 'font-bold', 'text-[var(--fs-colors-whiteMain)]', 'tracking-[0.72px]', 'leading-[120%]', 'pb-3'])

export const buttonsWrapperVariants = cva(['flex', 'gap-2', 'justify-center', 'items-center', 'w-full', 'md:gap-6', 'md:justify-start'])

export const sliderWrapperVariants = cva(['w-[618px]', 'mt-6', 'max-w-full'])

export const textButtonWrapperVariants = cva(
  [
    'px-8',
    'py-3',
    'border',
    'border-[rgba(33,71,102,0.20)]',
    'rounded-lg',
    'text-xl',
    'h-[110px]',
    'w-[150px]',
    'flex',
    'flex-col',
    'justify-around',
    'font-bold',
    'items-center',
    'text-[var(--fs-colors-secondaryLight)]',
    'hover:cursor-pointer',
    'md:h-[130px]',
    'md:w-[180px]',
    'md:text-2xl',
  ],
  {
    variants: {
      selected: {
        true: ['bg-[var(--fs-colors-secondaryLight)]', 'text-[var(--fs-colors-whiteMain)]', 'hover:cursor-pointer'],
      },
    },
  },
)

export const monthlyCostWillBeUpdatedTextVariants = cva(['px-4', 'pt-2', 'pb-6', 'italic', 'md:text-center', 'md:mx-auto', 'md:max-w-[600px]'])

export const residenceTypeWrapperVariants = cva(['flex', 'p-6', 'bg-[var(--fs-colors-whiteMain)]', 'rounded-2xl', 'mt-8', 'md:p-8'])

export const sizeWrapperVariants = cva(
  [
    'flex',
    'flex-col',
    'mt-6',
    'mx-4',
    'shadow-[var(--shadow-regular)]',
    'rounded-[var(--radius-border-radius-main)]',
    'p-4',
    'border',
    'border-[#E5E5E5]',
    'md:mx-auto',
    'md:mt-[50px]',
    'md:w-fit',
    'md:min-w-[652px]',
  ],
  {
    variants: {
      isPriceSpecification: {
        true: ['mx-4', 'my-4', 'p-0', 'md:mx-auto', 'md:mt-4', 'md:min-w-[654px]'],
      },
    },
  },
)

export const consumptionWrapperVariants = cva(['flex', 'justify-between', 'w-full', 'bg-[rgb(199,230,255)]', 'rounded-[var(--radius-border-radius-main)]', 'p-4', 'mt-8'])

export const showMoreSectionVariants = cva(['flex', 'items-center', 'pt-4', 'mx-auto', 'text-center', 'justify-center', 'hover:cursor-pointer', 'md:pl-8'])

export const showMoreTextVariants = cva(['text-[var(--fs-colors-secondaryMainDark)]', '!text-[15px]', '!font-bold', 'md:!text-base'])

export const popupHeaderVariants = cva(['font-bold'])
