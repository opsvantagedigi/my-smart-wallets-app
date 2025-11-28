import React from 'react'
import Header from '../ui/Header'
import { useEffect, useState } from 'react'
import { connectWallet, getWalletAddress } from '../lib/wallet'
import { getTokenBalance, getRecentActivity } from '../lib/sentinel'

export default function Dashboard() {
  const [addr, setAddr] = useState<string | null>(null)
  const [balance, setBalance] = useState<any>(null)
  const [activity, setActivity] = useState<any[]>([])

  useEffect(()=>{
    async function init(){
      const w = await getWalletAddress()
      setAddr(w)
      if (w) {
        const b = await getTokenBalance(w, process.env.NEXT_PUBLIC_MARZ_TOKEN_ADDRESS || '')
        setBalance(b)
        const a = await getRecentActivity(w)
        setActivity(a || [])
      }
    }
    init()
  }, [])

  async function handleConnect(){
    const a = await connectWallet()
    setAddr(a)
  }

  return (
    <div>
      <Header />
      <main className="p-8">
        <h1 className="text-3xl font-orbitron">Crypto Sentinel</h1>
        <div className="mt-4">
          <button onClick={handleConnect} className="px-4 py-2 bg-brand-start text-white rounded">Connect Wallet</button>
        </div>
        <div className="mt-6">
          <h2 className="text-xl">Wallet Address</h2>
          <p>{addr ?? 'Not connected'}</p>
        </div>
        <div className="mt-4">
          <h2 className="text-xl">MARZ Balance</h2>
          <p>{balance ? JSON.stringify(balance) : '—'}</p>
        </div>
        <div className="mt-6">
          <h2 className="text-xl">Recent Activity</h2>
          <ul>{activity.map((it,i)=>(<li key={i}>{JSON.stringify(it)}</li>))}</ul>
        </div>
      </main>
    </div>
  )
}
