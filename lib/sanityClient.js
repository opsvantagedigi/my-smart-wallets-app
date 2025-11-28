// lib/sanityClient.js
// Server-only Sanity client. Do NOT import from client-side code.

const sanityClient = require('@sanity/client');

if (typeof window !== 'undefined') {
  throw new Error('lib/sanityClient must only be used on the server.');
}

const PROJECT_ID = process.env.SANITY_PROJECT_ID;
const DATASET = process.env.SANITY_DATASET || 'production';
const TOKEN = process.env.SANITY_API_TOKEN;

if (!PROJECT_ID) {
  throw new Error('Missing SANITY_PROJECT_ID environment variable.');
}
if (!TOKEN) {
  throw new Error('Missing SANITY_API_TOKEN environment variable.');
}

const client = sanityClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: '2025-11-28',
  useCdn: false,
  token: TOKEN,
});

module.exports = client;
