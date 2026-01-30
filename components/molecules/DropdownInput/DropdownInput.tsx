import React, { useEffect } from 'react'
import { SortDirectionType } from '@/constants/sortDirections'
import { LabelItemType } from '@/types/commonTypes'
import {
  dropdownWrapperVariants,
  triggerVariants,
  itemVariants,
  contentVariants,
  labelVariants,
  selectedItemLabelVariants,
  type TriggerVariants,
  type ItemVariants,
  type ContentVariants,
} from './DropdownInput.variants'

export interface Props extends TriggerVariants, ItemVariants, ContentVariants {
  items: LabelItemType[]
  seletedItem: string
  label: string
  noOutline?: boolean
  fullWidth?: boolean
  children?: React.ReactNode
  dropDownRef: React.RefObject<HTMLDivElement | null>
  openDropDown: boolean
  setOpenDropDown: (i: boolean) => void
  setSelectedItem: (i: SortDirectionType) => void
}

const DropdownInput = ({ items, seletedItem, label, noOutline, fullWidth, children, openDropDown, dropDownRef, setOpenDropDown, setSelectedItem }: Props) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropDownRef.current !== event.target) {
        setOpenDropDown(false)
      }
    }
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [dropDownRef, openDropDown, setOpenDropDown])

  return (
    <div ref={dropDownRef} className={dropdownWrapperVariants()}>
      <label data-testid="mene-label" className={labelVariants()}>
        {label}
      </label>
      <div
        data-testid="menu-trigger"
        className={triggerVariants({
          fullWidth,
          isOpen: openDropDown,
          noOutline,
        })}
        onClick={(e) => {
          setOpenDropDown(!openDropDown)
          e.stopPropagation()
        }}
      >
        <label className={selectedItemLabelVariants()}>{children}</label>
      </div>
      {openDropDown && (
        <div data-testid="menu" className={contentVariants({ fullWidth })}>
          {items.map((item) => (
            <div
              key={item.key}
              className={itemVariants({ selected: item.key === seletedItem })}
              onClick={(e) => {
                setSelectedItem(item.key as SortDirectionType)
                e.stopPropagation()
                setOpenDropDown(false)
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DropdownInput
