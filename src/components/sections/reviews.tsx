import { FacebookIcon, InstagramIcon, QuoteMark } from '@/components/shared/icons'
import type { SiteSettings } from '@/lib/site-settings'

import { Photo } from '@/components/shared/photo'
import { ScrollCarousel } from '@/components/shared/scroll-carousel'
import { SectionTitle } from '@/components/shared/section-title'
import { reviews } from '@/content/home'
import { cn } from '@/lib/utils'

export function Reviews({ social }: { social: SiteSettings['social'] }) {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="container-page py-10 lg:py-16">
      <ScrollCarousel
        label="Відгуки пацієнтів"
        title={<SectionTitle id="reviews-title" light={reviews.light} strong={reviews.strong} />}
        headerActions={<div className="flex items-center gap-2 text-primary"><a href={social.facebook} aria-label="Facebook"><FacebookIcon className="size-5" /></a><a href={social.instagram} aria-label="Instagram"><InstagramIcon className="size-5" /></a></div>}
      >
        {reviews.items.map((r) => (
          <article
            key={r.name}
            className={cn(
              'flex min-h-[260px] w-[min(82vw,360px)] shrink-0 snap-start flex-col justify-between gap-8 rounded-[20px] p-6 transition-transform duration-300 hover:-translate-y-1 lg:w-[calc((100%_-_3rem)/4)] lg:min-w-0',
              r.featured ? 'bg-primary text-white' : 'bg-white',
            )}
          >
            <div>
              <QuoteMark className="size-8" />
              <p className={cn('mt-4 text-sm leading-relaxed', r.featured ? 'text-white/90' : 'text-foreground/80')}>{r.text}</p>
            </div>
            <footer className="flex items-center gap-3">
              <span className="relative size-10 shrink-0 overflow-hidden rounded-full">
                <Photo src={r.avatar} alt="" sizes="40px" />
              </span>
              <span>
                <span className="block text-sm font-medium">{r.name}</span>
                <span className={cn('block text-xs', r.featured ? 'text-white/60' : 'text-muted-foreground')}>{r.meta}</span>
              </span>
            </footer>
          </article>
        ))}
      </ScrollCarousel>
    </section>
  )
}
