import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { HashConnect } from "@hashgraph/hashconnect";

export default function WalletConnect({ onConnect }) {
  const [connecting, setConnecting] = useState(false);
  const [hashconnect, setHashconnect] = useState(null);
  const [connected, setConnected] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const [extensionMetadata, setExtensionMetadata] = useState(null);
  const [pairingString, setPairingString] = useState(null);

  useEffect(() => {
    const initHashConnect = async () => {
      try {
        // Clear any stale pairing data first - remove all hashconnect related keys
        Object.keys(localStorage).forEach(key => {
          if (key.toLowerCase().includes('hashconnect') || key.toLowerCase().includes('hashpack')) {
            localStorage.removeItem(key);
            console.log("Cleared localStorage key:", key);
          }
        });
        
        const hashconnect = new HashConnect(true); // Enable debug mode
        
        const appMetadata = {
          name: "ReGen Marketplace",
          description: "Circular Economy Marketplace",
          icons: ["https://abs.twimg.com/icons/apple-touch-icon-192x192.png"],
          url: window.location.origin
        };

        // Listen for found extension
        console.log("Setting up foundExtensionEvent listener...");
        console.log("foundExtensionEvent exists:", !!hashconnect.foundExtensionEvent);
        if (hashconnect.foundExtensionEvent) {
          hashconnect.foundExtensionEvent.on((walletMetadata) => {
            console.log("✅ Found extension:", walletMetadata);
            setExtensionMetadata(walletMetadata);
          });
        } else {
          console.error("❌ foundExtensionEvent does not exist on hashconnect");
        }

        // Listen for pairing events
        if (hashconnect.pairingEvent) {
          hashconnect.pairingEvent.on((pairingData) => {
            console.log("Pairing successful:", pairingData);
            setConnected(true);
            setConnecting(false);
            setAccountId(pairingData.accountIds[0]);
            if (onConnect) {
              onConnect(pairingData.accountIds[0]);
            }
          });
        }

        // Initialize HashConnect
        const state = await hashconnect.init(appMetadata, "testnet", false);
        setHashconnect(hashconnect);
        setPairingString(state.pairingString);
        console.log("HashConnect initialized:", state);
        console.log("hcData:", hashconnect.hcData);

        // Check if already paired
        if (state.pairingData && state.pairingData.length > 0) {
          setConnected(true);
          setAccountId(state.pairingData[0].accountIds[0]);
          if (onConnect) {
            onConnect(state.pairingData[0].accountIds[0]);
          }
        }
      } catch (err) {
        console.error("HashConnect init error:", err);
      }
    };

    initHashConnect();

    return () => {
      if (hashconnect) {
        hashconnect.disconnect();
      }
    };
  }, []);

  const connectWallet = async () => {
    if (!hashconnect) {
      console.error("HashConnect not initialized yet");
      return;
    }

    setConnecting(true);
    try {
      // Check if already paired
      if (hashconnect.hcData.pairingData && hashconnect.hcData.pairingData.length > 0) {
        const accountId = hashconnect.hcData.pairingData[0].accountIds[0];
        setConnected(true);
        setAccountId(accountId);
        if (onConnect) {
          onConnect(accountId);
        }
        setConnecting(false);
        return;
      }

      // Check if we have extension metadata
      if (!extensionMetadata) {
        console.error("Extension metadata not found in state, checking hcData...");
        console.log("hcData.full:", hashconnect.hcData);
        
        // Try to use extension data from hcData if available
        if (hashconnect.hcData && hashconnect.hcData.foundExtensionData) {
          console.log("Found extension in hcData:", hashconnect.hcData.foundExtensionData);
          setExtensionMetadata(hashconnect.hcData.foundExtensionData);
        } else {
          const installLink = "https://www.hashpack.app/download";
          const confirmInstall = window.confirm(
            "HashPack wallet extension not detected!\n\n" +
            "Please ensure HashPack is installed and enabled in your browser:\n" +
            "1. Visit: " + installLink + "\n" +
            "2. Install the extension for Chrome/Edge/Brave\n" +
            "3. Refresh this page\n\n" +
            "Click OK to open the download page now."
          );
          
          if (confirmInstall) {
            window.open(installLink, '_blank');
          }
          setConnecting(false);
          return;
        }
      }

      // Try to connect
      if (pairingString) {
        console.log("Connecting with extension:", extensionMetadata.name);
        hashconnect.connectToLocalWallet(pairingString, extensionMetadata);
        // Don't reset connecting state here - let pairingEvent handle it
        // If user rejects, they can click connect again
      } else {
        console.error("Pairing string not ready");
        setConnecting(false);
      }
    } catch (err) {
      console.error("Connection error:", err);
      setConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      if (hashconnect) {
        await hashconnect.disconnect();
        localStorage.removeItem('hashconnectData');
        setConnected(false);
        setAccountId(null);
      }
    } catch (err) {
      console.error("Disconnect error:", err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {connected ? (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold">
            <Icon icon="mdi:check-circle" width="20" height="20" />
            <span className="text-sm">{accountId}</span>
          </div>
          <button
            onClick={disconnectWallet}
            className="flex items-center gap-2 bg-gray-500 text-white px-3 py-2 rounded-lg font-semibold hover:bg-gray-600 transition text-sm"
          >
            <Icon icon="mdi:logout" width="18" height="18" />
            <span className="hidden sm:inline">Disconnect</span>
          </button>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          disabled={connecting || !hashconnect}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition disabled:bg-gray-400"
        >
          <Icon icon="mdi:wallet-outline" width="20" height="20" />
          <span className="text-sm hidden sm:inline">
            {connecting ? "Connecting..." : "Connect Wallet"}
          </span>
        </button>
      )}
    </div>
  );
}