"use client";
import React, { useState } from 'react';
import { useSignerStatus } from '@account-kit/react';
import LoginCard from './login-card.js';

const Landing: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isConnected } = useSignerStatus();
  const [showLogin, setShowLogin] = useState(false);

  const navLinks = [
    { href: '#benefits', label: 'Benefits' },
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How It Works' },
  ];

  const handleSignUpClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!isConnected) {
      setShowLogin(true);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
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
            <nav className="hidden md:flex md:items-center md:space-x-8">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-gray-300 hover:text-white transition-colors duration-300 whitespace-nowrap">
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="hidden md:block">
              {!isConnected && (
                <a href="#" onClick={handleSignUpClick} className="px-5 py-2.5 text-sm font-medium text-black bg-[#ffe600] hover:bg-yellow-400 rounded-md transition-all duration-300 shadow-lg shadow-yellow-500/20 whitespace-nowrap">
                  Sign Up
                </a>
              )}
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  {link.label}
                </a>
              ))}
              {!isConnected && (
                <a href="#" onClick={handleSignUpClick} className="text-black bg-[#ffe600] hover:bg-yellow-400 block px-3 py-2 rounded-md text-base font-medium text-center mx-2 my-2">
                  Sign Up
                </a>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative text-white py-24 sm:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0030ff]/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-[#ffe600]/30 rounded-full blur-3xl animate-pulse animation-delay-3000"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="font-orbitron text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight mb-6">
            <div className="mb-4 whitespace-nowrap">Take control of your crypto.</div>
            <div className="bg-gradient-to-r from-blue-500 to-green-400 text-transparent bg-clip-text whitespace-nowrap">Secure. Smart. Scam-proof.</div>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-10">
            Enterprise-grade security for every user. Manage your digital assets with confidence and clarity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="w-full sm:w-auto inline-block px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#0030ff] to-blue-600 rounded-lg shadow-lg shadow-blue-500/30 hover:scale-105 transform transition-all duration-300"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="w-full sm:w-auto inline-block px-8 py-4 text-lg font-semibold text-white bg-white/10 border-2 border-white/20 rounded-lg hover:bg-white/20 backdrop-blur-sm transform transition-all duration-300"
            >
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {showLogin && !isConnected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <LoginCard />
        </div>
      )}
    </>
  );
};

export default Landing;