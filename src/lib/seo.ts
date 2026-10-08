import type { SiteSettings } from './site-settings'
import { siteUrl } from './site-settings'

export function clinicJsonLd(s: SiteSettings, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': `${siteUrl}/#clinic`,
    name: s.clinicName,
    url: siteUrl,
    description,
    telephone: s.phone,
    email: s.email,
    image: `${siteUrl}/images/optimized/hero-bg.webp`,
    openingHours: s.workingHours,
    address: {
      '@type': 'PostalAddress',
      streetAddress: s.address,
      addressLocality: s.city,
      addressCountry: 'UA',
    },
    medicalSpecialty: ['Diagnostic', 'Dermatology', 'Gynecologic', 'PrimaryCare'],
    sameAs: Object.values(s.social).filter((u) => u.startsWith('http')),
  }
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  }
}

export function websiteJsonLd(name: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url: siteUrl,
    inLanguage: 'uk-UA',
  }
}
