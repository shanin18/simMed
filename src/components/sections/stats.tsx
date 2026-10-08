import { stats } from '@/content/home'

export function Stats() {
  return (
    <section aria-label="Клініка у цифрах" className="container-page py-8 lg:py-14">
      <dl className="mx-auto grid max-w-[90%] grid-cols-2 gap-x-6 gap-y-10 text-center lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse items-center gap-3 lg:border-r lg:border-primary/20 lg:last:border-0">
            <dt className="text-sm text-muted-foreground">{s.label}</dt>
            <dd className="text-[clamp(2.5rem,4.2vw,4.5rem)] font-light leading-none tracking-tight text-primary tabular-nums">
              <span className="sr-only">{s.value}</span>
              <span aria-hidden="true" data-count={s.value}>{s.value}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
