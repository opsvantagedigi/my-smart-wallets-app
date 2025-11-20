"use client";
import React, { useState } from 'react';
// This component previously used @account-kit/react, which is not compatible with Next.js Turbopack in client code.
// TODO: Refactor to use server-side logic or API routes for authentication and wallet status.
const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg border-b border-white/10">
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
            <a href="/" className="text-gray-200 hover:text-white font-medium transition">Home</a>
            <a href="/contact" className="text-gray-200 hover:text-white font-medium transition">Contact Us</a>
          </nav>
          <div className="hidden md:block">
            <span className="px-5 py-2.5 text-sm font-medium text-black bg-[#ffe600] rounded-md opacity-50 cursor-not-allowed whitespace-nowrap">
              Sign Up (Unavailable)
            </span>
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 bg-gray-700 opacity-50 cursor-not-allowed"
              disabled
            >
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
