'use client'

import { PartnersIntro, DistributionPartners, Suppliers } from '@/templates/landing/components/partnersSections'

export default function SamarbetspartnersPage() {
  return (
    <main>
      <PartnersIntro />
      <div id="distributionspartners-section" className="bg-white">
        <DistributionPartners />
      </div>
      <div id="leverantorer-section" className="bg-[var(--color-background-default)]">
        <Suppliers />
      </div>
    </main>
  )
}
