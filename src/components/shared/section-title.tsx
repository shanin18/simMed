import { cn } from '@/lib/utils'

type Props = {
  light: string
  strong?: string
  as?: 'h1' | 'h2' | 'h3'
  id?: string
  className?: string
  tone?: 'default' | 'inverse'
}

/** Two-weight heading used across the site: light brand-colored lead, bold dark tail. */
export function SectionTitle({ light, strong, as: Tag = 'h2', id, className, tone = 'default' }: Props) {
  return (
    <Tag
      id={id}
      className={cn(
        'text-[clamp(1.75rem,2.5vw,2.75rem)] font-light leading-[1.15] tracking-tight',
        tone === 'default' ? 'text-primary' : 'text-white',
        className,
      )}
    >
      {light}
      {strong && (
        <>
          {' '}
          <strong className={cn('font-semibold', tone === 'default' ? 'text-foreground' : 'text-white')}>{strong}</strong>
        </>
      )}
    </Tag>
  )
}
