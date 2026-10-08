# SimMed Clinic

Bun runtime, Next.js 15 App Router and React 19 Server Components, TypeScript, embedded Payload CMS 3, PostgreSQL, Tailwind CSS 4, Radix UI, Lucide and shadcn-style Button/Accordion primitives. `components.json` configures the shadcn CLI (new-york style).

## Run without Docker

1. Install Bun and provision local PostgreSQL or a hosted PostgreSQL database.
2. Copy `.env.example` to `.env` and set `DATABASE_URI` and a strong `PAYLOAD_SECRET`.
3. Run `bun install`, `bun run generate:importmap`, and `bun run dev`.
4. Open http://localhost:3000; Payload admin lives at `/admin`.

For a frontend preview, omit `DATABASE_URI`; the homepage uses fallback clinic settings. CMS admin and REST endpoints require PostgreSQL and a Payload secret.

Production: `bun run build`, then `bun run start`. Docker files have been removed: they are optional in the client brief and not needed for this application. Next's standalone output also supports deployment to a Node/Bun server. Database operations and backups must be configured separately for the chosen provider.

## Design and typography

Homepage photography and desktop proportions follow the supplied screenshot, with responsive layouts for smaller screens. Onest is loaded through next/font with Latin and Cyrillic subsets, font-display swap, and self-hosted delivery after compilation. Exact font identity and pixel measurements still need verification against the source Figma, which was inaccessible during implementation. The logo is a text approximation rather than an exported brand asset.

## Images and performance

The original photos are retained in `public/images` as source assets. The page references only `public/images/optimized/*.webp`: about 0.63 MB combined versus 59.64 MB for the originals (98.9% smaller). Regenerate with `bun run images:optimize` after changing source photography. The cardiology image includes a baked-in label, which the script crops out before rendering the UI label.

Next Image generates responsive AVIF/WebP variants using explicit sizes. Only the initial hero is preloaded; below-fold photographs load lazily and inactive hero images are mounted when selected. Server-rendered homepage content is revalidated hourly, with CMS-triggered revalidation. The CMS admin dependencies stay outside the frontend client bundle. These changes reduce transfer size; Core Web Vitals still require browser and deployed-site measurement.

## Checks

`bun run typecheck` and `bun run build`.

## Client brief coverage

Implemented foundations: Next App Router/RSC, embedded Payload, PostgreSQL adapter, Bun commands, Tailwind/shadcn-style primitives, clinic settings in CMS, SSR/ISR, metadata/canonical, sitemap, robots, MedicalClinic/FAQPage/WebSite JSON-LD.

Still pending: Health24 secure proxy, timetable synchronization, rate limits and double-booking protection, actual booking flow, scheduled cloud backups and restore verification, CMS-managed page/service content and per-page SEO, remaining pages, and optional Redis. Current booking links use a section anchor until a real booking URL is set in CMS. Homepage content, statistics, reviews and medical claims need client verification before launch.
