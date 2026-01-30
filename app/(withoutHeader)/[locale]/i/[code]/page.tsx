import { Suspense } from 'react'
import Loading from '../../loading'
import ClientPage from './ClientPage'

export default async function Page(props: { params: Promise<{ code: string }> }) {
  const params = await props.params
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <ClientPage code={params.code} />
      </Suspense>
    </main>
  )
}
