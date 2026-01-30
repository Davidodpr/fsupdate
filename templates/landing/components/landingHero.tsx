'use client'

import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'
import { useRouter, usePathname } from 'next/navigation'
import useResponsive from '@/common/hooks/useResponsive'
import Button from '@/components/atoms/Button'
import BankId from '@/public/images/BankId.svg'
import AnimatedDashboard from './AnimatedDashboard'

const LandingHero = () => {
  const router = useRouter()
  const { t } = useTranslation('landing')
  const pathname = usePathname()
  const { isTabletPortraitOrGreater } = useResponsive()
  const [showFloatingCta, setShowFloatingCta] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show floating CTA after scrolling past 70% of viewport height
      setShowFloatingCta(window.scrollY > window.innerHeight * 0.7)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative min-h-[100vh] md:min-h-[90vh] flex items-center py-8 md:py-16 bg-gradient-to-br from-[#1a3a52] via-[var(--color-secondary-main)] to-[#2d5a7b]">
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--color-primary-main)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--color-accent-main)]/10 rounded-full blur-3xl" />
      </div>
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 w-full relative z-10">
        <div
          className={clsx(
            'grid gap-4 lg:gap-16 items-center',
            isTabletPortraitOrGreater ? 'grid-cols-2' : 'grid-cols-1'
          )}
        >
          {/* Content */}
          <div className={clsx('text-center lg:text-left', !isTabletPortraitOrGreater && 'order-1')}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5 mb-8">
              <span className="w-2.5 h-2.5 bg-[var(--color-primary-main)] rounded-full animate-pulse" />
              <span className="text-base font-semibold text-white">
                200 000+ nöjda flyttare
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-white mb-6">
              <span className="block text-[42px] md:text-[56px] lg:text-[64px] font-bold leading-[1.1]">
                Slipp stressen -
              </span>
              <span className="block text-[42px] md:text-[56px] lg:text-[64px] font-bold leading-[1.1]">
                <span className="text-[var(--color-accent-main)]">vi fixar</span> flytten
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-[480px] mx-auto lg:mx-0 leading-relaxed">
              Det självklara sättet att flytta. Personlig checklista, utvalda leverantörer och support - helt gratis.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Button
                padding="16px 32px"
                variant="primaryAltInverted"
                iconRight={<BankId className="w-6 h-6" />}
                text="KOM IGÅNG"
                onClick={() => router.push(process.env.NODE_ENV === 'development' ? '/i/testmode' : `/login${pathname !== '/' ? `?ref=${pathname}` : ''}`)}
              />
              <button
                onClick={() => {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-white/80 hover:text-white text-sm font-medium underline underline-offset-4 transition-colors"
              >
                Se hur det fungerar →
              </button>
            </div>
            <span className="text-sm text-white/60 mt-4 block text-center lg:text-left">
              Kostnadsfritt &bull; Tar 2 min
            </span>
          </div>

          {/* Phone Mockup */}
          <div className={clsx('relative flex justify-center lg:justify-end', !isTabletPortraitOrGreater && 'order-2 -mt-2')}>
            {/* Bright glow effect behind phone */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-[var(--color-primary-main)]/30 rounded-full blur-[60px]" />

            {/* Phone frame - realistic iPhone style */}
            <div className="relative z-10">
              <div
                className={clsx(
                  'relative bg-[#1a1a1a] rounded-[50px] p-[12px]',
                  'w-[280px] md:w-[320px] lg:w-[360px]',
                  'shadow-[0_25px_60px_-10px_rgba(0,0,0,0.5)]'
                )}
              >
                {/* Side buttons - left */}
                <div className="absolute left-[-2px] top-[100px] w-[3px] h-[30px] bg-[#2a2a2a] rounded-l-sm" />
                <div className="absolute left-[-2px] top-[145px] w-[3px] h-[55px] bg-[#2a2a2a] rounded-l-sm" />
                <div className="absolute left-[-2px] top-[210px] w-[3px] h-[55px] bg-[#2a2a2a] rounded-l-sm" />

                {/* Side button - right (power) */}
                <div className="absolute right-[-2px] top-[160px] w-[3px] h-[70px] bg-[#2a2a2a] rounded-r-sm" />

                {/* Screen with notch */}
                <div className="relative rounded-[38px] overflow-hidden bg-black aspect-[9/19]">
                  {/* Dynamic Island / Notch */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[90px] h-[28px] bg-black rounded-full z-20" />

                  {/* Animated dashboard checklist */}
                  <AnimatedDashboard />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile fixed CTA - only on small screens, appears after scrolling */}
      <div
        className={clsx(
          'fixed bottom-0 left-0 right-0 z-50 p-4 pt-12 lg:hidden',
          'bg-gradient-to-t from-[var(--color-secondary-main)] via-[var(--color-secondary-main)]/95 to-transparent',
          'transition-all duration-300',
          showFloatingCta ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
        )}
      >
        <Button
          padding="16px 32px"
          variant="primaryAltInverted"
          iconRight={<BankId className="w-6 h-6" />}
          text="KOM IGÅNG"
          onClick={() => router.push(process.env.NODE_ENV === 'development' ? '/i/testmode' : `/login${pathname !== '/' ? `?ref=${pathname}` : ''}`)}
          className="w-full"
        />
      </div>
    </section>
  )
}

export default LandingHero
