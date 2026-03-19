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
    color: 'primary',
  },
  {
    name: 'Sara Andersson',
    role: 'Head of Partnerships',
    detail: 'Bakgrund från fastighetsbranschen. Pratar med mäklare på dagarna, lyssnar på true crime på nätterna.',
    initials: 'SA',
    color: 'accent',
  },
  {
    name: 'Marcus Holm',
    role: 'Tech Lead',
    detail: 'Tidigare Klarna. Dricker för mycket kaffe och skriver för lite kommentarer i koden.',
    initials: 'MH',
    color: 'primary',
  },
  {
    name: 'Johan Berg',
    role: 'Produktchef',
    detail: 'Besatt av att ta bort knappar. Om det kan göras enklare, Johan hittar ett sätt.',
    initials: 'JB',
    color: 'accent',
  },
  {
    name: 'Elin Svensson',
    role: 'Kundansvarig',
    detail: 'Leder kundteamet med järnhand i sammetsvante. Svarar snabbare på mail än de flesta svarar på sms.',
    initials: 'ES',
    color: 'primary',
  },
  {
    name: 'Anna Nilsson',
    role: 'Leverantörskvalitet',
    detail: 'Kvalitetsgranskar varenda partner i nätverket. Säger nej fler gånger än hon säger ja - och det är grejen.',
    initials: 'AN',
    color: 'accent',
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
  {
    label: 'Hybrid Stockholm',
    description: 'Kontor i city, jobba hemifrån när det passar. Ingen registrering krävs.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
  {
    label: 'Snabbväxande',
    description: 'Vi dubblar omsättningen och teamet. Det är inte tomma ord den här gången.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    label: 'Stor påverkan direkt',
    description: 'Ingen väntelista för att få synas. Dina idéer når produktion - inte en backlog.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    label: 'Äkta teamkultur',
    description: 'Platt org, korta beslutsvägar och ett team som faktiskt äter lunch ihop.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
]

// ---------------------------------------------------------------------------
// Shared sub-components
// ---------------------------------------------------------------------------

const PhoneIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
  </svg>
)

const MailIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
)

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
)

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
)

interface ContactLinkProps {
  href: string
  icon: React.ReactNode
  label: string
  accentColor?: 'primary' | 'accent'
}

const ContactLink = ({ href, icon, label, accentColor = 'primary' }: ContactLinkProps) => (
  <a
    href={href}
    className={clsx(
      'flex items-center gap-3 p-3 rounded-xl',
      'bg-white border border-gray-100',
      'hover:border-[var(--color-primary-main)] hover:bg-[var(--color-primary-main)]/5',
      'transition-all duration-200 group'
    )}
  >
    <div
      className={clsx(
        'w-10 h-10 rounded-full flex items-center justify-center shrink-0',
        accentColor === 'accent'
          ? 'bg-[var(--color-accent-main)]/10'
          : 'bg-[var(--color-primary-main)]/10'
      )}
    >
      {icon}
    </div>
    <span className="font-medium text-[var(--color-secondary-main)] group-hover:text-[var(--color-primary-main)] transition-colors text-sm">
      {label}
    </span>
  </a>
)

interface FaqItemProps {
  question: string
  answer: string
}

const FaqItem = ({ question, answer }: FaqItemProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left bg-white hover:bg-[var(--color-background-default)] transition-colors"
        aria-expanded={open}
      >
        <span className="font-medium text-[var(--color-secondary-main)] text-sm">{question}</span>
        <ChevronDownIcon
          className={clsx(
            'w-4 h-4 text-[var(--color-primary-main)] shrink-0 transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>
      {open && (
        <div className="px-6 pb-4 bg-white">
          <p className="text-sm text-[var(--color-secondary-main)]/60 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// TeamSection
// ---------------------------------------------------------------------------

const TeamSection = () => {
  return (
    <section id="vi-pa-flyttsmart" className="relative overflow-hidden">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1a3a52] via-[#214766] to-[#1e5080] text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-[12%] w-96 h-96 bg-[var(--color-primary-main)]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-[8%] w-72 h-72 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute top-8 left-[40%] w-48 h-48 bg-[var(--color-accent-main)]/5 rounded-full blur-2xl" />
        </div>
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10 text-center">
          <span className="inline-block text-[var(--color-primary-main)] text-sm font-semibold uppercase tracking-widest mb-6">
            Teamet bakom
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-[820px] mx-auto">
            Vi bygger Sveriges smartaste flyttupplevelse
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-[600px] mx-auto leading-relaxed">
            Ett team av 20 personer som alla har en gemensam övertygelse: att flytta i Sverige ska vara enkelt, inte ett halvtidsjobb.
          </p>
        </div>
      </div>

      {/* Story */}
      <div className="bg-[var(--color-background-default)] py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="max-w-[720px] mx-auto">
            <span className="inline-block text-[var(--color-primary-main)] text-sm font-semibold uppercase tracking-widest mb-5">
              Historien
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-secondary-main)] mb-6">
              Varfor Flyttsmart uppstod
            </h2>
            <p className="text-[var(--color-secondary-main)]/70 leading-relaxed text-lg">
              Att flytta i Sverige är en logistisk mardröm. Tio samtal till tio olika bolag, offerter som inte går att jämföra och en känsla av att man alltid missar något. Det visste vi av erfarenhet.
            </p>
            <p className="text-[var(--color-secondary-main)]/70 leading-relaxed text-lg mt-4">
              2019 grundade Erik Flyttsmart med en enkel idé: samla allt på ett ställe. Inte som en marknadsplats för reklam - utan som ett verktyg som faktiskt hjälper dig flytta. Utan stress, utan gissningar.
            </p>
            <p className="text-[var(--color-secondary-main)]/70 leading-relaxed text-lg mt-4">
              Idag har vi hjälpt over 200 000 personer och vi har knappt börjat.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-white py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-[var(--color-primary-main)] text-sm font-semibold uppercase tracking-widest mb-4">
              Kultur
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-secondary-main)]">
              Vad vi tror på
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value) => (
              <div
                key={value.label}
                className={clsx(
                  'rounded-2xl p-8',
                  'bg-[var(--color-background-default)]',
                  'border border-transparent',
                  'hover:border-[var(--color-primary-main)]/20',
                  'hover:shadow-[0_8px_40px_rgba(81,200,180,0.12)]',
                  'transition-all duration-300'
                )}
              >
                <div className="w-10 h-1 rounded-full bg-[var(--color-primary-main)] mb-6" />
                <h3 className="text-lg font-bold text-[var(--color-secondary-main)] mb-3">{value.label}</h3>
                <p className="text-[var(--color-secondary-main)]/60 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team grid */}
      <div className="bg-[var(--color-background-default)] py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-[var(--color-primary-main)] text-sm font-semibold uppercase tracking-widest mb-4">
              Folket
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-secondary-main)]">
              Några av oss
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className={clsx(
                  'rounded-2xl p-7 bg-white',
                  'border border-gray-100',
                  'hover:border-[var(--color-primary-main)]/30',
                  'hover:shadow-[0_8px_40px_rgba(81,200,180,0.12)]',
                  'transition-all duration-300 group'
                )}
              >
                <div
                  className={clsx(
                    'w-12 h-12 rounded-full flex items-center justify-center mb-5 font-bold text-sm',
                    'transition-colors duration-300',
                    member.color === 'accent'
                      ? 'bg-[var(--color-accent-main)]/15 text-[var(--color-accent-main)] group-hover:bg-[var(--color-accent-main)] group-hover:text-white'
                      : 'bg-[var(--color-primary-main)]/15 text-[var(--color-primary-main)] group-hover:bg-[var(--color-primary-main)] group-hover:text-white'
                  )}
                >
                  {member.initials}
                </div>
                <h3 className="font-bold text-[var(--color-secondary-main)] mb-0.5">{member.name}</h3>
                <p className="text-[var(--color-primary-main)] text-xs font-semibold uppercase tracking-wide mb-3">
                  {member.role}
                </p>
                <p className="text-[var(--color-secondary-main)]/55 text-sm leading-relaxed">{member.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-br from-[#1a3a52] via-[#214766] to-[#1e5080] py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center py-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="text-3xl md:text-4xl font-bold text-[var(--color-primary-main)] mb-2">
                  {stat.value}
                </div>
                <div className="text-white/50 text-sm">{stat.label}</div>
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
    <section id="kontakt" className="py-20 md:py-28 bg-[var(--color-background-default)] relative">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="max-w-[540px] mb-14">
          <span className="inline-block text-[var(--color-primary-main)] text-sm font-semibold uppercase tracking-widest mb-4">
            Kontakt
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-secondary-main)] mb-4">
            Hör av dig
          </h2>
          <p className="text-[var(--color-secondary-main)]/60 leading-relaxed">
            Vi svarar snabbt. Oavsett om du har en fråga om din flytt, vill samarbeta eller bara vill berätta något.
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Customer support */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <div className="mb-6">
              <h3 className="text-base font-bold text-[var(--color-secondary-main)] mb-1">Kundservice</h3>
              <p className="text-sm text-[var(--color-secondary-main)]/50">Mån-fre 09:00 - 16:00</p>
            </div>
            <div className="space-y-3">
              <ContactLink
                href="tel:+46812008822"
                label="08-12 00 88 22"
                icon={<PhoneIcon className="w-5 h-5 text-[var(--color-primary-main)]" />}
              />
              <ContactLink
                href="mailto:hej@flyttsmart.se"
                label="hej@flyttsmart.se"
                icon={<MailIcon className="w-5 h-5 text-[var(--color-primary-main)]" />}
              />
            </div>
            <div className="mt-6 px-4 py-3 rounded-xl bg-[var(--color-primary-main)]/5 border border-[var(--color-primary-main)]/10">
              <p className="text-xs text-[var(--color-secondary-main)]/60 leading-relaxed">
                Vi svarar på mail inom en arbetsdag. Akuta ärenden - ring oss.
              </p>
            </div>
          </div>

          {/* Partners and press */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <div className="mb-6">
              <h3 className="text-base font-bold text-[var(--color-secondary-main)] mb-1">Samarbeten & press</h3>
              <p className="text-sm text-[var(--color-secondary-main)]/50">Partnerskap, media och affärsfrågor</p>
            </div>
            <div className="space-y-3">
              <ContactLink
                href="mailto:partner@flyttsmart.se"
                label="partner@flyttsmart.se"
                accentColor="accent"
                icon={<MailIcon className="w-5 h-5 text-[var(--color-accent-main)]" />}
              />
              <ContactLink
                href="mailto:press@flyttsmart.se"
                label="press@flyttsmart.se"
                accentColor="accent"
                icon={<MailIcon className="w-5 h-5 text-[var(--color-accent-main)]" />}
              />
            </div>
            <div className="mt-6 px-4 py-3 rounded-xl bg-[var(--color-accent-main)]/5 border border-[var(--color-accent-main)]/10">
              <p className="text-xs text-[var(--color-secondary-main)]/60 leading-relaxed">
                Vi samarbetar med mäklarkedjor, energibolag, bredband och försäkringsbolag. Hör av dig.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-[720px]">
          <h3 className="text-base font-bold text-[var(--color-secondary-main)] mb-5">Vanliga frågor</h3>
          <div className="space-y-3">
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
    <section id="jobba-hos-oss" className="relative overflow-hidden">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1a3a52] via-[#214766] to-[#163550] text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-[15%] w-80 h-80 bg-[var(--color-accent-main)]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-[10%] w-64 h-64 bg-[var(--color-primary-main)]/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10 text-center">
          <span className="inline-block text-[var(--color-primary-main)] text-sm font-semibold uppercase tracking-widest mb-6">
            Karriar
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-[800px] mx-auto">
            Hjälp oss förändra hur Sverige flyttar
          </h1>
          <p className="text-lg md:text-xl text-white/60 max-w-[560px] mx-auto leading-relaxed">
            Vi är ett litet team med stor ambition. Om du vill bygga något som faktiskt används - och märks - är det här rätt ställe.
          </p>
        </div>
      </div>

      {/* Perks */}
      <div className="bg-white py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-[var(--color-primary-main)] text-sm font-semibold uppercase tracking-widest mb-4">
              Varfor Flyttsmart
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-secondary-main)]">
              Det du får
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {perks.map((perk) => (
              <div
                key={perk.label}
                className={clsx(
                  'rounded-2xl p-6 bg-[var(--color-background-default)]',
                  'border border-transparent',
                  'hover:border-[var(--color-primary-main)]/20',
                  'hover:shadow-[0_8px_40px_rgba(81,200,180,0.12)]',
                  'transition-all duration-300'
                )}
              >
                <div className="w-9 h-9 rounded-xl bg-[var(--color-primary-main)]/10 text-[var(--color-primary-main)] flex items-center justify-center mb-4">
                  {perk.icon}
                </div>
                <h3 className="font-bold text-[var(--color-secondary-main)] text-sm mb-2">{perk.label}</h3>
                <p className="text-[var(--color-secondary-main)]/55 text-xs leading-relaxed">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Open positions */}
      <div className="bg-[var(--color-background-default)] py-20 md:py-24">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="mb-12">
            <span className="inline-block text-[var(--color-primary-main)] text-sm font-semibold uppercase tracking-widest mb-4">
              Lediga tjänster
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-secondary-main)]">
              Just nu söker vi
            </h2>
          </div>
          <div className="space-y-4">
            {openPositions.map((position) => (
              <div
                key={position.title}
                className={clsx(
                  'bg-white rounded-2xl p-6 md:p-8',
                  'border border-gray-100',
                  'hover:border-[var(--color-primary-main)]/30',
                  'hover:shadow-[0_8px_40px_rgba(81,200,180,0.12)]',
                  'transition-all duration-300 group'
                )}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-[var(--color-secondary-main)] group-hover:text-[var(--color-primary-main)] transition-colors mb-3">
                      {position.title}
                    </h3>
                    <p className="text-[var(--color-secondary-main)]/60 text-sm leading-relaxed mb-4 max-w-[640px]">
                      {position.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--color-primary-main)]/10 text-[var(--color-primary-main)]">
                        {position.type}
                      </span>
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-500">
                        {position.location}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`mailto:jobb@flyttsmart.se?subject=Ansökan: ${encodeURIComponent(position.title)}`}
                    className={clsx(
                      'flex items-center gap-2 px-5 py-2.5 rounded-full shrink-0 self-start',
                      'text-sm font-semibold',
                      'bg-[var(--color-primary-main)]/10 text-[var(--color-primary-main)]',
                      'group-hover:bg-[var(--color-primary-main)] group-hover:text-white',
                      'transition-all duration-300'
                    )}
                  >
                    Sök tjänsten
                    <ArrowRightIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Culture */}
      <div className="bg-white py-16 md:py-20 border-t border-gray-100">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className="max-w-[600px]">
            <span className="inline-block text-[var(--color-primary-main)] text-sm font-semibold uppercase tracking-widest mb-5">
              Sa jobbar vi
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-[var(--color-secondary-main)] mb-4">
              Platt org, tydligt ägarskap
            </h2>
            <p className="text-[var(--color-secondary-main)]/65 leading-relaxed mb-3">
              Vi tror inte på hierarki för hierarkins skull. Alla äger sin del av produkten, beslutsvägar är korta och du förväntas ha en åsikt - och driva den.
            </p>
            <p className="text-[var(--color-secondary-main)]/65 leading-relaxed">
              Vi rör oss snabbt, men inte slarvigt. Kvalitet och tempo går hand i hand när alla förstår varför vi gör det vi gör.
            </p>
          </div>
        </div>
      </div>

      {/* Spontaneous CTA */}
      <div className="bg-[var(--color-background-default)] py-16">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8">
          <div className={clsx(
            'rounded-2xl p-8 md:p-12',
            'bg-gradient-to-br from-[#1a3a52] to-[#214766]',
            'text-white text-center relative overflow-hidden'
          )}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary-main)]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-bold mb-3">Hittar du inte rätt roll?</h3>
              <p className="text-white/55 text-sm mb-7 max-w-[420px] mx-auto leading-relaxed">
                Vi är alltid intresserade av bra folk. Skicka ett mail med vem du är och vad du kan - vi läser alla mejl.
              </p>
              <a
                href="mailto:jobb@flyttsmart.se"
                className={clsx(
                  'inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full',
                  'bg-[var(--color-primary-main)] text-white font-semibold text-sm',
                  'hover:bg-[var(--color-primary-main)]/80 transition-colors'
                )}
              >
                <MailIcon className="w-4 h-4" />
                jobb@flyttsmart.se
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { TeamSection, ContactSection, CareersSection }
