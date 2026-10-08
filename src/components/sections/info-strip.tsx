import { Clock, MapPin, Phone } from 'lucide-react'

import type { SiteSettings } from '@/lib/site-settings'

export function InfoStrip({ settings }: { settings: SiteSettings }) {
  const items = [
    { Icon: MapPin, label: 'Адреса', value: `${settings.city}, ${settings.address}` },
    { Icon: Phone, label: 'Телефон', value: settings.phone, href: `tel:${settings.phone.replace(/\s/g, '')}` },
    { Icon: Clock, label: 'Графік роботи', value: settings.workingHours },
  ]
  return (
    <section aria-label="Контактна інформація" className="bg-white">
      <ul className="container-page grid divide-y divide-border sm:grid-cols-[1.5fr_1.1fr_0.65fr] sm:divide-x sm:divide-y-0">
        {items.map(({ Icon, label, value, href }) => (
          <li key={label} className="flex items-center gap-4 py-5 sm:px-8 sm:first:pl-0 lg:py-7">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary lg:hidden">
              <Icon className="size-[18px]" />
            </span>
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">{label}</p>
              {href ? (
                <a href={href} className="text-sm font-medium transition-colors hover:text-primary lg:text-base">{value}</a>
              ) : (
                <p className={label === 'Адреса' ? 'text-sm font-light lg:text-[clamp(1rem,2.3vw,2.75rem)]' : 'text-sm font-medium'}>{value}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
