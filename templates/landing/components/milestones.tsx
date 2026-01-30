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
    <div className="py-12 md:py-16">
      {/* Stats grid - horizontal on desktop */}
      <div className="max-w-[900px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {statsItems.slice(0, 3).map(({ value, text }, index) => (
            <div
              key={index}
              className="text-center px-4"
            >
              {/* Big number */}
              <div className="text-5xl md:text-6xl font-bold text-[var(--color-primary-main)] mb-2">
                {value}
              </div>

              {/* Description */}
              <p className="text-white/70 text-sm leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full max-w-[400px] mx-auto h-px bg-white/10 my-10" />

      {/* Media section - glassmorphism box */}
      <div
        className={clsx(
          'max-w-[500px] mx-auto',
          'bg-white/5 backdrop-blur-sm',
          'border border-white/10 rounded-2xl',
          'px-8 py-8'
        )}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <span className="inline-block text-[var(--color-primary-main)] text-xs font-semibold uppercase tracking-wider mb-2">
            Media
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-white">
            Uppmärksammade i svensk press
          </h3>
        </div>

        {/* Logos */}
        <div className="flex items-center justify-center gap-10 md:gap-16">
          {pressLogos.map((logo, index) => (
            <div
              key={index}
              className={clsx(
                logo.alt === 'Breakit' ? 'relative h-[50px] w-[130px] md:h-[65px] md:w-[170px]' : 'relative h-[40px] w-[100px] md:h-[50px] md:w-[130px]',
                'opacity-60 hover:opacity-100',
                'transition-all duration-300',
                'hover:scale-105'
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
  )
}

export default Milestones
