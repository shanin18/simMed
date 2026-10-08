import { Logo } from '@/components/shared/logo'
import { FacebookIcon, InstagramIcon, TelegramIcon } from '@/components/shared/icons'
import { Button } from '@/components/ui/button'
import { footer } from '@/content/home'
import type { SiteSettings } from '@/lib/site-settings'

export function Footer({ settings }: { settings: SiteSettings }) {
  const socials = [
    { href: settings.social.instagram, label: 'Instagram', Icon: InstagramIcon },
    { href: settings.social.facebook, label: 'Facebook', Icon: FacebookIcon },
    { href: settings.social.telegram, label: 'Telegram', Icon: TelegramIcon },
  ]

  return (
    <footer id="contacts" className="bg-primary text-white">
      <div className="container-page pt-12 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_repeat(4,1fr)]">
          <Logo variant="footer" />
          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="mb-4 text-sm font-semibold text-white">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-white/65 transition-colors hover:text-white">{l}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 grid gap-6 border-t border-white/15 py-8 text-sm sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_auto_auto] lg:items-center">
          <address className="not-italic text-white/80">
            {settings.city}, {settings.address}
            <br />
            <span className="text-white/55">{settings.workingHours}</span>
          </address>
          <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="text-white/80 hover:text-white">{settings.phone}</a>
          <a href={`mailto:${settings.email}`} className="text-white/80 hover:text-white">{settings.email}</a>
          <ul className="flex gap-2">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a href={href} aria-label={label} className="grid size-10 place-items-center rounded-full bg-white text-primary transition hover:bg-blush hover:text-white">
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
          <Button asChild variant="blush" size="lg">
            <a href={settings.bookingUrl}>Записатися</a>
          </Button>
        </div>
      </div>

      <div className="bg-black/15">
        <div className="container-page flex flex-col gap-2 py-4 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {settings.clinicName}. Усі права захищено.</p>
          <p className="max-w-2xl sm:text-right">{footer.disclaimer}</p>
        </div>
      </div>
    </footer>
  )
}
