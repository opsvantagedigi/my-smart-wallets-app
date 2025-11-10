/**
 * Marz Network Smart Wallet API Integration
 * Handles smart wallet creation and management
 */

interface SmartWallet {
  address: string;
  userId: string;
  chainId: number;
  createdAt: Date;
  balance?: string;
}

interface MarzNetworkConfig {
  apiKey: string;
  apiUrl: string;
  contractAddress: string;
}

class MarzNetworkClient {
  private config: MarzNetworkConfig;

  constructor() {
    this.config = {
      apiKey: process.env.NEXT_PUBLIC_MARZ_API_KEY || '',
      apiUrl: process.env.NEXT_PUBLIC_MARZ_API_URL || 'https://api.marz.network',
      contractAddress: process.env.VITE_MARZ_CONTRACT_ADDRESS || '',
    };
  }

  /**
   * Fetch existing smart wallet for a user
   * @param userId - Unique user identifier
   * @returns SmartWallet object or null if not found
   */
  async getSmartWallet(userId: string): Promise<SmartWallet | null> {
    try {
      const response = await fetch(
        `${this.config.apiUrl}/v1/wallets/${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 404) {
        return null;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch wallet: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        ...data,
        createdAt: new Date(data.createdAt),
      };
    } catch (error) {
      console.error('Error fetching smart wallet:', error);
      throw error;
    }
  }

  /**
   * Create a new smart wallet for a user
   * @param userId - Unique user identifier
   * @param chainId - Optional blockchain chain ID (defaults to 1 for Ethereum mainnet)
   * @returns Newly created SmartWallet object
   */
  async createSmartWallet(
    userId: string,
    chainId: number = 1
  ): Promise<SmartWallet> {
    try {
      const response = await fetch(
        `${this.config.apiUrl}/v1/wallets`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            chainId,
            contractAddress: this.config.contractAddress,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to create wallet: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        ...data,
        createdAt: new Date(data.createdAt),
      };
    } catch (error) {
      console.error('Error creating smart wallet:', error);
      throw error;
    }
  }

  /**
   * Ensure a user has a smart wallet - creates one if it doesn't exist
   * @param userId - Unique user identifier
   * @param chainId - Optional blockchain chain ID
   * @returns SmartWallet object (existing or newly created)
   */
  async ensureSmartWallet(
    userId: string,
    chainId: number = 1
  ): Promise<SmartWallet> {
    try {
      // Check for existing wallet
      const existingWallet = await this.getSmartWallet(userId);
      
      if (existingWallet) {
        console.log('Smart wallet found:', existingWallet.address);
        return existingWallet;
      }

      // Create new wallet if none exists
      console.log('Creating new smart wallet for user:', userId);
      const newWallet = await this.createSmartWallet(userId, chainId);
      console.log('Smart wallet created:', newWallet.address);
      
      return newWallet;
    } catch (error) {
      console.error('Error ensuring smart wallet:', error);
      throw error;
    }
  }

  /**
   * Get wallet balance
   * @param walletAddress - Smart wallet address
   * @returns Balance as string
   */
  async getWalletBalance(walletAddress: string): Promise<string> {
    try {
      const response = await fetch(
        `${this.config.apiUrl}/v1/wallets/${walletAddress}/balance`,
        {
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch balance: ${response.statusText}`);
      }

      const data = await response.json();
      return data.balance;
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const MarzNetwork = new MarzNetworkClient();

// Export types
export type { SmartWallet, MarzNetworkConfig };

// Convenience export for direct usage
export async function ensureSmartWallet(
  userId: string,
  chainId?: number
): Promise<SmartWallet> {
  return MarzNetwork.ensureSmartWallet(userId, chainId);
}
