import React, { useState } from 'react';
import Image from 'next/image';

const AIAvatar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 bg-black/50 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right animate-fade-in-up">
          <div className="p-4 bg-white/10 border-b border-white/10">
            <h3 className="font-orbitron text-lg font-bold text-white">OpsVantage AI Assistant</h3>
            <p className="text-xs text-gray-300">Ask about features, security, or onboarding.</p>
          </div>
          <div className="p-4 h-80 overflow-y-auto space-y-4">
            <div className="flex">
              <div className="bg-blue-500/20 text-gray-200 p-3 rounded-lg max-w-xs">
                Hello! How can I help you take control of your crypto today?
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-gray-700 text-white p-3 rounded-lg max-w-xs">
                How do you protect against scams?
              </div>
            </div>
             <div className="flex">
              <div className="bg-blue-500/20 text-gray-200 p-3 rounded-lg max-w-xs">
                Great question! OpsVantage uses a real-time intelligence engine to analyze transactions and dApp interactions,
                warning you of potential phishing attempts or malicious smart contracts before you approve them.
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-white/10">
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0030ff] via-green-400 to-[#ffe600] rounded-full blur opacity-50 group-hover:opacity-90 group-focus-within:opacity-90 transition-opacity duration-300 animate-tilt"></div>
              <div className="relative flex items-center space-x-2 bg-gray-900 rounded-full px-1 py-0.5">
                <input 
                  type="text" 
                  placeholder="Type your question..." 
                  className="flex-grow bg-transparent border-none rounded-full py-2 px-3 text-white placeholder-gray-400 focus:ring-0 focus:outline-none"
                />
                <button 
                  className="p-2.5 bg-gradient-to-br from-[#0030ff] to-blue-600 rounded-full hover:scale-125 hover:brightness-110 transform transition-transform duration-300"
                  aria-label="Send message"
                  title="Send message"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-br from-[#0030ff] to-[#ffe600] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 overflow-hidden"
        aria-label="Toggle AI Assistant"
      >
        <Image 
          src="/assets/avatar-headshot.png" 
          alt="AI Avatar" 
          width={64} 
          height={64}
          className="w-full h-full object-cover"
        />
      </button>
    </div>
  );
};

export default AIAvatar;
