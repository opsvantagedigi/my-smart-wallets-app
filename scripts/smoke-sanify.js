// scripts/smoke-sanify.js
// Minimal read-only Sanity smoke check used by CI.

const sanityClient = require('@sanity/client');

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error('Missing SANITY_PROJECT_ID or SANITY_API_TOKEN; aborting smoke check.');
  process.exit(1);
}

const client = sanityClient({
  projectId,
  dataset,
  apiVersion: '2025-11-28',
  useCdn: false,
  token,
});

(async () => {
  try {
    const result = await client.fetch('*[0...1]{_id}');
    console.log('Sanity smoke check OK. Found docs:', Array.isArray(result) ? result.length : 0);
    process.exit(0);
  } catch (err) {
    console.error('Sanity smoke check FAILED', err && err.message ? err.message : err);
    process.exit(2);
  }
})();
