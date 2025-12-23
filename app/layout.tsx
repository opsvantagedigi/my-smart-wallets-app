import React from "react";
// import { cookieToInitialState } from "@account-kit/core";
import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { Providers } from "./providers";
import Footer from "./components/footer";
import { ClientLayout } from "./ClientLayout";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: '--font-orbitron',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: "Marz Smart Wallets",
  description: "Next-generation smart wallet platform powered by Account Kit",
  icons: {
    icon: [
      { url: "/assets/brand-favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/brand-icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: { url: "/assets/brand-icon.png", sizes: "180x180", type: "image/png" },
  },
  openGraph: {
    title: "Marz Smart Wallets",
    description: "Next-generation smart wallet platform powered by Account Kit",
    images: ["/assets/brand-logo.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Persist state across pages
  // https://www.alchemy.com/docs/wallets/react/ssr#persisting-the-account-state

  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable}`}>
      <body className="font-inter antialiased">
        <Providers>
          <div>
            {children}
            <ClientLayout />
          </div>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
