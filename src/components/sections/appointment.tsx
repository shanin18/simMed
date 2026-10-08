import { Check } from 'lucide-react'

import { Photo } from '@/components/shared/photo'
import { SectionTitle } from '@/components/shared/section-title'
import { Button } from '@/components/ui/button'
import { appointment } from '@/content/home'

export function Appointment({ bookingUrl }: { bookingUrl: string }) {
  return (
    <section id="appointment" aria-labelledby="appointment-title" className="container-page py-10 lg:py-16">
      <div className="grid gap-4 rounded-[28px] bg-white p-3 lg:grid-cols-[1.8fr_1fr] lg:gap-8 lg:p-4">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] lg:aspect-auto lg:min-h-[min(30vw,575px)]">
          <Photo src={appointment.image} alt={appointment.alt} sizes="(min-width:1024px) 55vw, 100vw" />
        </div>
        <div className="flex flex-col justify-between gap-5 p-3 sm:p-6 lg:p-10">
          <SectionTitle id="appointment-title" light={appointment.light} strong={appointment.strong} />
          <p className="text-sm leading-relaxed text-muted-foreground">{appointment.text}</p>
          <ul className="hidden">
            {appointment.points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-blush/30 text-primary">
                  <Check className="size-3" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="mt-2 w-fit">
            <a href={bookingUrl}>{appointment.cta}</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
