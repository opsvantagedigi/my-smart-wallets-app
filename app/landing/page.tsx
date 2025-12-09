"use client";

import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import StarryBackground from "../../components/StarryBackground";
import Benefits from "../../components/Benefits";
import Features from "../../components/Features";
import HowItWorks from "../../components/HowItWorks";
import { SmartWalletCard } from "../../components/smart-wallet-card";

export default function LandingPage() {
  return (
    <StarryBackground>
      <main className="relative min-h-screen flex flex-col items-center justify-start text-white font-inter" aria-label="OpsVantage Digital Landing Page">
        <Header />

        <section className="mt-24 px-6 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-white text-center leading-tight">
            Take control of your crypto.<br />Secure. Smart. Scam-proof.
          </h1>
          <p className="mt-4 text-lg md:text-xl font-inter text-white text-center max-w-2xl mx-auto">
            Enterprise-grade security for every user. Manage your digital assets with confidence and clarity.
          </p>
        </section>

        <section className="mt-12 w-full px-6">
          <SmartWalletCard />
        </section>

        <section className="mt-24 w-full px-6">
          <Benefits />
        </section>
        <section className="mt-24 w-full px-6">
          <Features />
        </section>
        <section className="mt-24 w-full px-6">
          <HowItWorks />
        </section>

        <Footer />
      </main>
    </StarryBackground>
  );
}
