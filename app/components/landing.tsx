"use client";
import React, { useState } from 'react';
import { useSignerStatus } from '@account-kit/react';
import LoginCard from './login-card';
import { fetchHeroContent } from '@/lib/sanity';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { CoinsIcon } from './icons/CoinsIcon';
import { Web3Icon } from './icons/Web3Icon';
import { NoCustodyIcon } from './icons/NoCustodyIcon';
import { MultiChainIcon } from './icons/MultiChainIcon';
import { AlertsIcon } from './icons/AlertsIcon';
import { DashboardIcon } from './icons/DashboardIcon';
import { HardwareIcon } from './icons/HardwareIcon';
import Image from 'next/image';

export async function getStaticProps() {
  const hero = await fetchHeroContent();
  return { props: { hero } };
}

const Landing: React.FC<{ hero: any }> = ({ hero }) => {
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
      <section
        className="relative text-white py-24 sm:py-32 lg:py-40 overflow-hidden"
        style={{
          backgroundImage: `url(${hero?.backgroundImage?.asset?.url || ''})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0030ff]/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-[#ffe600]/30 rounded-full blur-3xl animate-pulse animation-delay-3000"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="font-orbitron text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight mb-6">
            <div className="mb-4 whitespace-nowrap">{hero?.headline || 'Take control of your crypto.'}</div>
            <div className="bg-gradient-to-r from-blue-500 to-green-400 text-transparent bg-clip-text whitespace-nowrap">
              {hero?.subtext || 'Secure. Smart. Scam-proof.'}
            </div>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-10">
            Enterprise-grade security for every user. Manage your digital assets with confidence and clarity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={hero?.ctaLink || '#'}
              className="w-full sm:w-auto inline-block px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#0030ff] to-blue-600 rounded-lg shadow-lg shadow-blue-500/30 hover:scale-105 transform transition-all duration-300"
            >
              {hero?.ctaLabel || 'Get Started'}
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

            {/* Benefits Section */}
      <section id="benefits" className="py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-white">The Smart Wallet Advantage</h2>
            <p className="mt-4 text-lg text-gray-400">Security, Simplicity, and Peace of Mind in the Web3 world.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheckIcon className="h-8 w-8 text-white" />,
                title: 'Enterprise-grade Security',
                description: 'Leveraging multi-layer encryption and hardware-grade security protocols to keep your assets impenetrable.',
              },
              {
                icon: <CoinsIcon className="h-8 w-8 text-white" />,
                title: 'One Wallet for All Assets',
                description: 'Seamlessly manage cryptocurrencies, tokens, and NFTs across multiple blockchains from a single, intuitive interface.',
              },
              {
                icon: <Web3Icon className="h-8 w-8 text-white" />,
                title: 'Built for Web3 Safety',
                description: 'Proactively identify and block malicious dApps and phishing attempts with our real-time scam protection engine.',
              },
            ].map((benefit) => (
              <div key={benefit.title} className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:-translate-y-2 shadow-lg">
                <div className="mb-6 w-16 h-16 bg-gradient-to-br from-[#0030ff] to-[#ffe600] rounded-xl flex items-center justify-center">
                  {benefit.icon}
                </div>
                <h3 className="font-orbitron text-2xl font-bold mb-3 text-white">{benefit.title}</h3>
                <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-28 bg-black/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-white">Powerful Features, Effortless Control</h2>
            <p className="mt-4 text-lg text-gray-400">Everything you need for a secure and seamless crypto journey.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <NoCustodyIcon className="h-10 w-10" />, title: 'Non-Custodial', description: 'You, and only you, have full control over your private keys and funds.' },
              { icon: <MultiChainIcon className="h-10 w-10" />, title: 'Multi-Chain Support', description: 'Connect to Ethereum, Solana, Polygon, and more chains, all in one place.' },
              { icon: <AlertsIcon className="h-10 w-10" />, title: 'Real-Time Alerts', description: 'Get instant notifications for transactions, security risks, and market movements.' },
              { icon: <DashboardIcon className="h-10 w-10" />, title: 'Analytics Dashboard', description: 'Visualize your portfolio performance with our beautiful and insightful charts.' },
              { icon: <HardwareIcon className="h-10 w-10" />, title: 'Hardware-Grade Security', description: 'Integrate with hardware wallets like Ledger and Trezor for ultimate protection.' },
            ].map((feature) => (
              <div key={feature.title} className="flex flex-col items-center text-center p-6 bg-white/5 rounded-xl border border-white/10 transition-colors hover:bg-white/10">
                <div className="mb-4 text-[#ffe600]">{feature.icon}</div>
                <h4 className="font-orbitron text-xl font-semibold mb-2 text-white">{feature.title}</h4>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
            <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-center text-center p-6 bg-gradient-to-br from-[#0030ff]/80 to-[#ffe600]/60 rounded-xl border border-yellow-400/50">
              <div className="flex items-center space-x-2 mb-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="font-orbitron text-xl font-semibold text-white">Live Transactions</span>
              </div>
              <p className="text-4xl font-bold text-white tracking-wider">1,234,567</p>
              <p className="text-sm text-yellow-200 mt-2">Processed in real-time</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-white">Get Started in 3 Simple Steps</h2>
            <p className="mt-4 text-lg text-gray-400">Your journey to secure crypto management is just a few clicks away.</p>
          </div>
          <div className="space-y-24">
            {[
              {
                step: 1,
                title: 'Create Your Secure Wallet',
                description: 'Download the app and follow the simple on-screen instructions. Your secure, non-custodial wallet will be ready in under a minute. Remember to store your seed phrase safely!',
                imageUrl: 'https://picsum.photos/seed/wallet1/800/450',
              },
              {
                step: 2,
                title: 'Fund & Manage Assets',
                description: 'Easily transfer crypto from an exchange or another wallet. View all your assets in one clean dashboard, with real-time price updates and performance analytics.',
                imageUrl: 'https://picsum.photos/seed/wallet2/800/450',
                imageFirst: true,
              },
              {
                step: 3,
                title: 'Connect & Transact Safely',
                description: 'Explore the world of Web3. Our wallet helps you connect to dApps securely, warning you of potential risks before you sign any transaction. Trade, stake, and explore with confidence.',
                imageUrl: 'https://picsum.photos/seed/wallet3/800/450',
              },
            ].map(({ step, title, description, imageUrl, imageFirst }) => (
              <div key={step} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${imageFirst ? 'lg:grid-flow-col-dense' : ''}`}>
                <div className={`${imageFirst ? 'lg:col-start-2' : ''}`}>
                  <span className="font-orbitron text-sm font-bold text-[#0030ff]">STEP {step}</span>
                  <h3 className="font-orbitron text-3xl font-bold mt-2 mb-4 text-white">{title}</h3>
                  <p className="text-gray-300 leading-relaxed">{description}</p>
                </div>
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-9">
                    <Image src={imageUrl} alt={title} className="rounded-xl shadow-2xl object-cover" width={800} height={450} />
                  </div>
                  <div className="absolute -inset-2 bg-white/10 rounded-2xl -z-10 transform rotate-2"></div>
                </div>
              </div>
            ))}
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