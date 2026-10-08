import { ArrowUpRight } from 'lucide-react'

import { Photo } from '@/components/shared/photo'
import { SectionTitle } from '@/components/shared/section-title'
import { Button } from '@/components/ui/button'
import { services } from '@/content/home'
import { cn } from '@/lib/utils'

type Item = (typeof services.items)[keyof typeof services.items]

function Tile({ item, className, tone = 'light', sizes }: { item: Item; className?: string; tone?: 'light' | 'teal'; sizes: string }) {
  return (
    <a
      href="#appointment"
      className={cn('group relative block aspect-[4/3] overflow-hidden rounded-[20px] bg-white lg:aspect-auto', className)}
    >
      <Photo src={item.image} alt={item.alt} sizes={sizes} imgClassName="group-hover:scale-105" />
      <span
        className={cn(
          'absolute bottom-3 left-3 inline-flex max-w-[calc(100%-1.5rem)] items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium shadow-sm transition-colors sm:text-[13px]',
          tone === 'teal' ? 'bg-primary text-white' : 'bg-white text-foreground group-hover:bg-primary group-hover:text-white',
        )}
      >
        <span className="truncate">{item.title}</span>
        <ArrowUpRight className="size-3.5 shrink-0" />
      </span>
    </a>
  )
}

export function Services() {
  const { intro, items, note } = services
  return (
    <section id="services" aria-labelledby="services-title" className="container-page py-14 lg:py-24">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-[repeat(12,minmax(0,1fr))] lg:grid-rows-[min(21vw,420px)_min(17.5vw,340px)_min(6vw,115px)] lg:gap-4">
        <div className="col-span-2 flex flex-col justify-between gap-6 pb-4 lg:col-span-4 lg:pb-0 lg:pr-6">
          <div>
            <SectionTitle id="services-title" as="h2" light={intro.light} strong={intro.strong} />
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-muted-foreground">{intro.text}</p>
          </div>
          <Button asChild className="w-fit">
            <a href="#appointment">{intro.cta}</a>
          </Button>
        </div>

        <Tile item={items.ultrasound} tone="teal" className="lg:col-span-4" sizes="(min-width:1024px) 33vw, 50vw" />
        <Tile item={items.diagnostics} className="lg:col-span-2 lg:h-[68%] lg:self-end" sizes="(min-width:1024px) 17vw, 50vw" />
        <Tile item={items.face} className="col-span-2 aspect-[16/10] lg:col-span-2 lg:aspect-auto" sizes="(min-width:1024px) 25vw, 100vw" />

        <Tile item={items.cosmetology} className="lg:col-span-4 lg:col-start-1 lg:row-start-2" sizes="(min-width:1024px) 33vw, 50vw" />
        <Tile item={items.consult} className="aspect-[3/4] lg:col-span-4 lg:col-start-5 lg:row-span-2 lg:row-start-2 lg:aspect-auto" sizes="(min-width:1024px) 33vw, 50vw" />
        <Tile item={items.lab} className="col-span-2 aspect-[16/10] lg:col-span-4 lg:col-start-9 lg:row-start-2 lg:aspect-auto" sizes="(min-width:1024px) 33vw, 100vw" />

        <p className="col-span-2 py-2 text-xs leading-relaxed text-muted-foreground lg:col-span-4 lg:col-start-9 lg:row-start-3 lg:py-3 lg:text-[13px]">
          {note}
        </p>
      </div>
    </section>
  )
}
