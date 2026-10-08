'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

import { Logo } from '@/components/shared/logo'
import { Button } from '@/components/ui/button'
import { nav } from '@/content/home'

export function Header({ bookingUrl }: { bookingUrl: string }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="absolute inset-x-0 top-0 z-40">
      <div className="container-page flex h-[72px] items-center justify-between gap-6 lg:h-24">
        <Logo />

        <nav aria-label="Головна навігація" className="hidden xl:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm text-foreground/75 transition-colors hover:text-primary">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button asChild size="sm">
            <a href={bookingUrl}>Записатися</a>
          </Button>
          <Button asChild size="sm" variant="light">
            <a href="tel:+380935456810">+38 (093) 545 68 10</a>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Відкрити меню"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="grid size-11 place-items-center rounded-full bg-white/80 text-primary backdrop-blur xl:hidden"
        >
          <Menu className="size-5" />
        </button>
      </div>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Меню"
        hidden={!open}
        className="fixed inset-0 z-50 flex flex-col bg-background p-4 xl:hidden"
      >
        <div className="flex h-14 items-center justify-between">
          <Logo />
          <button type="button" onClick={() => setOpen(false)} aria-label="Закрити меню" className="grid size-11 place-items-center rounded-full bg-white text-primary">
            <X className="size-5" />
          </button>
        </div>
        <ul className="mt-6 flex flex-col">
          {nav.map((item) => (
            <li key={item.href} className="border-b border-border">
              <a href={item.href} onClick={() => setOpen(false)} className="block py-4 text-xl font-light text-primary">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <Button asChild size="lg" className="mt-auto w-full">
          <a href={bookingUrl} onClick={() => setOpen(false)}>Записатися на прийом</a>
        </Button>
      </div>
    </header>
  )
}
