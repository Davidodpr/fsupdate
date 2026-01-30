'use client'

import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'
import Email from '@/public/images/Email.svg'
import Phone from '@/public/images/Phone-circle.svg'

const Contact = () => {
  const { t } = useTranslation('landing')

  return (
    <div className="max-w-[800px] mx-auto">
      {/* Section header */}
      <div className="text-center mb-12">
        <span className="inline-block text-[var(--color-primary-main)] text-sm font-semibold uppercase tracking-wider mb-3">
          Kontakt
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-secondary-main)]">
          {t('CONTACT.title')}
        </h2>
      </div>

      {/* Contact cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Customer Service Card */}
        <div
          className={clsx(
            'bg-[var(--color-background-default)] rounded-2xl p-8',
            'border border-gray-100'
          )}
        >
          <h3 className="text-lg font-bold text-[var(--color-secondary-main)] mb-2">
            {t('CONTACT.customer_service')}
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            {t('CONTACT.opening_hours')}
          </p>

          <div className="space-y-4">
            {/* Phone */}
            <a
              href={`tel:${t('flyttsmart_phone')}`}
              className={clsx(
                'flex items-center gap-3 p-3 rounded-xl',
                'bg-white border border-gray-100',
                'hover:border-[var(--color-primary-main)] hover:bg-[var(--color-primary-main)]/5',
                'transition-all duration-200 group'
              )}
            >
              <div className="w-10 h-10 rounded-full bg-[var(--color-primary-main)]/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-[var(--color-primary-main)]" />
              </div>
              <span className="font-medium text-[var(--color-secondary-main)] group-hover:text-[var(--color-primary-main)]">
                {t('flyttsmart_phone')}
              </span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${t('flyttsmart_email')}`}
              className={clsx(
                'flex items-center gap-3 p-3 rounded-xl',
                'bg-white border border-gray-100',
                'hover:border-[var(--color-primary-main)] hover:bg-[var(--color-primary-main)]/5',
                'transition-all duration-200 group'
              )}
            >
              <div className="w-10 h-10 rounded-full bg-[var(--color-primary-main)]/10 flex items-center justify-center">
                <Email className="w-5 h-5 text-[var(--color-primary-main)]" />
              </div>
              <span className="font-medium text-[var(--color-secondary-main)] group-hover:text-[var(--color-primary-main)]">
                {t('flyttsmart_email')}
              </span>
            </a>
          </div>
        </div>

        {/* Partnership Card */}
        <div
          className={clsx(
            'bg-[var(--color-background-default)] rounded-2xl p-8',
            'border border-gray-100'
          )}
        >
          <h3 className="text-lg font-bold text-[var(--color-secondary-main)] mb-2">
            {t('CONTACT.partnership')}
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Vill du samarbeta med oss? Kontakta vårt partnerteam.
          </p>

          <a
            href={`mailto:${t('CONTACT.partners_contact_email')}`}
            className={clsx(
              'flex items-center gap-3 p-3 rounded-xl',
              'bg-white border border-gray-100',
              'hover:border-[var(--color-primary-main)] hover:bg-[var(--color-primary-main)]/5',
              'transition-all duration-200 group'
            )}
          >
            <div className="w-10 h-10 rounded-full bg-[var(--color-accent-main)]/10 flex items-center justify-center">
              <Email className="w-5 h-5 text-[var(--color-accent-main)]" />
            </div>
            <span className="font-medium text-[var(--color-secondary-main)] group-hover:text-[var(--color-primary-main)]">
              {t('CONTACT.partners_contact_email')}
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Contact
