'use client'

import { useRef } from 'react'
import { clsx } from 'clsx'
import { BrokerPartnerships, Suppliers } from '@/templates/landing/components/partnersSections'

export default function SamarbetspartnersPage() {
  const maklarRef = useRef<HTMLDivElement>(null)
  const leverantorRef = useRef<HTMLDivElement>(null)

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main>
      {/* Tab navigation */}
      <div className="sticky top-14 sm:top-[86px] z-40 bg-white border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 flex gap-8">
          <button
            onClick={() => scrollTo(maklarRef)}
            className={clsx(
              'py-4 text-sm font-semibold border-b-2 transition-colors',
              'text-[var(--color-primary-main)] border-[var(--color-primary-main)]'
            )}
          >
            Mäklarsamarbeten
          </button>
          <button
            onClick={() => scrollTo(leverantorRef)}
            className={clsx(
              'py-4 text-sm font-semibold border-b-2 transition-colors',
              'text-[var(--color-secondary-main)]/60 border-transparent hover:text-[var(--color-secondary-main)] hover:border-gray-300'
            )}
          >
            Leverantörer
          </button>
        </div>
      </div>

      <div ref={maklarRef}>
        <BrokerPartnerships />
      </div>
      <div ref={leverantorRef}>
        <Suppliers />
      </div>
    </main>
  )
}
