import FlyttsmartMovehelpDesktop from '@/public/images/FlyttsmartMovehelpDesktop.png'
import FlyttsmartMovehelpMobile from '@/public/images/FlyttsmartMovehelpMobile.png'
import MovehelpDesktop from '@/public/images/MovehelpDesktop.png'
import MovehelpMobile from '@/public/images/MovehelpMobile.png'
import { ThemeEnum } from '../enums/ThemeEnum'

export const getInfoMissingImage = (theme: string | undefined, isTabletPortraitOrGreater: boolean) => {
  if (theme === ThemeEnum.FASTIGHETSBYRAN) {
    if (isTabletPortraitOrGreater) {
      return MovehelpDesktop
    } else {
      return MovehelpMobile
    }
  } else {
    if (isTabletPortraitOrGreater) {
      return FlyttsmartMovehelpDesktop
    } else {
      return FlyttsmartMovehelpMobile
    }
  }
}
