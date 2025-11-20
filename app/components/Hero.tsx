import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="relative text-white py-24 sm:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
        <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0030ff]/40 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-[#ffe600]/30 rounded-full blur-3xl animate-pulse animation-delay-3000"></div>
        </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="mx-auto">
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
      </div>
    </section>
  );
};

export default Hero;
