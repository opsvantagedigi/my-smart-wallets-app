declare module 'next/server' {
  // Minimal shim for Next.js server types used in this project.
  // Replace or remove when official types are available.
  export const NextResponse: {
    json: (body: any, init?: any) => any;
    redirect?: (url: string, status?: number) => any;
  };
}
