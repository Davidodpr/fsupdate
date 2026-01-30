import React from 'react'
import { clsx } from 'clsx'
import ThmbsUp from '@/public/images/ThumbsUp-Green.svg'

export type CampaignLabelProps = {
  children: string | React.ReactNode
  className?: string
}

export const CampaignLabel = ({ children, className }: CampaignLabelProps) => {
  return (
    <div
      className={clsx(
        // Container styles
        'flex flex-row items-center px-2 py-1 gap-1 h-[26px]',
        'bg-[var(--color-tertiary-very-light)] shadow-[0px_0px_4px_rgba(0,0,0,0.5)]',
        'rounded-[6px] flex-none order-0 flex-grow-0',
        className,
      )}
    >
      <ThmbsUp />
      <div
        className={clsx(
          // Text styles
          'h-[18px] font-[var(--font-weight-semibold)] text-[length:var(--font-size-1)]',
          'leading-[18px] flex items-center text-center',
          'text-[var(--color-primary-dark)] flex-none order-1 flex-grow-0',
        )}
      >
        {children}
      </div>
    </div>
  )
}
