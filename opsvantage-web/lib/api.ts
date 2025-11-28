export async function fetcher(url: string, opts: RequestInit = {}) {
  const res = await fetch(url, opts);
  if (!res.ok) throw new Error(`Fetch error: ${res.status} ${res.statusText}`);
  return res.json();
}

export const strapiRest = (path: string) => `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'}${path}`;
