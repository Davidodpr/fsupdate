import { cva } from 'class-variance-authority'

export const loaderWrapperVariants = cva(['flex', 'h-[34px]'])

export const readMoreTextVariants = cva(['underline', 'pt-[5px]', 'text-xs', 'hover:cursor-pointer'])

export const ratingRowWrapperVariants = cva(['flex', 'justify-center', 'items-center', 'w-full', 'py-3 px-4', 'flex-col', 'md:flex-row'], {
  variants: {
    alignment: {
      left: 'justify-start',
    },
    withoutBorderBottom: {
      true: 'border-b-0',
    },
  },
})

export const styledCommentTextVariants = cva(['max-w-full'])

export const ratingInfoVariants = cva(['flex', 'flex-row', 'text-[#70757A]', 'items-center', 'justify-center', 'gap-[3px]', 'cursor-pointer'])

export const ratingValueVariants = cva(['leading-normal', 'pt-0.5', 'font-[arial]', 'text-[32px]'])

export const reviewCountLinkVariants = cva(['font-normal', 'text-[#808080]', 'font-[arial]', 'leading-[1.5]', 'pt-[3px]', 'text-[13px]', 'cursor-pointer'], {
  variants: {
    marginLeft: {
      left: 'ml-4',
      none: 'ml-1',
    },
  },
})

export const reviewWrapperVariants = cva(['flex', 'leading-normal', 'flex-col', 'text-[13px]', 'pt-8 pb-4 px-6', 'text-left', 'md:max-w-[300px]'])

export const authorDetailsVariants = cva(['pt-[2.5px]', 'md:w-[calc(100%-58px)]', 'max-h-[250px]', 'overflow-hidden', 'line-clamp-8', 'md:w-full'], {
  variants: {
    showFullReview: {
      true: ['max-h-[10000px]', 'overflow-visible', 'line-clamp-none'],
    },
  },
})

export const reviewMetaVariants = cva(['flex', 'flex-row', 'mb-4', 'pt-[2.5px]', 'w-full'])

export const timeDescriptionVariants = cva(['text-[#767678]', 'leading-[1.4]', 'whitespace-nowrap', 'text-ellipsis', 'overflow-hidden', 'md:w-[160px] w-full', 'md:pl-[5px] pl-3'])

export const starContainerVariants = cva(['flex', 'items-center'])

export const carouselWrapperVariants = cva(['max-w-full', 'w-screen', 'py-5 px-0', 'bg-[var(--color-background-default)]', 'md:max-w-[629px]'])

export const styledTextVariants = cva(['pt-0 px-16', '!font-bold', '!text-2xl', '!leading-6', 'text-center'])

export const reviewImageWrapperVariants = cva(['w-10', 'h-10', 'absolute'])

export const styledAuthorLinkVariants = cva(['!font-bold', 'text-black', 'mb-[5px]', 'ml-12'])

export const styledStarContainerVariants = cva(['flex', 'items-center', 'pl-12'])

export const styledPaperVariants = cva([
  'flex',
  'text-center',
  'rounded-lg',
  'mx-[30px] mt-[5px] mb-5',
  'shadow-[0px_8px_16px_0px_rgba(0,0,0,0.08)]',
  'h-max',
  'min-h-[235px]',
  'md:my-5 md:mx-2 md:max-w-[300px]',
])

export const styledCarouselPaperVariants = cva([
  'flex',
  'flex-col',
  'text-center',
  'rounded-lg',
  'mx-[30px] mt-[5px] mb-5',
  'shadow-[0px_8px_16px_0px_rgba(0,0,0,0.08)]',
  'h-max',
  'min-h-[235px]',
])

export const flexWrapperVariants = cva(['max-w-full', 'overflow-hidden', 'mt-8'])
