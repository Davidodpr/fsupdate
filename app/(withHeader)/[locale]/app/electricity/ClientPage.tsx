'use client'

import { ChecklistContextProvider, CreateChecklistContext } from '@/common/context/checklist/checklistContext.provider'
import { ElectricityProvider } from '@/common/context/electricity/electricityContext.provider'
import ElectricityTemplate from '@/templates/Electricity'


const ChecklistContext = CreateChecklistContext()

export default function ClientPage() {
  return (
    <ChecklistContextProvider context={ChecklistContext}>
      <ElectricityProvider>
        <ElectricityTemplate />
      </ElectricityProvider>
    </ChecklistContextProvider>
  )
}
