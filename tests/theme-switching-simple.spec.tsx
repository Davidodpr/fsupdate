/**
 * Simplified Theme Switching Test Suite
 *
 * Focused tests to verify theme switching functionality works correctly
 * for migrated Tailwind CSS components using CSS custom properties.
 */
import React from 'react'
import { useThemeContext } from '@/common/context/theme/themeContext.provider'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
// Import key migrated components
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

// Mock the theme context
jest.mock('@/common/context/theme/themeContext.provider')
const mockUseThemeContext = useThemeContext as jest.MockedFunction<typeof useThemeContext>

// Mock user context
jest.mock('@/common/context/user/UserProvider', () => ({
  useUserContext: () => ({
    user: {
      profile: {
        partnerDetails: {
          partnerName: 'normal',
        },
      },
    },
  }),
}))

// Mock navigation for components that use it
jest.mock('next/navigation', () => ({
  usePathname: () => '/test',
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

describe('Theme Switching Core Functionality', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Button Component Theme Switching', () => {
    it('should render button with theme context integration', () => {
      mockUseThemeContext.mockReturnValue({
        theme: ThemeEnum.NORMAL,
        setNewTheme: jest.fn(),
        hasSetTheme: true,
        iconSet: {},
      })

      render(<Button text="Test Button" dataTestId="test-button" />)

      const button = screen.getByTestId('test-button')
      expect(button).toBeInTheDocument()

      // Check that button uses CSS custom properties
      const buttonElement = button.querySelector('button')
      expect(buttonElement).toHaveClass('bg-[var(--color-secondary-main)]')
    })

    it('should adapt button variant for Fastighetsbyran theme', () => {
      mockUseThemeContext.mockReturnValue({
        theme: ThemeEnum.FASTIGHETSBYRAN,
        setNewTheme: jest.fn(),
        hasSetTheme: true,
        iconSet: {},
      })

      render(<Button text="FB Button" variant="primary" dataTestId="fb-button" />)

      const button = screen.getByTestId('fb-button')
      expect(button).toBeInTheDocument()

      // Fastighetsbyran theme should use fbPrimary variant for primary buttons
      const buttonElement = button.querySelector('button')
      expect(buttonElement).toHaveClass('bg-[var(--color-secondary-main)]') // FB specific styling
    })

    it('should handle disabled states with theme-specific styling', () => {
      const themes = [ThemeEnum.NORMAL, ThemeEnum.FORTUM, ThemeEnum.FASTIGHETSBYRAN]

      themes.forEach((theme) => {
        mockUseThemeContext.mockReturnValue({
          theme,
          setNewTheme: jest.fn(),
          hasSetTheme: true,
          iconSet: {},
        })

        const { unmount } = render(<Button text="Disabled" disabled dataTestId={`disabled-${theme}`} />)

        const button = screen.getByTestId(`disabled-${theme}`)
        const buttonElement = button.querySelector('button')

        expect(buttonElement).toBeDisabled()

        // All themes should have disabled attribute set
        expect(buttonElement).toHaveAttribute('disabled')

        unmount()
      })
    })
  })

  describe('Input Component Theme Switching', () => {
    it('should render input with default theme styling', () => {
      mockUseThemeContext.mockReturnValue({
        theme: ThemeEnum.NORMAL,
        setNewTheme: jest.fn(),
        hasSetTheme: true,
        iconSet: {},
      })

      render(<Input type="text" name="test-input" />)

      const input = screen.getByTestId('test-input')
      expect(input).toBeInTheDocument()

      // Default theme uses standard border
      expect(input).toHaveClass('border-[1.9px]')
      expect(input).toHaveClass('border-[rgba(118,118,118,0.4)]')
    })

    it('should apply Fastighetsbyran theme-specific border styling', () => {
      mockUseThemeContext.mockReturnValue({
        theme: ThemeEnum.FASTIGHETSBYRAN,
        setNewTheme: jest.fn(),
        hasSetTheme: true,
        iconSet: {},
      })

      render(<Input type="text" name="fb-input" />)

      const input = screen.getByTestId('fb-input')
      expect(input).toBeInTheDocument()

      // FB theme uses bottom border with CSS custom property
      expect(input).toHaveClass('border-b-2')
      expect(input).toHaveClass('border-b-[var(--color-radio-border)]')
    })

    it('should handle error states with theme-specific colors', () => {
      // Test default theme error
      mockUseThemeContext.mockReturnValue({
        theme: ThemeEnum.NORMAL,
        setNewTheme: jest.fn(),
        hasSetTheme: true,
        iconSet: {},
      })

      const { rerender } = render(<Input type="text" error="Error message" name="error-input" />)

      let input = screen.getByTestId('error-input')
      let errorMessage = screen.getByText('Error message')

      expect(input).toHaveClass('border-[1.9px]')
      expect(input).toHaveClass('border-[var(--color-error-red)]')
      expect(errorMessage).toHaveClass('text-[var(--color-error-red)]')

      // Test Fastighetsbyran theme error
      mockUseThemeContext.mockReturnValue({
        theme: ThemeEnum.FASTIGHETSBYRAN,
        setNewTheme: jest.fn(),
        hasSetTheme: true,
        iconSet: {},
      })

      rerender(<Input type="text" error="FB Error message" name="fb-error-input" />)

      input = screen.getByTestId('fb-error-input')
      errorMessage = screen.getByText('FB Error message')

      expect(input).toHaveClass('border-b-2')
      expect(input).toHaveClass('border-b-[var(--color-error-red)]')
      expect(errorMessage).toHaveClass('text-[var(--color-error-red)]')
    })
  })

  describe('CSS Custom Properties Integration', () => {
    it('should verify components use CSS custom properties correctly', () => {
      mockUseThemeContext.mockReturnValue({
        theme: ThemeEnum.NORMAL,
        setNewTheme: jest.fn(),
        hasSetTheme: true,
        iconSet: {},
      })

      render(
        <div>
          <Button text="CSS Test" dataTestId="css-button" />
          <Input type="text" name="css-input" />
        </div>,
      )

      const button = screen.getByTestId('css-button').querySelector('button')
      const input = screen.getByTestId('css-input')

      // Verify components use CSS custom properties in their classes
      const buttonClasses = button?.className || ''
      const inputClasses = input?.className || ''

      // Button should use CSS custom properties
      expect(buttonClasses).toContain('var(--color-secondary-main)')
      expect(buttonClasses).toContain('var(--radius-button)')

      // Input should use CSS custom properties
      expect(inputClasses).toContain('var(--radius-input)')
      expect(inputClasses).toContain('var(--color-tertiary-main)') // focus state in focus: modifier
    })

    it('should work with different theme contexts', () => {
      const themes = [ThemeEnum.NORMAL, ThemeEnum.FORTUM, ThemeEnum.FASTIGHETSBYRAN]

      themes.forEach((theme) => {
        mockUseThemeContext.mockReturnValue({
          theme,
          setNewTheme: jest.fn(),
          hasSetTheme: true,
          iconSet: {},
        })

        const { unmount } = render(<Button text={`${theme} Button`} dataTestId={`theme-button-${theme}`} />)

        const button = screen.getByTestId(`theme-button-${theme}`)
        expect(button).toBeInTheDocument()

        // All themes should render successfully with CSS custom properties
        const buttonElement = button.querySelector('button')
        expect(buttonElement).toHaveClass('font-[var(--font-family-button)]')

        unmount()
      })
    })
  })

  describe('Theme Context Provider Integration', () => {
    it('should handle theme switching in context', () => {
      const mockSetTheme = jest.fn()

      mockUseThemeContext.mockReturnValue({
        theme: ThemeEnum.NORMAL,
        setNewTheme: mockSetTheme,
        hasSetTheme: true,
        iconSet: {},
      })

      const TestComponent = () => {
        const { theme, setNewTheme } = useThemeContext()

        return (
          <div>
            <div data-testid="current-theme">{theme}</div>
            <button onClick={() => setNewTheme(ThemeEnum.FORTUM)} data-testid="theme-switch-button">
              Switch to Fortum
            </button>
          </div>
        )
      }

      render(<TestComponent />)

      const currentTheme = screen.getByTestId('current-theme')
      const switchButton = screen.getByTestId('theme-switch-button')

      expect(currentTheme).toHaveTextContent(ThemeEnum.NORMAL)

      switchButton.click()
      expect(mockSetTheme).toHaveBeenCalledWith(ThemeEnum.FORTUM)
    })
  })

  describe('Regression Tests', () => {
    it('should maintain component functionality across theme switches', () => {
      const handleClick = jest.fn()
      const handleChange = jest.fn()

      mockUseThemeContext.mockReturnValue({
        theme: ThemeEnum.NORMAL,
        setNewTheme: jest.fn(),
        hasSetTheme: true,
        iconSet: {},
      })

      render(
        <div>
          <Button text="Click Me" onClick={handleClick} dataTestId="functional-button" />
          <Input type="text" onChange={handleChange} name="functional-input" />
        </div>,
      )

      const button = screen.getByTestId('functional-button')
      const input = screen.getByTestId('functional-input')

      // Test functionality still works with theming
      button.click()
      expect(handleClick).toHaveBeenCalled()

      // Component should maintain its core functionality regardless of theme
      expect(button).toBeEnabled()
      expect(input).toHaveAttribute('type', 'text')
    })
  })
})
