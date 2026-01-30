import { cva } from 'class-variance-authority'

export const containerVariants = cva([
  'pt-8 px-3 md:!px-0 pb-0 w-full md:w-[818px]',
  '[&.fortum]:-mx-4',
  '[&.fortum]:bg-[var(--color-secondary-main)]',
  '[&>.fortum]:hidden',
  '[&>.fortum]:sm:flex',
])

export const fortumLogoWrapperVariants = cva([
  'hidden justify-center',
  '[&_div]:text-white [&_div]:text-xs [&_div]:font-light [&_div]:mb-2',
  'sm:hidden sm:-mb-[60px] sm:pt-[46px]',
  'md:mb-0 md:pt-0',
])

export const poweredByVariants = cva(['flex justify-center', 'ml-8 flex-col'])

export const topSectionWrapperVariants = cva([
  'flex items-start gap-4',
  'max-w-[900px] mx-auto',
  'w-full md:w-[818px] md:px-0 md:py-0',
  'justify-center',
  'md:pt-4 md:px-0 pb-0',
  'text-white',
  'text-lg font-bold',
  'md:pt-0',
])

export const partnerContainerVariants = cva([
  'h-fit',
  'bg-[var(--color-secondary-main)]',
  'px-4 py-4',
  'rounded-[var(--radius-border-radius-main)]',
  'text-white',
  'min-w-[240px]',
  'max-w-[270px]',
  'max-h-[180px]',
  'flex flex-col',
  'justify-center',
  'items-center',
  'md:px-0',
  'relative',
  '[&_.invitedByText]:mb-2',
  '[&_.invitedByText]:text-white',
  '[&_.invitedByText]:text-sm',
])

export const brokerImageWrapperVariants = cva([
  'relative',
  'p-3',
  'rounded-[var(--radius-border-radius-main)]',
  'bg-white',
  'max-w-[200px]',
  'flex items-center justify-center',
  'mb-1',
  'md:mx-2',
  'h-[100px]',
  'w-full',
  '[&.normal]:hidden',
  '[&_span]:!p-2',
])
