/**
 * Marz Network Smart Wallet Usage Examples
 * Copy and adapt these examples to your use case
 */

import { MarzNetwork, ensureSmartWallet, type SmartWallet } from '@/lib/marzNetwork';

// ============================================
// Example 1: Simple wallet creation
// ============================================
async function example1_SimpleWalletCreation(userId: string) {
  // This is the easiest way - automatically checks and creates wallet
  const wallet = await ensureSmartWallet(userId);
  console.log('Smart Wallet ready:', wallet.address);
  return wallet;
}

// ============================================
// Example 2: Check if wallet exists first
// ============================================
async function example2_CheckBeforeCreate(userId: string) {
  // First check if wallet exists
  const existingWallet = await MarzNetwork.getSmartWallet(userId);
  
  if (existingWallet) {
    console.log('Wallet already exists:', existingWallet.address);
    return existingWallet;
  }
  
  // Create new wallet only if needed
  console.log('Creating new wallet...');
  const newWallet = await MarzNetwork.createSmartWallet(userId);
  console.log('New wallet created:', newWallet.address);
  return newWallet;
}

// ============================================
// Example 3: Multi-chain wallet creation
// ============================================
async function example3_MultiChainWallets(userId: string) {
  // Create wallets on different chains
  const ethereumWallet = await MarzNetwork.ensureSmartWallet(userId, 1);
  console.log('Ethereum wallet:', ethereumWallet.address);
  
  const polygonWallet = await MarzNetwork.ensureSmartWallet(userId, 137);
  console.log('Polygon wallet:', polygonWallet.address);
  
  const baseWallet = await MarzNetwork.ensureSmartWallet(userId, 8453);
  console.log('Base wallet:', baseWallet.address);
  
  return { ethereumWallet, polygonWallet, baseWallet };
}

// ============================================
// Example 4: Wallet with balance check
// ============================================
async function example4_WalletWithBalance(userId: string) {
  // Ensure wallet exists
  const wallet = await ensureSmartWallet(userId);
  
  // Get wallet balance
  const balance = await MarzNetwork.getWalletBalance(wallet.address);
  
  console.log('Wallet:', wallet.address);
  console.log('Balance:', balance, 'ETH');
  
  return { ...wallet, balance };
}

// ============================================
// Example 5: Error handling with retry
// ============================================
async function example5_WithErrorHandling(userId: string, maxRetries = 3) {
  let attempts = 0;
  
  while (attempts < maxRetries) {
    try {
      const wallet = await ensureSmartWallet(userId);
      console.log('Wallet created successfully:', wallet.address);
      return { success: true, wallet };
    } catch (error) {
      attempts++;
      console.error(`Attempt ${attempts} failed:`, error);
      
      if (attempts >= maxRetries) {
        return { 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        };
      }
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
    }
  }
}

// ============================================
// Example 6: Batch wallet creation
// ============================================
async function example6_BatchWalletCreation(userIds: string[]) {
  const results = await Promise.allSettled(
    userIds.map(userId => ensureSmartWallet(userId))
  );
  
  const successful: SmartWallet[] = [];
  const failed: { userId: string; error: string }[] = [];
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      successful.push(result.value);
    } else {
      failed.push({
        userId: userIds[index],
        error: result.reason.message
      });
    }
  });
  
  console.log(`Created ${successful.length} wallets`);
  console.log(`Failed: ${failed.length}`);
  
  return { successful, failed };
}

// ============================================
// Example 7: User onboarding flow
// ============================================
async function example7_OnboardingFlow(userId: string, email: string) {
  console.log(`Onboarding user: ${email}`);
  
  try {
    // Step 1: Check for existing wallet
    let wallet = await MarzNetwork.getSmartWallet(userId);
    
    if (wallet) {
      console.log('Welcome back! Wallet found:', wallet.address);
      return { isNewUser: false, wallet };
    }
    
    // Step 2: Create new wallet for first-time user
    console.log('First-time user! Creating wallet...');
    wallet = await MarzNetwork.createSmartWallet(userId);
    
    // Step 3: Log wallet creation
    console.log('Wallet created:', wallet.address);
    console.log('Chain:', wallet.chainId);
    console.log('Created at:', wallet.createdAt);
    
    // Step 4: Optional - send welcome email with wallet info
    // await sendWelcomeEmail(email, wallet.address);
    
    return { isNewUser: true, wallet };
  } catch (error) {
    console.error('Onboarding failed:', error);
    throw error;
  }
}

// ============================================
// Example 8: Dashboard wallet stats
// ============================================
async function example8_WalletDashboard(userId: string) {
  try {
    // Get wallet
    const wallet = await MarzNetwork.getSmartWallet(userId);
    
    if (!wallet) {
      return {
        hasWallet: false,
        message: 'No wallet found. Create one to get started.'
      };
    }
    
    // Get balance
    const balance = await MarzNetwork.getWalletBalance(wallet.address);
    
    // Calculate wallet age
    const ageInDays = Math.floor(
      (Date.now() - wallet.createdAt.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    return {
      hasWallet: true,
      address: wallet.address,
      balance: balance,
      chainId: wallet.chainId,
      ageInDays,
      createdAt: wallet.createdAt.toLocaleDateString()
    };
  } catch (error) {
    console.error('Dashboard error:', error);
    return { hasWallet: false, error: 'Failed to load wallet data' };
  }
}

// ============================================
// Example 9: React component integration
// ============================================
/*
'use client';

import { useEffect, useState } from 'react';
import { ensureSmartWallet } from '@/lib/marzNetwork';

export function WalletButton({ userId }: { userId: string }) {
  const [wallet, setWallet] = useState<SmartWallet | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreateWallet = async () => {
    setLoading(true);
    try {
      const newWallet = await ensureSmartWallet(userId);
      setWallet(newWallet);
      alert('Wallet created: ' + newWallet.address);
    } catch (error) {
      alert('Failed to create wallet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleCreateWallet} 
      disabled={loading || !!wallet}
    >
      {loading ? 'Creating...' : wallet ? 'Wallet Active' : 'Create Wallet'}
    </button>
  );
}
*/

// ============================================
// Example 10: Server-side API route
// ============================================
/*
// app/api/wallet/ensure/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ensureSmartWallet } from '@/lib/marzNetwork';

export async function POST(req: NextRequest) {
  try {
    const { userId, chainId } = await req.json();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    const wallet = await ensureSmartWallet(userId, chainId);
    
    return NextResponse.json({
      success: true,
      wallet: {
        address: wallet.address,
        chainId: wallet.chainId,
        createdAt: wallet.createdAt
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to ensure wallet' },
      { status: 500 }
    );
  }
}
*/

// Export examples for testing
export {
  example1_SimpleWalletCreation,
  example2_CheckBeforeCreate,
  example3_MultiChainWallets,
  example4_WalletWithBalance,
  example5_WithErrorHandling,
  example6_BatchWalletCreation,
  example7_OnboardingFlow,
  example8_WalletDashboard,
};
