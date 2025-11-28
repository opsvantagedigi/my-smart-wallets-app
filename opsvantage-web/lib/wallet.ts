/*
  Smart Wallet integration using Alchemy & ethers
  Note: Requires installing dependencies locally:
    npm install ethers @alchemy/sdk

  Exports:
    - connectWallet()
    - getWalletAddress()
    - signMessage(message)

  This file is a scaffold — adjust to your Alchemy Smart Wallet client.
*/

import { providers, ethers } from 'ethers'
// import { Alchemy } from '@alchemy/sdk' // optional, uncomment if installed

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || process.env.ALCHEMY_API_KEY
const ALCHEMY_APP_ID = process.env.NEXT_PUBLIC_ALCHEMY_APP_ID || process.env.ALCHEMY_APP_ID

let provider: providers.Web3Provider | providers.JsonRpcProvider | null = null

export async function connectWallet(): Promise<string | null> {
  if (typeof window === 'undefined') return null
  if ((window as any).ethereum) {
    provider = new providers.Web3Provider((window as any).ethereum)
    try {
      await (window as any).ethereum.request({ method: 'eth_requestAccounts' })
      const signer = provider.getSigner()
      const addr = await signer.getAddress()
      return addr
    } catch (err) {
      console.error('connectWallet error', err)
      return null
    }
  }
  // Fallback to Alchemy provider if configured
  if (ALCHEMY_API_KEY) {
    provider = new providers.JsonRpcProvider(`https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`)
    return null
  }
  return null
}

export async function getWalletAddress(): Promise<string | null> {
  if (!provider) return null
  try {
    const signer = (provider as providers.Web3Provider).getSigner()
    return await signer.getAddress()
  } catch {
    return null
  }
}

export async function signMessage(message: string): Promise<string | null> {
  if (!provider) return null
  try {
    const signer = (provider as providers.Web3Provider).getSigner()
    return await signer.signMessage(message)
  } catch (err) {
    console.error('signMessage error', err)
    return null
  }
}

export function getProvider() {
  return provider
}
