export type HeroImageProps = {
  imageUrl: string
  children?: React.ReactNode
  width?: string
  height?: string
  borderRadius?: string
}

const HeroImage = ({ imageUrl, children, width, height, borderRadius }: HeroImageProps) => {
  return (
    <div
      className="relative flex flex-col justify-between items-start p-3 flex-none order-0 self-stretch bg-cover"
      style={{
        width: width || '100%',
        height: height || 'inherit',
        background: `linear-gradient(180deg, rgba(33, 71, 102, 0) 67.19%, var(--color-hero-fader) 100%), url(${imageUrl})`,
        backgroundSize: 'cover !important',
        borderRadius: borderRadius || '0px',
        backgroundPosition: '10% 65%',
      }}
    >
      {children}
    </div>
  )
}

export default HeroImage
