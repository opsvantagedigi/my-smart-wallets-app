"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="text-logo logo-container" aria-label="OpsVantage Digital Home">
        <span className="logo-ops">Ops</span>
        <span className="logo-vantage">Vantage</span>
        <span className="logo-digital">Digital</span>
      </Link>
      <nav className="main-nav" aria-label="Main Navigation">
        <Link href="/about">About Us</Link>
        <Link href="/partners">Partners</Link>
        <Link href="/deals">Deals & Promos</Link>
        <Link href="/blog">Blog</Link>
      </nav>
      <div className="header-buttons">
        <div className="launch-button">
          <a href="#" aria-label="Launching Soon">Launching Soon</a>
        </div>
        <div className="contact-button">
          <Link href="/contact">Contact Us</Link>
        </div>
      </div>
    </header>
  );
}
