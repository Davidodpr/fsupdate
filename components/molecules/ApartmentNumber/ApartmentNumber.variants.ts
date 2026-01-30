import { cva } from 'class-variance-authority'

export const apartmentNumberVariants = () => ({
  inputWrapper: cva(['mb-6', 'sm:w-1/2']),

  infoBoxWrapper: cva(['mt-[10px]', 'sm:w-1/2']),

  modalTextWrapper: cva(['flex', 'flex-col', 'sm:[&_p]:flex-shrink-[10]']),
})
