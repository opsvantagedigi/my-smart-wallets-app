import React from 'react'

export default function Hero() {
  return (
    <section aria-label="Hero" className="rounded-xl overflow-hidden py-20 px-6 mb-8" style={{background: 'linear-gradient(90deg,#0f172a 0%, #065f46 50%, #f59e0b 100%)'}}>
      <div className="max-w-4xl mx-auto text-center text-white">
        <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-4">Smart Wallets for Real-World Web3</h1>
        <p className="text-lg md:text-xl opacity-90">Onboard users with gas-efficient, secure smart wallets and seamless NFT minting.</p>
      </div>
    </section>
  )
}
