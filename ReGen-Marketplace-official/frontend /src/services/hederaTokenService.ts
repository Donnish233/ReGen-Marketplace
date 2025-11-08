import { Contract, BrowserProvider } from "ethers";
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from "../config/contracts";

/**
 * Hedera Token Service utilities for signing and verifying token operations
 */

interface TokenSigningResult {
  success: boolean;
  signature?: string;
  message: string;
  error?: string;
}

/**
 * Sign a message with the connected wallet (MetaMask)
 * This is used for authenticating operations on Hedera testnet tokens
 */
export async function signHederaTokenMessage(
  signer: any,
  message: string
): Promise<TokenSigningResult> {
  try {
    if (!signer) {
      return {
        success: false,
        message: "No signer available",
        error: "Wallet not connected",
      };
    }

    const signature = await signer.signMessage(message);

    return {
      success: true,
      signature,
      message,
    };
  } catch (error: any) {
    console.error("Failed to sign Hedera token message:", error);
    return {
      success: false,
      message: "Failed to sign message",
      error: error.message || "Unknown error",
    };
  }
}

/**
 * Create a signature for token minting
 */
export async function createTokenMintSignature(
  signer: any,
  tokenId: string,
  amount: number,
  recipientAddress: string
): Promise<TokenSigningResult> {
  const message = `Mint Token: ${tokenId} | Amount: ${amount} | Recipient: ${recipientAddress} | Timestamp: ${Date.now()}`;
  return signHederaTokenMessage(signer, message);
}

/**
 * Create a signature for token transfer
 */
export async function createTokenTransferSignature(
  signer: any,
  tokenId: string,
  fromAddress: string,
  toAddress: string,
  amount: number
): Promise<TokenSigningResult> {
  const message = `Transfer Token: ${tokenId} | From: ${fromAddress} | To: ${toAddress} | Amount: ${amount} | Timestamp: ${Date.now()}`;
  return signHederaTokenMessage(signer, message);
}

/**
 * Get the GREEN_POINTS token contract instance
 */
export function getGreenPointsContract(
  signer: any
): Contract | null {
  try {
    const contractAddress = CONTRACT_ADDRESSES.GREEN_POINTS;
    const contractAbi = CONTRACT_ABIS.GreenPoints;

    if (!contractAddress || !contractAbi) {
      console.error("GREEN_POINTS contract not found in configuration");
      return null;
    }

    return new Contract(contractAddress, contractAbi, signer);
  } catch (error) {
    console.error("Failed to create GREEN_POINTS contract instance:", error);
    return null;
  }
}

/**
 * Issue green points to a user
 */
export async function issueGreenPoints(
  signer: any,
  userAddress: string,
  amount: number,
  reason: string,
  description: string
): Promise<{
  success: boolean;
  transactionHash?: string;
  error?: string;
}> {
  try {
    const contract = getGreenPointsContract(signer);
    if (!contract) {
      return {
        success: false,
        error: "Failed to initialize contract",
      };
    }

    // Map reason to contract enum
    const reasonEnums: Record<string, number> = {
      RECYCLING: 0,
      VERIFIED_RESALE: 1,
      REPAIR: 2,
      REFURBISHMENT: 3,
      SUSTAINABILITY_BADGE: 4,
      ECO_AUDIT: 5,
      CARBON_OFFSET: 6,
      CIRCULAR_EARNING: 7,
    };

    const reasonCode = reasonEnums[reason] || 0;

    const tx = await contract.issuePoints(
      userAddress,
      amount,
      reasonCode,
      description
    );
    const receipt = await tx.wait();

    return {
      success: true,
      transactionHash: receipt?.hash,
    };
  } catch (error: any) {
    console.error("Failed to issue green points:", error);
    return {
      success: false,
      error: error.message || "Unknown error",
    };
  }
}

/**
 * Get user's green points balance
 */
export async function getGreenPointsBalance(
  userAddress: string,
  provider: BrowserProvider
): Promise<{
  success: boolean;
  balance?: string;
  error?: string;
}> {
  try {
    const contract = getGreenPointsContract(provider);
    if (!contract) {
      return {
        success: false,
        error: "Failed to initialize contract",
      };
    }

    const balance = await contract.getBalance(userAddress);

    return {
      success: true,
      balance: balance.toString(),
    };
  } catch (error: any) {
    console.error("Failed to get green points balance:", error);
    return {
      success: false,
      error: error.message || "Unknown error",
    };
  }
}

/**
 * Verify a signed message (utility function)
 */
export function verifySignature(
  _message: string,
  signature: string,
  signerAddress: string
): boolean {
  // This would typically use ethers.js verifyMessage in a real implementation
  // For now, we just ensure the signature exists and is valid format
  return (
    signature.length > 0 &&
    signature.startsWith("0x") &&
    signerAddress.length > 0
  );
}
