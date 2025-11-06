import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { BrowserProvider, Contract } from "ethers";
import { CONTRACT_ADDRESSES, CONTRACT_ABIS } from "../config/contracts";

type ContractName = keyof typeof CONTRACT_ADDRESSES;

interface WalletContextType {
  address: string | null;
  isConnected: boolean;
  provider: BrowserProvider | null;
  signer: any;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  getContract: (contractName: ContractName) => Contract | null;
  signTransaction: (message: string) => Promise<string>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<any>(null);

  // Initialize wallet from localStorage on mount
  useEffect(() => {
    const initializeFromStorage = async () => {
      const storedAccount = localStorage.getItem("hedera_account");
      if (storedAccount && typeof window.ethereum !== "undefined") {
        try {
          const ethProvider = new BrowserProvider(window.ethereum);
          const accounts = (await window.ethereum!.request({
            method: "eth_accounts",
          })) as string[];
          if (accounts && accounts.length > 0) {
            const signer = await ethProvider.getSigner();
            setProvider(ethProvider);
            setSigner(signer);
            setAddress(accounts[0]);
            setIsConnected(true);
          }
        } catch (error) {
          console.error("Failed to restore wallet from storage:", error);
          localStorage.removeItem("hedera_account");
        }
      }
    };

    initializeFromStorage();
  }, []);

  const connectWallet = useCallback(async () => {
    if (typeof window.ethereum === "undefined") {
      throw new Error("MetaMask not installed. Please install MetaMask extension.");
    }

    try {
      const accounts = (await window.ethereum!.request({
        method: "eth_requestAccounts",
      })) as string[];

      if (accounts && accounts.length > 0) {
        const ethProvider = new BrowserProvider(window.ethereum!);
        const signer = await ethProvider.getSigner();

        setProvider(ethProvider);
        setSigner(signer);
        setAddress(accounts[0]);
        setIsConnected(true);
        localStorage.setItem("hedera_account", accounts[0]);
      }
    } catch (error: any) {
      if (error.code === 4001) {
        throw new Error("User rejected the request to connect wallet.");
      }
      throw error;
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setAddress(null);
    setIsConnected(false);
    setProvider(null);
    setSigner(null);
    localStorage.removeItem("hedera_account");
  }, []);

  const getContract = useCallback(
    (contractName: ContractName): Contract | null => {
      if (!provider || !signer) return null;

      const contractAddress = CONTRACT_ADDRESSES[contractName];
      const contractAbi = CONTRACT_ABIS[contractName];

      if (!contractAddress || !contractAbi) {
        console.error(`Contract ${String(contractName)} not found in configuration`);
        return null;
      }

      return new Contract(contractAddress, contractAbi, signer);
    },
    [provider, signer]
  );

  const signTransaction = useCallback(
    async (message: string): Promise<string> => {
      if (!signer) {
        throw new Error("Wallet not connected");
      }

      try {
        const signature = await signer.signMessage(message);
        return signature;
      } catch (error) {
        console.error("Failed to sign transaction:", error);
        throw error;
      }
    },
    [signer]
  );

  const value: WalletContextType = {
    address,
    isConnected,
    provider,
    signer,
    connectWallet,
    disconnectWallet,
    getContract,
    signTransaction,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
