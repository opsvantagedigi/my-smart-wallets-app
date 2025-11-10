import React from 'react';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon.js';
import { CoinsIcon } from './icons/CoinsIcon.js';
import { Web3Icon } from './icons/Web3Icon.js';

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:-translate-y-2 shadow-lg">
    <div className="mb-6 w-16 h-16 bg-gradient-to-br from-[#0030ff] to-[#ffe600] rounded-xl flex items-center justify-center">
      {icon}
    </div>
    <h3 className="font-orbitron text-2xl font-bold mb-3 text-white">{title}</h3>
    <p className="text-gray-300 leading-relaxed">{description}</p>
  </div>
);

const Benefits: React.FC = () => {
  const benefitsData = [
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
  ];

  return (
    <section id="benefits" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-white">The Smart Wallet Advantage</h2>
          <p className="mt-4 text-lg text-gray-400">Security, Simplicity, and Peace of Mind in the Web3 world.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitsData.map((benefit) => (
            <BenefitCard key={benefit.title} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;