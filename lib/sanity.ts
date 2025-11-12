
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2023-01-01',
  useCdn: true,
});

export const fetchHeroContent = async () => {
  const query = `*[_type == "heroContent" && visible == true][0]{
    headline,
    subtext,
    ctaLabel,
    ctaLink,
    backgroundImage {
      asset-> {
        url
      }
    }
  }`;
  return await sanityClient.fetch(query);
};
