import { client } from './lib/sanity';

async function testFetch() {
  try {
    const data = await client.fetch(`*[_type == "heroContent"]`);
    console.log('Fetched heroContent:', data);
  } catch (error) {
    console.error('Error fetching heroContent:', error);
  }
}

testFetch();
