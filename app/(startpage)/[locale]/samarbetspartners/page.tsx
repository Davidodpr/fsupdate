'use client'

import { useState } from 'react'
import { clsx } from 'clsx'
import { BrokerPartnerships, Suppliers } from '@/templates/landing/components/partnersSections'

type Tab = 'maklare' | 'leverantorer'

const tabs: { id: Tab; label: string; sublabel: string }[] = [
  { id: 'maklare', label: 'Mäklare', sublabel: 'Samarbeta med oss' },
  { id: 'leverantorer', label: 'Leverantörer', sublabel: 'Bli en del av nätverket' },
]

export default function SamarbetspartnersPage() {
  const [active, setActive] = useState<Tab>('maklare')

  return (
    <main>
      {/* Tab bar */}
      <div className="sticky top-14 sm:top-[86px] z-40 bg-white border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="flex gap-0">
            {tabs.map((tab) => {
              const isActive = active === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={clsx(
                    'relative flex flex-col items-start px-5 py-3.5 text-left transition-colors',
                    isActive
                      ? 'text-[var(--color-secondary-main)]'
                      : 'text-[var(--color-secondary-main)]/40 hover:text-[var(--color-secondary-main)]/70'
                  )}
                >
                  <span className="text-sm font-bold leading-tight">{tab.label}</span>
                  <span
                    className={clsx(
                      'text-xs leading-tight transition-opacity',
                      isActive ? 'opacity-40' : 'opacity-0'
                    )}
                  >
                    {tab.sublabel}
                  </span>
                  {/* Active underline */}
                  <span
                    className={clsx(
                      'absolute bottom-0 left-5 right-5 h-[2px] rounded-full bg-[var(--color-primary-main)] transition-opacity',
                      isActive ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Section content */}
      <div className="bg-[var(--color-background-default)]">
        {active === 'maklare' ? <BrokerPartnerships /> : <Suppliers />}
      </div>
    </main>
  )
}
