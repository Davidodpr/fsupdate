import { Suspense } from 'react'
import WelcomePage from '@/templates/WelcomePage'
import Loading from '../loading'

export default async function Home() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <WelcomePage />
      </Suspense>
    </main>
  )
}
