'use client'

import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'

const steps = [
  {
    number: '01',
    titleKey: 'HOW_WE_HELP.step1.title',
    descriptionKey: 'HOW_WE_HELP.step1.description',
    benefitKey: 'HOW_WE_HELP.step1.benefit',
    iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
  },
  {
    number: '02',
    titleKey: 'HOW_WE_HELP.step2.title',
    descriptionKey: 'HOW_WE_HELP.step2.description',
    benefitKey: 'HOW_WE_HELP.step2.benefit',
    iconPath: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    number: '03',
    titleKey: 'HOW_WE_HELP.step3.title',
    descriptionKey: 'HOW_WE_HELP.step3.description',
    benefitKey: 'HOW_WE_HELP.step3.benefit',
    iconPath: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
  },
]

const HowItWorks = () => {
  const { t } = useTranslation('landing')

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-gradient-to-b from-[var(--color-background-default)] to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-[10%] w-64 h-64 bg-[var(--color-primary-main)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-[var(--color-accent-main)]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block text-[var(--color-primary-main)] text-sm font-semibold uppercase tracking-wider mb-4">
            Enkelt & Tryggt
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-secondary-main)] mb-5">
            {t('HOW_WE_HELP.title')}
          </h2>
          <p className="text-lg text-[var(--color-secondary-main)]/60 max-w-[600px] mx-auto">
            {t('HOW_WE_HELP.subtitle')}
          </p>
        </div>

        {/* Cards grid with progress line */}
        <div className="relative">
          {/* Progress line - desktop only */}
          <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-[var(--color-primary-main)]/20 via-[var(--color-primary-main)]/40 to-[var(--color-primary-main)]/20" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative z-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className={clsx(
                'relative bg-white rounded-2xl p-6 md:p-8',
                'border border-[var(--color-primary-main)]/10',
                'hover:border-[var(--color-primary-main)]/30',
                'hover:shadow-[0_8px_30px_rgba(81,200,180,0.15)]',
                'transition-all duration-300',
                'group'
              )}
            >
              {/* Icon */}
              <div className={clsx(
                'w-12 h-12 rounded-xl flex items-center justify-center mb-5',
                'bg-[var(--color-primary-main)]/10',
                'group-hover:bg-[var(--color-primary-main)]',
                'transition-colors duration-300'
              )}>
                <svg
                  className="w-6 h-6 text-[var(--color-primary-main)] group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={step.iconPath} />
                </svg>
              </div>

              {/* Step number */}
              <span className="absolute top-6 right-6 text-4xl font-bold text-[var(--color-primary-main)]/10 group-hover:text-[var(--color-primary-main)]/20 transition-colors">
                {step.number}
              </span>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-[var(--color-secondary-main)] mb-3 pr-10">
                {t(step.titleKey)}
              </h3>

              {/* Description */}
              <p className="text-[var(--color-secondary-main)]/60 text-sm leading-relaxed mb-4">
                {t(step.descriptionKey)}
              </p>

              {/* Benefit highlight */}
              <div className="flex items-center gap-2 text-[var(--color-primary-main)]">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-sm">
                  {t(step.benefitKey)}
                </span>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
