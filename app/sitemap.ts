import { MetadataRoute } from 'next'
import { getAllCoordinatorUrlsWithAlternatives } from '@/common/utils/phone'

export default function sitemap(): MetadataRoute.Sitemap {
  const coordinatorUrls = getAllCoordinatorUrlsWithAlternatives().map((phone) => ({
    url: `https://flyttsmart.se/coordinator/${phone}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    alternates: {
      languages: {
        sv: `https://flyttsmart.se/sv/coordinator/${phone}`,
        en: `https://flyttsmart.se/en/coordinator/${phone}`,
      },
    },
  }))

  return [
    {
      url: 'https://flyttsmart.se',
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: 'https://flyttsmart.se/terms',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: 'https://flyttsmart.se/privacy_policy',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: 'https://flyttsmart.se/cookie',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: 'https://help.flyttsmart.se',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    ...coordinatorUrls,
  ]
}
