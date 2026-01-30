'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function CoordinatorNotFound() {
  const { t } = useTranslation('coordinator');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-[var(--color-text-primary)] mb-4">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-4">
          {t('notFound.title')}
        </h2>
        <p className="text-[var(--color-text-secondary)] mb-8">
          {t('notFound.description')}
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[var(--color-primary-main)] text-white rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors"
        >
          {t('notFound.backToHome')}
        </Link>
      </div>
    </div>
  );
}
