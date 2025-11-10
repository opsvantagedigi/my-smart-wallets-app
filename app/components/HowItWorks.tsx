import React from 'react';
import Image from 'next/image';

interface StepProps {
  step: number;
  title: string;
  description: string;
  imageUrl: string;
  imageFirst?: boolean;
}

const Step: React.FC<StepProps> = ({ step, title, description, imageUrl, imageFirst = false }) => (
  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${imageFirst ? 'lg:grid-flow-col-dense' : ''}`}>
    <div className={` ${imageFirst ? 'lg:col-start-2' : ''}`}>
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
);

const HowItWorks: React.FC = () => {
  const steps = [
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
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-orbitron text-3xl sm:text-4xl font-bold text-white">Get Started in 3 Simple Steps</h2>
          <p className="mt-4 text-lg text-gray-400">Your journey to secure crypto management is just a few clicks away.</p>
        </div>
        <div className="space-y-24">
          {steps.map(s => <Step key={s.step} {...s} />)}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;