import React from 'react'

export default function Header() {
  return (
    <header className="p-4 bg-black/50 text-white backdrop-blur">
      <div className="container mx-auto flex items-center justify-between">
        <div className="font-orbitron text-xl">OpsVantage</div>
        <nav>
          <a className="mr-4" href="/">Home</a>
          <a className="mr-4" href="/dashboard">Dashboard</a>
          <a href="/about">About</a>
        </nav>
      </div>
    </header>
  )
}
