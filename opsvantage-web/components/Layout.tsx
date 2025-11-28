import React from 'react'
import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <header className="backdrop-blur-sm bg-white/60 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="font-orbitron text-2xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-emerald-500 to-yellow-400">OpsVantage</Link>
          <nav className="space-x-4">
            <Link href="/dashboard" className="text-sm font-medium">Dashboard</Link>
            <Link href="/mint" className="text-sm font-medium">Mint</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>

      <footer className="mt-12 border-t border-slate-200 bg-white/60">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-slate-600">© {new Date().getFullYear()} OpsVantage — Built with smart wallets in mind.</div>
      </footer>
    </div>
  )
}
