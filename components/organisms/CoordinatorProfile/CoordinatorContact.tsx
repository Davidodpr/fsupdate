'use client'

import { Phone, Mail, MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Coordinator } from '@/common/data/coordinators.types'

interface CoordinatorContactProps {
  coordinator: Coordinator
}

export default function CoordinatorContact({ coordinator }: CoordinatorContactProps) {
  const { t } = useTranslation('coordinator')

  return (
    <div className="space-y-6 mb-8">
      <div className="animate-scale-in">
        <a
          href={`tel:${coordinator.phone.href}`}
          aria-label={t('cta.callAriaLabel', { name: coordinator.name, phone: coordinator.phone.display })}
          className="flex items-center justify-center gap-3 w-full h-14 !rounded-full !bg-[var(--color-primary-main)] !text-white !shadow-[var(--shadow-card)] transition-all hover:scale-[1.02] hover:bg-[var(--color-primary-dark)] text-lg font-semibold"
        >
          <Phone className="h-6 w-6" />
          {t('cta.callBack')}
        </a>
      </div>

      <div className="flex gap-2">
        <a
          href={`mailto:${coordinator.email}`}
          aria-label={t('cta.emailAriaLabel', { name: coordinator.name, email: coordinator.email })}
          className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border border-[var(--color-border)] bg-white hover:bg-gray-50 transition-all hover:scale-[1.02]"
        >
          <Mail className="h-4 w-4" />
          <span className="text-sm">{t('cta.email')}</span>
        </a>

        <a
          href="sms:+46790965888"
          aria-label={t('cta.smsAriaLabel')}
          className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border border-[var(--color-border)] bg-white hover:bg-gray-50 transition-all hover:scale-[1.02]"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="text-sm">{t('cta.sms')}</span>
        </a>
      </div>
    </div>
  )
}
