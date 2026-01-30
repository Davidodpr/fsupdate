'use client'

import { useTranslation } from 'react-i18next'
import { partnerLogos } from './partnerLogos'

const LogoItem = ({ src, alt }: { src: string; alt: string }) => (
  <div className="flex-shrink-0 flex items-center justify-center rounded-xl border border-[#e6edf4] bg-[#eef3f7] px-4 py-3 h-16 md:h-20 w-36 md:w-44">
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="max-h-full max-w-full object-contain"
    />
  </div>
)

const Partners = () => {
  const { t } = useTranslation('landing')

  return (
    <section className="bg-white py-8 md:py-12 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <p className="text-xs text-[var(--color-primary-main)] font-semibold uppercase tracking-wider mb-1">
            Samarbeten
          </p>
          <h3 className="text-lg md:text-xl font-bold text-[var(--color-secondary-main)]">
            {t('PRESS_AND_PARTNERS.partners')}
          </h3>
        </div>
      </div>

      {/* Scrolling logo marquee */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex gap-4 animate-scroll-infinite">
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
