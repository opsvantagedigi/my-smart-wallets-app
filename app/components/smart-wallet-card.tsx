'use client';

import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card.js';
import { Button } from '../../components/ui/button.js';
import { Badge } from '../../components/ui/badge.js';
import { useSmartWallet } from '../hooks/useSmartWallet.js';
import { useUser } from '@account-kit/react';

export function SmartWalletCard() {
  const user = useUser();
  const { wallet, loading, error, ensureWallet, refreshWallet } = useSmartWallet();

  // Automatically ensure wallet on mount if user is authenticated
  useEffect(() => {
    if (user?.userId && !wallet && !loading) {
      ensureWallet();
    }
  }, [user?.userId, wallet, loading, ensureWallet]);

  if (!user) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-orbitron">Smart Wallet</CardTitle>
          <CardDescription>Please log in to view your smart wallet</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="font-orbitron flex items-center justify-between">
          Smart Wallet
          {wallet && (
            <Badge className="bg-gradient-brand">
              Active
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          {wallet ? 'Your Marz Network smart wallet' : 'Create your smart wallet to get started'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error.message}
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-green"></div>
          </div>
        ) : wallet ? (
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-medium">Wallet Address</label>
              <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
                <code className="text-sm text-brand-green break-all">
                  {wallet.address}
                </code>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-medium">Chain ID</label>
                <div className="p-2 rounded-lg bg-gray-800 border border-gray-700 text-sm">
                  {wallet.chainId}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-medium">Created</label>
                <div className="p-2 rounded-lg bg-gray-800 border border-gray-700 text-sm">
                  {new Date(wallet.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            {wallet.balance && (
              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-medium">Balance</label>
                <div className="p-3 rounded-lg bg-gray-800 border border-gray-700">
                  <span className="text-lg font-semibold text-gradient-brand">
                    {wallet.balance} ETH
                  </span>
                </div>
              </div>
            )}

            <Button
              onClick={refreshWallet}
              className="w-full"
            >
              Refresh Wallet
            </Button>
          </div>
        ) : (
          <Button
            onClick={ensureWallet}
            className="w-full bg-gradient-brand hover:opacity-90"
          >
            Create Smart Wallet
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
