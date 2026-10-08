import Image from 'next/image'

import { cn } from '@/lib/utils'

type PhotoProps = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  sizes?: string
  priority?: boolean
}

/** Fills its (relatively positioned) parent. The parent controls size / aspect ratio / radius. */
export function Photo({ src, alt, className, imgClassName, sizes = '(min-width: 1024px) 50vw, 100vw', priority }: PhotoProps) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        quality={80}
        unoptimized={src.endsWith('.svg')}
        className={cn('object-cover transition-transform duration-700 ease-out', imgClassName)}
      />
    </div>
  )
}
