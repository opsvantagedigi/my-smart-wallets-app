"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/landing" className="flex items-center space-x-3" aria-label="OpsVantage Digital Home">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0030ff] via-green-400 to-[#ffe600] flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-orbitron text-xl font-bold tracking-wider bg-gradient-to-r from-[#0030ff] via-green-400 to-[#ffe600] text-transparent bg-clip-text whitespace-nowrap">
              OpsVantage Digital
            </span>
          </Link>
          <nav className="hidden md:flex md:items-center md:space-x-8" aria-label="Main Navigation">
            <Link href="/landing" className="text-gray-200 hover:text-white font-inter font-medium transition">Home</Link>
            <Link href="/about" className="text-gray-200 hover:text-white font-inter font-medium transition">About</Link>
            <Link href="/contact" className="text-gray-200 hover:text-white font-inter font-medium transition">Contact</Link>
            <Link href="/wallet" className="text-gray-200 hover:text-white font-inter font-medium transition">Wallet</Link>
            <Link href="/resources" className="text-gray-200 hover:text-white font-inter font-medium transition">Resources</Link>
            <Link href="/pricing" className="text-gray-200 hover:text-white font-inter font-medium transition">Pricing</Link>
            <Link href="/blog" className="text-gray-200 hover:text-white font-inter font-medium transition">Blog</Link>
          </nav>
          <div className="hidden md:block">
            <Link
              href={process.env.NEXT_PUBLIC_EMBEDDED_WALLET_ENABLED === 'true' ? '/wallet' : '/wallet'}
              className="px-5 py-2.5 text-sm font-medium text-black bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-md hover:from-yellow-400 hover:to-yellow-600 transition whitespace-nowrap"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
