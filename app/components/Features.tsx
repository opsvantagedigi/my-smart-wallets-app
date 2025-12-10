import React from 'react';
import { NoCustodyIcon } from './icons/NoCustodyIcon.js';
import { MultiChainIcon } from './icons/MultiChainIcon.js';
import { AlertsIcon } from './icons/AlertsIcon.js';
import { DashboardIcon } from './icons/DashboardIcon.js';
import { HardwareIcon } from './icons/HardwareIcon.js';

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 bg-white/5 rounded-xl border border-white/10 transition-colors hover:bg-white/10">
    <div className="mb-4 text-[#ffe600]">
      {icon}
    </div>
    <h4 className="font-orbitron text-xl font-semibold mb-2 text-white">{title}</h4>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);

const Features: React.FC = () => {
  const featuresData = [
    { icon: <NoCustodyIcon className="h-10 w-10" />, title: 'Non-Custodial', description: 'You, and only you, have full control over your private keys and funds.' },
    { icon: <MultiChainIcon className="h-10 w-10" />, title: 'Multi-Chain Support', description: 'Connect to Ethereum, Solana, Polygon, and more chains, all in one place.' },
    { icon: <AlertsIcon className="h-10 w-10" />, title: 'Real-Time Alerts', description: 'Get instant notifications for transactions, security risks, and market movements.' },
    { icon: <DashboardIcon className="h-10 w-10" />, title: 'Analytics Dashboard', description: 'Visualize your portfolio performance with our beautiful and insightful charts.' },
    { icon: <HardwareIcon className="h-10 w-10" />, title: 'Hardware-Grade Security', description: 'Integrate with hardware wallets like Ledger and Trezor for ultimate protection.' },
  ];

  return (
    <section id="features" className="py-20 sm:py-28 bg-black/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-white">Powerful Features, Effortless Control</h2>
          <p className="mt-4 text-lg text-gray-400">Everything you need for a secure and seamless crypto journey.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map(feature => <FeatureItem key={feature.title} {...feature} />)}
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
  );
};

export default Features;