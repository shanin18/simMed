import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 828, 1080, 1280, 1536, 1920],
    imageSizes: [32, 48, 64, 96, 160, 256, 384],
  },
  async headers() {
    return [
      {
        source: '/images/optimized/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
      },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
