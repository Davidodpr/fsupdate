'use client'

import { ChecklistContextProvider, CreateChecklistContext } from '@/common/context/checklist/checklistContext.provider'
import { MovecleanProvider } from '@/common/context/movecleanProvider/moveclean.provider'
import Moveclean from '@/templates/Moveclean'


const ChecklistContext = CreateChecklistContext()

export default function ClientPage() {
  return (
    <ChecklistContextProvider context={ChecklistContext}>
      <MovecleanProvider>
        <Moveclean />
      </MovecleanProvider>
    </ChecklistContextProvider>
  )
}
