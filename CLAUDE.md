# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands

- `yarn dev` - Start development server with Turbopack
- `yarn build` - Build production application
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn test` - Run Jest tests
- `yarn test:watch` - Run tests in watch mode
- `yarn test:coverage` - Run tests with coverage report

### Build Analysis

- `yarn analyze` - Analyze bundle size (sets ANALYZE=true)

### Test Commands

- `yarn test:watch --maxWorkers=25%` - Optimized test watching
- Single test: `yarn test ComponentName.spec.tsx`

## Code Architecture

### Next.js 15 App Router Structure

This project uses Next.js 15 with App Router and sophisticated route organization:

#### Route Groups

- `(startpage)/[locale]/` - Landing pages with minimal header
- `(withHeader)/[locale]/` - Protected app routes with full navigation
- `(withoutHeader)/[locale]/` - Authentication and minimal UI pages

#### Key Routes

- `/app/movepage` - Main dashboard (post-authentication default)
- `/app/electricity`, `/app/broadband`, `/app/movehelp`, `/app/moveclean` - Service modules
- `/login`, `/sso` - Authentication flows

### Component Organization (Atomic Design)

```
components/
├── atoms/      # Basic UI elements (Button, Input, Text)
├── molecules/  # Composite components (Modal, Accordion, InfoBox)
└── organisms/  # Complex components (DatePicker, Footer, ProfileModal)
```

#### Component Structure Convention

Each component includes:

- `Component.tsx` - Main component with Tailwind CSS classes
- `Component.spec.tsx` - Jest tests
- `index.ts` - Clean exports

### Styling with Tailwind CSS

- All styling uses Tailwind CSS utility classes
- Use `class-variance-authority` (CVA) for component variants
- Theme values via CSS custom properties: `var(--color-primary-main)`
- Conditional classes with `clsx` utility
- No inline styles or CSS-in-JS libraries

### Multi-Theme System

Three theme variants supported:

- Default (Flyttsmart brand)
- Fortum theme (`fortumTheme`)
- Fastighetsbyran theme (`fastighetsbyranTheme`)

### Context Architecture

Service-specific contexts in `common/context/`:

- `user/` - Global user state and authentication
- `checklist/` - Todo/activity management
- `electricity/`, `broadband/`, `movehelp/`, `moveclean/` - Service states
- `theme/` - Dynamic theme switching

### API Layer

Centralized API functions in `common/api/` with service-specific modules.

### Internationalization (i18n)

- Translation files: `public/locales/{sv|en}/`
- Namespaced by feature: `common.json`, `electricity.json`, `movehelp.json`
- Key format: camelCase with UPPERCASE nested objects
- Load translations in layout files using `initTranslations`
- Use `useTranslation(['namespace1', 'namespace2'])` in components

### Template-Based Pages

Complex pages use template pattern in `templates/`:

- Business logic encapsulation
- Step-based flows (Step1, Step2, etc.)
- Service-specific templates (Electricity, Broadband, Movehelp)

### Type Safety

- Extensive TypeScript usage
- Path aliases configured in `tsconfig.json` (`@/components/*`, `@/common/*`, etc.)
- Type definitions in `types/` and `common/types/`

### Authentication & Routing

- Middleware-enforced authentication for `/app` routes
- Cookie-based auth (`userToken`)
- Automatic redirects: unauthenticated → `/login`, authenticated on root → `/app/movepage`

### Testing Setup

- Jest with jsdom environment
- React Testing Library
- Path mapping configured for aliases
- Setup files: `jest.setup.js`, `.jest/setupEnvVars.ts`

### Bundle Configuration

- SVG handling with @svgr/webpack
- Image optimization for multiple domains
- Sentry integration for error tracking
- Bundle analyzer available

## Development Guidelines

### Code Style

- Use TypeScript strictly (`noImplicitAny: true`)
- Follow existing patterns for component structure
- Prefer existing utility functions in `common/utils/`
- Use path aliases for cleaner imports

### Code Comments

- Write self-documenting code with clear naming
- **Only add comments for large, complicated files/components/functions that don't explain themselves**
- Avoid redundant comments that simply restate what the code does
- Focus on explaining "why" rather than "what" when comments are necessary

### Styling Standards

**All styling uses Tailwind CSS** - Stitches has been completely removed.

- Use Tailwind utility classes for all styling
- Complex variants: Use `class-variance-authority` (CVA)
- Theme values: CSS custom properties in `styles/globals.css`
- Conditional classes: Use `clsx` utility
- Never use inline styles or CSS-in-JS libraries

### Performance

- Leverage Next.js 15 server components
- Use Suspense boundaries with custom loading states
- Implement proper code splitting by route

### Yarn Package Management

- Use Yarn with Corepack enabled
- Version resolutions for React types in `package.json`
- Node.js 22.x required
