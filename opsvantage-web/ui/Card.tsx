import React from 'react'

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 rounded-xl bg-white/10 backdrop-blur border border-white/10">{children}</div>
  )
}
