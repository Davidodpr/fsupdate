'use client'

import { clsx } from 'clsx'
import { useState } from 'react'

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const teamMembers = [
  {
    name: 'Erik Lindström',
    role: 'VD & grundare',
    detail: 'Har själv flyttat sju gånger på fem år. Startade Flyttsmart för att slippa ringa tio olika bolag.',
    initials: 'EL',
  },
  {
    name: 'Sara Andersson',
    role: 'Head of Partnerships',
    detail: 'Bakgrund från fastighetsbranschen. Pratar med mäklare på dagarna, lyssnar på true crime på nätterna.',
    initials: 'SA',
  },
  {
    name: 'Marcus Holm',
    role: 'Tech Lead',
    detail: 'Tidigare Klarna. Dricker för mycket kaffe och skriver för lite kommentarer i koden.',
    initials: 'MH',
  },
  {
    name: 'Johan Berg',
    role: 'Produktchef',
    detail: 'Besatt av att ta bort knappar. Om det kan göras enklare, Johan hittar ett sätt.',
    initials: 'JB',
  },
  {
    name: 'Elin Svensson',
    role: 'Kundansvarig',
    detail: 'Leder kundteamet med järnhand i sammetsvante. Svarar snabbare på mail än de flesta svarar på sms.',
    initials: 'ES',
  },
  {
    name: 'Anna Nilsson',
    role: 'Leverantörskvalitet',
    detail: 'Kvalitetsgranskar varenda partner i nätverket. Säger nej fler gånger än hon säger ja - och det är grejen.',
    initials: 'AN',
  },
]

const values = [
  {
    label: 'Kundbesatta',
    description: 'Varje beslut börjar med en fråga: vad löser detta för den som just ska flytta? Inte vad som är lättast för oss.',
  },
  {
    label: 'Transparenta',
    description: 'Inga dolda avgifter. Inga överraskningar. Du ser exakt vad du betalar och varför - innan du bestämmer dig.',
  },
  {
    label: 'Ambitiösa',
    description: '200 000 hjälpta flyttare är ett bra start. Vi siktar på att bli lika självklara som att googla när Sverige ska flytta.',
  },
]

const stats = [
  { value: '200 000+', label: 'Hjälpta flyttare' },
  { value: '40+', label: 'Samarbetspartners' },
  { value: '96,4 %', label: 'Nöjdhetsgrad' },
  { value: '2019', label: 'Grundat' },
]

const faqItems = [
  {
    question: 'Kostar det något att använda Flyttsmart?',
    answer: 'Nej, helt gratis. Vi tar betalt av leverantörerna, inte av dig.',
  },
  {
    question: 'Hur lång tid tar det?',
    answer: 'Ca 10 minuter. Du fyller i din flytt en gång och vi skickar förfrågan till relevanta leverantörer.',
  },
  {
    question: 'Kan jag ringa er?',
    answer: 'Ja. Vi finns på 08-12 00 88 22 måndag till fredag, 09-16.',
  },
]

const openPositions = [
  {
    title: 'Fullstack-utvecklare',
    type: 'Heltid',
    location: 'Stockholm / Hybrid',
    description:
      'Vi bygger nästa generation av Flyttsmart och behöver en utvecklare som trivs med React, Next.js och TypeScript. Du jobbar nära produkt och sätter fingertrycket på saker hundratusentals människor använder.',
  },
  {
    title: 'Kundservicemedarbetare',
    type: 'Heltid',
    location: 'Stockholm',
    description:
      'Du blir rösten som hjälper folk i ett av livets mer stressiga ögonblick. Jobbet kräver tålamod, empati och förmågan att lösa problem snabbt - helst utan att kunden ens märker att det var ett problem.',
  },
  {
    title: 'Partneransvarig',
    type: 'Heltid',
    location: 'Stockholm / Hybrid',
    description:
      'Bygg och fördjupa samarbeten med mäklarkedjor, energibolag och tjänsteleverantörer. Du äger relationen och driver affären - med stöd från ett team som levererar det du lovar.',
  },
]

const perks = [
  { label: 'Hybrid Stockholm', description: 'Kontor i city, jobba hemifrån när det passar.' },
  { label: 'Snabbväxande', description: 'Vi dubblar omsättningen och teamet.' },
  { label: 'Stor påverkan direkt', description: 'Dina idéer når produktion - inte en backlog.' },
  { label: 'Äkta teamkultur', description: 'Platt org, korta beslutsvägar och ett team som faktiskt äter lunch ihop.' },
]

// ---------------------------------------------------------------------------
// Shared sub-components
// ---------------------------------------------------------------------------

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
)

interface FaqItemProps {
  question: string
  answer: string
}

const FaqItem = ({ question, answer }: FaqItemProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left hover:text-[var(--color-primary-main)] transition-colors"
        aria-expanded={open}
      >
        <span className="font-medium text-[var(--color-secondary-main)] text-[15px]">{question}</span>
        <ChevronDownIcon
          className={clsx(
            'w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>
      {open && (
        <div className="pb-4">
          <p className="text-sm text-[var(--color-secondary-main)]/60 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// TeamSection (Om oss)
// ---------------------------------------------------------------------------

const TeamSection = () => {
  return (
    <section className="pb-16 md:pb-24">
      {/* Page header */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-12 md:pt-16 pb-12 md:pb-16">
        <p className="text-[var(--color-primary-main)] text-sm font-semibold uppercase tracking-wider mb-3">
          Om Flyttsmart
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-secondary-main)] mb-4 leading-tight max-w-[700px]">
          Vi bygger Sveriges smartaste flyttupplevelse
        </h1>
        <p className="text-lg text-[var(--color-secondary-main)]/60 max-w-[560px] leading-relaxed">
          Ett team av 20 personer som alla har en gemensam övertygelse: att flytta i Sverige ska vara enkelt, inte ett halvtidsjobb.
        </p>
      </div>

      {/* Stats bar */}
      <div className="bg-[var(--color-secondary-main)] py-10 mb-16 md:mb-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[var(--color-primary-main)] mb-1">
                {stat.value}
              </div>
              <div className="text-white/50 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Story */}
        <div className="max-w-[680px] mb-20 md:mb-24">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--color-secondary-main)] mb-5">
            Varför Flyttsmart uppstod
          </h2>
          <div className="space-y-4 text-[var(--color-secondary-main)]/70 leading-relaxed">
            <p>
              Att flytta i Sverige är en logistisk mardröm. Tio samtal till tio olika bolag, offerter som inte går att jämföra och en känsla av att man alltid missar något. Det visste vi av erfarenhet.
            </p>
            <p>
              2019 grundade Erik Flyttsmart med en enkel idé: samla allt på ett ställe. Inte som en marknadsplats för reklam - utan som ett verktyg som faktiskt hjälper dig flytta. Utan stress, utan gissningar.
            </p>
            <p>
              Idag har vi hjälpt över 200 000 personer och vi har knappt börjat.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20 md:mb-24">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--color-secondary-main)] mb-8">
            Vad vi tror på
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-100 rounded-xl overflow-hidden">
            {values.map((value) => (
              <div key={value.label} className="bg-white p-7 md:p-8">
                <h3 className="text-base font-bold text-[var(--color-secondary-main)] mb-2">{value.label}</h3>
                <p className="text-[var(--color-secondary-main)]/55 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team grid */}
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-[var(--color-secondary-main)] mb-8">
            Några av oss
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 rounded-xl overflow-hidden">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white p-6 md:p-7">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary-main)]/10 text-[var(--color-primary-main)] flex items-center justify-center mb-4 font-bold text-xs">
                  {member.initials}
                </div>
                <h3 className="font-bold text-[var(--color-secondary-main)] text-[15px]">{member.name}</h3>
                <p className="text-[var(--color-primary-main)] text-xs font-semibold uppercase tracking-wide mb-2">
                  {member.role}
                </p>
                <p className="text-[var(--color-secondary-main)]/50 text-sm leading-relaxed">{member.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// ContactSection
// ---------------------------------------------------------------------------

const ContactSection = () => {
  return (
    <section className="pb-16 md:pb-24">
      {/* Page header */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-12 md:pt-16 pb-12 md:pb-16">
        <p className="text-[var(--color-primary-main)] text-sm font-semibold uppercase tracking-wider mb-3">
          Kontakt
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-secondary-main)] mb-4">
          Hör av dig
        </h1>
        <p className="text-lg text-[var(--color-secondary-main)]/60 max-w-[480px] leading-relaxed">
          Vi svarar snabbt. Oavsett om du har en fråga om din flytt, vill samarbeta eller bara vill berätta något.
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Contact info */}
        <div className="grid md:grid-cols-2 gap-px bg-gray-100 rounded-xl overflow-hidden mb-12">
          {/* Customer support */}
          <div className="bg-white p-7 md:p-8">
            <h3 className="text-base font-bold text-[var(--color-secondary-main)] mb-1">Kundservice</h3>
            <p className="text-sm text-[var(--color-secondary-main)]/50 mb-5">Mån-fre 09:00 - 16:00</p>
            <div className="space-y-3">
              <a href="tel:+46812008822" className="flex items-center gap-3 text-[var(--color-secondary-main)] hover:text-[var(--color-primary-main)] transition-colors group">
                <span className="w-8 h-8 rounded-full bg-[var(--color-primary-main)]/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[var(--color-primary-main)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </span>
                <span className="text-[15px] font-medium">08-12 00 88 22</span>
              </a>
              <a href="mailto:hej@flyttsmart.se" className="flex items-center gap-3 text-[var(--color-secondary-main)] hover:text-[var(--color-primary-main)] transition-colors group">
                <span className="w-8 h-8 rounded-full bg-[var(--color-primary-main)]/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[var(--color-primary-main)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                <span className="text-[15px] font-medium">hej@flyttsmart.se</span>
              </a>
            </div>
            <p className="text-xs text-[var(--color-secondary-main)]/40 mt-5">
              Vi svarar på mail inom en arbetsdag. Akuta ärenden - ring oss.
            </p>
          </div>

          {/* Partners and press */}
          <div className="bg-white p-7 md:p-8">
            <h3 className="text-base font-bold text-[var(--color-secondary-main)] mb-1">Samarbeten & press</h3>
            <p className="text-sm text-[var(--color-secondary-main)]/50 mb-5">Partnerskap, media och affärsfrågor</p>
            <div className="space-y-3">
              <a href="mailto:partner@flyttsmart.se" className="flex items-center gap-3 text-[var(--color-secondary-main)] hover:text-[var(--color-accent-main)] transition-colors">
                <span className="w-8 h-8 rounded-full bg-[var(--color-accent-main)]/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[var(--color-accent-main)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                <span className="text-[15px] font-medium">partner@flyttsmart.se</span>
              </a>
              <a href="mailto:press@flyttsmart.se" className="flex items-center gap-3 text-[var(--color-secondary-main)] hover:text-[var(--color-accent-main)] transition-colors">
                <span className="w-8 h-8 rounded-full bg-[var(--color-accent-main)]/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[var(--color-accent-main)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                <span className="text-[15px] font-medium">press@flyttsmart.se</span>
              </a>
            </div>
            <p className="text-xs text-[var(--color-secondary-main)]/40 mt-5">
              Vi samarbetar med mäklarkedjor, energibolag, bredband och försäkringsbolag.
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-[680px]">
          <h2 className="text-xl font-bold text-[var(--color-secondary-main)] mb-6">Vanliga frågor</h2>
          <div>
            {faqItems.map((item) => (
              <FaqItem key={item.question} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// CareersSection
// ---------------------------------------------------------------------------

const CareersSection = () => {
  return (
    <section className="pb-16 md:pb-24">
      {/* Page header */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-12 md:pt-16 pb-12 md:pb-16">
        <p className="text-[var(--color-primary-main)] text-sm font-semibold uppercase tracking-wider mb-3">
          Karriär
        </p>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-secondary-main)] mb-4 leading-tight max-w-[640px]">
          Hjälp oss förändra hur Sverige flyttar
        </h1>
        <p className="text-lg text-[var(--color-secondary-main)]/60 max-w-[520px] leading-relaxed">
          Vi är ett litet team med stor ambition. Om du vill bygga något som faktiskt används - och märks - är det här rätt ställe.
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Perks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100 rounded-xl overflow-hidden mb-16 md:mb-20">
          {perks.map((perk) => (
            <div key={perk.label} className="bg-white p-5 md:p-6">
              <h3 className="font-bold text-[var(--color-secondary-main)] text-sm mb-1">{perk.label}</h3>
              <p className="text-[var(--color-secondary-main)]/50 text-xs leading-relaxed">{perk.description}</p>
            </div>
          ))}
        </div>

        {/* Open positions */}
        <div className="mb-16 md:mb-20">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--color-secondary-main)] mb-8">
            Just nu söker vi
          </h2>
          <div className="space-y-3">
            {openPositions.map((position) => (
              <div
                key={position.title}
                className="bg-white rounded-xl p-5 md:p-7 border border-gray-100 hover:border-[var(--color-primary-main)]/30 transition-colors group"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-[var(--color-secondary-main)] group-hover:text-[var(--color-primary-main)] transition-colors mb-2">
                      {position.title}
                    </h3>
                    <p className="text-[var(--color-secondary-main)]/55 text-sm leading-relaxed mb-3 max-w-[580px]">
                      {position.description}
                    </p>
                    <div className="flex gap-2">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-[var(--color-primary-main)]/10 text-[var(--color-primary-main)]">
                        {position.type}
                      </span>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-gray-50 text-gray-500">
                        {position.location}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`mailto:jobb@flyttsmart.se?subject=Ansökan: ${encodeURIComponent(position.title)}`}
                    className="text-sm font-semibold text-[var(--color-primary-main)] hover:underline shrink-0 self-start md:mt-1"
                  >
                    Sök tjänsten &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Culture */}
        <div className="max-w-[600px] mb-16 md:mb-20">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--color-secondary-main)] mb-4">
            Platt org, tydligt ägarskap
          </h2>
          <div className="space-y-3 text-[var(--color-secondary-main)]/60 leading-relaxed">
            <p>
              Vi tror inte på hierarki för hierarkins skull. Alla äger sin del av produkten, beslutsvägar är korta och du förväntas ha en åsikt - och driva den.
            </p>
            <p>
              Vi rör oss snabbt, men inte slarvigt. Kvalitet och tempo går hand i hand när alla förstår varför vi gör det vi gör.
            </p>
          </div>
        </div>

        {/* Spontaneous CTA */}
        <div className="bg-[var(--color-secondary-main)] rounded-xl p-7 md:p-10 text-white">
          <h3 className="text-lg md:text-xl font-bold mb-2">Hittar du inte rätt roll?</h3>
          <p className="text-white/50 text-sm mb-5 max-w-[400px]">
            Vi är alltid intresserade av bra folk. Skicka ett mail med vem du är och vad du kan.
          </p>
          <a
            href="mailto:jobb@flyttsmart.se"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[var(--color-primary-main)] text-white font-semibold text-sm hover:bg-[var(--color-primary-main)]/85 transition-colors"
          >
            jobb@flyttsmart.se
          </a>
        </div>
      </div>
    </section>
  )
}

export { TeamSection, ContactSection, CareersSection }
