'use client'

import { clsx } from 'clsx'
import { useRouter, usePathname } from 'next/navigation'

const services = [
  {
    title: 'Flytthjälp & städ',
    description: 'Handplockade flyttfirmor och städbolag. Fasta priser, inga överraskningar.',
    tag: 'Mest populärt',
    highlight: 'Fasta priser',
    iconPath: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z',
    accentBg: 'bg-[var(--color-primary-main)]/10',
    accentHoverBg: 'group-hover:bg-[var(--color-primary-main)]',
    accentText: 'text-[var(--color-primary-main)]',
    tagColor: 'bg-[var(--color-primary-main)]/10 text-[var(--color-primary-main)]',
    borderHover: 'hover:border-[var(--color-primary-main)]/40 hover:shadow-[0_8px_30px_rgba(81,200,180,0.15)]',
  },
  {
    title: 'Elavtal',
    description: 'Jämför alla Sveriges elleverantörer. Byt på 2 minuter.',
    tag: 'Spara pengar',
    highlight: 'Upp till 30% billigare',
    iconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
    accentBg: 'bg-[#ffa65f]/10',
    accentHoverBg: 'group-hover:bg-[#ffa65f]',
    accentText: 'text-[#ffa65f]',
    tagColor: 'bg-[#ffa65f]/10 text-[#c97a30]',
    borderHover: 'hover:border-[#ffa65f]/40 hover:shadow-[0_8px_30px_rgba(255,166,95,0.12)]',
  },
  {
    title: 'Bredband & TV',
    description: 'Se exakt vilka leverantörer som finns på din adress.',
    tag: 'Adressbaserat',
    highlight: 'Alla operatörer',
    iconPath: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0',
    accentBg: 'bg-[#6ea8d4]/10',
    accentHoverBg: 'group-hover:bg-[#4a8ab8]',
    accentText: 'text-[#4a8ab8]',
    tagColor: 'bg-[#6ea8d4]/10 text-[#4a8ab8]',
    borderHover: 'hover:border-[#6ea8d4]/40 hover:shadow-[0_8px_30px_rgba(110,168,212,0.12)]',
  },
  {
    title: 'Hemförsäkring',
    description: 'Rätt skydd från dag ett. Vi hjälper dig jämföra.',
    tag: 'Trygghet',
    highlight: 'Skyddad från inflyttning',
    iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    accentBg: 'bg-[#7ecfa4]/10',
    accentHoverBg: 'group-hover:bg-[#5ab388]',
    accentText: 'text-[#5ab388]',
    tagColor: 'bg-[#7ecfa4]/10 text-[#5ab388]',
    borderHover: 'hover:border-[#7ecfa4]/40 hover:shadow-[0_8px_30px_rgba(126,207,164,0.12)]',
  },
  {
    title: 'Adressändring',
    description: 'Anmäl till Skatteverket och uppdatera alla avsändare.',
    tag: 'Tar 2 minuter',
    highlight: 'En och klar',
    iconPath: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    accentBg: 'bg-[#c49bd4]/10',
    accentHoverBg: 'group-hover:bg-[#9b6ab8]',
    accentText: 'text-[#9b6ab8]',
    tagColor: 'bg-[#c49bd4]/10 text-[#9b6ab8]',
    borderHover: 'hover:border-[#c49bd4]/40 hover:shadow-[0_8px_30px_rgba(196,155,212,0.12)]',
  },
  {
    title: 'Hantverkare',
    description: 'Montering, målning, installationer. Verifierade proffs nära dig.',
    tag: 'Verifierade',
    highlight: 'Proffs nära dig',
    iconPath: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
    accentBg: 'bg-[#e8956d]/10',
    accentHoverBg: 'group-hover:bg-[#d4724a]',
    accentText: 'text-[#d4724a]',
    tagColor: 'bg-[#e8956d]/10 text-[#d4724a]',
    borderHover: 'hover:border-[#e8956d]/40 hover:shadow-[0_8px_30px_rgba(232,149,109,0.12)]',
  },
]

const steps = [
  {
    number: '01',
    title: 'Logga in med BankID',
    description: 'Säker identifiering. Vi hämtar din adress och sätter ihop din personliga flytt-profil.',
    iconPath: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z',
  },
  {
    number: '02',
    title: 'Få din personliga checklista',
    description: 'Vi vet vad som behöver göras och i vilken ordning. Inga viktiga saker missas.',
    iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
  },
  {
    number: '03',
    title: 'Jämför och boka',
    description: 'Välj leverantörer, boka tjänster och bocka av. Allt samlas på ett ställe.',
    iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
]

const Services = () => {
  const router = useRouter()
  const pathname = usePathname()

  const loginUrl = process.env.NODE_ENV === 'development'
    ? '/i/testmode'
    : `/login${pathname !== '/' ? `?ref=${pathname}` : ''}`

  return (
    <section id="tjanster" className="relative overflow-hidden">

      {/* Hero banner */}
      <div className="relative bg-gradient-to-br from-[#1a3a52] via-[var(--color-secondary-main)] to-[#2d5a7b] py-20 md:py-28">
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 left-[5%] w-72 h-72 bg-[var(--color-primary-main)]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-8 right-[8%] w-80 h-80 bg-[var(--color-accent-main)]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--color-primary-main)]/5 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
          {/* Label */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5">
              <span className="w-2 h-2 bg-[var(--color-primary-main)] rounded-full" />
              <span className="text-sm font-semibold text-white tracking-wide uppercase">
                Allt samlat
              </span>
            </div>
          </div>

          {/* Headline */}
          <div className="text-center max-w-[760px] mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-[58px] font-bold text-white leading-[1.1] mb-6">
              En flytt, ett ställe -{' '}
              <span className="text-[var(--color-accent-main)]">allt ordnat</span>
            </h1>
            <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-[580px] mx-auto">
              Vi har hjälpt 200 000+ personer flytta. Från städ och el till adressändring - du slipper springa runt.
            </p>
          </div>

          {/* Stat pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {[
              { label: '200 000+ flytt klara' },
              { label: 'Kostnadsfritt' },
              { label: 'BankID-inloggning' },
            ].map((stat) => (
              <span
                key={stat.label}
                className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2 text-sm text-white/90 font-medium"
              >
                <svg className="w-3.5 h-3.5 text-[var(--color-primary-main)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {stat.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Services grid */}
      <div className="bg-[var(--color-background-default)] py-16 md:py-24 relative">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-24 right-[4%] w-72 h-72 bg-[var(--color-primary-main)]/4 rounded-full blur-3xl" />
          <div className="absolute bottom-16 left-[6%] w-64 h-64 bg-[var(--color-accent-main)]/4 rounded-full blur-3xl" />
        </div>

        <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className={clsx(
                  'relative bg-white rounded-2xl p-6 md:p-8',
                  'border border-[var(--color-secondary-main)]/8',
                  'transition-all duration-300',
                  'group cursor-default',
                  service.borderHover
                )}
              >
                {/* Tag */}
                <span className={clsx(
                  'inline-block text-xs font-semibold rounded-full px-3 py-1 mb-4',
                  service.tagColor
                )}>
                  {service.tag}
                </span>

                {/* Icon */}
                <div className={clsx(
                  'w-11 h-11 rounded-xl flex items-center justify-center mb-4',
                  service.accentBg,
                  service.accentHoverBg,
                  'transition-colors duration-300'
                )}>
                  <svg
                    className={clsx('w-5 h-5 transition-colors duration-300', service.accentText, 'group-hover:text-white')}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={service.iconPath} />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[var(--color-secondary-main)] mb-2">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-[var(--color-secondary-main)]/60 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Highlight */}
                <div className={clsx('flex items-center gap-2', service.accentText)}>
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold text-sm">{service.highlight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Så fungerar det */}
      <div className="bg-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-16 left-[10%] w-64 h-64 bg-[var(--color-primary-main)]/4 rounded-full blur-3xl" />
          <div className="absolute bottom-16 right-[10%] w-80 h-80 bg-[var(--color-accent-main)]/4 rounded-full blur-3xl" />
        </div>

        <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-14 md:mb-16">
            <span className="inline-block text-[var(--color-primary-main)] text-sm font-semibold uppercase tracking-wider mb-4">
              Så enkelt är det
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[var(--color-secondary-main)] mb-4 leading-[1.15]">
              Sa fungerar det
            </h2>
            <p className="text-lg text-[var(--color-secondary-main)]/60 max-w-[520px] mx-auto">
              Tre steg - sedan har du koll pa hela flytten.
            </p>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Connecting line - desktop */}
            <div
              className="hidden md:block absolute top-[52px] left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px"
              style={{ background: 'linear-gradient(to right, rgba(81,200,180,0.15), rgba(81,200,180,0.4), rgba(81,200,180,0.15))' }}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={clsx(
                    'relative bg-[var(--color-background-default)] rounded-2xl p-6 md:p-8',
                    'border border-[var(--color-primary-main)]/10',
                    'hover:border-[var(--color-primary-main)]/30',
                    'hover:shadow-[0_8px_30px_rgba(81,200,180,0.12)]',
                    'transition-all duration-300 group'
                  )}
                >
                  {/* Step number - decorative bg */}
                  <span className="absolute top-5 right-6 text-5xl font-bold text-[var(--color-primary-main)]/8 group-hover:text-[var(--color-primary-main)]/15 transition-colors select-none">
                    {step.number}
                  </span>

                  {/* Icon */}
                  <div className={clsx(
                    'w-12 h-12 rounded-xl flex items-center justify-center mb-5',
                    'bg-[var(--color-primary-main)]/10',
                    'group-hover:bg-[var(--color-primary-main)]',
                    'transition-colors duration-300'
                  )}>
                    <svg
                      className="w-5 h-5 text-[var(--color-primary-main)] group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={step.iconPath} />
                    </svg>
                  </div>

                  <h3 className="text-base md:text-lg font-bold text-[var(--color-secondary-main)] mb-2 pr-8">
                    {step.title}
                  </h3>
                  <p className="text-[var(--color-secondary-main)]/55 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="relative bg-gradient-to-br from-[#1a3a52] via-[var(--color-secondary-main)] to-[#2d5a7b] py-16 md:py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 right-[8%] w-72 h-72 bg-[var(--color-primary-main)]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-[5%] w-64 h-64 bg-[var(--color-accent-main)]/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white mb-4 leading-[1.15]">
            Redo att flytta smartare?
          </h2>
          <p className="text-lg text-white/70 max-w-[480px] mx-auto mb-10">
            Skapa ett konto pa 2 minuter. Kostnadsfritt, alltid.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => router.push(loginUrl)}
              className={clsx(
                'inline-flex items-center gap-3 rounded-full font-bold text-base',
                'bg-[var(--color-accent-main)] text-white',
                'px-8 py-4',
                'hover:bg-[#ff9240]',
                'transition-colors duration-200',
                'shadow-[0_4px_20px_rgba(255,166,95,0.35)]'
              )}
            >
              Kom igang gratis
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            <button
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-white/70 hover:text-white text-sm font-medium underline underline-offset-4 transition-colors"
            >
              Se hur det fungerar
            </button>
          </div>

          <p className="text-white/40 text-xs mt-6">
            Logga in med BankID &bull; Inga kortuppgifter
          </p>
        </div>
      </div>

    </section>
  )
}

export default Services
