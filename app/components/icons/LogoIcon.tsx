import React from 'react';

export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    width="100"
    height="100"
  >
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0030ff" />
        <stop offset="50%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#ffe600" />
      </linearGradient>
    </defs>
    <path
      fill="url(#gradient)"
      d="M50,5 C74.85,5 95,25.15 95,50 C95,74.85 74.85,95 50,95 C25.15,95 5,74.85 5,50 C5,25.15 25.15,5 50,5 Z M50,15 C30.67,15 15,30.67 15,50 C15,69.33 30.67,85 50,85 C69.33,85 85,69.33 85,50 C85,30.67 69.33,15 50,15 Z"
    />
    <path
      fill="white"
      d="M50,25 C63.81,25 75,36.19 75,50 C75,63.81 63.81,75 50,75 C36.19,75 25,63.81 25,50 C25,36.19 36.19,25 50,25 Z M50,35 C41.72,35 35,41.72 35,50 C35,58.28 41.72,65 50,65 C58.28,65 65,58.28 65,50 C65,41.72 58.28,35 50,35 Z"
    />
  </svg>
);
