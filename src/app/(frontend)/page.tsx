import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { About } from '@/components/sections/about'
import { Appointment } from '@/components/sections/appointment'
import { Banner } from '@/components/sections/banner'
import { Doctors } from '@/components/sections/doctors'
import { Faq } from '@/components/sections/faq'
import { Hero } from '@/components/sections/hero'
import { InfoStrip } from '@/components/sections/info-strip'
import { Reviews } from '@/components/sections/reviews'
import { Services } from '@/components/sections/services'
import { Stats } from '@/components/sections/stats'
import { JsonLd } from '@/components/shared/json-ld'
import { HomeMotion } from '@/components/shared/home-motion'
import { faq } from '@/content/home'
import { clinicJsonLd, faqJsonLd, websiteJsonLd } from '@/lib/seo'
import { getSiteSettings } from '@/lib/site-settings'

// ISR: server-rendered, revalidated hourly and on-demand when CMS settings change.
export const revalidate = 3600

export default async function HomePage() {
  const settings = await getSiteSettings()
  const description =
    'Медична клініка SimMed: УЗД-діагностика, гінекологія, дерматологія, косметологія та онлайн-запис до лікаря.'

  return (
    <>
      <JsonLd data={websiteJsonLd(settings.clinicName)} />
      <JsonLd data={clinicJsonLd(settings, description)} />
      <JsonLd data={faqJsonLd(faq.items)} />

      <Header bookingUrl={settings.bookingUrl} />
      <main id="main">
        <Hero bookingUrl={settings.bookingUrl} />
        <InfoStrip settings={settings} />
        <Services />
        <About />
        <Stats />
        <Banner bookingUrl={settings.bookingUrl} />
        <Doctors />
        <Reviews social={settings.social} />
        <Appointment bookingUrl={settings.bookingUrl} />
        <Faq />
      </main>
      <Footer settings={settings} />
      <HomeMotion />
    </>
  )
}
