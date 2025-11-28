import type { NextApiRequest, NextApiResponse } from 'next'
import { ethers } from 'ethers'

type Data = { success: boolean; balance?: string; error?: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'GET') return res.status(405).json({ success: false, error: 'Method not allowed' })
  const { address, token } = req.query
  if (!address || !token) return res.status(400).json({ success: false, error: 'Missing address or token' })

  const RPC = process.env.NEXT_PUBLIC_ALCHEMY_RPC || `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
  try {
    const provider = new ethers.providers.JsonRpcProvider(RPC)
    const abi = ['function balanceOf(address) view returns (uint256)', 'function decimals() view returns (uint8)']
    const contract = new ethers.Contract(String(token), abi, provider)
    const raw = await contract.balanceOf(String(address))
    let decimals = 18
    try { decimals = await contract.decimals() } catch {}
    const formatted = ethers.utils.formatUnits(raw, decimals)
    return res.status(200).json({ success: true, balance: String(formatted) })
  } catch (err: any) {
    console.error('balance error', err)
    return res.status(500).json({ success: false, error: String(err.message || err) })
  }
}
