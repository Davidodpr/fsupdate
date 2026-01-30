'use client'

import { ChecklistContextProvider, CreateChecklistContext } from '@/common/context/checklist/checklistContext.provider'
import InsurancePage from '@/templates/Insurance/InsurancePage'


const ChecklistContext = CreateChecklistContext()

export default function ClientPage() {
  return (
    <ChecklistContextProvider context={ChecklistContext}>
      <InsurancePage />
    </ChecklistContextProvider>
  )
}
