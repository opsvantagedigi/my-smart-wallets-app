"use client";
import React from 'react';
import ThemeToggle from './ThemeToggle';
// This component previously used @account-kit/react, which is not compatible with Next.js Turbopack in client code.
// TODO: Refactor to use server-side logic or API routes for authentication and wallet status.
const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/60 dark:bg-black/30 backdrop-blur-lg border-b border-black/10 dark:border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0030ff] via-green-400 to-[#ffe600] flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-orbitron text-xl font-bold tracking-wider bg-gradient-to-r from-[#0030ff] via-green-400 to-[#ffe600] text-transparent bg-clip-text whitespace-nowrap">
                OpsVantage Digital
              </span>
            </a>
          </div>
          <nav className="hidden md:flex md:items-center md:space-x-8">
            <a href="/" className="text-[#1A1A1A] dark:text-gray-200 hover:text-black dark:hover:text-white font-medium transition">Home</a>
            <a href="/contact" className="text-[#1A1A1A] dark:text-gray-200 hover:text-black dark:hover:text-white font-medium transition">Contact Us</a>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <a href="/signup" className="px-5 py-2.5 text-sm font-bold text-black bg-brand-yellow rounded-md hover:bg-yellow-600 shadow backdrop-blur-md whitespace-nowrap">Sign Up</a>
            <ThemeToggle />
          </div>
          <div className="md:hidden flex items-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
