export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-11-12'

// Allow sensible defaults so builds can run locally without requiring secrets.
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// If you have a real project, set NEXT_PUBLIC_SANITY_PROJECT_ID in your environment
// (Netlify build settings or local .env). We default to the project's ID used during setup.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ny9kxnq1'

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
