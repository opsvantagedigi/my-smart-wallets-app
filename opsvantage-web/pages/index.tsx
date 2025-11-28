import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../ui/Header'

export default function Home() {
  return (
    <div>
      <Head>
        <title>OpsVantage — Smart Wallets</title>
      </Head>
      <Header />
      <main className="p-8">
        <h1 className="text-4xl font-orbitron">Smart Wallets</h1>
        <p className="mt-4">Onboard users with secure smart wallets.</p>
        <div className="mt-8">
          <Link href="/dashboard" className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-700 via-emerald-500 to-yellow-400 text-white rounded-lg">Get started</Link>
          <Link href="/mint" className="inline-block ml-4 px-6 py-3 brand-btn rounded-lg">Mint MARZ</Link>
        </div>
      </main>
    </div>
  )
}
