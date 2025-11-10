'use client';

import { useState, useCallback } from 'react';
import { useUser } from '@account-kit/react';
import { MarzNetwork, type SmartWallet } from '@/lib/marzNetwork';

interface UseSmartWalletReturn {
  wallet: SmartWallet | null;
  loading: boolean;
  error: Error | null;
  ensureWallet: () => Promise<SmartWallet | null>;
  refreshWallet: () => Promise<void>;
}

/**
 * React hook for managing Marz Network smart wallets
 * Automatically checks and creates wallets for authenticated users
 */
export function useSmartWallet(): UseSmartWalletReturn {
  const user = useUser();
  const [wallet, setWallet] = useState<SmartWallet | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const ensureWallet = useCallback(async (): Promise<SmartWallet | null> => {
    if (!user?.userId) {
      setError(new Error('User not authenticated'));
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const smartWallet = await MarzNetwork.ensureSmartWallet(user.userId);
      setWallet(smartWallet);
      return smartWallet;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      console.error('Error ensuring smart wallet:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, [user?.userId]);

  const refreshWallet = useCallback(async (): Promise<void> => {
    if (!user?.userId || !wallet) return;

    try {
      const updatedWallet = await MarzNetwork.getSmartWallet(user.userId);
      if (updatedWallet) {
        setWallet(updatedWallet);
      }
    } catch (err) {
      console.error('Error refreshing wallet:', err);
    }
  }, [user?.userId, wallet]);

  return {
    wallet,
    loading,
    error,
    ensureWallet,
    refreshWallet,
  };
}
