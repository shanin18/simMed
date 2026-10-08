'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, HousePlus } from 'lucide-react'

import { Photo } from '@/components/shared/photo'
import { Button } from '@/components/ui/button'
import { heroSlides } from '@/content/home'
import { cn } from '@/lib/utils'

const INTERVAL = 6000

export function Hero({ bookingUrl }: { bookingUrl: string }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (paused || reduced) return
    const t = setTimeout(() => setIndex((i) => (i + 1) % heroSlides.length), INTERVAL)
    return () => clearTimeout(t)
  }, [index, paused, reduced])

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Головний банер"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative isolate overflow-hidden bg-[#eceeee]"
    >
      <div className="relative min-h-[600px] h-[640px] md:h-[700px] xl:h-[min(41.4vw,795px)]">
        {heroSlides.map((s, i) => {
          const Tag = i === 0 ? 'h1' : 'p'
          const active = i === index
          return (
            <div
              key={s.badge}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} з ${heroSlides.length}`}
              aria-hidden={!active}
              className={cn('absolute inset-0 transition-opacity duration-700', active ? 'opacity-100' : 'pointer-events-none opacity-0')}
            >
              {(i === 0 || active) && <Photo
                src={s.image}
                alt={s.alt}
                priority={i === 0}
                sizes="100vw"
                imgClassName="object-[center_30%]"
              />}
              <div className="absolute inset-0 bg-gradient-to-r from-[#f0f1f1] via-[#f0f1f1]/75 to-[#f0f1f1]/10 lg:via-[#f0f1f1]/15 lg:to-[#f0f1f1]/10" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/50 to-transparent" />

              <div className="container-page relative flex h-full flex-col justify-center pb-40 pt-24 md:pb-32 xl:pb-0 xl:pt-36">
                <span className="mb-5 w-fit rounded-full bg-blush px-4 py-1.5 text-xs font-medium text-white lg:mb-7">
                  {s.badge}
                </span>
                <Tag className="max-w-[12ch] text-[clamp(2.25rem,4.6vw,5.5rem)] font-light leading-[1.05] tracking-tight text-foreground md:max-w-[12ch]">
                  {i === 0 ? (
                    <>
                      <span className="block">Тут краса</span>
                      <span className="block">зустрічається</span>
                      <span className="block">зі <strong className="font-semibold text-primary">здоров’ям</strong></span>
                    </>
                  ) : <>{s.lead}{' '}<strong className="font-semibold text-primary">{s.strong}</strong></>}
                </Tag>
              </div>
            </div>
          )
        })}

        {/* Booking card */}
        <div className="container-page pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-start lg:bottom-auto lg:top-[50%] lg:justify-end">
          <div className="pointer-events-auto w-full max-w-[300px] rounded-[20px] bg-primary p-5 text-white shadow-[0_20px_50px_-20px_rgba(0,77,82,.6)] lg:max-w-[312px] lg:p-6">
            <span className="inline-flex text-white/80">
              <HousePlus className="size-10" strokeWidth={1.6} />
            </span>
            <p className="mt-4 text-sm leading-snug text-white/90">
              Сучасні технології лікування за доступними цінами
            </p>
            <Button asChild variant="light" size="sm" className="mt-5">
              <a href={bookingUrl}>
                Записатися онлайн <ArrowUpRight />
              </a>
            </Button>
          </div>
        </div>

        {/* Pagination */}
        <div className="container-page absolute inset-x-0 bottom-[15rem] z-10 lg:bottom-10">
          <div className="flex items-center gap-3">
            {([-1, 1] as const).map((direction) => (
              <button
                key={direction}
                type="button"
                aria-label={direction === -1 ? 'Попередній слайд' : 'Наступний слайд'}
                onClick={() => setIndex((current) => (current + direction + heroSlides.length) % heroSlides.length)}
                className={cn('grid size-11 place-items-center rounded-full transition-colors', direction === 1 ? 'bg-primary text-white hover:bg-primary-hover' : 'bg-white text-primary hover:bg-white/80')}
              >
                {direction === -1 ? <ArrowLeft className="size-4" /> : <ArrowRight className="size-4" />}
              </button>
            ))}
            <div className="relative ml-1 flex h-1 w-28 gap-1 sm:w-40" aria-hidden>
              <div className="relative h-full flex-1 overflow-hidden rounded-full bg-primary/20">
              <div
                key={index}
                className={cn('absolute inset-0 origin-left rounded-full bg-primary', !reduced && 'animate-progress')}
                style={{ animationDuration: `${INTERVAL}ms`, animationPlayState: paused ? 'paused' : 'running' }}
              />
              </div>
              <span className="h-full w-3 rounded-full bg-blush" />
              <span className="h-full w-3 rounded-full bg-blush" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
