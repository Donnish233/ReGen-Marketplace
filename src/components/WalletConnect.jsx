import { useState } from "react";
import { Icon } from "@iconify/react";

export default function WalletConnect({ onConnect }) {
  const [connecting, setConnecting] = useState(false);

  const connectWallet = async () => {
    setConnecting(true);
    // Simulate wallet connection delay
    setTimeout(() => {
      const mockWalletId = "0.0.123456";
      onConnect(mockWalletId);
      setConnecting(false);
    }, 1200);
  };

  return (
    <div className="flex justify-center my-10">
      <button
        onClick={connectWallet}
        disabled={connecting}
        className="flex items-center gap-3 bg-green-500 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-green-600 transition"
      >
        <Icon icon="mdi:wallet-outline" width="24" height="24" />
        {connecting ? "Connecting..." : "Connect Wallet"}
      </button>
    </div>
  );
}
