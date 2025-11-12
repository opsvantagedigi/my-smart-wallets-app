
export type HeroContent = {
  headline: string;
  subtext: string;
  ctaLabel: string;
  ctaLink: string;
  backgroundImage?: {
    asset?: {
      url: string;
    };
  };
};

import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2023-01-01',
  useCdn: true,
});

export const fetchHeroContent = async (): Promise<HeroContent | null> => {
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
