import 'dotenv/config';

import { fetchHeroContent } from "./lib/sanity.js";

async function run() {
  try {
    const data = await fetchHeroContent();
    console.log("Fetched heroContent:", data);
  } catch (error) {
    console.error("Error fetching heroContent:", error);
  }
}

run();
