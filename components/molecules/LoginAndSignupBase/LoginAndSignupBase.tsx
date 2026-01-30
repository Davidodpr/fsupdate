import React, { memo, ReactElement } from 'react'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { Themes } from '@/constants/themes'
import FlyttsmartLogo from '@/public/images/Logo2.svg'
import FortumLogo from '@/public/images/fortum_poweredby_flyttsmart.svg'
import Link from '../Link'
import { loginAndSignupBaseWrapperVariants, headerImageWrapperVariants, headerImageWrapperFortumVariants, waveVariants, fortumWaveVariants } from './LoginAndSignupBase.variants'

export interface LoginAndSignupBaseProps {
  children: ReactElement
}

const LoginAndSignupBase = ({ children }: LoginAndSignupBaseProps) => {
  const { theme } = useThemeContext()

  return (
    <div className={loginAndSignupBaseWrapperVariants()}>
      {theme === Themes.normal && (
        <div className={waveVariants()}>
          <div className={headerImageWrapperVariants()}>
            <Link noUnderline href="/">
              <FlyttsmartLogo />
            </Link>
          </div>
          {children}
        </div>
      )}
      {theme === Themes.fortum && (
        <div className={fortumWaveVariants()}>
          <div className={headerImageWrapperFortumVariants()}>
            <Link noUnderline href="/">
              <FortumLogo />
            </Link>
          </div>
          {children}
        </div>
      )}
    </div>
  )
}

export default memo(LoginAndSignupBase)
