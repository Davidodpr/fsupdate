import { TFunction } from 'i18next'
import { LabelItemType } from '@/types/commonTypes'

export enum ContactMeDropDownItemEnum {
  ITEM_ONE = 'ContactMeDropDownItem_1',
  ITEM_TWO = 'ContactMeDropDownItem_2',
  ITEM_THREE = 'ContactMeDropDownItem_3',
  ITEM_FOUR = 'ContactMeDropDownItem_4',
}

export const CONTACT_ME_DROPDOWN_ITEMS = [
  ContactMeDropDownItemEnum.ITEM_ONE,
  ContactMeDropDownItemEnum.ITEM_TWO,
  ContactMeDropDownItemEnum.ITEM_THREE,
  ContactMeDropDownItemEnum.ITEM_FOUR,
]

export type ContactMeDropDownItemType = (typeof CONTACT_ME_DROPDOWN_ITEMS)[number]

export const getContactMeDropDownItems = (t: TFunction) => {
  return [
    { key: ContactMeDropDownItemEnum.ITEM_ONE, label: t(ContactMeDropDownItemEnum.ITEM_ONE) },
    { key: ContactMeDropDownItemEnum.ITEM_TWO, label: t(ContactMeDropDownItemEnum.ITEM_TWO) },
    { key: ContactMeDropDownItemEnum.ITEM_THREE, label: t(ContactMeDropDownItemEnum.ITEM_THREE) },
    { key: ContactMeDropDownItemEnum.ITEM_FOUR, label: t(ContactMeDropDownItemEnum.ITEM_FOUR) },
  ] as LabelItemType[]
}
