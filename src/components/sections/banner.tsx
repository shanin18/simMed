import { Logo } from '@/components/shared/logo'
import { Photo } from '@/components/shared/photo'
import { Button } from '@/components/ui/button'
import { banner } from '@/content/home'

export function Banner({ bookingUrl }: { bookingUrl: string }) {
  return (
    <section aria-label="Про клініку" className="container-page py-6 lg:py-10">
      <div className="grid overflow-hidden rounded-[28px] bg-primary lg:grid-cols-[72fr_28fr]">
        <div className="relative isolate min-h-[340px] sm:min-h-[420px] lg:min-h-[min(40vw,765px)]">
          <Photo src={banner.image} alt={banner.alt} sizes="(min-width:1024px) 60vw, 100vw" />
          <div className="absolute inset-0 bg-primary/35" />
          <p className="absolute bottom-6 left-6 right-6 max-w-[12ch] text-[clamp(1.75rem,4.5vw,5.5rem)] font-light leading-[1.05] text-white lg:bottom-9 lg:left-20">
            {banner.lead}{' '}
            <strong className="font-bold">{banner.strong}</strong>
          </p>
          <span
            aria-hidden
            className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 rotate-180 select-none text-[clamp(4rem,9.5vw,10rem)] font-medium leading-[0.85] tracking-tight text-primary [writing-mode:vertical-rl] lg:block"
          >
            simmed
          </span>
        </div>

        <div className="flex flex-col justify-between gap-8 p-6 text-white sm:p-8 lg:p-9">
          <Logo variant="footer" />
          <div>
            <h2 className="text-xl font-medium leading-tight lg:text-2xl">{banner.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/75">{banner.text}</p>
          </div>
          <Button asChild variant="blush" size="lg" className="w-full">
            <a href={bookingUrl}>{banner.cta}</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
