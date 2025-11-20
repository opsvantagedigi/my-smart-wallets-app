"use client";

import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import StarryBackground from "../../components/StarryBackground";

export default function Landing() {
  return (
    <StarryBackground>
      <main aria-label="OpsVantage Digital Hero Gateway" className="min-h-screen flex flex-col justify-between">
        <Header />
        <section
          className="flex flex-1 flex-col items-center justify-center px-4 py-16 md:py-32"
          aria-labelledby="hero-heading"
        >
          {/* Brand Icon: Glowing Sphere (assumed already integrated in Header or as background) */}
          <h1
            id="hero-heading"
            className="text-4xl md:text-6xl font-orbitron font-bold text-white text-center leading-tight drop-shadow-lg"
          >
            Take control of your crypto.<br />Secure. Smart. Scam-proof.
          </h1>
          <p className="mt-4 text-lg md:text-xl font-inter text-white text-center max-w-2xl mx-auto">
            Enterprise-grade security for every user. Manage your digital assets with confidence and clarity. Seamlessly manage cryptocurrencies, tokens, and NFTs across multiple blockchains from a single, intuitive interface.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button
              className="bg-gradient-to-r from-blue-800 via-green-500 to-yellow-400 text-white px-6 py-3 rounded-md font-semibold hover:from-blue-700 hover:via-green-400 hover:to-yellow-300 transition shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Explore Features"
            >
              Explore Features
            </button>
            <button
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-blue-600 hover:text-white transition shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Get Started"
            >
              Get Started
            </button>
          </div>
        </section>
        <Footer />
      </main>
    </StarryBackground>
  );
}
