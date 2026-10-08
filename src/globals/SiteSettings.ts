import { revalidatePath } from 'next/cache'
import type { GlobalConfig } from 'payload'

/** Clinic-wide data used by header/footer/JSON-LD. Editable from /admin. */
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Налаштування сайту',
  access: { read: () => true },
  hooks: {
    afterChange: [
      () => {
        try {
          revalidatePath('/')
        } catch {
          /* not in a Next request context (e.g. seed scripts) */
        }
      },
    ],
  },
  fields: [
    { name: 'clinicName', type: 'text', defaultValue: 'SimMed', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'email', type: 'email' },
    { name: 'address', type: 'text' },
    { name: 'city', type: 'text' },
    { name: 'workingHours', type: 'text' },
    { name: 'bookingUrl', type: 'text', admin: { description: 'Health24 booking URL (optional until API phase)' } },
    {
      name: 'social',
      type: 'group',
      fields: [
        { name: 'instagram', type: 'text' },
        { name: 'facebook', type: 'text' },
        { name: 'telegram', type: 'text' },
      ],
    },
  ],
}
