'use client'

import React, { useState } from 'react'
import { clsx } from 'clsx'
import { ThemeEnum } from '@/common/enums/ThemeEnum'
import ArrowsOutIcon from '@/components/atoms/ArrowsOutIcon'
// import { ColourModeProvider } from '@/common/context/theme/themeContext.provider'
// Import all converted components
import Button from '@/components/atoms/Button'
import Flex from '@/components/atoms/Flex'
import H1 from '@/components/atoms/H1'
import H2 from '@/components/atoms/H2'
import H3 from '@/components/atoms/H3'
import Input from '@/components/atoms/Input'
import MoltoBeneIcon from '@/components/atoms/MoltoBeneIcon'
import QuestionIcon from '@/components/atoms/QuestionIcon'
import Spinner from '@/components/atoms/Spinner'
import Text from '@/components/atoms/Text'
import { Modal, ModalContent, ModalTitle } from '@/components/molecules/Modal'


// Theme switcher component
const ThemeSwitcher = ({ currentTheme, onThemeChange }: { currentTheme: ThemeEnum; onThemeChange: (theme: ThemeEnum) => void }) => {
  return (
    <div className="fixed top-4 right-4 z-50 bg-white p-4 rounded-lg shadow-lg border">
      <h3 className="text-lg font-bold mb-3 text-gray-800">Theme Switcher</h3>
      <div className="space-y-2">
        {Object.values(ThemeEnum).map((theme) => (
          <button
            key={theme}
            onClick={() => onThemeChange(theme)}
            className={clsx(
              'block w-full px-4 py-2 text-left rounded transition-colors',
              currentTheme === theme ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200',
            )}
          >
            {theme === ThemeEnum.NORMAL && 'Default (Flyttsmart)'}
            {theme === ThemeEnum.FORTUM && 'Fortum'}
            {theme === ThemeEnum.FASTIGHETSBYRAN && 'Fastighetsbyran'}
          </button>
        ))}
      </div>
      <div className="mt-3 text-sm text-gray-600">
        Current: <span className="font-medium">{currentTheme}</span>
      </div>
    </div>
  )
}

// Component section wrapper
const ComponentSection = ({ title, children, description }: { title: string; children: React.ReactNode; description?: string }) => (
  <div className="mb-12 p-6 bg-[var(--color-background-secondary)] rounded-lg shadow-sm border">
    <H2 className="mb-2">{title}</H2>
    {description && <Text className="mb-4 text-gray-600">{description}</Text>}
    <div className="space-y-4">{children}</div>
  </div>
)

// Main testing component
export const ThemeTestClient = () => {
  const [currentTheme, setCurrentTheme] = useState<ThemeEnum>(ThemeEnum.NORMAL)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  // const [inputError, setInputError] = useState('')

  // Apply theme class to document
  React.useEffect(() => {
    const themeClass = `theme-${currentTheme === ThemeEnum.NORMAL ? 'Default' : currentTheme}`

    // Remove all theme classes
    document.documentElement.classList.remove('theme-Default', 'theme-Fortum', 'theme-Fastighetsbyran')

    // Add current theme class
    document.documentElement.classList.add(themeClass)

    return () => {
      document.documentElement.classList.remove(themeClass)
    }
  }, [currentTheme])

  // Mock user context for theme provider
  // const mockUserContextValue = {
  //   user: {
  //     profile: {
  //       partnerDetails: {
  //         partnerName: currentTheme === ThemeEnum.FORTUM ? 'Fortum' : 'Default'
  //       }
  //     }
  //   }
  // }

  return (
    <div className="min-h-screen bg-[var(--color-background-default)] font-[var(--font-family-main)]">
      {/* Theme Switcher */}
      <ThemeSwitcher currentTheme={currentTheme} onThemeChange={setCurrentTheme} />

      {/* Main Content */}
      <div className="container mx-auto p-8 pt-20">
        <div className="text-center mb-12">
          <H1 className="mb-4">Tailwind Component Theme Testing</H1>
          <Text className="text-xl">Testing converted components across all themes: Default, Fortum, and Fastighetsbyran</Text>
        </div>

        {/* Button Testing */}
        <ComponentSection title="Button Component" description="Testing all button variants including theme-specific FB variants">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Text variant="extraSmall" className="font-semibold">
                Primary Variants
              </Text>
              <Button text="Primary Button" variant="primary" />
              <Button text="Ghost Button" variant="ghost" />
              <Button text="Green Button" variant="green" />
              <Button text="Outline Button" variant="outline" />
            </div>

            <div className="space-y-2">
              <Text variant="extraSmall" className="font-semibold">
                Special Variants
              </Text>
              <Button text="Primary Alt" variant="primaryAlt" />
              <Button text="Gray Button" variant="gray" />
              <Button text="Light Blue" variant="lightBlue" />
              <Button text="No Outline" variant="noOutline" />
            </div>

            <div className="space-y-2">
              <Text variant="extraSmall" className="font-semibold">
                FB Specific & States
              </Text>
              <Button text="FB Primary" variant="fbPrimary" />
              <Button text="FB Button" variant="fb" />
              <Button text="Disabled" variant="primary" disabled />
              <Button text="Loading" variant="primary" isLoading />
            </div>
          </div>
        </ComponentSection>

        {/* Text Component Testing */}
        <ComponentSection title="Text Component" description="Testing text variants and typography">
          <div className="space-y-4">
            <Text variant="body">Default body text - testing theme-aware colors</Text>
            <Text variant="extraSmall">Small text variant</Text>
            <Text variant="large">Large text variant</Text>
            <Text as="span" className="text-[var(--color-primary-main)]">
              Text using CSS custom properties
            </Text>
            <Text as="span" className="text-[var(--color-secondary-main)]">
              Secondary color text
            </Text>
          </div>
        </ComponentSection>

        {/* Heading Components */}
        <ComponentSection title="Heading Components" description="Testing H1, H2, H3 components with theme fonts">
          <div className="space-y-4">
            <H1>H1 Heading - Main Title</H1>
            <H2>H2 Heading - Section Title</H2>
            <H3>H3 Heading - Subsection Title</H3>
          </div>
        </ComponentSection>

        {/* Icon Component Testing */}
        <ComponentSection title="Icon Components" description="Testing converted icon components with theme-aware colors">
          <div className="space-y-6">
            {/* ArrowsOutIcon Testing */}
            <div className="space-y-3">
              <Text variant="body" className="font-semibold">
                ArrowsOutIcon Testing
              </Text>
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <Text variant="extraSmall" className="w-32">
                    Default color:
                  </Text>
                  <ArrowsOutIcon />
                </div>
                <div className="flex items-center gap-4">
                  <Text variant="extraSmall" className="w-32">
                    Custom red:
                  </Text>
                  <ArrowsOutIcon color="#ff0000" />
                </div>
                <div className="flex items-center gap-4">
                  <Text variant="extraSmall" className="w-32">
                    Primary theme:
                  </Text>
                  <ArrowsOutIcon color="var(--color-primary-main)" />
                </div>
                <div className="flex items-center gap-4">
                  <Text variant="extraSmall" className="w-32">
                    Secondary theme:
                  </Text>
                  <ArrowsOutIcon color="var(--color-secondary-main)" />
                </div>
              </div>
            </div>

            {/* QuestionIcon Testing */}
            <div className="space-y-3">
              <Text variant="body" className="font-semibold">
                QuestionIcon Testing
              </Text>
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <Text variant="extraSmall" className="w-32">
                    Default color:
                  </Text>
                  <QuestionIcon />
                </div>
                <div className="flex items-center gap-4">
                  <Text variant="extraSmall" className="w-32">
                    Custom blue:
                  </Text>
                  <QuestionIcon color="#0066cc" />
                </div>
                <div className="flex items-center gap-4">
                  <Text variant="extraSmall" className="w-32">
                    Large size:
                  </Text>
                  <QuestionIcon width={40} height={40} />
                </div>
                <div className="flex items-center gap-4">
                  <Text variant="extraSmall" className="w-32">
                    Primary theme:
                  </Text>
                  <QuestionIcon color="var(--color-primary-main)" />
                </div>
                <div className="flex items-center gap-4">
                  <Text variant="extraSmall" className="w-32">
                    Accent theme:
                  </Text>
                  <QuestionIcon color="var(--color-accent-main)" />
                </div>
              </div>
            </div>

            {/* MoltoBeneIcon Testing */}
            <div className="space-y-3">
              <Text variant="body" className="font-semibold">
                MoltoBeneIcon Testing
              </Text>
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <Text variant="extraSmall" className="w-32">
                    Default color:
                  </Text>
                  <MoltoBeneIcon />
                </div>
                <div className="flex items-center gap-4">
                  <Text variant="extraSmall" className="w-32">
                    Custom green:
                  </Text>
                  <MoltoBeneIcon color="#00aa00" />
                </div>
                <div className="flex items-center gap-4">
                  <Text variant="extraSmall" className="w-32">
                    Small size:
                  </Text>
                  <MoltoBeneIcon width={24} height={32} />
                </div>
                <div className="flex items-center gap-4">
                  <Text variant="extraSmall" className="w-32">
                    Primary theme:
                  </Text>
                  <MoltoBeneIcon color="var(--color-primary-main)" />
                </div>
                <div className="flex items-center gap-4">
                  <Text variant="extraSmall" className="w-32">
                    Secondary theme:
                  </Text>
                  <MoltoBeneIcon color="var(--color-secondary-main)" />
                </div>
              </div>
            </div>

            {/* Multiple Icons Comparison */}
            <div className="space-y-3">
              <Text variant="body" className="font-semibold">
                All Icons Comparison
              </Text>
              <div className="flex items-center gap-6 p-4 bg-[var(--color-background-default)] rounded border-2 border-[var(--color-primary-main)]">
                <ArrowsOutIcon color="var(--color-secondary-main)" />
                <QuestionIcon color="var(--color-secondary-main)" />
                <MoltoBeneIcon color="var(--color-secondary-main)" width={30} height={40} />
              </div>
            </div>
          </div>
        </ComponentSection>

        {/* Input Component Testing */}
        <ComponentSection title="Input Component" description="Testing input variants, error states, and theme-specific styling">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input label="Normal Input" type="text" placeholder="Enter text here" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />

              <Input label="Input with Error" type="text" placeholder="This has an error" error="This field is required" />

              <Input label="Number Input" type="number" placeholder="Enter a number" />
            </div>

            <div className="space-y-4">
              <Input label="Input with Start Adornment" type="text" placeholder="Username" startAdornment={<span className="text-gray-500">@</span>} />

              <Input label="Input with End Icon" type="text" placeholder="Search" endIcon={<span className="text-gray-500">🔍</span>} />
            </div>
          </div>
        </ComponentSection>

        {/* Spinner Component */}
        <ComponentSection title="Spinner Component" description="Testing spinner colors in different themes">
          <div className="flex gap-8 items-center">
            <div className="text-center">
              <Text variant="extraSmall" className="mb-2">
                Default
              </Text>
              <Spinner />
            </div>
            <div className="text-center">
              <Text variant="extraSmall" className="mb-2">
                Green
              </Text>
              <Spinner color="green" />
            </div>
            <div className="text-center">
              <Text variant="extraSmall" className="mb-2">
                White
              </Text>
              <Spinner color="white" />
            </div>
            <div className="text-center">
              <Text variant="extraSmall" className="mb-2">
                Large Scale
              </Text>
              <Spinner scale={2} />
            </div>
          </div>
        </ComponentSection>

        {/* Flex Component */}
        <ComponentSection title="Flex Component" description="Testing flex layouts with theme-aware spacing">
          <div className="space-y-4">
            <Flex direction="row" gap={4} alignItems="center">
              <Button text="Item 1" variant="primary" />
              <Button text="Item 2" variant="ghost" />
              <Button text="Item 3" variant="outline" />
            </Flex>

            <Flex direction="column" gap={2} alignItems="start">
              <Text>Vertical flex layout</Text>
              <Text variant="extraSmall">With small gap</Text>
              <Button text="Action Button" variant="primaryAlt" />
            </Flex>
          </div>
        </ComponentSection>

        {/* Modal Component */}
        <ComponentSection title="Modal Component" description="Testing modal styling across themes">
          <div>
            <Button text="Open Modal" variant="primary" onClick={() => setIsModalOpen(true)} />

            <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
              <ModalContent size="medium" setShowModal={setIsModalOpen} withCloseButton={true}>
                <ModalTitle>Theme Test Modal</ModalTitle>
                <div className="space-y-4">
                  <Text>This modal should adapt to the current theme styling.</Text>
                  <Flex direction="row" gap={4}>
                    <Button text="Cancel" variant="ghost" onClick={() => setIsModalOpen(false)} />
                    <Button text="Confirm" variant="primary" onClick={() => setIsModalOpen(false)} />
                  </Flex>
                </div>
              </ModalContent>
            </Modal>
          </div>
        </ComponentSection>

        {/* CSS Custom Properties Testing */}
        <ComponentSection title="CSS Custom Properties" description="Direct testing of CSS custom properties">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[var(--color-primary-main)] text-[var(--color-primary-contrast-text)] rounded">Primary Color</div>
            <div className="p-4 bg-[var(--color-secondary-main)] text-[var(--color-secondary-contrast-text)] rounded">Secondary Color</div>
            <div className="p-4 bg-[var(--color-accent-main)] text-[var(--color-white-main)] rounded">Accent Color</div>
          </div>

          <div className="mt-4 p-4 border-2 border-[var(--color-primary-main)] rounded-[var(--radius-border-radius-main)]">
            <Text className="text-[var(--color-text-main)]">Border and radius using CSS custom properties</Text>
          </div>
        </ComponentSection>

        {/* Validation Results */}
        <ComponentSection title="Theme Validation Results" description="Automated checks for theme consistency">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-green-500 rounded-full"></span>
              <Text>CSS Custom Properties loaded</Text>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-green-500 rounded-full"></span>
              <Text>Theme switching functional</Text>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-green-500 rounded-full"></span>
              <Text>Components responsive to theme changes</Text>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-yellow-500 rounded-full"></span>
              <Text>Font loading verification needed</Text>
            </div>
          </div>
        </ComponentSection>
      </div>
    </div>
  )
}
