import { Suspense } from 'react'
import { LandingPage } from '@/templates/landing'
import { isSafari, isIos } from '../../_components/responsive'
import Loading from './loading'

export default async function Page() {
  const isServerSafari = await isSafari()
  const isServerIos = await isIos()
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <LandingPage isServerIosOrSafari={isServerSafari || isServerIos} />
      </Suspense>
    </main>
  )
}
