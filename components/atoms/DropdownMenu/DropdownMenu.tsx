import React, { ReactNode } from 'react'
import Image from 'next/image'
import * as DropMenu from '@radix-ui/react-dropdown-menu'
import { dropdownTriggerVariants, dropdownContentVariants, dropdownItemVariants } from './DropdownMenu.variants'

interface Items {
  label: string | ReactNode
  icon?: string
  onClick?: () => void
}

export interface Props {
  children: ReactNode
  items: Items[]
}

const ITEM_LANGUAGE_SELECTOR_INDEX = 2

const DropdownMenu = ({ children, items }: Props) => {
  const triggerClasses = dropdownTriggerVariants()
  const contentClasses = dropdownContentVariants()

  return (
    <DropMenu.Root>
      <DropMenu.Trigger asChild>
        <button className={triggerClasses} data-testid="menu-trigger">
          {children}
        </button>
      </DropMenu.Trigger>
      <DropMenu.Content className={contentClasses} data-testid="menu" align="start" alignOffset={-50}>
        {items.map((item, key) => {
          const itemClasses = dropdownItemVariants({
            noHoverEffect: key === ITEM_LANGUAGE_SELECTOR_INDEX,
          })

          return (
            <DropMenu.Item key={key} className={itemClasses} onClick={item.onClick}>
              {item.icon && <Image style={{ marginRight: 8 }} src={item.icon} alt="menu item" width={24} height={24} />}
              {item.label}
            </DropMenu.Item>
          )
        })}
      </DropMenu.Content>
    </DropMenu.Root>
  )
}

export default DropdownMenu
