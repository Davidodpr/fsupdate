import { TFunction } from 'i18next'
import { LabelItemType } from '@/types/commonTypes'

export enum SortDirectionEnum {
  HIGHEST_RATING = 'SortCustomerRating',
  LOWEST_PRICE = 'SortLowestPrice',
  HIGHEST_PRICE = 'SortHighestPrice',
}

export const SORT_DIRECTIONS = [SortDirectionEnum.HIGHEST_RATING, SortDirectionEnum.LOWEST_PRICE, SortDirectionEnum.HIGHEST_PRICE]

export type SortDirectionType = (typeof SORT_DIRECTIONS)[number]

export const getSortDirections = (t: TFunction) => {
  return [
    { key: SortDirectionEnum.HIGHEST_RATING, label: t(`common:${SortDirectionEnum.HIGHEST_RATING}`) },
    { key: SortDirectionEnum.LOWEST_PRICE, label: t(`common:${SortDirectionEnum.LOWEST_PRICE}`) },
    { key: SortDirectionEnum.HIGHEST_PRICE, label: t(`common:${SortDirectionEnum.HIGHEST_PRICE}`) },
  ] as LabelItemType[]
}
