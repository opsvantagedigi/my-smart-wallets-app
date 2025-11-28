import { fetcher } from './api'

export async function mintMarzToken(toAddress: string, amount: string) {
  // This is a scaffold. In production you would call a secure server-side endpoint
  // that holds a minting private key or uses a smart contract via Alchemy SDK.
  const res = await fetcher('/api/mint', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ to: toAddress, amount }),
  })
  return res
}
