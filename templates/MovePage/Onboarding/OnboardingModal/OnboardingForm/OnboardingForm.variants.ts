import { cva } from 'class-variance-authority'

export const styledSectionHeaderVariants = cva(['text-[var(--color-secondary-main)]', 'font-semibold', 'text-center', 'md:text-start'])

export const buttonWrapperVariants = cva(['flex', 'flex-1', 'h-12', 'items-center', 'justify-center', 'min-w-0'])

export const addressSectionHeaderTextVariants = cva(['!text-xl md:!text-2xl', '!font-bold', 'pt-1', 'hover:cursor-pointer'])

export const noNewAddressVariants = cva(['pt-4', 'underline', 'hover:cursor-pointer', 'min-h-[44px]', 'flex', 'items-center', 'justify-center'])

export const addressSectionAddAddressVariants = cva(['text-2xl', 'font-bold', 'pt-2', '!text-[#065f46]', 'hover:cursor-pointer', 'min-h-[44px]', 'flex', 'items-center'])

export const confirmButtonWrapperVariants = cva(['w-full', 'md:w-auto', 'flex', 'justify-center', 'items-center', 'gap-2', 'mx-auto', '[&_button]:py-3', '[&_button]:w-full', 'md:[&_button]:w-auto', 'md:[&_button]:px-24'])

export const penWrapperVariants = cva([
  'absolute',
  'right-0',
  '-top-[20px] md:top-0',
  'text-[var(--color-primary-main)]',
  'flex',
  'gap-1',
  'hover:cursor-pointer',
  'items-center',
  'md:right-0',
  'min-h-[44px]',
  'min-w-[44px]',
  'justify-center',
  'p-2',
  '-mr-2',
])

export const styledToResidenceSizeInputWrapperVariants = cva(['py-2 px-1', 'md:w-[40%]'])

export const styledFromResidenceSizeInputWrapperVariants = cva(['md:w-[40%]'])

export const optionsWrapperVariants = cva(['w-full', '[&_p]:text-center', '[&_p]:text-[var(--color-secondary-main)]', '[&_p]:mt-0', '[&_p]:mb-4'])

export const styledFromResidenceSizeSectionVariants = cva(['mb-8', 'gap-[9px]', 'flex', 'flex-col'])

export const styledToAddressSectionVariants = cva(['mb-4', 'text-[var(--color-text-main)]', 'relative', 'min-h-[40px]', 'md:mt-0 md:min-h-[60px]'], {
  variants: {
    isFirstStep: {
      true: ['mt-2'],
    },
  },
})

export const toAddressWrapperVariants = cva(['w-full', 'mx-auto'])

export const styledFlexVariants = cva(
  [
    'w-full',
    'max-w-full',
    'flex',
    'h-[50px]',
    'flex-row',
    'text-[15px]',
    'justify-center',
    'items-center',
    'bg-[var(--color-inactive-main)]',
    'rounded-lg',
    'my-2',
    'relative',
    'hover:cursor-pointer',
    '[&>label]:ml-2.5',
  ],
  {
    variants: {
      checked: {
        true: ['font-semibold', 'bg-[var(--color-tertiary-main)]', 'text-white', '[&_span]:text-white'],
      },
    },
  },
)

export const formContainerVariants = cva(['min-h-[170px]', 'flex', 'justify-between', 'flex-col'])

export const buttonRowVariants = cva(['min-h-[55px]', 'flex', 'justify-between'])

export const buttonGroupVariants = cva(['w-full', 'gap-3', 'flex', 'justify-center', 'items-center'])

export const addressDisplayVariants = cva(['flex', 'flex-col', 'items-center', 'justify-center', 'gap-3'])

export const datePickerTriggerVariants = cva([
  'flex',
  'items-center',
  'justify-center',
  'gap-2',
  'cursor-pointer',
  'hover:bg-gray-50',
  'rounded-md',
  'min-h-[44px]',
  'px-3',
])
