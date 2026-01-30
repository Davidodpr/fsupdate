import initTranslations from 'i18n'
import { ThemeTestClient } from './ThemeTestClient'

export default async function ThemeTestPage({ params }: { params: Promise<{ locale: string }> }) {
  // Initialize translations (not used in this specific page but available if needed)
  const { locale } = await params
  await initTranslations(locale, ['common'])

  return <ThemeTestClient />
}
