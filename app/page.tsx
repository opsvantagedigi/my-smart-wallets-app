"use client";

import { useEffect, useState } from 'react';

export default function Home() {
  const [address, setAddress] = useState<string | null>(null);
  const [alchemyStatus, setAlchemyStatus] = useState<'unknown' | 'ok' | 'error'>('unknown');

  useEffect(() => {
    const rpc = process.env.NEXT_PUBLIC_RPC_URL || 'https://marz.opsvantagedigital.online';
    fetch(rpc, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_chainId', params: [] }),
    })
      .then(r => r.json())
      .then(() => setAlchemyStatus('ok'))
      .catch(() => setAlchemyStatus('error'));
  }, []);

  async function connectMetaMask() {
    if (typeof window === 'undefined' || !(window as any).ethereum) {
      alert('MetaMask not detected. Please install MetaMask.');
      return;
    }
    try {
      const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      setAddress(accounts[0]);
      // create session via Worker API if desired
      try {
        await fetch('/api/session', { method: 'POST', body: JSON.stringify({ address: accounts[0] }) });
      } catch (e) {
        // non-blocking
        console.warn('session API failed', e);
      }
      window.location.href = '/wallet';
    } catch (err) {
      console.error(err);
      alert('Connection failed. Try again.');
    }
  }

  return (
    <main>
      <section className="hero">
        <h1>Marz Smart Wallet</h1>
        <p>Secure, gas-optimized wallet with seamless onboarding.</p>

        <div className="onboarding-steps">
          <div>1. Connect your wallet</div>
          <div>2. Claim starter assets</div>
          <div>3. Explore Free features or Upgrade to Pro</div>
        </div>

        <div className="cta-row">
          <button onClick={connectMetaMask}>Connect MetaMask</button>
          <a href="/signup" className="secondary">Create Marz Wallet</a>
        </div>

        <div className="status-row">
          <span>Alchemy RPC</span>
          <strong>{alchemyStatus === 'ok' ? 'Connected' : alchemyStatus === 'error' ? 'Unavailable' : 'Checking...'}</strong>
        </div>

        {address && <div className="connected">Connected: {address.slice(0, 6)}...{address.slice(-4)}</div>}
      </section>
    </main>
  );
}
