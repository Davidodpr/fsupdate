import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'

type StatItem = {
  value: string
  text: string
}

const pressLogos = [
  { src: '/images/press/di-logo.webp', alt: 'Dagens Industri' },
  { src: '/images/press/breakit-logo.png', alt: 'Breakit' },
]

const Milestones = () => {
  const { t } = useTranslation('landing')
  const statsItems = t('landing:STATSITEMS', { returnObjects: true }) as StatItem[]

  return (
    <div className="py-16 md:py-24">
      {/* Section header */}
      <div className="text-center mb-12">
        <span className="inline-block text-[var(--color-primary-main)] text-sm font-semibold uppercase tracking-wider mb-3">
          Resultat
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Våra flyttare älskar oss
        </h2>
      </div>

      {/* Stats grid */}
      <div className="max-w-[960px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {statsItems.slice(0, 3).map(({ value, text }, index) => (
            <div
              key={index}
              className={clsx(
                'text-center px-6 py-8',
                'bg-white/5 backdrop-blur-sm',
                'border border-white/10 rounded-2xl'
              )}
            >
              <div className="text-5xl md:text-[56px] font-bold text-[var(--color-primary-main)] mb-3">
                {value}
              </div>
              <p className="text-white/70 text-sm leading-relaxed max-w-[220px] mx-auto">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Media section */}
      <div className="max-w-[960px] mx-auto mt-10">
        <div
          className={clsx(
            'bg-white/5 backdrop-blur-sm',
            'border border-white/10 rounded-2xl',
            'px-8 py-8',
            'flex flex-col md:flex-row items-center gap-6 md:gap-10'
          )}
        >
          <div className="text-center md:text-left md:flex-1">
            <span className="inline-block text-[var(--color-primary-main)] text-xs font-semibold uppercase tracking-wider mb-1">
              Media
            </span>
            <h3 className="text-lg md:text-xl font-bold text-white">
              Uppmärksammade i svensk press
            </h3>
          </div>

          <div className="flex items-center gap-8 md:gap-12">
            {pressLogos.map((logo, index) => (
              <div
                key={index}
                className={clsx(
                  logo.alt === 'Breakit' ? 'relative h-[50px] w-[130px] md:h-[60px] md:w-[160px]' : 'relative h-[35px] w-[90px] md:h-[45px] md:w-[120px]',
                  'opacity-70'
                )}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Milestones
