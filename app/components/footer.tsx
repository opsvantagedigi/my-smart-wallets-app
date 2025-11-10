import React from 'react';
import { LogoIcon } from './icons/LogoIcon';
import { TwitterIcon, LinkedinIcon, GithubIcon } from './icons/SocialIcons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black/30 backdrop-blur-lg border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <a href="#" className="flex items-center space-x-2 mb-4">
              <LogoIcon className="h-8 w-auto" />
              <span className="font-orbitron text-xl font-bold tracking-wider bg-gradient-to-r from-[#0030ff] via-green-400 to-[#ffe600] text-transparent bg-clip-text">
                OpsVantage Digital
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
              <h5 className="font-orbitron font-semibold text-white tracking-wider mb-4">Product</h5>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Download</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-orbitron font-semibold text-white tracking-wider mb-4">Company</h5>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-orbitron font-semibold text-white tracking-wider mb-4">Resources</h5>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Docs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h5 className="font-orbitron font-semibold text-white tracking-wider mb-4">Stay Updated</h5>
              <form>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="w-full bg-white/10 border border-white/20 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#ffe600] focus:border-[#ffe600]/50 focus:outline-none transition-all duration-300"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="bg-gradient-to-r from-[#0030ff] to-blue-600 hover:scale-105 transform transition-all duration-300 text-white font-semibold py-2.5 px-6 rounded-lg whitespace-nowrap shadow-lg shadow-blue-500/20"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
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
