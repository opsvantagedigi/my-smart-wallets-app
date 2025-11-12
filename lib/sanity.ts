import { createClient } from 'next-sanity'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2023-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

// Example GROQ fetcher for hero content
export async function fetchHeroContent() {
  return sanityClient.fetch(`*[_type == "heroContent"][0]{
    title,
    subtitle,
    "backgroundImage": backgroundImage.asset->url,
    ctas[]
  }`)
}
