This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install node.js ^20.9.x

### yarn

Corepack is included by default with all Node.js installs, but is currently opt-in. To enable it, run the following command:

```bash
$ corepack enable
```

https://yarnpkg.com/getting-started/install

### Start

First, run the development server:

```bash
$ yarn install
$ yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.ts`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Tailwind CSS

This project uses [Tailwind CSS](https://tailwindcss.com/) v4 for styling. Tailwind is a utility-first CSS framework that provides low-level utility classes to build custom designs.

### Component Styling

When creating components, we use Tailwind utility classes directly in the JSX:

```tsx
import { clsx } from 'clsx'

export const Component = ({ isActive }) => {
  return (
    <div
      className={clsx(
        'w-full bg-[var(--color-secondary-main)] h-10 relative text-white text-sm font-semibold',
        'flex-col transition-height duration-100 ease-in-out hover:cursor-pointer',
        isActive && 'bg-[var(--color-primary-main)]',
      )}
    >
      Content
    </div>
  )
}
```

### Component Variants with CVA

For components with complex styling variants, we use [Class Variance Authority (CVA)](https://cva.style/docs):

```tsx
// Button.variants.ts
import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva('inline-flex items-center justify-center font-semibold transition-colors', {
  variants: {
    variant: {
      primary: 'bg-[var(--color-primary-main)] text-white hover:bg-[var(--color-primary-hover)]',
      secondary: 'bg-[var(--color-secondary-main)] text-white hover:bg-[var(--color-secondary-hover)]',
      outline: 'border border-[var(--color-primary-main)] text-[var(--color-primary-main)]',
    },
    size: {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
```

### Theme System

The project supports multiple themes through CSS custom properties defined in `styles/globals.css`. Themes are applied via class names on the HTML element:

- `theme-Default` - Default Flyttsmart theme
- `theme-Fortum` - Fortum partner theme
- `theme-Fastighetsbyran` - Fastighetsbyran partner theme

CSS custom properties are used for colors and other theme values:

```css
/* Example from globals.css */
.theme-Default {
  --color-primary-main: #51c8b4;
  --color-secondary-main: #fa6a55;
  --color-text-main: #214766;
  /* ... other theme values */
}
```

Use these variables in Tailwind classes:

```tsx
<div className="bg-[var(--color-primary-main)] text-[var(--color-text-main)]">Themed content</div>
```

## Design

Design document on colors, fonts, texts etc can be found here: https://www.figma.com/file/Mvt4cbaybIQtFhZVHciGHn/Design-Library?node-id=915%3A794. All implemented colors, fonts and other design related content should exist in this document before implementation in code.

## Translations

### i18n

Lib: https://github.com/i18next/react-i18next

Information about i18n: https://www.i18next.com/

Resource files are located under `/public/locales/{language}`.

Keys should be in camelCase, nested object keys should be in all uppercase.

```json
{
  "myKey": "My Key",
  "data": "Data",
  "NESTEDOBJECT": {
    "innerKey": "Inner Key"
  }
}
```

To load the resources and make the available on the pages and in the sub components you will have to create a new instance in the layout file for the current page.
You also need to either create our use a namespace as seen below.

```tsx
const i18nNamespaces = getI18nNamespaces('')
export default async function layout(props: Props) {
  const { resources } = await initTranslations(locale, i18nNamespaces)

  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
      <PageLayoutClient>{children}</PageLayoutClient>
    </TranslationsProvider>
  )
}
```

Then to use it in a page or component:

```tsx
import { useTranslation } from 'react-i18next'

const MyComponent = () => {
  const { t } = useTranslation(['header', 'common'])
  return (
    <div>
      <p>
        From header: {t('myKey')} {t('NESTEDOBJECT.innerKey')}
      </p>
      <p>
        From common: {t('common:myKey')} {t('common:NESTEDOBJECT.innerKey')}
      </p>
    </div>
  )
}
```

## Packages

### Resolutions

> This field allows you to instruct Yarn to use a specific resolution (specific package version) instead of anything the resolver would normally pick. This is useful to enforce all your packages to use a single version of a dependency, or backport a fix. The syntax for the resolution key accepts one level of specificity, so all the following examples are correct.

We use this for `@types/react` and `@types/react-dom`, if they are updated make sure to update the resolutions as well.

```json
"resolutions": {
  "@types/react": "18.0.15",
  "@types/react-dom": "18.0.6"
}
```

https://yarnpkg.com/configuration/manifest#resolutions

## Test

> On Windows make sure you have Microsoft Visual C++ Redistributable installed. https://docs.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist

Source: https://nextjs.org/docs/messages/failed-loading-swc

## Next.js

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
