"use client";

import React from "react";
import Header from "./header";
import Footer from "./footer";
import StarryBackground from "../../components/StarryBackground";
import Benefits from "./Benefits";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import AIAvatar from "./AIAvatar";

const Landing: React.FC = () => {
  return (
    <StarryBackground>
      <main className="relative min-h-screen flex flex-col items-center justify-start text-white font-inter" aria-label="OpsVantage Digital Landing Page">
        <Header />

        {/* Hero Section */}
        <section className="mt-24 px-6 text-center max-w-4xl mx-auto" aria-labelledby="hero-heading">
          <h1 id="hero-heading" className="text-4xl md:text-6xl font-orbitron font-bold text-white text-center leading-tight">
            Take control of your crypto.<br />Secure. Smart. Scam-proof.
          </h1>
          <p className="mt-4 text-lg md:text-xl font-inter text-white text-center max-w-2xl mx-auto">
            Enterprise-grade security for every user. Manage your digital assets with confidence and clarity. Seamlessly manage cryptocurrencies, tokens, and NFTs across multiple blockchains from a single, intuitive interface.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition" aria-label="Explore Features">
              Explore Features
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-600 hover:text-white transition" aria-label="Get Started">
              Get Started
            </button>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mt-32 w-full px-6" aria-labelledby="benefits-heading">
          <Benefits />
        </section>

        {/* Features Section */}
        <section className="mt-24 w-full px-6" aria-labelledby="features-heading">
          <Features />
        </section>

        {/* How It Works Section */}
        <section className="mt-24 w-full px-6" aria-labelledby="howitworks-heading">
          <HowItWorks />
        </section>

        <Footer />

        {/* Persistent AI Avatar */}
        <div className="fixed bottom-6 right-6 z-50" aria-label="AI Assistant">
          <AIAvatar />
        </div>
      </main>
    </StarryBackground>
  );
};

export default Landing;