import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import BirdMessageSvg from '@/public/images/Birds_Message.svg'

export const BirdMessage = () => {
  const { theme } = useThemeContext()
  return theme !== ThemeEnum.FASTIGHETSBYRAN ? <BirdMessageSvg /> : null
}
