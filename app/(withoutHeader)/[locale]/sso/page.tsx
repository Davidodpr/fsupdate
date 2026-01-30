import { Suspense } from 'react'
import SingelSignOnTemplate from '@/templates/SingelSignOnTemplate/SingelSignOnTemplate'
import Loading from '../loading'

export default async function Home() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <SingelSignOnTemplate />
      </Suspense>
    </main>
  )
}
