'use client'

import { AddresschangeProvider, CreateAddresschangeContext } from '@/common/context/addresschange/addresschange.provider'
import { ChecklistContextProvider, CreateChecklistContext } from '@/common/context/checklist/checklistContext.provider'
import { AddresschangePage } from '@/templates/Addresschange/AddresschangePage'


const ChecklistContext = CreateChecklistContext()

const contextObject = CreateAddresschangeContext()

export default function ClientPage() {
  return (
    <ChecklistContextProvider context={ChecklistContext}>
      <AddresschangeProvider context={contextObject}>
        <AddresschangePage />
      </AddresschangeProvider>
    </ChecklistContextProvider>
  )
}
