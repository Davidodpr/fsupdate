'use client'

import { useTranslation } from 'react-i18next'
import { partnerLogos } from './partnerLogos'

const LogoItem = ({ src, alt }: { src: string; alt: string }) => (
  <div className="flex-shrink-0 flex items-center justify-center px-5 py-3 h-12 md:h-14 w-28 md:w-36">
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="max-h-full max-w-full object-contain grayscale opacity-60 hover:opacity-90 hover:grayscale-0 transition-all duration-300"
    />
  </div>
)

const Partners = () => {
  const { t } = useTranslation('landing')

  return (
    <section className="bg-white py-8 md:py-12 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <p className="text-xs text-[var(--color-primary-main)] font-semibold uppercase tracking-wider mb-1">
            Samarbeten
          </p>
          <h3 className="text-lg md:text-xl font-bold text-[var(--color-secondary-main)]">
            {t('PRESS_AND_PARTNERS.partners')}
          </h3>
        </div>
      </div>

      {/* Scrolling logo marquee - true infinite */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max gap-6 animate-scroll-infinite">
          {partnerLogos.map((logo) => (
            <LogoItem key={logo.src} src={logo.src} alt={logo.alt} />
          ))}
          {/* Duplicate for seamless loop */}
          {partnerLogos.map((logo) => (
            <LogoItem key={`dup-${logo.src}`} src={logo.src} alt={logo.alt} />
          ))}
        </div>
      </div>

    </section>
  )
}

export default Partners
