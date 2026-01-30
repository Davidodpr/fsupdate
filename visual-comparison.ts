import * as fs from 'fs'
import * as path from 'path'
import { chromium, Browser, Page, BrowserContext } from '@playwright/test'

interface TestRoute {
  path: string
  name: string
  requiresAuth: boolean
  waitForSelector?: string
  viewport?: { width: number; height: number }
  actions?: Array<{
    type: 'click' | 'hover' | 'fill'
    selector: string
    value?: string
  }>
}

interface VisualDifference {
  route: string
  component: string
  issue: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  stagingScreenshot?: string
  localScreenshot?: string
  cssProperties?: Record<string, { staging: string; local: string }>
  suggestedFix?: string
}

class VisualRegressionTester {
  private stagingUrl = 'https://staging.flyttsmart.se'
  private localUrl = 'http://localhost:3000'
  private browser: Browser | null = null
  private stagingContext: BrowserContext | null = null
  private localContext: BrowserContext | null = null
  private differences: VisualDifference[] = []
  private screenshotDir = './visual-regression-screenshots'

  private routes: TestRoute[] = [
    // Public pages
    { path: '/sv', name: 'Landing Page', requiresAuth: false },
    { path: '/sv/login', name: 'Login Page', requiresAuth: false },
    { path: '/sv/providers', name: 'Providers', requiresAuth: false },
    { path: '/sv/privacy_policy', name: 'Privacy Policy', requiresAuth: false },
    { path: '/sv/terms', name: 'Terms', requiresAuth: false },
    { path: '/sv/cookie', name: 'Cookie Policy', requiresAuth: false },

    // Authenticated pages
    { path: '/sv/app/movepage', name: 'Move Dashboard', requiresAuth: true, waitForSelector: '[data-testid="movepage-content"]' },
    { path: '/sv/app/electricity', name: 'Electricity Service', requiresAuth: true },
    { path: '/sv/app/broadband', name: 'Broadband Service', requiresAuth: true },
    { path: '/sv/app/movehelp', name: 'Move Help Service', requiresAuth: true },
    { path: '/sv/app/moveclean', name: 'Cleaning Service', requiresAuth: true },
    { path: '/sv/app/addresschange', name: 'Address Change', requiresAuth: true },
    { path: '/sv/app/insurance', name: 'Insurance', requiresAuth: true },
    { path: '/sv/app/welcome', name: 'Welcome Page', requiresAuth: true },
  ]

  private criticalSelectors = [
    // Atoms
    { selector: 'button', name: 'Button' },
    { selector: 'input[type="text"]', name: 'Text Input' },
    { selector: 'select', name: 'Select Dropdown' },
    { selector: '[role="dialog"]', name: 'Modal' },

    // Layout
    { selector: 'header', name: 'Header' },
    { selector: 'footer', name: 'Footer' },
    { selector: 'nav', name: 'Navigation' },

    // Components
    { selector: '[data-accordion]', name: 'Accordion' },
    { selector: '[data-card]', name: 'Card' },
    { selector: 'form', name: 'Form' },
  ]

  async setup() {
    // Create screenshot directory
    if (!fs.existsSync(this.screenshotDir)) {
      fs.mkdirSync(this.screenshotDir, { recursive: true })
    }

    // Launch browser
    this.browser = await chromium.launch({ headless: false })

    // Create contexts for staging and local
    this.stagingContext = await this.browser.newContext({
      viewport: { width: 1920, height: 1080 },
    })
    this.localContext = await this.browser.newContext({
      viewport: { width: 1920, height: 1080 },
    })
  }

  async login(context: BrowserContext, baseUrl: string) {
    const page = await context.newPage()
    await page.goto(`${baseUrl}/sv/login`)

    // Add login logic here if needed
    // For now, we'll use cookies or skip auth pages

    await page.close()
  }

  async compareRoute(route: TestRoute) {
    console.log(`\n📸 Comparing: ${route.name}`)

    const stagingPage = await this.stagingContext!.newPage()
    const localPage = await this.localContext!.newPage()

    try {
      // Set viewport if specified
      if (route.viewport) {
        await stagingPage.setViewportSize(route.viewport)
        await localPage.setViewportSize(route.viewport)
      }

      // Navigate to both URLs
      await Promise.all([
        stagingPage.goto(`${this.stagingUrl}${route.path}`, { waitUntil: 'networkidle' }),
        localPage.goto(`${this.localUrl}${route.path}`, { waitUntil: 'networkidle' }),
      ])

      // Wait for content to load
      if (route.waitForSelector) {
        await Promise.all([
          stagingPage.waitForSelector(route.waitForSelector, { timeout: 10000 }).catch(() => {}),
          localPage.waitForSelector(route.waitForSelector, { timeout: 10000 }).catch(() => {}),
        ])
      } else {
        await Promise.all([stagingPage.waitForTimeout(3000), localPage.waitForTimeout(3000)])
      }

      // Take screenshots
      const timestamp = Date.now()
      const stagingScreenshot = `${this.screenshotDir}/${route.name.replace(/\s+/g, '-')}-staging-${timestamp}.png`
      const localScreenshot = `${this.screenshotDir}/${route.name.replace(/\s+/g, '-')}-local-${timestamp}.png`

      await Promise.all([stagingPage.screenshot({ path: stagingScreenshot, fullPage: true }), localPage.screenshot({ path: localScreenshot, fullPage: true })])

      // Compare critical elements
      await this.compareElements(stagingPage, localPage, route)

      // Perform any specific actions
      if (route.actions) {
        for (const action of route.actions) {
          await this.performAction(stagingPage, localPage, action)
        }
      }
    } catch (error) {
      console.error(`❌ Error comparing ${route.name}:`, error)
      this.differences.push({
        route: route.path,
        component: 'Page Load',
        issue: `Failed to load or compare: ${error}`,
        severity: 'critical',
        stagingScreenshot: '',
        localScreenshot: '',
      })
    } finally {
      await stagingPage.close()
      await localPage.close()
    }
  }

  async compareElements(stagingPage: Page, localPage: Page, route: TestRoute) {
    for (const { selector, name } of this.criticalSelectors) {
      try {
        const stagingElements = await stagingPage.$$(selector)
        const localElements = await localPage.$$(selector)

        if (stagingElements.length !== localElements.length) {
          this.differences.push({
            route: route.path,
            component: name,
            issue: `Element count mismatch: Staging has ${stagingElements.length}, Local has ${localElements.length}`,
            severity: 'high',
          })
          continue
        }

        // Compare first element's styles
        if (stagingElements.length > 0 && localElements.length > 0) {
          const stagingStyles = await stagingElements[0].evaluate((el) => {
            const computed = window.getComputedStyle(el)
            return {
              display: computed.display,
              width: computed.width,
              height: computed.height,
              padding: computed.padding,
              margin: computed.margin,
              color: computed.color,
              backgroundColor: computed.backgroundColor,
              fontSize: computed.fontSize,
              fontWeight: computed.fontWeight,
              borderRadius: computed.borderRadius,
              border: computed.border,
              boxShadow: computed.boxShadow,
            }
          })

          const localStyles = await localElements[0].evaluate((el) => {
            const computed = window.getComputedStyle(el)
            return {
              display: computed.display,
              width: computed.width,
              height: computed.height,
              padding: computed.padding,
              margin: computed.margin,
              color: computed.color,
              backgroundColor: computed.backgroundColor,
              fontSize: computed.fontSize,
              fontWeight: computed.fontWeight,
              borderRadius: computed.borderRadius,
              border: computed.border,
              boxShadow: computed.boxShadow,
            }
          })

          // Compare styles
          const styleDifferences: Record<string, { staging: string; local: string }> = {}
          for (const [key, stagingValue] of Object.entries(stagingStyles)) {
            const localValue = localStyles[key as keyof typeof localStyles]
            if (stagingValue !== localValue) {
              styleDifferences[key] = {
                staging: stagingValue,
                local: localValue,
              }
            }
          }

          if (Object.keys(styleDifferences).length > 0) {
            this.differences.push({
              route: route.path,
              component: `${name} (${selector})`,
              issue: `Style differences detected`,
              severity: 'medium',
              cssProperties: styleDifferences,
              suggestedFix: this.suggestTailwindFix(styleDifferences),
            })
          }
        }
      } catch (error) {
        console.error(`Error comparing ${name} on ${route.path}:`, error)
      }
    }
  }

  async performAction(stagingPage: Page, localPage: Page, action: any) {
    try {
      switch (action.type) {
        case 'click':
          await Promise.all([stagingPage.click(action.selector), localPage.click(action.selector)])
          break
        case 'hover':
          await Promise.all([stagingPage.hover(action.selector), localPage.hover(action.selector)])
          break
        case 'fill':
          if (action.value) {
            await Promise.all([stagingPage.fill(action.selector, action.value), localPage.fill(action.selector, action.value)])
          }
          break
      }
      await Promise.all([stagingPage.waitForTimeout(1000), localPage.waitForTimeout(1000)])
    } catch (error) {
      console.error(`Error performing action ${action.type}:`, error)
    }
  }

  suggestTailwindFix(differences: Record<string, { staging: string; local: string }>): string {
    const suggestions: string[] = []

    for (const [property, { staging, local }] of Object.entries(differences)) {
      switch (property) {
        case 'padding':
          suggestions.push(`Change padding from '${local}' to match '${staging}' - try p-[value]`)
          break
        case 'margin':
          suggestions.push(`Change margin from '${local}' to match '${staging}' - try m-[value]`)
          break
        case 'fontSize':
          suggestions.push(`Change font-size from '${local}' to match '${staging}' - try text-[size]`)
          break
        case 'color':
          suggestions.push(`Change color from '${local}' to match '${staging}'`)
          break
        case 'backgroundColor':
          suggestions.push(`Change background from '${local}' to match '${staging}' - try bg-[color]`)
          break
        case 'borderRadius':
          suggestions.push(`Change border-radius from '${local}' to match '${staging}' - try rounded-[value]`)
          break
      }
    }

    return suggestions.join('; ')
  }

  async generateReport() {
    const reportPath = `${this.screenshotDir}/visual-regression-report.json`
    const htmlReportPath = `${this.screenshotDir}/visual-regression-report.html`

    // Save JSON report
    fs.writeFileSync(reportPath, JSON.stringify(this.differences, null, 2))

    // Generate HTML report
    const htmlContent = this.generateHTMLReport()
    fs.writeFileSync(htmlReportPath, htmlContent)

    console.log(`\n📊 Report generated:`)
    console.log(`   JSON: ${reportPath}`)
    console.log(`   HTML: ${htmlReportPath}`)
    console.log(`\n📈 Summary:`)
    console.log(`   Total issues: ${this.differences.length}`)
    console.log(`   Critical: ${this.differences.filter((d) => d.severity === 'critical').length}`)
    console.log(`   High: ${this.differences.filter((d) => d.severity === 'high').length}`)
    console.log(`   Medium: ${this.differences.filter((d) => d.severity === 'medium').length}`)
    console.log(`   Low: ${this.differences.filter((d) => d.severity === 'low').length}`)
  }

  generateHTMLReport(): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <title>Visual Regression Report</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; margin: 20px; }
    h1 { color: #333; }
    .summary { background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0; }
    .issue { border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 8px; }
    .critical { border-left: 4px solid #ff0000; }
    .high { border-left: 4px solid #ff9800; }
    .medium { border-left: 4px solid #ffeb3b; }
    .low { border-left: 4px solid #4caf50; }
    .css-diff { background: #f9f9f9; padding: 10px; margin: 10px 0; border-radius: 4px; font-family: monospace; }
    .property { margin: 5px 0; }
    .staging { color: #4caf50; }
    .local { color: #f44336; }
  </style>
</head>
<body>
  <h1>Visual Regression Testing Report</h1>
  <div class="summary">
    <h2>Summary</h2>
    <p>Total Issues: ${this.differences.length}</p>
    <p>Critical: ${this.differences.filter((d) => d.severity === 'critical').length}</p>
    <p>High: ${this.differences.filter((d) => d.severity === 'high').length}</p>
    <p>Medium: ${this.differences.filter((d) => d.severity === 'medium').length}</p>
    <p>Low: ${this.differences.filter((d) => d.severity === 'low').length}</p>
  </div>
  
  <h2>Issues Found</h2>
  ${this.differences
    .map(
      (diff) => `
    <div class="issue ${diff.severity}">
      <h3>${diff.route} - ${diff.component}</h3>
      <p><strong>Issue:</strong> ${diff.issue}</p>
      <p><strong>Severity:</strong> ${diff.severity}</p>
      ${
        diff.cssProperties
          ? `
        <div class="css-diff">
          <h4>CSS Differences:</h4>
          ${Object.entries(diff.cssProperties)
            .map(
              ([prop, values]) => `
            <div class="property">
              <strong>${prop}:</strong>
              <span class="staging">Staging: ${values.staging}</span> |
              <span class="local">Local: ${values.local}</span>
            </div>
          `,
            )
            .join('')}
        </div>
      `
          : ''
      }
      ${diff.suggestedFix ? `<p><strong>Suggested Fix:</strong> ${diff.suggestedFix}</p>` : ''}
    </div>
  `,
    )
    .join('')}
</body>
</html>
    `
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close()
    }
  }

  async run() {
    try {
      await this.setup()

      // Test each route
      for (const route of this.routes) {
        await this.compareRoute(route)
      }

      // Generate report
      await this.generateReport()
    } catch (error) {
      console.error('Test failed:', error)
    } finally {
      await this.cleanup()
    }
  }
}

// Run the visual regression test
const tester = new VisualRegressionTester()
tester.run().catch(console.error)
