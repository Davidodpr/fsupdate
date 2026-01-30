import { cva, type VariantProps } from 'class-variance-authority'

export const loginAndSignupBaseWrapperVariants = cva('w-full min-h-screen bg-inactive-very-light font-main md:min-h-auto')

export const headerImageWrapperVariants = cva('text-center py-6 w-[185px] mx-auto sm:py-12 hover:cursor-pointer')

export const headerImageWrapperFortumVariants = cva('text-center py-6 w-[380px] mx-auto sm:py-12 hover:cursor-pointer')

export const waveVariants = cva(
  "h-screen mb-[-24px] bg-[url('https://ik.imagekit.io/flyttsmart/Flyttsmart_gui/hero-wave_taAFQ_iNb.avif?ik-sdk-version=javascript-1.4.3&updatedAt=1671095634316')] bg-bottom bg-[length:100%_70%] bg-no-repeat",
)

export const fortumWaveVariants = cva(
  "h-screen w-screen mb-[-24px] bg-[url('https://ik.imagekit.io/flyttsmart/Flyttsmart_gui/wave_i0ZPRYkZd_nHXa6_v6v.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1674136786380')] bg-bottom bg-no-repeat",
)

export type LoginAndSignupBaseWrapperVariants = VariantProps<typeof loginAndSignupBaseWrapperVariants>
export type HeaderImageWrapperVariants = VariantProps<typeof headerImageWrapperVariants>
export type HeaderImageWrapperFortumVariants = VariantProps<typeof headerImageWrapperFortumVariants>
export type WaveVariants = VariantProps<typeof waveVariants>
export type FortumWaveVariants = VariantProps<typeof fortumWaveVariants>
