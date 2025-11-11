import { useCallback, useMemo, useState } from "react";
import {
  useSmartAccountClient,
  useSendUserOperation,
} from "@account-kit/react";
import { encodeFunctionData } from "viem";
import { NFT_MINTABLE_ABI_PARSED } from "../../lib/constants.js";
import { useNftContractAddress } from "./useNftContractAddress.js";

export interface UseMintNFTParams {
  onSuccess?: () => void;
}
export interface UseMintReturn {
  isMinting: boolean;
  handleMint: () => void;
  transactionUrl?: string;
  error?: string;
}

export const useMint = ({ onSuccess }: UseMintNFTParams): UseMintReturn => {
  const [isMinting, setIsMinting] = useState(false);
  const [error, setError] = useState<string>();
  const nftContractAddress = useNftContractAddress();

  const { client } = useSmartAccountClient({});

  const handleSuccess = () => {
    setIsMinting(false);
    setError(undefined);
    onSuccess?.();
  };

  const handleError = (error: Error) => {
    console.error("Mint error:", error);
    setIsMinting(false);
    setError(error.message || "Failed to mint NFT");
  };

  const { sendUserOperationResult, sendUserOperation } = useSendUserOperation({
    client: client as any,
    waitForTxn: true,
    onError: handleError,
    onSuccess: handleSuccess,
    onMutate: () => {
      setIsMinting(true);
      setError(undefined);
    },
  });

  const handleMint = useCallback(async () => {
    if (!client) {
      setError("Wallet not connected");
      return;
    }

    if (!nftContractAddress) {
        setError("Contract address is not defined.");
        return;
    }

    // Resolve the current wallet address (client.getAddress may be async)
  // Provide a minimal arg to satisfy the SDK's type signature and cast the result
  const recipientAddress = await (client.getAddress?.() as Promise<`0x${string}`> | `0x${string}`);

    sendUserOperation({
      account: client.account as any,
      uo: {
        target: nftContractAddress,
        data: encodeFunctionData({
          abi: NFT_MINTABLE_ABI_PARSED,
          functionName: "mintTo",
          args: [recipientAddress as `0x${string}`],
        }),
      },
    });
  }, [client, sendUserOperation, nftContractAddress]);

  const transactionUrl = useMemo(() => {
    if (!client?.chain?.blockExplorers || !sendUserOperationResult?.hash) {
      return undefined;
    }
    return `${client.chain.blockExplorers.default.url}/tx/${sendUserOperationResult.hash}`;
  }, [client, sendUserOperationResult?.hash]);

  return {
    isMinting,
    handleMint,
    transactionUrl,
    error,
  };
};
