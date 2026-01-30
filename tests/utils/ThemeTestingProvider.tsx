/**
 * Theme Testing Provider
 *
 * Utility component for testing theme switching functionality.
 * This provider allows easy switching between themes in tests and development.
 */
import React, { useState, ReactNode } from 'react'
import { ColourModeProvider, ColourModeContext } from '@/common/context/theme/themeContext.provider'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import { THEME_ASSETS } from '@/constants/themeAssets'

interface ThemeTestingProviderProps {
  children: ReactNode
  initialTheme?: ThemeEnum
  enableThemeSwitch?: boolean
}

const ThemeTestingProvider: React.FC<ThemeTestingProviderProps> = ({ children, initialTheme = ThemeEnum.NORMAL, enableThemeSwitch = false }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeEnum>(initialTheme)

  // Apply theme classes to document element
  React.useEffect(() => {
    const html = document.documentElement

    // Remove all existing theme classes
    html.classList.remove('theme-Default', 'theme-Fortum', 'theme-Fastighetsbyran')

    // Add current theme class
    const themeClass = `theme-${currentTheme === ThemeEnum.NORMAL ? 'Default' : currentTheme === ThemeEnum.FORTUM ? 'Fortum' : 'Fastighetsbyran'}`
    html.classList.add(themeClass)

    return () => {
      // Cleanup on unmount
      html.classList.remove('theme-Default', 'theme-Fortum', 'theme-Fastighetsbyran')
    }
  }, [currentTheme])

  const contextValue = {
    theme: currentTheme,
    setNewTheme: setCurrentTheme,
    hasSetTheme: true,
    iconSet: THEME_ASSETS[currentTheme],
  }

  return (
    <ColourModeContext.Provider value={contextValue}>
      {enableThemeSwitch && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            zIndex: 9999,
            background: 'white',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            margin: '10px',
          }}
        >
          <h4 style={{ margin: '0 0 8px 0', fontSize: '12px' }}>Theme Switcher</h4>
          <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
            <button
              onClick={() => setCurrentTheme(ThemeEnum.NORMAL)}
              style={{
                padding: '4px 8px',
                border: '1px solid #ccc',
                borderRadius: '2px',
                fontSize: '10px',
                cursor: 'pointer',
                backgroundColor: currentTheme === ThemeEnum.NORMAL ? '#007bff' : 'white',
                color: currentTheme === ThemeEnum.NORMAL ? 'white' : 'black',
              }}
            >
              Default
            </button>
            <button
              onClick={() => setCurrentTheme(ThemeEnum.FORTUM)}
              style={{
                padding: '4px 8px',
                border: '1px solid #ccc',
                borderRadius: '2px',
                fontSize: '10px',
                cursor: 'pointer',
                backgroundColor: currentTheme === ThemeEnum.FORTUM ? '#007bff' : 'white',
                color: currentTheme === ThemeEnum.FORTUM ? 'white' : 'black',
              }}
            >
              Fortum
            </button>
            <button
              onClick={() => setCurrentTheme(ThemeEnum.FASTIGHETSBYRAN)}
              style={{
                padding: '4px 8px',
                border: '1px solid #ccc',
                borderRadius: '2px',
                fontSize: '10px',
                cursor: 'pointer',
                backgroundColor: currentTheme === ThemeEnum.FASTIGHETSBYRAN ? '#007bff' : 'white',
                color: currentTheme === ThemeEnum.FASTIGHETSBYRAN ? 'white' : 'black',
              }}
            >
              Fastighetsbyran
            </button>
          </div>
          <div style={{ marginTop: '8px', fontSize: '10px' }}>
            Current: <strong>{currentTheme}</strong>
          </div>
        </div>
      )}
      {children}
    </ColourModeContext.Provider>
  )
}

export default ThemeTestingProvider

/**
 * Helper hook for theme testing
 */
export const useThemeTestingControls = () => {
  const [theme, setTheme] = useState<ThemeEnum>(ThemeEnum.NORMAL)

  const switchToDefault = () => setTheme(ThemeEnum.NORMAL)
  const switchToFortum = () => setTheme(ThemeEnum.FORTUM)
  const switchToFastighetsbyran = () => setTheme(ThemeEnum.FASTIGHETSBYRAN)

  return {
    theme,
    setTheme,
    switchToDefault,
    switchToFortum,
    switchToFastighetsbyran,
  }
}

/**
 * CSS Custom Properties Tester
 * Component that displays current CSS custom property values for debugging
 */
export const CSSPropertiesDebugger: React.FC = () => {
  const [values, setValues] = React.useState<Record<string, string>>({})

  React.useEffect(() => {
    const properties = [
      '--color-primary-main',
      '--color-secondary-main',
      '--color-text-main',
      '--color-background-default',
      '--font-family-main',
      '--radius-button',
      '--radius-border-radius-main',
      '--color-error-red',
      '--color-disabled-button-bg',
      '--color-disabled-button-color',
      '--color-radio-border',
      '--color-standard-move-section-background',
    ]

    const computedValues: Record<string, string> = {}
    const testElement = document.createElement('div')
    document.body.appendChild(testElement)

    const computedStyle = getComputedStyle(testElement)

    properties.forEach((property) => {
      computedValues[property] = computedStyle.getPropertyValue(property) || 'not set'
    })

    document.body.removeChild(testElement)
    setValues(computedValues)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        maxWidth: '300px',
        maxHeight: '300px',
        overflow: 'auto',
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '10px',
        fontSize: '10px',
        zIndex: 9998,
      }}
    >
      <h4 style={{ margin: '0 0 8px 0' }}>CSS Custom Properties</h4>
      {Object.entries(values).map(([property, value]) => (
        <div key={property} style={{ marginBottom: '4px' }}>
          <strong>{property}:</strong> <span style={{ color: '#88ff88' }}>{value}</span>
        </div>
      ))}
    </div>
  )
}
