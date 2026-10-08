'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, UserRound } from 'lucide-react'
import { QuoteMark } from '@/components/shared/icons'
import { Photo } from '@/components/shared/photo'
import { SectionTitle } from '@/components/shared/section-title'
import { doctors } from '@/content/home'

export function Doctors() {
  const [active, setActive] = useState(0)
  const quote = doctors.quotes[active]
  return (
    <section id="doctors" aria-labelledby="doctors-title" className="container-page py-12 lg:py-28">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-5">
        <div>
          <SectionTitle id="doctors-title" light={doctors.light} strong={doctors.strong} className="mb-6 lg:mb-8" />
          <div className="relative aspect-[16/9] overflow-hidden rounded-[20px]">
            <Photo src={doctors.image} alt={doctors.alt} sizes="(min-width:1024px) 50vw, 100vw" />
          </div>
        </div>
        <div role="region" aria-roledescription="carousel" aria-label="Слово від лікарів" className="flex min-h-[380px] flex-col rounded-[20px] bg-white p-6 sm:p-8 lg:p-10">
          <figure className="flex h-full flex-1 flex-col">
            <QuoteMark className="mb-5 size-8 text-[#a9babc]" />
            <blockquote aria-live="polite" className="text-[clamp(1.2rem,2.3vw,2.75rem)] font-light leading-snug text-foreground">{quote.text}</blockquote>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{quote.sub}</p>
            <div className="mt-auto flex items-center justify-between gap-4 pt-12">
              <figcaption className="flex min-w-0 items-center gap-3">
                <span className="grid size-14 shrink-0 place-items-center rounded-full border border-border bg-background text-muted-foreground"><UserRound className="size-5" strokeWidth={1.2} /></span>
                <span><span className="block text-sm font-medium">{quote.name}</span><span className="block text-xs text-muted-foreground">{quote.role}</span></span>
              </figcaption>
              <div className="flex shrink-0 gap-2">
                {([-1, 1] as const).map((direction) => (
                  <button key={direction} type="button" aria-label={direction === -1 ? 'Попередній лікар' : 'Наступний лікар'} onClick={() => setActive((current) => (current + direction + doctors.quotes.length) % doctors.quotes.length)} className={`grid size-9 place-items-center rounded-full transition-colors ${direction === 1 ? 'bg-primary text-white hover:bg-primary-hover' : 'border border-border bg-white text-primary hover:bg-background'}`}>
                    {direction === -1 ? <ArrowLeft className="size-3.5" /> : <ArrowRight className="size-3.5" />}
                  </button>
                ))}
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  )
}
