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

  // Initialize wallet on component mount - only once
  useEffect(() => {
    console.log("WalletConnect component mounted");

    const checkAndRestoreWallet = async () => {
      try {
        if (typeof window.ethereum === "undefined") {
          console.log("MetaMask not detected");
          return;
        }

        console.log("MetaMask detected");
        const ethProvider = new BrowserProvider(window.ethereum);
        setProvider(ethProvider);

        // Check if already connected
        const accounts = (await window.ethereum!.request({
          method: "eth_accounts",
        })) as string[];

        console.log("Accounts:", accounts);

        if (accounts && accounts.length > 0) {
          const chainId = (await window.ethereum!.request({
            method: "eth_chainId",
          })) as string;

          setWalletInfo({
            address: accounts[0],
            isConnected: true,
            balance: null,
            chainId: Number(chainId),
          });

          if (onConnect) {
            onConnect(accounts[0], ethProvider);
          }

          if (Number(chainId) !== HEDERA_TESTNET_CHAIN_ID) {
            setErrorMessage(
              `⚠️ Please switch to Hedera Testnet (Chain ID: ${HEDERA_TESTNET_CHAIN_ID})`
            );
          }
        }

        // Set up event listeners
        const handleAccountsChanged = (newAccounts: string[]) => {
          console.log("Accounts changed:", newAccounts);
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
              onConnect(newAccounts[0], ethProvider);
            }
          }
        };

        const handleChainChanged = (chainId: string) => {
          console.log("Chain changed:", chainId);
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
        };

        window.ethereum!.on("accountsChanged", handleAccountsChanged);
        window.ethereum!.on("chainChanged", handleChainChanged);

        // Cleanup listeners on unmount
        return () => {
          if (window.ethereum) {
            window.ethereum!.removeListener("accountsChanged", handleAccountsChanged);
            window.ethereum!.removeListener("chainChanged", handleChainChanged);
          }
        };
      } catch (error) {
        console.error("Wallet initialization error:", error);
        setErrorMessage(`Init error: ${error}`);
      }
    };

    checkAndRestoreWallet();
  }, []);

  const connectWallet = async () => {
    console.log("Connect wallet clicked");

    if (typeof window.ethereum === "undefined") {
      console.error("MetaMask not found");
      setErrorMessage(
        "MetaMask not installed. Please install MetaMask extension."
      );
      window.open("https://metamask.io/download/", "_blank");
      return;
    }

    setConnecting(true);
    setErrorMessage(null);

    try {
      console.log("Checking MetaMask is ready...");

      // Ensure MetaMask is available and ready
      if (!window.ethereum) {
        throw new Error("window.ethereum is not available");
      }

      console.log("MetaMask is available, requesting account connection...");

      // Request accounts with extended timeout (30 seconds)
      // MetaMask extension can be slow sometimes
      let accounts: string[] | undefined;

      const accountsPromise = window.ethereum!.request({
        method: "eth_requestAccounts",
      }) as Promise<string[]>;

      // Use a much longer timeout and better error detection
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => {
          console.error("MetaMask popup timeout after 30s");
          console.warn("⚠️ Possible causes:");
          console.warn("  1. Browser popup blocker is blocking the MetaMask popup");
          console.warn("  2. MetaMask extension needs to be unlocked or locked");
          console.warn("  3. Try restarting the MetaMask extension");
          console.warn("  4. Try refreshing the page");
          reject(new Error("MetaMask connection timeout. Please check MetaMask extension status and try again."));
        }, 30000)
      );

      console.log("Waiting for MetaMask popup response (up to 30 seconds)...");
      accounts = await Promise.race([accountsPromise, timeoutPromise]);
      console.log("✓ Accounts received:", accounts);

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts returned from MetaMask");
      }

      console.log("Creating provider...");
      const ethProvider = new BrowserProvider(window.ethereum!);

      console.log("Requesting chain ID...");
      const chainId = (await window.ethereum!.request({
        method: "eth_chainId",
      })) as string;
      console.log("✓ Chain ID:", chainId);

      setProvider(ethProvider);
      setWalletInfo({
        address: accounts[0],
        isConnected: true,
        balance: null,
        chainId: Number(chainId),
      });

      console.log("✓ Wallet connected:", accounts[0]);

      // Check if connected to correct network
      if (Number(chainId) !== HEDERA_TESTNET_CHAIN_ID) {
        console.log("Wrong network, switching to Hedera Testnet...");
        await switchToHederaTestnet();
      } else {
        console.log("✓ Already on Hedera Testnet");
        setErrorMessage(null);
      }

      if (onConnect) {
        console.log("Calling onConnect callback...");
        onConnect(accounts[0], ethProvider);
      }

      // Store in localStorage for persistence
      localStorage.setItem("hedera_account", accounts[0]);
      console.log("✓ Account saved to localStorage");

    } catch (error: any) {
      console.error("❌ Wallet connection error:", error);
      console.error("Error code:", error?.code);
      console.error("Error message:", error?.message);
      console.error("Full error:", error);

      if (error.code === 4001) {
        setErrorMessage("User rejected the request to connect wallet.");
      } else if (error.message?.includes("timeout")) {
        setErrorMessage("Connection timeout. Please unlock MetaMask and check popup blocker settings.");
      } else if (error.message?.includes("not responding")) {
        setErrorMessage("MetaMask extension is not responding. Please try unlocking MetaMask or restarting your browser.");
      } else {
        setErrorMessage(
          error.message || "Failed to connect wallet. Please try again."
        );
      }
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
      {/* Debug info - remove in production */}
      {!walletInfo.isConnected && (
        <div className="text-xs text-gray-500">
          {typeof window.ethereum !== "undefined" ? "✓ MetaMask detected" : "✗ MetaMask not detected"}
        </div>
      )}
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
