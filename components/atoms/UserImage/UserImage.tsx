import { type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'
import { userImageVariants } from './UserImage.variants'

type UserImageProps = {
  imageUrl: string
  size?: VariantProps<typeof userImageVariants>['size'] | number
  borderColor?: string
  className?: string
}

export const UserImage = ({ imageUrl, size = 'md', borderColor = 'transparent', className }: UserImageProps) => {
  // Handle custom numeric size
  const customStyle =
    typeof size === 'number'
      ? {
          width: size,
          height: size,
          borderColor,
          backgroundImage: `url(${imageUrl})`,
        }
      : {
          borderColor,
          backgroundImage: `url(${imageUrl})`,
        }

  const sizeVariant = typeof size === 'number' ? 'custom' : size

  return <div className={clsx(userImageVariants({ size: sizeVariant }), className)} style={customStyle} />
}
