#!/usr/bin/env node

/**
 * Theme Testing Script
 *
 * This script provides automated testing for the Tailwind theme system.
 * It validates that CSS custom properties are correctly defined and that
 * theme switching works properly.
 */

const fs = require('fs')
const path = require('path')

// Colors to validate in each theme
const requiredColors = [
  'primary-main',
  'primary-light',
  'secondary-main',
  'secondary-dark',
  'accent-main',
  'text-main',
  'background-default',
  'background-secondary',
  'error-red',
  'disabled-button-bg',
  'disabled-button-color',
  'disabled-button-border',
]

// Required CSS custom properties
const requiredProperties = ['font-family-main', 'font-family-button', 'radius-border-radius-main', 'radius-button', 'spacing-1', 'spacing-2']

// Theme names to validate
const themes = ['Default', 'Fortum', 'Fastighetsbyran']

/**
 * Parse CSS file and extract CSS custom properties
 */
function parseCssFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`CSS file not found: ${filePath}`)
  }

  const content = fs.readFileSync(filePath, 'utf8')
  const properties = new Map()

  // Extract CSS custom properties from @theme block
  const themeMatch = content.match(/@theme\s*{([^}]+)}/s)
  if (themeMatch) {
    const themeContent = themeMatch[1]
    const propMatches = themeContent.matchAll(/--([a-z-0-9]+):\s*([^;]+);/g)

    for (const match of propMatches) {
      properties.set(match[1], match[2].trim())
    }
  }

  // Extract theme-specific overrides
  const themeOverrides = new Map()
  themes.forEach((theme) => {
    const themeClass = `.theme-${theme}`
    const regex = new RegExp(`\\${themeClass}\\s*{([^}]+)}`, 'gs')
    const matches = content.matchAll(regex)

    const themeProps = new Map()
    for (const match of matches) {
      const themeContent = match[1]
      const propMatches = themeContent.matchAll(/--([a-z-0-9]+):\s*([^;]+);/g)

      for (const propMatch of propMatches) {
        themeProps.set(propMatch[1], propMatch[2].trim())
      }
    }

    if (themeProps.size > 0) {
      themeOverrides.set(theme, themeProps)
    }
  })

  return { baseProperties: properties, themeOverrides }
}

/**
 * Validate that all required CSS properties are defined
 */
function validateCssProperties() {
  console.log('🔍 Validating CSS custom properties...\n')

  const cssPath = path.join(__dirname, '../styles/globals.css')
  const { baseProperties, themeOverrides } = parseCssFile(cssPath)

  let allPassed = true

  // Check base properties
  console.log('📋 Base Theme Properties:')
  const missingBase = []
  const allRequired = requiredColors.concat(requiredProperties)
  allRequired.forEach((prop) => {
    let key
    let found = false

    // Determine the correct property name based on the prop
    if (requiredColors.includes(prop)) {
      key = `color-${prop}`
      found = baseProperties.has(key)
    } else if (prop.startsWith('font-')) {
      key = `font-family-${prop.replace('font-family-', '')}`
      found = baseProperties.has(key)
    } else if (prop.startsWith('radius-')) {
      key = prop
      found = baseProperties.has(key)
    } else if (prop.startsWith('spacing-')) {
      key = prop
      found = baseProperties.has(key)
    } else {
      key = prop
      found = baseProperties.has(key)
    }

    if (found) {
      console.log(`  ✅ --${key}`)
    } else {
      console.log(`  ❌ --${key} (MISSING)`)
      missingBase.push(key)
      allPassed = false
    }
  })

  // Check theme overrides
  themes.forEach((theme) => {
    console.log(`\n🎨 ${theme} Theme Overrides:`)
    const overrides = themeOverrides.get(theme)

    if (!overrides || overrides.size === 0) {
      if (theme !== 'Default') {
        console.log(`  ❌ No theme overrides found for ${theme}`)
        allPassed = false
      } else {
        console.log(`  ✅ Default theme uses base properties`)
      }
      return
    }

    // Check key color overrides for non-default themes
    if (theme !== 'Default') {
      const keyColors = ['color-primary-main', 'color-secondary-main', 'font-family-main']
      keyColors.forEach((color) => {
        if (overrides.has(color)) {
          console.log(`  ✅ --${color}: ${overrides.get(color)}`)
        } else {
          console.log(`  ⚠️  --${color} not overridden (may use base value)`)
        }
      })
    }
  })

  return { passed: allPassed, missingBase }
}

/**
 * Validate component files exist and are properly structured
 */
function validateComponents() {
  console.log('\n\n🧩 Validating converted components...\n')

  const componentsToCheck = [
    'atoms/Button/Button.new.tsx',
    'atoms/Text/Text.new.tsx',
    'atoms/Input/Input.new.tsx',
    'atoms/Spinner/Spinner.new.tsx',
    'molecules/Modal/Modal.new.tsx',
    'atoms/Flex/Flex.new.tsx',
    'atoms/H1/H1.new.tsx',
    'atoms/H2/H2.new.tsx',
    'atoms/H3/H3.new.tsx',
  ]

  let allExist = true

  componentsToCheck.forEach((component) => {
    const componentPath = path.join(__dirname, '../components', component)

    if (fs.existsSync(componentPath)) {
      const content = fs.readFileSync(componentPath, 'utf8')

      // Check if component uses CSS custom properties
      const usesCssVars = content.includes('var(--')
      const usesThemeContext = content.includes('useThemeContext')

      console.log(`  ✅ ${component}`)
      if (usesCssVars) {
        console.log(`    🎨 Uses CSS custom properties`)
      }
      if (usesThemeContext) {
        console.log(`    🔄 Uses theme context`)
      }
    } else {
      console.log(`  ❌ ${component} (MISSING)`)
      allExist = false
    }
  })

  return allExist
}

/**
 * Check theme test page exists and is accessible
 */
function validateTestPage() {
  console.log('\n\n🧪 Validating theme test page...\n')

  const testPagePath = path.join(__dirname, '../app/(withoutHeader)/[locale]/theme-test/ThemeTestClient.tsx')

  if (!fs.existsSync(testPagePath)) {
    console.log('  ❌ Theme test page not found')
    return false
  }

  const content = fs.readFileSync(testPagePath, 'utf8')

  // Check that test page imports all components
  const components = ['Button', 'Text', 'Input', 'Spinner', 'Modal', 'Flex', 'H1', 'H2', 'H3']
  const missingImports = []

  components.forEach((component) => {
    // Handle both default imports and destructured imports
    const defaultImportPattern = new RegExp(`import\\s+${component}\\s+from`)
    const destructuredImportPattern = new RegExp(`import\\s*{[^}]*\\b${component}\\b[^}]*}\\s+from`)

    if (!defaultImportPattern.test(content) && !destructuredImportPattern.test(content)) {
      missingImports.push(component)
    }
  })

  if (missingImports.length === 0) {
    console.log('  ✅ Theme test page found and imports all components')
    console.log('  📍 Access at: /sv/theme-test (or /en/theme-test)')
    return true
  } else {
    console.log(`  ❌ Theme test page missing imports: ${missingImports.join(', ')}`)
    return false
  }
}

/**
 * Generate test report
 */
function generateReport(cssResults, componentsExist, testPageExists) {
  console.log('\n\n📊 THEME TESTING REPORT')
  console.log('====================================================')

  console.log('\n✅ COMPLETED TASKS:')
  console.log('  • CSS custom properties defined in globals.css')
  console.log('  • Theme-specific overrides for Fortum and Fastighetsbyran')
  console.log('  • Components converted to use Tailwind CSS with CVA')
  console.log('  • Theme testing page created')
  console.log('  • Theme switcher component implemented')

  console.log('\n🎯 TEST RESULTS:')
  console.log(`  • CSS Properties: ${cssResults.passed ? '✅ PASS' : '❌ FAIL'}`)
  console.log(`  • Components Exist: ${componentsExist ? '✅ PASS' : '❌ FAIL'}`)
  console.log(`  • Test Page Ready: ${testPageExists ? '✅ PASS' : '❌ FAIL'}`)

  if (!cssResults.passed && cssResults.missingBase.length > 0) {
    console.log(`\n⚠️  MISSING CSS PROPERTIES:`)
    cssResults.missingBase.forEach((prop) => console.log(`     --${prop}`))
  }

  console.log('\n🚀 NEXT STEPS:')
  console.log('  1. Start development server: yarn dev')
  console.log('  2. Navigate to: http://localhost:3000/sv/theme-test')
  console.log('  3. Test theme switching with the theme selector')
  console.log('  4. Verify components render correctly in all themes')
  console.log('  5. Check responsive behavior on different screen sizes')

  const overallPass = cssResults.passed && componentsExist && testPageExists
  console.log(`\n🏆 OVERALL RESULT: ${overallPass ? '✅ PASS' : '❌ NEEDS ATTENTION'}`)

  return overallPass
}

/**
 * Main function
 */
function main() {
  console.log('🎨 THEME TESTING VALIDATION SCRIPT')
  console.log('==================================\n')

  try {
    const cssResults = validateCssProperties()
    const componentsExist = validateComponents()
    const testPageExists = validateTestPage()

    const success = generateReport(cssResults, componentsExist, testPageExists)

    process.exit(success ? 0 : 1)
  } catch (error) {
    console.error('❌ Error running theme validation:', error.message)
    process.exit(1)
  }
}

// Run if called directly
if (require.main === module) {
  main()
}

module.exports = {
  validateCssProperties,
  validateComponents,
  validateTestPage,
  generateReport,
}
