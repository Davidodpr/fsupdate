import React from 'react'
import { clsx } from 'clsx'
import { boxVariants, type BoxVariants } from './Box.variants'

export type BoxProps = {
  className?: string
  children?: React.ReactNode
  textAlign?: BoxVariants['textAlign']
} & React.HTMLAttributes<HTMLDivElement>

const Box: React.FC<BoxProps> = ({ className, children, textAlign, ...props }) => {
  const boxClasses = boxVariants({
    textAlign,
  })

  return (
    <div className={clsx(boxClasses, className)} {...props}>
      {children}
    </div>
  )
}

export default Box
