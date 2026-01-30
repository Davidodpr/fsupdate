'use client'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { clsx } from 'clsx'

interface TrustedLoadingStateProps {
  brokerOfficeName?: string
  brokerAgencyLogo?: string
}

const loadingSteps = [
  { key: 'verifying', duration: 800 },
  { key: 'preparing', duration: 1200 },
] as const

export const TrustedLoadingState = ({ brokerOfficeName, brokerAgencyLogo }: TrustedLoadingStateProps) => {
  const { t } = useTranslation(['signup'])
  const [currentStep, setCurrentStep] = useState(0)
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    setFadeIn(true)
    const timers: NodeJS.Timeout[] = []
    let elapsed = 0

    loadingSteps.forEach((step, index) => {
      elapsed += step.duration
      timers.push(
        setTimeout(() => {
          setCurrentStep(index + 1)
        }, elapsed)
      )
    })

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div
      className={clsx(
        'fixed inset-0 flex flex-col items-center justify-center',
        'bg-gradient-to-b from-[#f8faf9] via-[#f0f7f5] to-[#e8f4f1]',
        'transition-opacity duration-500',
        fadeIn ? 'opacity-100' : 'opacity-0'
      )}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] rounded-full bg-[#51c8b4]/5 blur-3xl" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-[#214766]/5 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
        {/* Broker connection badge */}
        {brokerAgencyLogo && (
          <div
            className={clsx(
              'mb-8 transition-all duration-700 delay-200',
              fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-full shadow-sm border border-[#51c8b4]/20">
              <span className="text-xs text-[#767678] font-medium uppercase tracking-wider">
                {t('recommendedBy', 'Rekommenderad av')}
              </span>
              <div className="w-px h-4 bg-[#e1e1e3]" />
              <div className="relative h-6 w-24">
                <Image
                  src={brokerAgencyLogo}
                  alt={brokerOfficeName || 'Broker'}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Animated logo/icon */}
        <div
          className={clsx(
            'relative mb-6 transition-all duration-700 delay-300',
            fadeIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          )}
        >
          <div className="relative w-20 h-20">
            {/* Pulsing ring */}
            <div className="absolute inset-0 rounded-full bg-[#51c8b4]/20 animate-ping" style={{ animationDuration: '2s' }} />
            <div className="absolute inset-2 rounded-full bg-[#51c8b4]/30 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.3s' }} />

            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#51c8b4] to-[#37ae9a] flex items-center justify-center shadow-lg shadow-[#51c8b4]/30">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2L3 9V20C3 20.55 3.45 21 4 21H9V14H15V21H20C20.55 21 21 20.55 21 20V9L12 2Z" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div
          className={clsx(
            'transition-all duration-700 delay-500',
            fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
        >
          <h2 className="text-xl font-bold text-[#214766] mb-2">
            {currentStep === 0 && t('loadingTitle', 'Välkommen till din flytt')}
            {currentStep === 1 && t('verifyingBroker', 'Verifierar din mäklarkoppling...')}
            {currentStep >= 2 && (brokerOfficeName ? t('fetchingProvider') : t('preparingYourMove'))}
          </h2>
          {brokerOfficeName && currentStep >= 2 && (
            <p className="text-[#767678] font-medium">{brokerOfficeName}</p>
          )}
        </div>

        {/* Progress indicator */}
        <div
          className={clsx(
            'mt-8 flex gap-2 transition-all duration-700 delay-700',
            fadeIn ? 'opacity-100' : 'opacity-0'
          )}
        >
          {[0, 1, 2].map((step) => (
            <div
              key={step}
              className={clsx(
                'h-1.5 rounded-full transition-all duration-500',
                step <= currentStep ? 'bg-[#51c8b4] w-8' : 'bg-[#e1e1e3] w-4'
              )}
            />
          ))}
        </div>

        {/* Trust footer */}
        <div
          className={clsx(
            'mt-12 flex items-center gap-6 text-xs text-[#767678] transition-all duration-700 delay-1000',
            fadeIn ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z" fill="#51c8b4"/>
            </svg>
            <span>{t('secureService', 'Säker tjänst')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="#ffa65f"/>
            </svg>
            <span>{t('trustedByThousands', '200 000+ flyttar sedan 2020')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrustedLoadingState
