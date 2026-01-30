'use client'

import { ElectricityProvider } from '@/common/context/electricity/electricityContext.provider'
import ExternalElectricityPrice from '@/templates/ExternalElectricityPrice'


export default function ClientPage() {
  return (
    <ElectricityProvider>
      <ExternalElectricityPrice />
    </ElectricityProvider>
  )
}
