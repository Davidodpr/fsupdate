import { Suspense } from 'react'
import Loading from '../loading'
import ClientPage from './ClientPage'

export default async function Page() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <ClientPage />
      </Suspense>
    </main>
  )
}
