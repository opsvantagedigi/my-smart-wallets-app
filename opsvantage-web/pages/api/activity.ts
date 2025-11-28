import type { NextApiRequest, NextApiResponse } from 'next'
import { JsonRpcProvider } from 'ethers'

type Data = { success: boolean; txs?: any[]; error?: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'GET') return res.status(405).json({ success: false, error: 'Method not allowed' })
  const { address } = req.query
  if (!address) return res.status(400).json({ success: false, error: 'Missing address' })

  const RPC = process.env.NEXT_PUBLIC_ALCHEMY_RPC || `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
  try {
    const provider = new JsonRpcProvider(RPC)
    // fetch recent transactions; for large-scale use consider Alchemy APIs
    const history = await provider.getHistory(String(address), Date.now() - 1000 * 60 * 60 * 24 * 7)
    const mapped = history.map(tx => ({ hash: tx.hash, from: tx.from, to: tx.to, value: tx.value.toString(), timestamp: tx.timestamp }))
    return res.status(200).json({ success: true, txs: mapped })
  } catch (err: any) {
    console.error('activity error', err)
    return res.status(500).json({ success: false, error: String(err.message || err) })
  }
}
