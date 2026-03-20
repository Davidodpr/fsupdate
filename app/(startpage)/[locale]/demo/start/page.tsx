import { LandingPage } from '@/templates/landing'

export default function DemoStartPage() {
  return (
    <main>
      <LandingPage isServerIosOrSafari={false} googleReviews={null} googleRating={null} />
    </main>
  )
}
