import { Coordinator } from '@/common/data/coordinators.types';
import { longLocale, ShortLocale } from '@/common/enums/LocaleEnum';

interface CoordinatorSchemaProps {
  coordinator: Coordinator;
  locale: string;
  jobTitle: string;
}

export default function CoordinatorSchema({ coordinator, locale, jobTitle }: CoordinatorSchemaProps) {
  // Convert locale to BCP 47 format for Schema.org best practices
  // Using project's longLocale constants and converting to proper BCP 47 casing
  const localeLower = locale === ShortLocale.SV ? longLocale.SV : longLocale.EN;
  const bcp47Locale = localeLower.split('-').map((part, i) => i === 1 ? part.toUpperCase() : part).join('-');

  // Create ContactPoint for each phone number format to help Google associate all variants
  const contactPoints = [coordinator.phone.href, ...coordinator.phone.alternatives.map(alt =>
    alt.startsWith('+') ? alt : alt.startsWith('0') ? `+46${alt.substring(1)}` : `+${alt}`
  )].map(phoneNumber => ({
    '@type': 'ContactPoint',
    telephone: phoneNumber,
    contactType: jobTitle,
    areaServed: 'SE',
    availableLanguage: ['Swedish', 'English'],
    inLanguage: bcp47Locale,
  }));

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: coordinator.name,
        jobTitle,
        telephone: coordinator.phone.href,
        email: coordinator.email,
        image: coordinator.imageKitPath,
        inLanguage: bcp47Locale,
        worksFor: {
          '@type': 'Organization',
          name: 'Flyttsmart',
          url: 'https://flyttsmart.se',
        },
      },
      ...contactPoints,
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Flyttsmart',
            item: 'https://flyttsmart.se',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: coordinator.name,
            item: `https://flyttsmart.se/${locale}/coordinator/${coordinator.phone.canonical}`,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
