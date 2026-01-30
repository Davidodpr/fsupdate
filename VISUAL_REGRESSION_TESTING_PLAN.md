# Visual Regression Testing & Style Fix Plan

## Problem Statement

The Tailwind CSS migration successfully converted the code structure but has introduced visual discrepancies. We need to systematically identify and fix all styling differences between the migrated version (localhost) and the original version (staging).

## Proposed Solution

### Phase 1: Setup & Preparation

#### 1.1 Environment Setup

- **Local**: Run development server on localhost:3000 with Tailwind migration
- **Staging**: Access staging environment for comparison
- **Tools**: Use Playwright for automated visual testing

#### 1.2 Test Coverage Map

Identify all critical pages and components that need visual verification:

**Public Pages:**

- `/` - Landing page
- `/login` - Login page
- `/providers` - Providers page
- `/privacy_policy` - Privacy policy
- `/terms` - Terms page
- `/cookie` - Cookie policy

**Authenticated Pages:**

- `/app/movepage` - Main dashboard
- `/app/electricity` - Electricity service
- `/app/broadband` - Broadband service
- `/app/movehelp` - Moving help service
- `/app/moveclean` - Cleaning service
- `/app/addresschange` - Address change
- `/app/insurance` - Insurance
- `/app/welcome` - Welcome page

**Component States:**

- Modals (open/closed)
- Forms (empty/filled/error states)
- Buttons (normal/hover/active/disabled)
- Dropdowns (closed/open)
- Accordions (collapsed/expanded)

### Phase 2: Automated Visual Comparison Strategy

#### 2.1 Screenshot Capture Process

```javascript
// For each route:
1. Navigate to staging URL
2. Take screenshot (full page + viewport)
3. Navigate to localhost URL
4. Take same screenshot
5. Compare visually
6. Document differences
```

#### 2.2 Component-Level Testing

```javascript
// For each component:
1. Isolate component on staging
2. Capture all states
3. Repeat on localhost
4. Compare and document
```

### Phase 3: Systematic Comparison Approach

#### 3.1 Page-by-Page Analysis

For each page, check:

- **Layout**: Spacing, alignment, grid/flex behavior
- **Typography**: Font sizes, weights, line heights
- **Colors**: Background, text, borders
- **Spacing**: Padding, margins, gaps
- **Responsive**: Mobile, tablet, desktop views
- **Interactive**: Hover states, focus states, transitions
- **Theme-specific**: Default, Fortum, Fastighetsbyran themes

#### 3.2 Component Checklist

Critical components to verify:

- [ ] Button (all variants)
- [ ] Input fields
- [ ] Select dropdowns
- [ ] Modal dialogs
- [ ] Navigation header
- [ ] Footer
- [ ] Cards/Papers
- [ ] Accordions
- [ ] Forms
- [ ] Tables/Lists

### Phase 4: Fix Implementation Process

#### 4.1 Priority Matrix

| Priority      | Type                            | Examples                          |
| ------------- | ------------------------------- | --------------------------------- |
| P0 - Critical | Broken layouts, unreadable text | Navigation broken, forms unusable |
| P1 - High     | Major visual differences        | Wrong colors, spacing issues      |
| P2 - Medium   | Minor differences               | Small padding differences         |
| P3 - Low      | Enhancements                    | Animations, transitions           |

#### 4.2 Fix Workflow

1. **Identify**: Use Playwright to capture difference
2. **Analyze**: Inspect elements to find root cause
3. **Locate**: Find component file and Tailwind classes
4. **Fix**: Update Tailwind classes to match original
5. **Verify**: Re-test to confirm fix
6. **Document**: Note the change made

### Phase 5: Automation Script Structure

```typescript
// visual-regression-test.ts
interface TestRoute {
  path: string
  name: string
  requiresAuth: boolean
  viewport?: { width: number; height: number }
}

interface VisualDifference {
  route: string
  component: string
  issue: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  stagingScreenshot: string
  localScreenshot: string
  suggestedFix: string
}

async function comparePages() {
  // 1. Start both browsers
  // 2. Login if needed
  // 3. Navigate to each route
  // 4. Take screenshots
  // 5. Compare and document
  // 6. Generate report
}
```

### Phase 6: Execution Plan

#### Week 1: Setup & Critical Pages

- Day 1: Set up Playwright comparison script
- Day 2-3: Test and fix landing page, login, main dashboard
- Day 4-5: Fix service pages (electricity, broadband, etc.)

#### Week 2: Components & Polish

- Day 1-2: Fix all Button, Input, Select variants
- Day 3-4: Fix Modal, Accordion, Card components
- Day 5: Fix responsive issues and theme switching

### Phase 7: Validation

#### 7.1 Cross-browser Testing

- Chrome
- Safari
- Firefox
- Edge

#### 7.2 Device Testing

- Mobile (iPhone, Android)
- Tablet (iPad)
- Desktop (various resolutions)

#### 7.3 Theme Testing

- Default theme
- Fortum theme
- Fastighetsbyran theme

## Implementation Tools

### Playwright Script Features

1. **Dual Browser Control**: Open staging and localhost simultaneously
2. **Screenshot Comparison**: Side-by-side visual diff
3. **Element Inspector**: Identify exact CSS differences
4. **Report Generator**: HTML report with all findings
5. **Fix Tracker**: Track which issues have been resolved

### Helper Functions

```typescript
// Compare specific element styles
async function compareElementStyles(selector: string) {
  const stagingStyles = await stagingPage.evaluate(/* get computed styles */)
  const localStyles = await localPage.evaluate(/* get computed styles */)
  return findDifferences(stagingStyles, localStyles)
}

// Generate fix suggestions
function suggestTailwindFix(cssDifference: CSSProperty) {
  // Map CSS to Tailwind classes
  return tailwindEquivalent
}
```

## Success Criteria

### Must Have (P0/P1)

- [ ] All pages render correctly
- [ ] All forms are functional
- [ ] Navigation works properly
- [ ] Text is readable
- [ ] Buttons are clickable
- [ ] Modals open/close correctly

### Should Have (P2)

- [ ] Spacing matches original
- [ ] Colors are exact matches
- [ ] Hover states work
- [ ] Transitions are smooth

### Nice to Have (P3)

- [ ] Pixel-perfect alignment
- [ ] Animation timing matches
- [ ] All micro-interactions preserved

## Deliverables

1. **Visual Regression Report**: Complete documentation of all differences
2. **Fixed Components**: Updated Tailwind classes for visual parity
3. **Test Suite**: Automated tests to prevent future regressions
4. **Style Guide**: Document Tailwind patterns for consistency

## Alternative Approaches Considered

### Option B: Manual Testing

- Pros: Human eye catches subtle issues
- Cons: Time-consuming, not repeatable

### Option C: CSS Analysis Tool

- Pros: Automated style extraction
- Cons: Doesn't catch visual rendering issues

### Option D: Rollback and Re-migrate

- Pros: Clean slate
- Cons: Loses all work done, same issues likely

## Recommended Approach: Hybrid Automated + Manual

**Primary Method**: Automated Playwright testing for systematic coverage
**Secondary Method**: Manual review of critical user flows
**Validation**: User acceptance testing on staging

This approach balances speed, thoroughness, and accuracy while providing repeatable tests for future changes.

## Next Steps

1. Review and approve this plan
2. Set up Playwright test environment
3. Create comparison script
4. Begin systematic testing
5. Fix issues in priority order
6. Validate fixes
7. Deploy to staging for final QA
