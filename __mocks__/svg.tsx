import { FC, ImgHTMLAttributes } from 'react'
import Image from 'next/image'

const SvgrMock: FC<ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  const { width, height, ...rest } = props
  return (
    <Image alt="" src="/mocked-image.png" width={typeof width === 'string' ? parseInt(width) : width} height={typeof height === 'string' ? parseInt(height) : height} {...rest} />
  )
}

SvgrMock.displayName = 'SvgrMock'

export const ReactComponent = SvgrMock
export default SvgrMock
