/*
 * Stockholm has zip's ranging between 100xx-197xx and 760xx-764
 */
import { AreaSelectEnum } from '@/enums/BannerEnum'

export default (zip: string, area = AreaSelectEnum.stockholm) => {
  if (zip) {
    const zipShortened = Number(zip.slice(0, 3))

    const isBetween = (rangeStart: number, rangeEnd: number) => zipShortened >= rangeStart && zipShortened <= rangeEnd

    if ((isBetween(100, 197) || isBetween(760, 764)) && area === AreaSelectEnum.stockholm) {
      return true
    }
    if (isBetween(211, 299) && area === AreaSelectEnum.skane) {
      return true
    }
    if ((isBetween(411, 475) || isBetween(503, 565) || isBetween(662, 668)) && area === AreaSelectEnum.gotalands) {
      return true
    }
  }

  return false
}
