'use client'

import { BroadbandProvider } from '@/common/context/broadband/broadbandProvider.provider'
import { ChecklistContextProvider, CreateChecklistContext } from '@/common/context/checklist/checklistContext.provider'
import BroadbandTemplate from '@/templates/Broadband'


const ChecklistContext = CreateChecklistContext()

export default function ClientPage() {
  return (
    <ChecklistContextProvider context={ChecklistContext}>
      <BroadbandProvider>
        <BroadbandTemplate />
      </BroadbandProvider>
    </ChecklistContextProvider>
  )
}
