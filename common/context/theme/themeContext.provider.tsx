import React, { HTMLAttributes, useContext, useMemo } from 'react'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import { THEME_ASSETS } from '@/constants/themeAssets'
import { useUserContext } from '../user/UserProvider'

const { createContext, useState, useEffect } = React

/* eslint-disable @typescript-eslint/no-empty-function */
const defaultValue: ThemeContextType = {
  theme: ThemeEnum.NORMAL,
  setNewTheme: () => {},
  hasSetTheme: false,
  iconSet: THEME_ASSETS[ThemeEnum.NORMAL],
}

type ColourMode = ThemeEnum.NORMAL | ThemeEnum.FORTUM | ThemeEnum.FASTIGHETSBYRAN

type AvailableThemes = {
  [K in ColourMode]: string
}

/*
  Theme class names for Tailwind CSS custom properties
  These correspond to the CSS custom property sets defined in globals.css
*/
const availableThemes: AvailableThemes = {
  normal: 'theme-Default',
  fortum: 'theme-Fortum',
  fb: 'theme-Fastighetsbyran',
}

export type ThemeContextType = {
  theme: ColourMode | undefined
  setNewTheme: (arg0: ColourMode) => void
  hasSetTheme: boolean
  iconSet: (typeof THEME_ASSETS)[ColourMode]
}

export type ThemeProviderProps = {
  context: React.Context<ThemeContextType>
} & HTMLAttributes<HTMLDivElement>

export const ColourModeContext = createContext(defaultValue)

export const ColourModeProvider = ({ children }: ThemeProviderProps) => {
  const { user } = useUserContext()
  const [theme, setTheme] = useState<ColourMode>()
  const [hasSetTheme, setHasSetTheme] = useState(false)
  const html = typeof document !== 'undefined' && document.documentElement
  const savedColorMode = user.profile?.partnerDetails?.partnerName.toLowerCase() === ThemeEnum.FORTUM ? ThemeEnum.FORTUM : ThemeEnum.NORMAL
  const iconSet = useMemo(() => THEME_ASSETS[theme ?? ThemeEnum.NORMAL], [theme])

  if (typeof document !== 'undefined' && html) {
    // Add the Tailwind theme class for CSS custom properties
    html.classList.add(availableThemes[savedColorMode as keyof AvailableThemes])
  }

  // Set initial state
  useEffect(() => {
    setTheme(savedColorMode)
    setHasSetTheme(true)
  }, [savedColorMode])

  const setNewTheme = (newTheme: ColourMode) => {
    setTheme(newTheme)
    if (typeof document !== 'undefined' && html) {
      // Remove existing theme classes
      Object.values(availableThemes).forEach((themeClass) => {
        html.classList.remove(themeClass)
      })

      // Add new theme class
      html.classList.add(availableThemes[newTheme])
    }
  }

  const contextValue: ThemeContextType = {
    theme: theme,
    setNewTheme: setNewTheme,
    hasSetTheme,
    iconSet,
  }

  return <ColourModeContext.Provider value={contextValue}>{children}</ColourModeContext.Provider>
}

export const CreateThemeContext = () => {
  return createContext<ThemeContextType>(defaultValue)
}

export const useThemeContext = () => {
  const context = useContext(ColourModeContext)
  if (!context) {
    throw new Error('useThemeContext must be used within ColourModeProvider')
  }
  return context
}
