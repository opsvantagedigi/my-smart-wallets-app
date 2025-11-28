import React from 'react'
import Button from './Button'

export default function WalletCTA(){
  return (
    <div className="p-6 rounded-xl bg-gradient-to-r from-indigo-700 via-emerald-500 to-yellow-400 text-white">
      <h3 className="font-orbitron text-xl">Create a Smart Wallet</h3>
      <p className="mt-2">Start onboarding users with account abstraction and gasless flows.</p>
      <div className="mt-4"><Button>Get Started</Button></div>
    </div>
  )
}
