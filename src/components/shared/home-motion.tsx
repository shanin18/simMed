'use client'

import { useEffect } from 'react'

/** Enhances server-rendered content without hiding it before hydration. */
export function HomeMotion() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let dispose = () => {}

    const setup = () => {
      dispose()
      if (preference.matches || !('IntersectionObserver' in window)) return

      const animations = new Set<Animation>()
      const frames = new Set<number>()
      const counters = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'))
      const sections = Array.from(document.querySelectorAll<HTMLElement>('#main > section')).slice(1)
      const reveal = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          reveal.unobserve(entry.target)
          const animation = entry.target.animate(
            [{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'translateY(0)' }],
            { duration: 720, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
          )
          animations.add(animation)
          animation.onfinish = () => animations.delete(animation)
        }
      }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' })

      // Already visible sections stay still; scrolling reveals only the sections below them.
      for (const section of sections) {
        if (section.getBoundingClientRect().top >= window.innerHeight) reveal.observe(section)
      }

      const count = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const element = entry.target as HTMLElement
          count.unobserve(element)
          const final = element.dataset.count ?? '0'
          const target = Number.parseInt(final, 10)
          const suffix = final.replace(/^\d+/, '')
          if (!Number.isFinite(target)) continue
          const started = performance.now()
          const tick = (now: number) => {
            const progress = Math.min((now - started) / 1500, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            element.textContent = `${Math.floor(target * eased)}${suffix}`
            if (progress < 1) schedule(tick)
            else element.textContent = final
          }
          schedule(tick)
        }
      }, { threshold: 0.5 })

      function schedule(callback: FrameRequestCallback) {
        const frame = requestAnimationFrame((now) => {
          frames.delete(frame)
          callback(now)
        })
        frames.add(frame)
      }

      for (const element of counters) count.observe(element)
      dispose = () => {
        reveal.disconnect()
        count.disconnect()
        animations.forEach((animation) => animation.cancel())
        frames.forEach(cancelAnimationFrame)
        counters.forEach((element) => { element.textContent = element.dataset.count ?? '' })
      }
    }

    setup()
    preference.addEventListener('change', setup)
    return () => {
      preference.removeEventListener('change', setup)
      dispose()
    }
  }, [])

  return null
}
