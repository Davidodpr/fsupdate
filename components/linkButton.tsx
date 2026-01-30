import React, { ReactNode } from 'react'
import { clsx } from 'clsx'
import { linkButtonVariants, type LinkButtonVariants } from './linkButton.variants'

interface Props extends LinkButtonVariants {
  onClick: React.MouseEventHandler
  sx?: React.CSSProperties
  children?: ReactNode
  className?: string
}

const LinkButton = ({ noUnderline, children, onClick, sx, className }: Props) => {
  const linkClasses = linkButtonVariants({ noUnderline })

  return (
    <span className={clsx(linkClasses, className)} onClick={onClick} style={{ ...sx }}>
      {children}
    </span>
  )
}

export default LinkButton
