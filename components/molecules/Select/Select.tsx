import React from 'react'
import * as Select from '@radix-ui/react-select'
import { SelectProps } from '@radix-ui/react-select'
import { clsx } from 'clsx'
import { selectTriggerVariants, selectItemVariants, chevronVariants, type SelectTriggerVariants, type SelectItemVariants } from './Select.variants'

interface Item {
  value: string
  label: string
}

interface Props extends SelectTriggerVariants, SelectItemVariants {
  items: Item[]
  noBorder?: boolean
  onValueChange: (value: string) => void
  filter?: boolean
  icon?: React.ReactNode
  fbTheme?: boolean
  withBiggerFont?: boolean
}

const Chevron = ({ className }: { className?: string }) => <div className={clsx(chevronVariants(), className)} />

const MySelect = ({ value, items, onValueChange, disabled, noBorder, filter, icon, fbTheme, withBiggerFont }: SelectProps & Props) => {
  return (
    <Select.Root value={value || ''} onValueChange={onValueChange} disabled={disabled}>
      <Select.Trigger className={selectTriggerVariants({ noBorder, withBiggerFont, filter })}>
        <Select.Value />
        <Select.Icon className="text-[rgba(0,0,0,0.23)] mt-0.5">{icon ? icon : <Chevron className="data-[state=open]:rotate-180" />}</Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden bg-[var(--color-background-default)] rounded-[6px] shadow-[0px_10px_38px_-10px_rgba(22,23,24,0.35),0px_10px_20px_-15px_rgba(22,23,24,0.2)] z-[99]">
          <Select.Viewport className="py-2">
            {items?.map((item) => (
              <Select.Item key={item.value} value={item.value} className={selectItemVariants({ fbTheme })}>
                <Select.ItemText>{item.label}</Select.ItemText>
                <Select.ItemIndicator className="SelectItemIndicator" />
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

export default MySelect
