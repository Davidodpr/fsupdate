'use client'

import { ChecklistContextProvider, CreateChecklistContext } from '@/common/context/checklist/checklistContext.provider'
import { LeadProvider, CreateLeadContext } from '@/common/context/lead/LeadProvider'
import { MovehelpProvider } from '@/common/context/movehelpProvider/movehelp.provider'
import MovehelpQuotation from '@/templates/Movehelp/MovehelpQuotationSection'


const ChecklistContext = CreateChecklistContext()

const context = CreateLeadContext()

export default function ClientPage() {
  return (
    <LeadProvider context={context}>
      <ChecklistContextProvider context={ChecklistContext}>
        <MovehelpProvider>
          <MovehelpQuotation />
        </MovehelpProvider>
      </ChecklistContextProvider>
    </LeadProvider>
  )
}
