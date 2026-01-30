import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import BirdErrorSvg from '@/public/images/Bird-error.svg'

export const BirdError = () => {
  const { theme } = useThemeContext()
  return theme !== ThemeEnum.FASTIGHETSBYRAN ? <BirdErrorSvg /> : null
}
