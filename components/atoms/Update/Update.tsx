import React from 'react'
import { clsx } from 'clsx'
import Pencil from '@/public/images/pencil.svg'
import Text from '../Text'

type UpdateProps = {
  text: string
  className?: string
}

const Update = ({ text, className }: UpdateProps) => {
  return (
    <div
      className={clsx(
        'font-normal',
        'text-[var(--color-accent-main)]',
        'flex',
        'justify-center',
        'items-center',
        'ml-auto',
        'mr-2.5',
        '[&>svg>*]:fill-[var(--color-accent-icon)]',
        '[&>p]:ml-2.5',
        className,
      )}
    >
      <Pencil />
      <Text variant="large">{text}</Text>
    </div>
  )
}

export default Update
