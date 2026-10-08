import type { Metadata, Viewport } from 'next'
import { Onest } from 'next/font/google'

import { siteUrl } from '@/lib/site-settings'
import './globals.css'

const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-onest',
  display: 'swap',
})

const description =
  'Клініка SimMed: УЗД-діагностика, гінекологія, дерматологія та косметологія. Досвідчені лікарі, сучасне обладнання та зручний онлайн-запис.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'SimMed — медична клініка | Онлайн-запис до лікаря', template: '%s | SimMed' },
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    siteName: 'SimMed',
    title: 'SimMed — медична клініка',
    description,
    url: '/',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#004d52',
  width: 'device-width',
  initialScale: 1,
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk" className={onest.variable}>
      <body>
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-primary px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Перейти до змісту
        </a>
        {children}
      </body>
    </html>
  )
}
