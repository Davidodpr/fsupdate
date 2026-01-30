import { cva, type VariantProps } from 'class-variance-authority'

export const addressBoxVariants = cva(['flex flex-row items-center max-w-full', 'bg-[#DCEFFF] rounded-lg text-[var(--color-secondary-main)]'])

export type AddressBoxVariants = VariantProps<typeof addressBoxVariants>
