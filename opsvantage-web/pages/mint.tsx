import React, { useState } from 'react'
import Header from '../ui/Header'
import { connectWallet, getWalletAddress } from '../lib/wallet'
import { mintMarzToken } from '../lib/mint'

export default function MintPage() {
  const [addr, setAddr] = useState<string | null>(null)
  const [amount, setAmount] = useState('1')
  const [status, setStatus] = useState('')

  async function handleConnect() {
    const a = await connectWallet()
    setAddr(a)
  }

  async function handleMint() {
    setStatus('Minting...')
    const wallet = await getWalletAddress()
    const to = addr || wallet
    if (!to) return setStatus('No address connected')
    try {
      const r = await mintMarzToken(to, amount)
      setStatus('Mint request sent')
    } catch (err) {
      setStatus('Mint failed')
    }
  }

  return (
    <div>
      <Header />
      <main className="p-8">
        <h1 className="text-2xl font-orbitron">Mint MARZ Token</h1>
        <div className="mt-4">
          <button onClick={handleConnect} className="px-4 py-2 bg-brand-start text-white rounded">Connect Wallet</button>
        </div>
        <div className="mt-4">
          <input value={amount} onChange={(e)=>setAmount(e.target.value)} className="p-2 rounded" />
          <button onClick={handleMint} className="ml-2 px-4 py-2 brand-btn rounded">Mint</button>
        </div>
        <p className="mt-4">{status}</p>
      </main>
    </div>
  )
}
