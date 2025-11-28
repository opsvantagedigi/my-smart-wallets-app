import React from 'react'

export default function WalletDashboard() {
  return (
    <section aria-label="Wallet Dashboard" className="grid gap-6 md:grid-cols-3">
      <div className="p-6 bg-white/60 backdrop-blur rounded-xl border border-slate-200">
        <h3 className="text-lg font-medium">Connected Wallet</h3>
        <p className="mt-2 text-sm text-slate-700">No wallet connected</p>
        <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded">Connect</button>
      </div>

      <div className="p-6 bg-white/60 backdrop-blur rounded-xl border border-slate-200">
        <h3 className="text-lg font-medium">Balance</h3>
        <p className="mt-2 text-sm text-slate-700">—</p>
      </div>

      <div className="p-6 bg-white/60 backdrop-blur rounded-xl border border-slate-200">
        <h3 className="text-lg font-medium">Actions</h3>
        <div className="mt-3 space-y-2">
          <button className="w-full px-4 py-2 border rounded">Mint MARZ</button>
          <button className="w-full px-4 py-2 border rounded">View Activity</button>
        </div>
      </div>
    </section>
  )
}
