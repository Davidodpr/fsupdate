import { TermsPage } from './TermsPage'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale
  return (
    <main>
      <TermsPage locale={locale} />
    </main>
  )
}
