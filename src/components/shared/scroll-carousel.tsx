'use client'

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

type Props = { label: string; title: ReactNode; children: ReactNode; headerActions?: ReactNode }

export function ScrollCarousel({ label, title, children, headerActions }: Props) {
  const track = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [offset, setOffset] = useState(0)
  const cards = Children.toArray(children)
  const ordered = [...cards.slice(offset), ...cards.slice(0, offset)]
  const update = useCallback(() => {
    const el = track.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setProgress(max > 4 ? el.scrollLeft / max : 0)
  }, [])
  useEffect(() => {
    const el = track.current
    if (!el) return
    const observer = new ResizeObserver(update)
    observer.observe(el)
    update()
    return () => observer.disconnect()
  }, [update])
  const scrollByCard = (direction: 1 | -1) => {
    const el = track.current
    if (!el || !cards.length) return
    const max = el.scrollWidth - el.clientWidth
    if (max <= 4) {
      setOffset((current) => (current + direction + cards.length) % cards.length)
      return
    }
    const card = el.firstElementChild as HTMLElement | null
    const target = el.scrollLeft + direction * ((card?.offsetWidth ?? 320) + 16)
    el.scrollTo({ left: target < -4 ? max : target > max + 4 ? 0 : target, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }
  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div className="mb-6 flex items-end justify-between gap-4 lg:mb-8">{title}{headerActions}</div>
      <div ref={track} onScroll={update} tabIndex={0} className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-1 sm:mx-0 sm:px-0">
        {ordered}
      </div>
      <div className="mt-6 flex items-center gap-4">
        <div className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-white" aria-hidden>
          <div className="absolute inset-y-0 left-0 bg-primary transition-[width] duration-200" style={{ width: `${28 + progress * 72}%` }} />
        </div>
        <div className="flex shrink-0 gap-2">
          {([-1, 1] as const).map((direction) => (
            <button key={direction} type="button" onClick={() => scrollByCard(direction)} aria-label={direction === -1 ? 'Попередні відгуки' : 'Наступні відгуки'} className={`grid size-9 place-items-center rounded-full transition-colors ${direction === 1 ? 'bg-primary text-white hover:bg-primary-hover' : 'bg-white text-primary hover:bg-white/80'}`}>
              {direction === -1 ? <ArrowLeft className="size-3.5" /> : <ArrowRight className="size-3.5" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
