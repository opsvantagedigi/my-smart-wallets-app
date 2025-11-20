"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-main">
        <div className="footer-grid">
          <div className="footer-column">
            <Link href="/" className="text-logo footer-logo" aria-label="OpsVantage Digital Home">
              <span className="logo-ops">Ops</span>
              <span className="logo-vantage">Vantage</span>
              <span className="logo-digital">Digital</span>
            </Link>
          </div>
          <div className="footer-column">
            <h4>Navigation</h4>
            <nav className="footer-nav" aria-label="Footer Navigation">
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact Us</Link>
              <Link href="/partners">Partners</Link>
              <Link href="/deals">Deals & Promos</Link>
            </nav>
          </div>
          <div className="footer-column">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="https://x.com/opsvantagedigi/" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">X (Twitter)</a>
              <a href="https://www.linkedin.com/company/opsvantage-digital/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">LinkedIn</a>
              <a href="https://www.instagram.com/opsvantagedigital/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        © 2025 OpsVantage Digital. All Rights Reserved. | <Link href="/privacy">Privacy Policy</Link> | <Link href="/terms">Terms of Service</Link> | <Link href="/cookies">Cookie Policy</Link>
      </div>
    </footer>
  );
}
