'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { Coordinator } from '@/common/data/coordinators.types'

interface CoordinatorHeroProps {
  coordinator: Coordinator
}

export default function CoordinatorHero({ coordinator }: CoordinatorHeroProps) {
  const { t } = useTranslation('coordinator')

  return (
    <section className="text-center space-y-4 mb-6 animate-fade-in">
      <div className="relative w-40 h-40 mx-auto">
        <div className="absolute inset-0 bg-[var(--color-primary-main)] opacity-20 rounded-full blur-2xl animate-pulse" />
        <Image
          src={coordinator.imageKitPath}
          alt={t('heroImageAlt', { name: coordinator.name })}
          width={160}
          height={160}
          className="relative w-full h-full object-cover rounded-full border-4 border-[var(--color-primary-border)] shadow-[var(--shadow-card)]"
          priority
        />
      </div>

      <div>
        <p className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">{coordinator.name}</p>
        <p className="text-gray-500 mb-1">{coordinator.title}</p>
        <p className="text-base font-semibold text-[var(--color-primary-main)] mb-3">{coordinator.phone.display}</p>
        <p className="text-lg font-semibold text-[var(--color-text-primary)]">
          {t('calledYouFrom')}{' '}
          <a href="https://flyttsmart.se" target="_blank" rel="noopener noreferrer" className="!text-[var(--color-primary-main)] !font-bold hover:!underline">
            Flyttsmart
          </a>
        </p>
      </div>
    </section>
  )
}
