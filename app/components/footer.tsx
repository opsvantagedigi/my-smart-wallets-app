export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-orbitron text-lg mb-2">OpsVantage Digital</h3>
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} OpsVantage Digital. All rights reserved.</p>
        </div>
        <div>
          <h4 className="text-yellow-500 font-semibold mb-2">Company</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/blog">Blog</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-yellow-500 font-semibold mb-2">Legal</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-yellow-500 font-semibold mb-2">Connect</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
