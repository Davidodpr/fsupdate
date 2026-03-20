'use client'

import { clsx } from 'clsx'

// ─── BrokerPartnerships data ───────────────────────────────────────────────

const brokerStats = [
  { value: '94%', label: 'Nöjdare kunder' },
  { value: '3 tim', label: 'Sparad tid per affär' },
  { value: '+18%', label: 'Merförsäljning' },
]

const brokerSteps = [
  {
    number: '1',
    title: 'Kunden får tillgång',
    description: 'Så fort affären är klar aktiveras köparens konto i Flyttsmart. Ingen manuell hantering krävs från mäklaren.',
  },
  {
    number: '2',
    title: 'Vi tar hand om flytten',
    description: 'Flyttsmart koordinerar allt: flytt, städ, el, bredband, försäkring och adressändring. Kunden har en kontaktpunkt.',
  },
  {
    number: '3',
    title: 'Mäklaren får nöjdare kunder',
    description: 'Köparen minns ett smidigt köp. Rekommendationer, bra recensioner och återkommande kunder följer naturligt.',
  },
]

const brokerChains = [
  { name: 'Fastighetsbyrån', stat: '200+ kontor', initials: 'FB', description: 'Sveriges största mäklarkedja. Alla deras kunder får tillgång till Flyttsmart som en del av mäklartjänsten.' },
  { name: 'Mäklarhuset', stat: '100+ mäklare', initials: 'MH', description: 'Nära samarbete med Mäklarhusets kontor i hela landet.' },
  { name: 'Bjurfors', stat: '80+ kontor', initials: 'BJ', description: 'Vi stöttar Bjurfors kunder med allt det praktiska kring flytten.' },
  { name: 'ERA', stat: '50+ kontor', initials: 'ERA', description: 'ERA:s kunder får en personlig checklista och tillgång till alla våra tjänster.' },
]

// ─── Suppliers data ────────────────────────────────────────────────────────

const vettingSteps = [
  { label: 'Ansökan granskas', description: 'Vi kontrollerar F-skattsedel, försäkringar och branschcertifieringar.' },
  { label: 'Referenscheck', description: 'Vi pratar med tidigare kunder och verifierar omdömen.' },
  { label: 'Provuppdrag', description: 'Leverantören genomför ett kontrollerat uppdrag som vi följer upp.' },
  { label: 'Löpande uppföljning', description: 'Betyg samlas in efter varje uppdrag. Leverantörer som sjunker under gränsen plockas bort.' },
]

const supplierCategories = [
  { category: 'Flytt och städ', examples: ['Flytt Express', 'Hemfrid', 'Proffsstäd', 'Allstäd'] },
  { category: 'El och energi', examples: ['Tibber', 'Vattenfall', 'E.ON', 'Fortum'] },
  { category: 'Bredband', examples: ['Telia', 'Telenor', 'Bredband2', 'Bahnhof'] },
  { category: 'Försäkring', examples: ['Länsförsäkringar', 'Trygg-Hansa', 'IF', 'Folksam'] },
  { category: 'Hantverkare', examples: ['Byggmax Service', 'Handy', 'Fixarn'] },
]

const trustSignals = [
  { value: '500+', label: 'Godkända leverantörer' },
  { value: '96%', label: 'Nöjda kunder efter uppdrag' },
  { value: '48 tim', label: 'Max svarstid vid klagomål' },
]

// ─── BrokerPartnerships ────────────────────────────────────────────────────

const BrokerPartnerships = () => {
  return (
    <section id="maklarsamarbeten" className="pb-16 md:pb-24">
      {/* Page header */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-12 md:pt-16 pb-12 md:pb-16">
        <p className="text-[var(--color-primary-main)] text-sm font-semibold uppercase tracking-wider mb-3">
          Mäklarsamarbeten
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-secondary-main)] mb-4 leading-tight max-w-[700px]">
          Vi gör flytten enklare - tillsammans med Sveriges mäklare
        </h1>
        <p className="text-lg text-[var(--color-secondary-main)]/60 max-w-[600px] leading-relaxed">
          Vi samarbetar med landets ledande mäklarkedjor för att ge deras köpare ett komplett stöd kring flytten.
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-px bg-gray-100 rounded-xl overflow-hidden mb-16 md:mb-20">
          {brokerStats.map((stat) => (
            <div key={stat.label} className="bg-white py-8 text-center">
              <div className="text-2xl md:text-3xl font-bold text-[var(--color-primary-main)] mb-1">{stat.value}</div>
              <div className="text-[var(--color-secondary-main)]/55 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* How the partnership works */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--color-secondary-main)] mb-2">
            Så fungerar samarbetet
          </h2>
          <p className="text-[var(--color-secondary-main)]/55 mb-8">
            Tre steg - och mäklaren behöver inte göra ett enda av dem manuellt.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {brokerSteps.map((step) => (
              <div key={step.number} className="flex gap-4">
                <span className="text-3xl font-bold text-[var(--color-primary-main)]/20 shrink-0 leading-none mt-0.5">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-[15px] font-bold text-[var(--color-secondary-main)] mb-1">{step.title}</h3>
                  <p className="text-[var(--color-secondary-main)]/50 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partner chains */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--color-secondary-main)] mb-8">
            Nuvarande samarbetspartners
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gray-100 rounded-xl overflow-hidden">
            {brokerChains.map((chain) => (
              <div key={chain.name} className="bg-white p-6 flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-[var(--color-primary-main)]/10 flex items-center justify-center shrink-0 font-bold text-xs text-[var(--color-primary-main)]">
                  {chain.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-[var(--color-secondary-main)]">{chain.name}</h3>
                    <span className="text-xs text-[var(--color-secondary-main)]/40">{chain.stat}</span>
                  </div>
                  <p className="text-[var(--color-secondary-main)]/50 text-sm leading-relaxed">{chain.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[var(--color-secondary-main)] rounded-xl p-7 md:p-10 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-1">Vill du bli samarbetspartner?</h3>
            <p className="text-white/50 text-sm max-w-[400px]">
              Vi väljer samarbetspartners med omsorg. Hör av dig så berättar vi mer.
            </p>
          </div>
          <a
            href="mailto:partner@flyttsmart.se"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[var(--color-primary-main)] text-white font-semibold text-sm hover:bg-[var(--color-primary-main)]/85 transition-colors shrink-0"
          >
            Bli samarbetspartner &rarr;
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Suppliers ─────────────────────────────────────────────────────────────

const Suppliers = () => {
  return (
    <section id="leverantorer" className="py-16 md:py-24 bg-[var(--color-background-default)]">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <p className="text-[var(--color-primary-main)] text-sm font-semibold uppercase tracking-wider mb-3">
            Leverantörsnätverk
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-secondary-main)] mb-3 max-w-[560px]">
            Kvalitetssäkrade leverantörer i hela Sverige
          </h2>
          <p className="text-[var(--color-secondary-main)]/55 max-w-[520px] leading-relaxed">
            Vi väljer noggrant vilka leverantörer som får vara en del av Flyttsmart. Det är ett löpande arbete - inte bara en engångskontroll.
          </p>
        </div>

        {/* Vetting process */}
        <div className="mb-16 md:mb-20">
          <h3 className="text-base font-bold text-[var(--color-secondary-main)] mb-6">Hur vi väljer leverantörer</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vettingSteps.map((step, index) => (
              <div key={index} className="flex gap-3">
                <span className="text-xs font-bold text-[var(--color-primary-main)] bg-[var(--color-primary-main)]/10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <div>
                  <span className="font-semibold text-[var(--color-secondary-main)] text-sm block mb-0.5">{step.label}</span>
                  <p className="text-[var(--color-secondary-main)]/45 text-xs leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Supplier categories */}
        <div className="mb-16 md:mb-20">
          <h3 className="text-base font-bold text-[var(--color-secondary-main)] mb-6">Kategorier</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 rounded-xl overflow-hidden">
            {supplierCategories.map((item) => (
              <div key={item.category} className="bg-white p-5 md:p-6">
                <h4 className="text-sm font-bold text-[var(--color-secondary-main)] mb-3">{item.category}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {item.examples.map((example) => (
                    <span
                      key={example}
                      className="text-xs px-2.5 py-1 rounded-md bg-gray-50 text-[var(--color-secondary-main)]/60"
                    >
                      {example}
                    </span>
                  ))}
                  <span className="text-xs px-2.5 py-1 rounded-md bg-gray-50 text-[var(--color-secondary-main)]/35">
                    + fler
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust signals */}
        <div className="grid grid-cols-3 gap-px bg-gray-100 rounded-xl overflow-hidden mb-16 md:mb-20">
          {trustSignals.map((signal) => (
            <div key={signal.label} className="bg-white py-7 text-center">
              <div className="text-2xl md:text-3xl font-bold text-[var(--color-primary-main)] mb-1">
                {signal.value}
              </div>
              <div className="text-[var(--color-secondary-main)]/50 text-sm">{signal.label}</div>
            </div>
          ))}
        </div>

        {/* Supplier CTA */}
        <div className="bg-white rounded-xl border border-gray-100 p-7 md:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-[var(--color-secondary-main)] mb-1">Vill du bli leverantör?</h3>
            <p className="text-[var(--color-secondary-main)]/50 text-sm max-w-[400px]">
              Vi är alltid öppna för leverantörer som håller hög kvalitet. Hör av dig.
            </p>
          </div>
          <a
            href="mailto:leverantor@flyttsmart.se"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[var(--color-secondary-main)] text-white font-semibold text-sm hover:bg-[var(--color-secondary-main)]/85 transition-colors shrink-0"
          >
            Ansök som leverantör &rarr;
          </a>
        </div>
      </div>
    </section>
  )
}

export { BrokerPartnerships, Suppliers }
