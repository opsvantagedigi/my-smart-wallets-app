# Marz Network Smart Wallet Integration

Complete implementation for creating and managing smart wallets using Marz Network APIs.

## 📋 Features

- ✅ **Automatic Wallet Detection**: Checks if user has existing smart wallet
- ✅ **Smart Wallet Creation**: Creates new wallet if none exists
- ✅ **React Hook Integration**: Easy-to-use `useSmartWallet` hook
- ✅ **UI Component**: Pre-built `SmartWalletCard` component
- ✅ **TypeScript Support**: Full type safety with interfaces
- ✅ **Error Handling**: Comprehensive error management
- ✅ **Balance Tracking**: Query wallet balances
- ✅ **Multi-Chain Support**: Support for different blockchain networks

## 🚀 Quick Start

### 1. Environment Variables

Add your Marz Network API credentials to `.env.local`:

```bash
NEXT_PUBLIC_MARZ_API_KEY=your_marz_api_key_here
NEXT_PUBLIC_MARZ_API_URL=https://api.marz.network
VITE_MARZ_CONTRACT_ADDRESS=0x46ed4cbc6920895c484564d34ad8ca2d1f912654
```

### 2. Using the Core API

```typescript
import { MarzNetwork, ensureSmartWallet } from '@/lib/marzNetwork';

// Simple usage - automatically checks and creates wallet
async function setupWallet(userId: string) {
  const wallet = await ensureSmartWallet(userId);
  console.log('Smart Wallet ready:', wallet.address);
  return wallet;
}

// Advanced usage with chain selection
async function setupWalletOnPolygon(userId: string) {
  const wallet = await MarzNetwork.ensureSmartWallet(userId, 137); // Polygon chain ID
  console.log('Polygon wallet:', wallet.address);
  return wallet;
}

// Check existing wallet only
async function checkWallet(userId: string) {
  const wallet = await MarzNetwork.getSmartWallet(userId);
  if (wallet) {
    console.log('Wallet found:', wallet.address);
  } else {
    console.log('No wallet found');
  }
}

// Get wallet balance
async function getBalance(walletAddress: string) {
  const balance = await MarzNetwork.getWalletBalance(walletAddress);
  console.log('Balance:', balance);
  return balance;
}
```

### 3. Using the React Hook

```typescript
'use client';

import { useSmartWallet } from '@/app/hooks/useSmartWallet';
import { useEffect } from 'react';

export function MyComponent() {
  const { wallet, loading, error, ensureWallet, refreshWallet } = useSmartWallet();

  useEffect(() => {
    // Automatically ensure wallet when component mounts
    ensureWallet();
  }, [ensureWallet]);

  if (loading) return <div>Loading wallet...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!wallet) return <button onClick={ensureWallet}>Create Wallet</button>;

  return (
    <div>
      <h2>Your Smart Wallet</h2>
      <p>Address: {wallet.address}</p>
      <p>Chain: {wallet.chainId}</p>
      <button onClick={refreshWallet}>Refresh</button>
    </div>
  );
}
```

### 4. Using the Pre-built Component

```typescript
import { SmartWalletCard } from '@/app/components/smart-wallet-card';

export default function Dashboard() {
  return (
    <div>
      <h1>My Dashboard</h1>
      <SmartWalletCard />
    </div>
  );
}
```

## 📁 File Structure

```
lib/
  marzNetwork.ts           # Core API client and utilities
app/
  hooks/
    useSmartWallet.tsx     # React hook for wallet management
  components/
    smart-wallet-card.tsx  # UI component for wallet display
```

## 🔧 API Reference

### `MarzNetwork` Client

#### `getSmartWallet(userId: string): Promise<SmartWallet | null>`
Fetches existing smart wallet for a user. Returns `null` if not found.

#### `createSmartWallet(userId: string, chainId?: number): Promise<SmartWallet>`
Creates a new smart wallet for a user on specified chain (default: Ethereum mainnet).

#### `ensureSmartWallet(userId: string, chainId?: number): Promise<SmartWallet>`
Checks for existing wallet and creates one if it doesn't exist. **Recommended method.**

#### `getWalletBalance(walletAddress: string): Promise<string>`
Fetches the current balance of a wallet address.

### `useSmartWallet()` Hook

Returns an object with:
- `wallet: SmartWallet | null` - Current wallet state
- `loading: boolean` - Loading state
- `error: Error | null` - Error state
- `ensureWallet: () => Promise<SmartWallet | null>` - Ensure wallet exists
- `refreshWallet: () => Promise<void>` - Refresh wallet data

### `SmartWallet` Interface

```typescript
interface SmartWallet {
  address: string;      // Wallet address
  userId: string;       // Associated user ID
  chainId: number;      // Blockchain chain ID
  createdAt: Date;      // Creation timestamp
  balance?: string;     // Optional balance
}
```

## 🌐 Supported Chain IDs

- **1** - Ethereum Mainnet
- **137** - Polygon
- **8453** - Base
- **42161** - Arbitrum One
- **10** - Optimism
- **43114** - Avalanche C-Chain

## 🎨 Customization

### Styling the SmartWalletCard

The component uses Tailwind CSS with OpsVantage Digital brand colors:

```typescript
// Custom styles can be applied via className
<SmartWalletCard className="custom-class" />

// Brand colors used:
// - brand-green: #10b981
// - brand-blue: #1e3a8a
// - brand-yellow: #fbbf24
// - gradient-brand: blue → green gradient
```

### Custom Error Handling

```typescript
import { MarzNetwork } from '@/lib/marzNetwork';

async function safeWalletCreation(userId: string) {
  try {
    const wallet = await MarzNetwork.ensureSmartWallet(userId);
    return { success: true, wallet };
  } catch (error) {
    console.error('Wallet creation failed:', error);
    // Send to error tracking service
    return { success: false, error };
  }
}
```

## 🔒 Security Notes

1. **API Keys**: Never expose your Marz Network API key in client-side code
2. **Use Environment Variables**: Always use `NEXT_PUBLIC_` prefix for client-side variables
3. **Server-Side Operations**: For sensitive operations, use Next.js API routes
4. **Validation**: Always validate user IDs before wallet operations

## 📝 Example: Server-Side Wallet Creation

```typescript
// app/api/wallet/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MarzNetwork } from '@/lib/marzNetwork';

export async function POST(req: NextRequest) {
  const { userId, chainId } = await req.json();
  
  try {
    const wallet = await MarzNetwork.ensureSmartWallet(userId, chainId);
    return NextResponse.json({ success: true, wallet });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create wallet' },
      { status: 500 }
    );
  }
}
```

## 🐛 Troubleshooting

### Wallet Creation Fails

1. Check API key in `.env.local`
2. Verify contract address is correct
3. Ensure user is authenticated
4. Check network connectivity

### Balance Not Showing

1. Verify wallet has been created
2. Check chain ID matches network
3. Ensure wallet has transactions/balance

### TypeScript Errors

1. Run `npm install` to ensure dependencies are installed
2. Restart TypeScript server: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"

## 📚 Resources

- [Marz Network Documentation](https://docs.marz.network)
- [Account Kit Documentation](https://accountkit.alchemy.com)
- [Next.js Documentation](https://nextjs.org/docs)

## 🤝 Support

For issues with:
- **This implementation**: Create an issue in your repository
- **Marz Network API**: Contact support@marz.network
- **Account Kit**: Visit [Alchemy Support](https://www.alchemy.com/support)

---

**Built with** ❤️ **by OpsVantage Digital**
