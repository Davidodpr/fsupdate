import Image from 'next/image'

export type ImageKitProps = {
  src: string
  width?: string | number
  quality?: string // ImageKit quality parameter (different from Next.js Image quality)
  height?: string | number
  alt?: string
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  objectPosition?: string
  priority?: boolean
  className?: string
  fill?: boolean
}

const imageKitLoader = ({ src, width = '100%', quality = '100%' }: ImageKitProps) => {
  if (src[0] === '/') src = src.slice(1)
  const params = [`w-${width}`]
  if (quality) {
    params.push(`q-${quality}`)
  }
  const paramsString = params.join(',')
  let urlEndpoint = 'https://ik.imagekit.io/flyttsmart'
  if (urlEndpoint[urlEndpoint.length - 1] === '/') urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1)
  return `${urlEndpoint}/${src}?tr=${paramsString}`
}

const ImageKit = (props: ImageKitProps) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    src,
    width,
    height,
    alt = '',
    objectFit,
    objectPosition,
    priority = false,
    className = '',
    fill,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    quality, // Extract this to avoid passing it to Next.js Image
    ...otherProps
  } = props

  // Determine if we should use fill mode
  const shouldUseFill = fill || !width || !height

  // For fill mode, we don't pass width/height to the Image component
  const imageProps = shouldUseFill
    ? {
        fill: true,
        style: {
          objectFit,
          objectPosition,
        },
      }
    : {
        width: Number(width),
        height: Number(height),
        style: {
          width: `${width}${typeof width === 'number' ? 'px' : ''}`,
          height: `${height}${typeof height === 'number' ? 'px' : ''}`,
          objectFit,
          objectPosition,
        },
      }

  return (
    <Image
      loader={() => imageKitLoader(props)}
      src="default-image.jpg" // This gets replaced by the loader
      alt={alt}
      priority={priority}
      className={className}
      {...imageProps}
      {...otherProps}
    />
  )
}

export default ImageKit
