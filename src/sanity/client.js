import { createClient } from '@sanity/client'

const projectId = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SANITY_PROJECT_ID) || 'ofu7di82'
const dataset = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SANITY_DATASET) || 'production'

const isBrowser = typeof window !== 'undefined'
const isDev = typeof import.meta !== 'undefined' && import.meta.env?.DEV

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-10-11',
  useCdn: false,
  ...(isBrowser && isDev
    ? {
        useProjectHostname: false,
        apiHost: `${window.location.origin}/api-sanity`,
      }
    : {}),
})
