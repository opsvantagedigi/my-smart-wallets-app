export default function PricingPage() {
  return (
    <main className="container mx-auto px-6 py-24 text-white">
      <h1 className="font-orbitron text-4xl font-bold mb-8">Pricing</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="font-orbitron text-2xl mb-2">Free</h2>
          <p className="text-gray-300">Core wallet features and safety checks.</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="font-orbitron text-2xl mb-2">Pro</h2>
          <p className="text-gray-300">Advanced alerts, multi-chain analytics, priority support.</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="font-orbitron text-2xl mb-2">Enterprise</h2>
          <p className="text-gray-300">Custom integrations, governance tooling, dedicated security.</p>
        </div>
      </div>
    </main>
  );
}
