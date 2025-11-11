/* Project-specific TypeScript shims for Next.js modules that the compiler can't resolve
   These provide minimal types to satisfy the compiler while we maintain proper @types and
   Next.js installs. Keep this file small and conservative. */

declare module 'next/image' {
  import type { ComponentType, ImgHTMLAttributes } from 'react';
  const Image: ComponentType<ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean; placeholder?: string }>; 
  export default Image;
}

declare module 'next/link' {
  import type { ComponentType, AnchorHTMLAttributes } from 'react';
  const Link: ComponentType<AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; children?: any; }>; 
  export default Link;
}

declare module 'next/font/google' {
  export function Inter(opts?: any): { variable?: string };
  export function Orbitron(opts?: any): { variable?: string };
}

declare module 'next/server' {
  export const NextResponse: any;
  export const NextRequest: any;
}

declare module 'next/head' {
  const Head: any;
  export default Head;
}

/* Generic catch-all for other next internal paths */
declare module 'next/*' {
  const anything: any;
  export default anything;
}

export {};
