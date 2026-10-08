
import { Photo } from '@/components/shared/photo'
import { SectionTitle } from '@/components/shared/section-title'
import { Button } from '@/components/ui/button'
import { about } from '@/content/home'

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="container-page relative pb-12 lg:pb-28">
      <span aria-hidden className="pointer-events-none absolute right-[6%] top-[-3rem] hidden select-none text-[12vw] font-semibold leading-none text-white lg:block">Про нас</span>
      <div className="relative mb-8 flex flex-col items-start justify-between gap-5 lg:mb-10 lg:flex-row lg:items-end">
        <SectionTitle id="about-title" light={about.light} strong={about.strong} className="max-w-[26ch]" />
        <Button asChild variant="default" size="sm" className="hidden lg:inline-flex">
          <a href="#about">{about.cta}</a>
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.85fr_1.65fr_1.2fr] lg:gap-5">
        <div className="flex flex-col justify-between gap-6">
          <p className="text-lg leading-[1.25] text-muted-foreground lg:text-[clamp(1.25rem,2vw,2.25rem)]">{about.text}</p>
          <Button asChild size="sm" className="w-fit">
            <a href="#about">{about.more}</a>
          </Button>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] lg:aspect-auto lg:min-h-[min(34.5vw,660px)]">
          <Photo src={about.image} alt={about.imageAlt} sizes="(min-width:1024px) 45vw, 100vw" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-[auto_1fr]">
          <div className="rounded-[20px] bg-white p-6">
            <h3 className="text-base font-semibold text-primary">{about.values.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{about.values.text}</p>
          </div>
          <div className="rounded-[20px] bg-white p-6">
            <h3 className="text-base font-semibold text-primary">{about.directions.title}</h3>
            <ul className="mt-3 space-y-1">
              {about.directions.list.map((d) => (
                <li key={d} className="flex items-center gap-2.5 text-sm">
                  <span aria-hidden>•</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
