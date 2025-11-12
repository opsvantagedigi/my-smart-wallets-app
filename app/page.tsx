
import Landing from './components/landing';
import { fetchHeroContent, HeroContent } from '../lib/sanity';

export default async function HomePage() {
  const hero: HeroContent | null = await fetchHeroContent();
  return <Landing hero={hero} />;
}
