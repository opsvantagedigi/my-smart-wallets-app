const Landing: React.FC = () => {
  return (
    <section className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white py-20 px-4 text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-blue-900 mb-4 font-orbitron">
        Take control of your crypto.<br />
        <span className="bg-gradient-to-r from-blue-500 to-green-400 text-transparent bg-clip-text">Secure. Smart. Scam-proof.</span>
      </h1>
      <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-700 mb-8">
        Enterprise-grade security for every user. Manage your digital assets with confidence and clarity. Seamlessly manage cryptocurrencies, tokens, and NFTs across multiple blockchains from a single, intuitive interface.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="#features" className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#0030ff] to-blue-600 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300">Explore Features</a>
        <a href="#" className="px-8 py-4 text-lg font-semibold text-blue-900 bg-white border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition-all duration-300">Get Started</a>
      </div>
    </section>
  );
};

export default Landing;