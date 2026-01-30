'use client'

import React from 'react'
import Chevron from '@/public/images/Chevron.svg'
import * as Select from '@radix-ui/react-select'
import { SelectProps } from '@radix-ui/react-select'
import { selectCustomVariants } from './SelectCustom.variants'

interface Item {
  value: string
  label: string
}

interface Props {
  items: Item[]
  label?: React.ReactNode
  placeholder?: string
  labelExtraElement?: React.ReactNode
  onValueChange: (value: string) => void
  isFb?: boolean
}

const SelectCustom = ({ value, items, onValueChange, disabled, label, placeholder, labelExtraElement, isFb }: SelectProps & Props) => {
  const variants = selectCustomVariants()

  return (
    <div className={variants.inputWrapper()}>
      <label className={variants.label()}>{label}</label>
      <div className={variants.labelWrapper()}>{labelExtraElement}</div>
      <Select.Root value={value} onValueChange={onValueChange} disabled={disabled}>
        <Select.Trigger className={variants.selectTrigger({ isFb })}>
          <Select.Value placeholder={placeholder || ''} />
          <Select.Icon className={variants.selectIcon()}>
            <Chevron className={variants.chevronIcon()} width={25} height={25} />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className={variants.selectContent()}>
            <Select.Viewport className={variants.selectViewport()}>
              {items?.map((item) => (
                <Select.Item key={item.value} value={item.value} className={variants.item()}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator className="SelectItemIndicator" />
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}

export default SelectCustom
