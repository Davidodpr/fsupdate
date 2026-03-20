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
    title: 'Affären är klar',
    description: 'Köparens konto i Flyttsmart aktiveras automatiskt - ingen manuell hantering från mäklaren.',
  },
  {
    number: '2',
    title: 'Vi koordinerar flytten',
    description: 'Flytt, städ, el, bredband, försäkring och adressändring - ett ställe, en kontaktpunkt.',
  },
  {
    number: '3',
    title: 'Kunden minns dig',
    description: 'En smidig flytt ger nöjda köpare. Det ger bra recensioner och fler rekommendationer.',
  },
]

const brokerChains = [
  { name: 'Fastighetsbyrån', stat: '200+ kontor', initials: 'FB' },
  { name: 'Mäklarhuset', stat: '100+ mäklare', initials: 'MH' },
  { name: 'Bjurfors', stat: '80+ kontor', initials: 'BJ' },
  { name: 'ERA', stat: '50+ kontor', initials: 'ERA' },
]

// ─── Suppliers data ────────────────────────────────────────────────────────

const vettingSteps = [
  { label: 'Ansökan granskas', description: 'F-skattsedel, försäkringar och certifieringar kontrolleras.' },
  { label: 'Referenscheck', description: 'Vi pratar med tidigare kunder och verifierar omdömen.' },
  { label: 'Provuppdrag', description: 'Leverantören genomför ett kontrollerat uppdrag som vi följer upp.' },
  { label: 'Löpande uppföljning', description: 'Betyg samlas in efter varje uppdrag. Lågt betyg - borttagen.' },
]

const supplierCategories = [
  { category: 'Flytt och städ', examples: ['Flytt Express', 'Hemfrid', 'Proffsstäd'] },
  { category: 'El och energi', examples: ['Tibber', 'Vattenfall', 'E.ON'] },
  { category: 'Bredband', examples: ['Telia', 'Telenor', 'Bahnhof'] },
  { category: 'Försäkring', examples: ['Länsförsäkringar', 'Trygg-Hansa', 'IF'] },
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
    <section className="max-w-[1200px] mx-auto px-4 md:px-8 pt-12 pb-16 md:pt-16 md:pb-24">
      {/* Header */}
      <div className="mb-10 md:mb-14 max-w-[580px]">
        <p className="text-[var(--color-primary-main)] text-xs font-semibold uppercase tracking-widest mb-3">
          Mäklarsamarbeten
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-secondary-main)] mb-3 leading-snug">
          Ge dina köpare en flytt de kommer minnas.
        </h1>
        <p className="text-[var(--color-secondary-main)]/55 text-[15px] leading-relaxed">
          Flyttsmart kopplas direkt till ditt mäklarsystem. Du gör ingenting extra - köparen får allt.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-px bg-gray-100 rounded-xl overflow-hidden mb-14 md:mb-16">
        {brokerStats.map((stat) => (
          <div key={stat.label} className="bg-white py-7 text-center">
            <div className="text-2xl md:text-3xl font-bold text-[var(--color-primary-main)] mb-1">{stat.value}</div>
            <div className="text-[var(--color-secondary-main)]/50 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Steps */}
      <div className="mb-14 md:mb-16">
        <h2 className="text-base font-bold text-[var(--color-secondary-main)] mb-7">Så fungerar det</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brokerSteps.map((step) => (
            <div key={step.number} className="flex gap-4">
              <span className="text-3xl font-bold text-[var(--color-primary-main)]/15 leading-none mt-0.5 shrink-0 select-none">
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

      {/* Partner strip */}
      <div className="mb-14 md:mb-16">
        <h2 className="text-base font-bold text-[var(--color-secondary-main)] mb-5">Nuvarande partners</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-100 rounded-xl overflow-hidden">
          {brokerChains.map((chain) => (
            <div key={chain.name} className="bg-white px-5 py-5 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[var(--color-primary-main)]/10 flex items-center justify-center shrink-0 font-bold text-[10px] text-[var(--color-primary-main)]">
                {chain.initials}
              </div>
              <div>
                <div className="text-sm font-semibold text-[var(--color-secondary-main)] leading-tight">{chain.name}</div>
                <div className="text-xs text-[var(--color-secondary-main)]/40 mt-0.5">{chain.stat}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[var(--color-secondary-main)] rounded-xl p-7 md:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <div>
          <h3 className="text-[15px] md:text-base font-bold text-white mb-1">Vill du bli samarbetspartner?</h3>
          <p className="text-white/45 text-sm">Vi väljer partners med omsorg. Hör av dig.</p>
        </div>
        <a
          href="mailto:partner@flyttsmart.se"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[var(--color-primary-main)] text-white font-semibold text-sm hover:bg-[var(--color-primary-main)]/85 transition-colors shrink-0 whitespace-nowrap"
        >
          Kontakta oss &rarr;
        </a>
      </div>
    </section>
  )
}

// ─── Suppliers ─────────────────────────────────────────────────────────────

const Suppliers = () => {
  return (
    <section className="max-w-[1200px] mx-auto px-4 md:px-8 pt-12 pb-16 md:pt-16 md:pb-24">
      {/* Header */}
      <div className="mb-10 md:mb-14 max-w-[580px]">
        <p className="text-[var(--color-primary-main)] text-xs font-semibold uppercase tracking-widest mb-3">
          Leverantörsnätverk
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-secondary-main)] mb-3 leading-snug">
          Nå kunder som just ska flytta - och är redo att köpa.
        </h1>
        <p className="text-[var(--color-secondary-main)]/55 text-[15px] leading-relaxed">
          Vi kopplar ihop dig med kunder i rätt stund. Men vi är noggranna med vem som får vara med.
        </p>
      </div>

      {/* Trust signals */}
      <div className="grid grid-cols-3 gap-px bg-gray-100 rounded-xl overflow-hidden mb-14 md:mb-16">
        {trustSignals.map((signal) => (
          <div key={signal.label} className="bg-white py-7 text-center">
            <div className="text-2xl md:text-3xl font-bold text-[var(--color-primary-main)] mb-1">{signal.value}</div>
            <div className="text-[var(--color-secondary-main)]/50 text-sm">{signal.label}</div>
          </div>
        ))}
      </div>

      {/* Vetting steps */}
      <div className="mb-14 md:mb-16">
        <h2 className="text-base font-bold text-[var(--color-secondary-main)] mb-7">Hur vi väljer leverantörer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {vettingSteps.map((step, index) => (
            <div key={index} className="flex gap-3">
              <span className="text-xs font-bold text-[var(--color-primary-main)] bg-[var(--color-primary-main)]/10 w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                {index + 1}
              </span>
              <div>
                <span className="font-semibold text-[var(--color-secondary-main)] text-sm block mb-1">{step.label}</span>
                <p className="text-[var(--color-secondary-main)]/45 text-xs leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category grid */}
      <div className="mb-14 md:mb-16">
        <h2 className="text-base font-bold text-[var(--color-secondary-main)] mb-5">Kategorier vi täcker</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-gray-100 rounded-xl overflow-hidden">
          {supplierCategories.map((item) => (
            <div key={item.category} className="bg-white p-5">
              <h3 className="text-xs font-bold text-[var(--color-secondary-main)] mb-3 uppercase tracking-wide">{item.category}</h3>
              <div className="flex flex-col gap-1">
                {item.examples.map((example) => (
                  <span key={example} className="text-xs text-[var(--color-secondary-main)]/55">
                    {example}
                  </span>
                ))}
                <span className="text-xs text-[var(--color-secondary-main)]/30">+ fler</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-white border border-gray-100 rounded-xl p-7 md:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
        <div>
          <h3 className="text-[15px] md:text-base font-bold text-[var(--color-secondary-main)] mb-1">Vill du bli leverantör?</h3>
          <p className="text-[var(--color-secondary-main)]/50 text-sm">Vi är alltid öppna för leverantörer som håller hög kvalitet.</p>
        </div>
        <a
          href="mailto:leverantor@flyttsmart.se"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[var(--color-secondary-main)] text-white font-semibold text-sm hover:bg-[var(--color-secondary-main)]/85 transition-colors shrink-0 whitespace-nowrap"
        >
          Ansök som leverantör &rarr;
        </a>
      </div>
    </section>
  )
}

export { BrokerPartnerships, Suppliers }
