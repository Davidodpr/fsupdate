import { cva } from 'class-variance-authority'

export const step1ProvidersWrapperVariants = cva([
  'w-full',
  'h-full',
  'p-4',
  'md:px-10 md:py-4',
  'lg:px-[10%] lg:py-4',
  '[&_a]:text-[var(--color-primary-main)]',
  '[&_a]:font-bold',
])

export const imageWrapperVariants = cva(['h-full', 'w-[50px]', 'relative', 'mx-[6px]'])

export const spinnerWrapperVariants = cva(['min-h-[400px]', 'justify-center', 'items-center', 'flex-col'])

export const noProvidersWrapperVariants = cva(['px-8 pt-12 pb-16'], {
  variants: {
    isTooBig: {
      true: ['mx-auto', 'max-w-[520px]'],
    },
  },
})

export const popularTextWrapperVariants = cva(['mx-4', 'rounded-2xl', 'p-4', 'border border-[rgba(33,71,102,0.20)]', 'md:mx-8 md:px-6 md:py-4'])

export const bottomSectionTitleWrapperVariants = cva(['text-center', 'py-4 px-0', 'md:w-full md:text-left'])

export const buttonSectionVariants = cva(['flex', 'items-end', 'justify-end', 'md:w-[640px]'])

export const addProductTextVariants = cva(['text-[20px]', 'max-w-full'])

export const buttonWrapperVariants = cva(['h-12', 'w-[200px]', '[&_svg]:mt-[2px]', '[&_svg_path]:text-white', '[&_svg_path]:stroke-white'], {
  variants: {
    isDisabled: {
      true: ['[&_svg]:mt-[2px]', '[&_svg_path]:text-[var(--color-disabled-button-color)]', '[&_svg_path]:stroke-[var(--color-disabled-button-color)]'],
    },
  },
})

export const serviceWrapperVariants = cva(['flex', 'flex-col', 'items-center', 'relative', 'gap-4', 'w-full', 'md:w-fit md:items-start md:min-w-[744px] md:max-w-[744px]'])

export const mainSectionWrapperVariants = cva(['flex', 'justify-center', 'h-full'])

export const textWrapperVariants = cva(
  [
    'h-auto',
    'font-normal',
    'text-base',
    'leading-[120%]',
    'flex',
    'items-left',
    'text-[var(--color-text-main)]',
    '[&_a]:text-[var(--color-primary-main)]',
    '[&_a]:no-underline',
    '[&_a]:font-bold',
  ],
  {
    variants: {
      paddingOn: {
        true: 'py-[5px] px-0',
      },
      italicText: {
        true: ['py-[5px] px-0', 'italic'],
      },
    },
  },
)

export const bottomSectionWrapperVariants = cva(['pt-[7px] pr-0 pb-0 pl-[25px]'])

export const styledFlexVariants = cva(['[&_ul]:pl-5', '[&_ul_li]:list-disc', '[&_ul_li]:ml-0'])

export const textSectionWrapperVariants = cva(['p-4', 'w-full', 'h-full', 'md:py-4 md:pr-4 md:pl-8 md:px-4'])

export const textTopWrapperVariants = cva(['flex', 'items-center', 'justify-between'])

export const errorMessageFrameVariants = cva(['flex', 'flex-col', 'items-center', 'p-4', 'gap-4', 'md:px-2.5 md:py-8'], {
  variants: {
    variant: {
      fb: 'bg-[var(--color-background-default)]',
      fortum: '',
      normal: '',
    },
  },
})

export const isLoadingContainerVariants = cva(['flex', 'flex-col', 'relative', 'items-center', 'px-4 py-6', 'min-h-[100px]', 'h-[400px]', 'w-full', 'md:h-[220px]'])

const serviceBaseVariants = [
  'flex',
  'items-start',
  'flex-col',
  'rounded-lg',
  'relative',
  'bg-white',
  'w-full',
  'shadow-[var(--shadow-regular)]',
  'md:max-w-[640px] md:max-h-[152px] md:flex-row',
]

export const serviceVariants = cva(serviceBaseVariants, {
  variants: {
    checked: {
      true: 'outline outline-2 outline-[var(--color-primary-main)]',
    },
  },
})

export const serviceSmallVariants = cva([...serviceBaseVariants, 'h-[200px]', 'md:h-[98px]'], {
  variants: {
    checked: {
      true: 'outline outline-2 outline-[var(--color-primary-main)]',
    },
  },
})

export const serviceImageVariants = cva(['relative', 'rounded-lg', 'w-full', 'min-h-[96px]', 'flex', 'justify-center', 'md:w-[180px] md:min-w-[180px] md:h-full'])

export const imageCheckedOverlayVariants = cva(
  [
    'absolute',
    'top-0',
    'left-0',
    'bottom-0',
    'right-0',
    'bg-[rgba(81,200,180,0.30)]',
    'flex',
    'justify-center',
    'items-center',
    'rounded-t-lg',
    'md:rounded-l-lg md:rounded-tr-none',
  ],
  {
    variants: {
      isFb: {
        true: 'bg-[rgba(255,95,0,0.30)]',
      },
    },
  },
)
