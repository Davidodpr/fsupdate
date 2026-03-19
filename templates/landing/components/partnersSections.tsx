'use client'

import { clsx } from 'clsx'

// ─── BrokerPartnerships data ───────────────────────────────────────────────

const brokerStats = [
  {
    value: '94%',
    label: 'Nöjdare kunder',
    description: 'Köpare som får tillgång till Flyttsmart uppger högre nöjdhet med sin mäklare.',
    iconPath: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    value: '3 tim',
    label: 'Sparad tid per affär',
    description: 'I snitt lägger mäklare tre timmar mindre per kund på praktiska frågor kring flytten.',
    iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    value: '+18%',
    label: 'Merförsäljning',
    description: 'Kunder som använder Flyttsmart köper tilläggstjänster i högre utsträckning via mäklarens nätverk.',
    iconPath: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  },
]

const brokerSteps = [
  {
    number: '01',
    title: 'Kunden får tillgång',
    description: 'Så fort affären är klar aktiveras köparens konto i Flyttsmart. Ingen manuell hantering krävs från mäklaren.',
    iconPath: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z',
  },
  {
    number: '02',
    title: 'Vi tar hand om flytten',
    description: 'Flyttsmart koordinerar allt: flytt, städ, el, bredband, försäkring och adressändring. Kunden har en kontaktpunkt.',
    iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  },
  {
    number: '03',
    title: 'Mäklaren får nöjdare kunder',
    description: 'Köparen minns ett smidigt köp. Rekommendationer, bra recensioner och återkommande kunder följer naturligt.',
    iconPath: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
  },
]

const brokerChains = [
  {
    name: 'Fastighetsbyrån',
    description: 'Sveriges största mäklarkedja. Alla deras kunder får tillgång till Flyttsmart som en del av mäklartjänsten.',
    stat: '200+ kontor',
    initials: 'FB',
  },
  {
    name: 'Mäklarhuset',
    description: 'Nära samarbete med Mäklarhusets kontor i hela landet. Tillsammans gör vi flytten enklare för deras köpare.',
    stat: '100+ mäklare',
    initials: 'MH',
  },
  {
    name: 'Bjurfors',
    description: 'Vi stöttar Bjurfors kunder med allt det praktiska kring flytten, direkt från tillträdesdagen.',
    stat: '80+ kontor',
    initials: 'BJ',
  },
  {
    name: 'ERA',
    description: 'ERA:s kunder får en personlig checklista och tillgång till alla våra tjänster utan extra kostnad.',
    stat: '50+ kontor',
    initials: 'ERA',
  },
]

// ─── Suppliers data ────────────────────────────────────────────────────────

const vettingSteps = [
  {
    label: 'Ansökan granskas',
    description: 'Vi kontrollerar F-skattsedel, försäkringar och eventuella branschcertifieringar.',
  },
  {
    label: 'Referenscheck',
    description: 'Vi pratar med tidigare kunder och verifierar omdömen på externa plattformar.',
  },
  {
    label: 'Provuppdrag',
    description: 'Leverantören genomför ett kontrollerat uppdrag som vi följer upp noggrant.',
  },
  {
    label: 'Löpande uppföljning',
    description: 'Betyg samlas in efter varje uppdrag. Leverantörer som sjunker under gränsen plockas bort.',
  },
]

const supplierCategories = [
  {
    category: 'Flytt och städ',
    description: 'Certifierade flyttfirmor och städbolag med verifierade omdömen och fasta priser. Vi jämför och matchar rätt leverantör till rätt uppdrag.',
    examples: ['Flytt Express', 'Hemfrid', 'Proffsstäd', 'Allstäd'],
    iconPath: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z',
  },
  {
    category: 'El och energi',
    description: 'Vi jämför elavtal från marknadens stora leverantörer. Kunden ser aktuella priser och villkor och väljer med full information.',
    examples: ['Tibber', 'Vattenfall', 'E.ON', 'Fortum'],
    iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
  },
  {
    category: 'Bredband',
    description: 'Adressbaserade sökningar visar vilka operatörer som faktiskt levererar till bostaden. Jämför pris, hastighet och kundnöjdhet på ett ställe.',
    examples: ['Telia', 'Telenor', 'Bredband2', 'Bahnhof'],
    iconPath: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0',
  },
  {
    category: 'Försäkring',
    description: 'Hemförsäkringar anpassade för ditt nya boende. Vi guidar kunden genom villkoren och ser till att de inte betalar för mycket.',
    examples: ['Länsförsäkringar', 'Trygg-Hansa', 'IF', 'Folksam'],
    iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
  {
    category: 'Hantverkare',
    description: 'Verifierade hantverkare för montering, målning och installationer. Alla med ROT-behörighet och kontrollerade referenser.',
    examples: ['Byggmax Service', 'Handy', 'Fixarn', 'Proffshantverkarna'],
    iconPath: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
  },
]

const trustSignals = [
  { value: '500+', label: 'Godkända leverantörer' },
  { value: '96%', label: 'Nöjda kunder efter uppdrag' },
  { value: '48 tim', label: 'Max svarstid vid klagomål' },
]

// ─── BrokerPartnerships ────────────────────────────────────────────────────

const BrokerPartnerships = () => {
  return (
    <section
      id="maklarsamarbeten"
      className="py-20 md:py-28 bg-gradient-to-br from-[#1a3a52] via-[#214766] to-[#2d5a7b] text-white relative overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-[15%] w-72 h-72 bg-[var(--color-primary-main)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-[55%] left-[60%] w-48 h-48 bg-[var(--color-accent-main)]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">

        {/* Hero header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block text-[var(--color-primary-main)] text-sm font-semibold uppercase tracking-wider mb-4">
            Mäklarsamarbeten
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 max-w-[800px] mx-auto leading-tight">
            Vi gör flytten enklare - tillsammans med Sveriges mäklare
          </h2>
          <p className="text-lg text-white/60 max-w-[660px] mx-auto leading-relaxed">
            Vi samarbetar med landets ledande mäklarkedjor för att ge deras köpare ett komplett stöd kring flytten. Mäklaren slipper praktiska frågor. Kunden slipper stressen. Alla vinner.
          </p>
        </div>

        {/* Value proposition stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {brokerStats.map((stat, index) => (
            <div
              key={index}
              className={clsx(
                'rounded-2xl p-6 md:p-8',
                'bg-white/10 backdrop-blur-sm',
                'border border-white/10',
                'hover:border-[var(--color-primary-main)]/40',
                'hover:bg-white/15',
                'transition-all duration-300',
                'group'
              )}
            >
              <div className={clsx(
                'w-11 h-11 rounded-xl flex items-center justify-center mb-5',
                'bg-[var(--color-primary-main)]/20',
                'group-hover:bg-[var(--color-primary-main)]',
                'transition-colors duration-300'
              )}>
                <svg
                  className="w-5 h-5 text-[var(--color-primary-main)] group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={stat.iconPath} />
                </svg>
              </div>
              <div className="text-3xl font-bold text-[var(--color-primary-main)] mb-1">{stat.value}</div>
              <div className="text-base font-semibold mb-2">{stat.label}</div>
              <p className="text-white/50 text-sm leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* How the partnership works */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Så fungerar samarbetet</h3>
            <p className="text-white/50 text-base max-w-[520px] mx-auto">
              Tre steg - och mäklaren behöver inte göra ett enda av dem manuellt.
            </p>
          </div>

          {/* Steps with connector line on desktop */}
          <div className="relative">
            <div
              className="hidden md:block absolute top-14 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-[var(--color-primary-main)]/20 via-[var(--color-primary-main)]/50 to-[var(--color-primary-main)]/20"
              aria-hidden="true"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {brokerSteps.map((step, index) => (
                <div
                  key={index}
                  className={clsx(
                    'relative rounded-2xl p-6 md:p-8',
                    'bg-white/10 backdrop-blur-sm',
                    'border border-white/10',
                    'hover:border-[var(--color-primary-main)]/40',
                    'hover:bg-white/15',
                    'transition-all duration-300',
                    'group'
                  )}
                >
                  <span className="absolute top-6 right-6 text-4xl font-bold text-white/10 group-hover:text-white/20 transition-colors select-none">
                    {step.number}
                  </span>
                  <div className={clsx(
                    'w-11 h-11 rounded-xl flex items-center justify-center mb-5',
                    'bg-[var(--color-primary-main)]/20',
                    'group-hover:bg-[var(--color-primary-main)]',
                    'transition-colors duration-300'
                  )}>
                    <svg
                      className="w-5 h-5 text-[var(--color-primary-main)] group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={step.iconPath} />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold mb-2 pr-10">{step.title}</h4>
                  <p className="text-white/55 text-sm leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Partner chains */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Nuvarande samarbetspartners</h3>
            <p className="text-white/50 text-base max-w-[520px] mx-auto">
              Vi samarbetar med kedjor som representerar tusentals mäklare och hundratusentals köpare per år.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {brokerChains.map((chain, index) => (
              <div
                key={index}
                className={clsx(
                  'flex items-start gap-5 rounded-2xl p-6',
                  'bg-white/10 backdrop-blur-sm',
                  'border border-white/10',
                  'hover:border-[var(--color-primary-main)]/40',
                  'hover:bg-white/15',
                  'transition-all duration-300',
                  'group'
                )}
              >
                {/* Logo placeholder with initials */}
                <div className={clsx(
                  'flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center',
                  'bg-[var(--color-primary-main)]/20 border border-[var(--color-primary-main)]/20',
                  'group-hover:bg-[var(--color-primary-main)] group-hover:border-[var(--color-primary-main)]',
                  'transition-all duration-300',
                  'font-bold text-sm text-[var(--color-primary-main)] group-hover:text-white'
                )}>
                  {chain.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <h4 className="text-base font-bold">{chain.name}</h4>
                    <span className="flex-shrink-0 text-xs font-semibold text-[var(--color-primary-main)] bg-[var(--color-primary-main)]/15 px-3 py-1 rounded-full">
                      {chain.stat}
                    </span>
                  </div>
                  <p className="text-white/55 text-sm leading-relaxed">{chain.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center rounded-2xl bg-white/5 border border-white/10 py-10 px-6">
          <h3 className="text-2xl font-bold mb-3">Vill du bli samarbetspartner?</h3>
          <p className="text-white/55 text-base mb-6 max-w-[480px] mx-auto">
            Vi väljer samarbetspartners med omsorg. Hör av dig så berättar vi mer om hur det fungerar.
          </p>
          <a
            href="mailto:partner@flyttsmart.se"
            className={clsx(
              'inline-flex items-center gap-2 px-8 py-3 rounded-full',
              'bg-[var(--color-primary-main)] text-white font-semibold',
              'hover:bg-[var(--color-primary-main)]/85 transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-main)] focus:ring-offset-2 focus:ring-offset-[#214766]'
            )}
          >
            Bli samarbetspartner
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <p className="mt-4 text-white/35 text-sm">partner@flyttsmart.se</p>
        </div>

      </div>
    </section>
  )
}

// ─── Suppliers ─────────────────────────────────────────────────────────────

const Suppliers = () => {
  return (
    <section
      id="leverantorer"
      className="py-20 md:py-28 bg-[var(--color-background-default)] relative overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" aria-hidden="true">
        <div className="absolute top-24 right-[8%] w-80 h-80 bg-[var(--color-primary-main)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-16 left-[5%] w-64 h-64 bg-[var(--color-accent-main)]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">

        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block text-[var(--color-primary-main)] text-sm font-semibold uppercase tracking-wider mb-4">
            Leverantorsnätverk
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-secondary-main)] mb-5">
            Kvalitetssäkrade leverantörer i hela Sverige
          </h2>
          <p className="text-lg text-[var(--color-secondary-main)]/60 max-w-[640px] mx-auto leading-relaxed">
            Vi väljer noggrant vilka leverantörer som får vara en del av Flyttsmart. Det är ett löpande arbete - inte bara en engångskontroll.
          </p>
        </div>

        {/* Vetting process */}
        <div className="mb-20 bg-white rounded-2xl border border-[var(--color-primary-main)]/10 p-8 md:p-10">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-11 h-11 rounded-xl bg-[var(--color-primary-main)]/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-[var(--color-primary-main)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[var(--color-secondary-main)] mb-1">Hur vi väljer leverantörer</h3>
              <p className="text-[var(--color-secondary-main)]/55 text-sm">
                Alla i nätverket har gått igenom samma process. Inga undantag.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {vettingSteps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector line between steps on large screens */}
                {index < vettingSteps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-5 left-full w-4 h-px bg-[var(--color-primary-main)]/20 z-10"
                    aria-hidden="true"
                  />
                )}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-primary-main)]/10 flex items-center justify-center flex-shrink-0 text-xs font-bold text-[var(--color-primary-main)]">
                    {index + 1}
                  </div>
                  <span className="font-semibold text-[var(--color-secondary-main)] text-sm">{step.label}</span>
                </div>
                <p className="text-[var(--color-secondary-main)]/55 text-xs leading-relaxed pl-11">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Supplier category cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {supplierCategories.map((item, index) => (
            <div
              key={index}
              className={clsx(
                'relative bg-white rounded-2xl p-6 md:p-8',
                'border border-[var(--color-primary-main)]/10',
                'hover:border-[var(--color-primary-main)]/30',
                'hover:shadow-[0_8px_30px_rgba(81,200,180,0.15)]',
                'transition-all duration-300',
                'group'
              )}
            >
              {/* Icon */}
              <div className={clsx(
                'w-11 h-11 rounded-xl flex items-center justify-center mb-5',
                'bg-[var(--color-primary-main)]/10',
                'group-hover:bg-[var(--color-primary-main)]',
                'transition-colors duration-300'
              )}>
                <svg
                  className="w-5 h-5 text-[var(--color-primary-main)] group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.iconPath} />
                </svg>
              </div>

              {/* Verified badge */}
              <div className="absolute top-6 right-6 flex items-center gap-1 text-xs font-medium text-[var(--color-primary-main)]">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Godkänd</span>
              </div>

              <h3 className="text-lg font-bold text-[var(--color-secondary-main)] mb-2">{item.category}</h3>
              <p className="text-[var(--color-secondary-main)]/55 text-sm leading-relaxed mb-5">{item.description}</p>

              {/* Example partners */}
              <div className="flex flex-wrap gap-2">
                {item.examples.map((example) => (
                  <span
                    key={example}
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-[var(--color-primary-main)]/10 text-[var(--color-primary-main)]"
                  >
                    {example}
                  </span>
                ))}
                <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-gray-100 text-gray-500">
                  + fler
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Trust signals */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          {trustSignals.map((signal, index) => (
            <div
              key={index}
              className="text-center py-8 rounded-2xl bg-white border border-[var(--color-primary-main)]/10"
            >
              <div className="text-3xl md:text-4xl font-bold text-[var(--color-primary-main)] mb-2">
                {signal.value}
              </div>
              <div className="text-[var(--color-secondary-main)]/60 text-sm font-medium">{signal.label}</div>
            </div>
          ))}
        </div>

        {/* Quality promise banner */}
        <div className="mb-16 flex flex-col sm:flex-row items-center gap-4 rounded-2xl bg-[var(--color-secondary-main)] text-white p-6 md:p-8">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[var(--color-primary-main)]/20 flex items-center justify-center">
            <svg className="w-6 h-6 text-[var(--color-primary-main)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="font-semibold mb-0.5">Alla leverantörer genomgår vår kvalitetskontroll</p>
            <p className="text-white/55 text-sm">
              Vi övervakar betyg löpande. Leverantörer som inte håller måttet lämnar nätverket.
            </p>
          </div>
        </div>

        {/* Supplier CTA */}
        <div className="text-center rounded-2xl bg-white border border-[var(--color-primary-main)]/15 py-10 px-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-accent-main)]/10 mb-5">
            <svg className="w-6 h-6 text-[var(--color-accent-main)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-[var(--color-secondary-main)] mb-3">
            Vill du bli leverantör?
          </h3>
          <p className="text-[var(--color-secondary-main)]/55 text-base mb-6 max-w-[480px] mx-auto">
            Vi är alltid öppna för leverantörer som håller hög kvalitet. Hör av dig så tittar vi på om det passar.
          </p>
          <a
            href="mailto:leverantor@flyttsmart.se"
            className={clsx(
              'inline-flex items-center gap-2 px-8 py-3 rounded-full',
              'bg-[var(--color-secondary-main)] text-white font-semibold',
              'hover:bg-[var(--color-secondary-main)]/85 transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary-main)] focus:ring-offset-2'
            )}
          >
            Ansök som leverantör
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <p className="mt-4 text-[var(--color-secondary-main)]/35 text-sm">leverantor@flyttsmart.se</p>
        </div>

      </div>
    </section>
  )
}

export { BrokerPartnerships, Suppliers }
