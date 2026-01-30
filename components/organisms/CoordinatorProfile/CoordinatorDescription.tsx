'use client'

import { useTranslation, Trans } from 'react-i18next'

export default function CoordinatorDescription() {
  const { t } = useTranslation('coordinator')

  return (
    <div className="shadow-[var(--shadow-soft)] mb-8 rounded-lg p-5">
      <p className="text-sm text-[var(--color-text-primary)] leading-relaxed text-center">
        <Trans
          i18nKey="description"
          t={t}
          components={{
            1: (
              <a
                key="flyttsmart-link"
                href="https://flyttsmart.se"
                target="_blank"
                rel="noopener noreferrer"
                className="!text-[var(--color-primary-main)] hover:!underline !font-bold"
              />
            ),
          }}
        />
      </p>
    </div>
  )
}
