'use client'

import { clsx } from 'clsx'

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


// ---------------------------------------------------------------------------
// TeamSection (Om oss)
// ---------------------------------------------------------------------------

const TeamSection = () => {
  return (
    <section>
      {/* Hero + image */}
      <div className="bg-[var(--color-secondary-main)] text-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-12 md:pt-16">
          <div className="max-w-[580px] mb-8">
            <p className="text-[var(--color-primary-main)] text-xs font-semibold uppercase tracking-widest mb-3">Om Flyttsmart</p>
            <h1 className="text-2xl md:text-3xl font-bold mb-3 leading-snug">
              Vi tror att flytta i Sverige kan vara enkelt. På riktigt.
            </h1>
            <p className="text-white/50 text-[15px] leading-relaxed">
              Flyttsmart grundades 2019 med en enkel idé: samla allt på ett ställe. Inte som en marknadsplats - utan som ett verktyg som faktiskt tar dig igenom flytten.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 py-6 border-t border-white/10">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-xl font-bold text-[var(--color-primary-main)]">{stat.value}</div>
                <div className="text-white/35 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team image */}
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 pb-10 md:pb-14">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/team.jpg" alt="Teamet på Flyttsmart" className="w-full rounded-xl object-cover aspect-[21/9]" loading="eager" />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Story */}
        <div className="py-12 md:py-14 grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 md:gap-14 items-start">
          <h2 className="text-base font-bold text-[var(--color-secondary-main)] leading-snug">
            Tio samtal, tio bolag, noll översikt. Det var problemet.
          </h2>
          <div className="space-y-3 text-[var(--color-secondary-main)]/60 text-sm leading-relaxed">
            <p>Alla som flyttat vet hur det är. Ringa elleverantörer, jämföra bredbandserbjudanden, boka flyttfirma, fixa hemförsäkring, anmäla adressändring. Och det ska helst vara klart innan inflyttningsdagen.</p>
            <p>Erik hade flyttat sju gånger på fem år. Varje gång samma cirkus. Så han byggde det han saknade - ett ställe där allt finns samlat, där du gör din flytt en gång och vi sköter resten.</p>
            <p>Idag är vi 20 personer i Stockholm. Vi har hjälpt över 200 000 personer flytta. Och vi har knappt börjat.</p>
          </div>
        </div>

        {/* Values */}
        <div className="pb-12 md:pb-14">
          <h2 className="text-base font-bold text-[var(--color-secondary-main)] mb-6">Vad vi tror på</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-100 rounded-xl overflow-hidden">
            {values.map((value) => (
              <div key={value.label} className="bg-white p-6">
                <h3 className="text-sm font-bold text-[var(--color-secondary-main)] mb-1.5">{value.label}</h3>
                <p className="text-[var(--color-secondary-main)]/45 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="pb-12 md:pb-14">
          <h2 className="text-base font-bold text-[var(--color-secondary-main)] mb-6">Några av oss</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 rounded-xl overflow-hidden">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-white p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-primary-main)]/10 text-[var(--color-primary-main)] flex items-center justify-center font-bold text-[10px]">
                    {member.initials}
                  </div>
                  <div>
                    <div className="font-bold text-[var(--color-secondary-main)] text-sm leading-tight">{member.name}</div>
                    <div className="text-[var(--color-primary-main)] text-xs font-medium">{member.role}</div>
                  </div>
                </div>
                <p className="text-[var(--color-secondary-main)]/40 text-sm leading-relaxed">{member.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="pb-12 md:pb-16">
          <div className="bg-[var(--color-secondary-main)] rounded-xl p-7 md:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <h3 className="text-[15px] md:text-base font-bold text-white mb-1">Vill du veta mer?</h3>
              <p className="text-white/45 text-sm">Hör av dig eller kolla våra lediga tjänster.</p>
            </div>
            <div className="flex gap-3">
              <a href="mailto:hej@flyttsmart.se" className="inline-flex items-center px-5 py-2.5 rounded-lg bg-[var(--color-primary-main)] text-white font-semibold text-sm hover:bg-[var(--color-primary-main)]/85 transition-colors whitespace-nowrap">
                Maila oss &rarr;
              </a>
              <a href="https://jobb.flyttsmart.se/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-2.5 rounded-lg border border-white/15 text-white font-semibold text-sm hover:border-white/30 transition-colors whitespace-nowrap">
                Lediga tjänster
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { TeamSection }
