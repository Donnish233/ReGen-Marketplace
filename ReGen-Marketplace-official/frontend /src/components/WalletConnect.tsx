import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { BrowserProvider } from "ethers";

interface WalletConnectProps {
  onConnect?: (accountId: string, provider?: BrowserProvider) => void;
}

interface WalletInfo {
  address: string | null;
  isConnected: boolean;
  balance: string | null;
  chainId: number | null;
}

const HEDERA_TESTNET_CHAIN_ID = 296; // Hedera Testnet chain ID

export default function WalletConnect({ onConnect }: WalletConnectProps) {
  const [connecting, setConnecting] = useState(false);
  const [walletInfo, setWalletInfo] = useState<WalletInfo>({
    address: null,
    isConnected: false,
    balance: null,
    chainId: null,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);

  // Initialize wallet on component mount
  useEffect(() => {
    const initializeWallet = async () => {
      try {
        // Check if MetaMask is installed
        if (typeof window.ethereum !== "undefined") {
          // Create provider instance
          const ethProvider = new BrowserProvider(window.ethereum);
          setProvider(ethProvider);

          // Check if already connected
          const accounts = (await window.ethereum!.request({
            method: "eth_accounts",
          })) as string[];

          if (accounts && accounts.length > 0) {
            const chainId = (await window.ethereum!.request({
              method: "eth_chainId",
            })) as string;
            const network = await ethProvider.getNetwork();

            setWalletInfo({
              address: accounts[0],
              isConnected: true,
              balance: null,
              chainId: Number(chainId),
            });

            // Check network
            if (Number(chainId) !== HEDERA_TESTNET_CHAIN_ID) {
              setErrorMessage(
                `⚠️ Please switch to Hedera Testnet (Chain ID: ${HEDERA_TESTNET_CHAIN_ID})`
              );
            } else {
              setErrorMessage(null);
            }

            if (onConnect) {
              onConnect(accounts[0], ethProvider);
            }
          }

          // Listen for account changes
          window.ethereum!.on("accountsChanged", (newAccounts: string[]) => {
            if (newAccounts.length === 0) {
              setWalletInfo({
                address: null,
                isConnected: false,
                balance: null,
                chainId: null,
              });
              setErrorMessage(null);
            } else {
              setWalletInfo((prev) => ({
                ...prev,
                address: newAccounts[0],
              }));
              if (onConnect) {
                onConnect(newAccounts[0], provider);
              }
            }
          });

          // Listen for chain changes
          window.ethereum!.on("chainChanged", (chainId: string) => {
            const newChainId = Number(chainId);
            setWalletInfo((prev) => ({
              ...prev,
              chainId: newChainId,
            }));

            if (newChainId !== HEDERA_TESTNET_CHAIN_ID) {
              setErrorMessage(
                `⚠️ Please switch to Hedera Testnet (Chain ID: ${HEDERA_TESTNET_CHAIN_ID})`
              );
            } else {
              setErrorMessage(null);
            }
          });
        }
      } catch (error) {
        console.error("Wallet initialization error:", error);
      }
    };

    initializeWallet();
  }, [onConnect]);

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      setErrorMessage(
        "MetaMask not installed. Please install MetaMask extension."
      );
      window.open("https://metamask.io/download/", "_blank");
      return;
    }

    setConnecting(true);
    setErrorMessage(null);

    try {
      // Request account access
      const accounts = (await window.ethereum!.request({
        method: "eth_requestAccounts",
      })) as string[];

      if (accounts && accounts.length > 0) {
        const ethProvider = new BrowserProvider(window.ethereum!);
        const chainId = (await window.ethereum!.request({
          method: "eth_chainId",
        })) as string;

        setProvider(ethProvider);
        setWalletInfo({
          address: accounts[0],
          isConnected: true,
          balance: null,
          chainId: Number(chainId),
        });

        // Check if connected to correct network
        if (Number(chainId) !== HEDERA_TESTNET_CHAIN_ID) {
          await switchToHederaTestnet();
        } else {
          setErrorMessage(null);
        }

        if (onConnect) {
          onConnect(accounts[0], ethProvider);
        }

        // Store in localStorage for persistence
        localStorage.setItem("hedera_account", accounts[0]);
      }
    } catch (error: any) {
      if (error.code === 4001) {
        setErrorMessage("User rejected the request to connect wallet.");
      } else {
        setErrorMessage(
          error.message || "Failed to connect wallet. Please try again."
        );
      }
      console.error("Wallet connection error:", error);
    } finally {
      setConnecting(false);
    }
  };

  const switchToHederaTestnet = async () => {
    try {
      await window.ethereum!.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${HEDERA_TESTNET_CHAIN_ID.toString(16)}` }],
      });
      setErrorMessage(null);
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        // Chain not added, try to add it
        try {
          await window.ethereum!.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${HEDERA_TESTNET_CHAIN_ID.toString(16)}`,
                chainName: "Hedera Testnet",
                rpcUrls: ["https://testnet.hashio.io/api"],
                blockExplorerUrls: ["https://hashscan.io/testnet"],
                nativeCurrency: {
                  name: "HBAR",
                  symbol: "HBAR",
                  decimals: 18,
                },
              },
            ],
          });
          setErrorMessage(null);
        } catch (addError) {
          setErrorMessage(
            "Failed to add Hedera Testnet to MetaMask. Please add it manually."
          );
          console.error("Failed to add network:", addError);
        }
      } else {
        setErrorMessage("Failed to switch to Hedera Testnet.");
        console.error("Switch network error:", switchError);
      }
    }
  };

  const disconnectWallet = async () => {
    try {
      setWalletInfo({
        address: null,
        isConnected: false,
        balance: null,
        chainId: null,
      });
      setProvider(null);
      setErrorMessage(null);
      localStorage.removeItem("hedera_account");
    } catch (error) {
      console.error("Disconnect error:", error);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="flex flex-col gap-2">
      {errorMessage && (
        <div className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded-lg text-xs font-semibold">
          {errorMessage}
        </div>
      )}
      <div className="flex items-center gap-2">
        {walletInfo.isConnected ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold">
              <Icon icon="mdi:check-circle" width="20" height="20" />
              <span className="text-sm font-mono">
                {formatAddress(walletInfo.address || "")}
              </span>
            </div>
            <button
              onClick={disconnectWallet}
              className="flex items-center gap-2 bg-gray-500 text-white px-3 py-2 rounded-lg font-semibold hover:bg-gray-600 transition text-sm"
              title="Disconnect from MetaMask"
            >
              <Icon icon="mdi:logout" width="18" height="18" />
              <span className="hidden sm:inline">Disconnect</span>
            </button>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            disabled={connecting}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition disabled:bg-gray-400"
            title="Connect MetaMask wallet"
          >
            <Icon icon="mdi:wallet-outline" width="20" height="20" />
            <span className="text-sm hidden sm:inline">
              {connecting ? "Connecting..." : "Connect MetaMask"}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
