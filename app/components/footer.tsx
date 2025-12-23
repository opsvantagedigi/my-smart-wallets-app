import React from 'react';
import { TwitterIcon, LinkedinIcon, GithubIcon } from './icons/SocialIcons';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-lg border-t border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <a href="#" className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#0030ff] via-green-400 to-[#ffe600] flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-orbitron text-xl font-bold tracking-wider bg-gradient-to-r from-[#0030ff] via-green-400 to-[#ffe600] text-transparent bg-clip-text">
                Marz Smart Wallets
              </span>
            </a>
            <p className="text-gray-400 text-sm">The future of digital asset management. Secure, smart, and built for you.</p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" title="Twitter"><TwitterIcon /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" title="LinkedIn"><LinkedinIcon /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" title="GitHub"><GithubIcon /></a>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h5 className="font-orbitron font-semibold text-white tracking-wider mb-4">Company</h5>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-orbitron font-semibold text-white tracking-wider mb-4">Legal</h5>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-orbitron font-semibold text-white tracking-wider mb-4">Connect</h5>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Status</a></li>
                <li className="flex items-center gap-3">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors" title="Twitter"><TwitterIcon /></a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors" title="LinkedIn"><LinkedinIcon /></a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors" title="GitHub"><GithubIcon /></a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-orbitron font-semibold text-white tracking-wider mb-4">Brand</h5>
              <p className="text-gray-400 text-sm">Built with security-first architecture. Powered by Account Kit and Alchemy.</p>
              <div className="mt-4 w-full h-10 rounded-lg gradient-brand animate-sweep" />
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} OpsVantage Digital. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
