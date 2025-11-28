import React from 'react'
import Header from '../ui/Header'

export default function About() {
  return (
    <div>
      <Header />
      <main className="p-8">
        <h1 className="text-3xl font-orbitron">About OpsVantage</h1>
        <p className="mt-4">Our mission, team, and history.</p>
      </main>
    </div>
  )
}
