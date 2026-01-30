'use client'

import React, { ReactNode } from 'react'
import { clsx } from 'clsx'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { linkContentVariants } from './Link.variants'


interface Props {
  noUnderline?: boolean
  underline?: boolean
  sx?: React.CSSProperties
  fontSize?: number
  children?: ReactNode
  className?: string
  'data-testid'?: string
}

const MyLink = ({ fontSize, href, noUnderline = false, underline = false, sx, children, className, 'data-testid': dataTestId, ...linkProps }: Props & LinkProps) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href} {...linkProps}>
      <span
        className={clsx(
          linkContentVariants({
            noUnderline,
            isActive,
            underline,
          }),
          className,
        )}
        style={{
          ...(fontSize && { fontSize: `${fontSize}px` }),
          ...sx,
        }}
        data-testid={dataTestId}
      >
        {children}
      </span>
    </Link>
  )
}

export default MyLink
