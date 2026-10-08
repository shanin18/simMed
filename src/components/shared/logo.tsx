import Link from 'next/link'
import Image from 'next/image'

import { cn } from '@/lib/utils'

export function Logo({ className, variant = 'navbar' }: { className?: string; variant?: 'navbar' | 'footer' }) {
  const footer = variant === 'footer'
  return (
    <Link href="/" aria-label="SimMed — на головну" className={cn('inline-flex items-center gap-1.5', className)}>
      <Image src={footer ? '/images/footer-log.png' : '/images/logo.png'} alt="СімМед — медичний центр" width={footer ? 210 : 212} height={footer ? 74 : 64} sizes="(min-width: 1024px) 190px, 145px" className="h-auto w-[145px] lg:w-[190px]" />
    </Link>
  )
}
