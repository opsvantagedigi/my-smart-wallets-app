import LearnMore from "../../components/learn-more";

export default function ResourcesPage() {
  return (
    <main className="container mx-auto px-6 py-24 text-white">
      <h1 className="font-orbitron text-4xl font-bold mb-6">Resources</h1>
      <div className="max-w-2xl">
        <LearnMore />
      </div>
      <div className="mt-8 space-y-3 text-gray-300">
        <p>API Docs: https://accountkit.alchemy.com/</p>
        <p>Status: https://status.alchemy.com/</p>
      </div>
    </main>
  );
}
