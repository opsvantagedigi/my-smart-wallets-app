import type { NextApiRequest, NextApiResponse } from 'next'
import { ethers } from 'ethers'

type Data = { success: boolean; txHash?: string; error?: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Method not allowed' })

  const { to, amount } = req.body || {}
  if (!to || !amount) return res.status(400).json({ success: false, error: 'Missing to or amount' })

  const PRIVATE_KEY = process.env.MARZ_MINT_PRIVATE_KEY
  const RPC = process.env.NEXT_PUBLIC_ALCHEMY_RPC || `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
  const TOKEN_ADDRESS = process.env.NEXT_PUBLIC_MARZ_TOKEN_ADDRESS

  if (!PRIVATE_KEY) return res.status(500).json({ success: false, error: 'Mint private key not configured' })
  if (!TOKEN_ADDRESS) return res.status(500).json({ success: false, error: 'MARZ token address not configured' })

  try {
    const provider = new ethers.providers.JsonRpcProvider(RPC)
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider)
    const abi = [
      'function mint(address to, uint256 amount) public returns (bool)',
      'function decimals() view returns (uint8)'
    ]
    const contract = new ethers.Contract(TOKEN_ADDRESS, abi, wallet)

    // Convert amount to token units using decimals if available
    let decimals = 18
    try { decimals = await contract.decimals() } catch {}
    const parsed = ethers.utils.parseUnits(String(amount), decimals)

    const tx = await contract.mint(to, parsed)
    await tx.wait()
    return res.status(200).json({ success: true, txHash: tx.hash })
  } catch (err: any) {
    console.error('mint error', err)
    return res.status(500).json({ success: false, error: String(err.message || err) })
  }
}
