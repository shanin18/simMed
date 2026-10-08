import { cache } from 'react'

export type SiteSettings = {
  clinicName: string
  phone: string
  email: string
  address: string
  city: string
  workingHours: string
  bookingUrl: string
  social: { instagram: string; facebook: string; telegram: string }
}

export const defaultSettings: SiteSettings = {
  clinicName: 'SimMed',
  phone: '+380 93 545 68 10',
  email: 'info@simmed.example',
  address: 'вул. Волковича, 25',
  city: 'Чернігів',
  workingHours: 'Пн–Нд: 09:00–18:00',
  bookingUrl: '#appointment',
  social: { instagram: '#', facebook: '#', telegram: '#' },
}

/**
 * Reads the CMS global; falls back to defaults when the DB is unavailable
 * so the homepage never fails to render (build, preview, outage).
 */
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  if (!process.env.DATABASE_URI) return defaultSettings
  try {
    const [{ getPayload }, { default: config }] = await Promise.all([
      import('payload'),
      import('@payload-config'),
    ])
    const payload = await getPayload({ config })
    const data = (await payload.findGlobal({ slug: 'site-settings' })) as Partial<SiteSettings>
    const clean = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== null && v !== undefined && v !== ''),
    )
    return {
      ...defaultSettings,
      ...clean,
      social: { ...defaultSettings.social, ...(data.social ?? {}) },
    }
  } catch (error) {
    console.error('[site-settings] falling back to defaults:', error)
    return defaultSettings
  }
})

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '')
