import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Theme Testing - Tailwind Components',
  description: 'Testing page for Tailwind-converted components across all themes',
}

export default function ThemeTestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
