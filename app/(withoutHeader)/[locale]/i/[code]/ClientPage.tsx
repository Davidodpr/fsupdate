'use client'

import { LeadProvider, CreateLeadContext } from '@/common/context/lead/LeadProvider'
import UserOnboarding from '@/templates/UserOnboarding/UserOnboarding'


const context = CreateLeadContext()

export default function ClientPage({ code }: { code: string }) {
  return (
    <LeadProvider context={context}>
      <UserOnboarding code={code} />
    </LeadProvider>
  )
}
