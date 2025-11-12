import Landing from './components/landing';
import { fetchHeroContent } from '../lib/sanity';

export default async function HomePage() {
  const hero = await fetchHeroContent();
  return <Landing hero={hero} />;
}
