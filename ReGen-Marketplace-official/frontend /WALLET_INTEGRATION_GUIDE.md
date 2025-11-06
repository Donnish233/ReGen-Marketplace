# MetaMask Wallet Integration Guide for Hedera Testnet

This guide explains how to use the MetaMask wallet integration with Hedera testnet token signing functionality in the ReGen Marketplace.

## Setup & Installation

### Prerequisites
1. **MetaMask Extension** - Install from [metamask.io/download](https://metamask.io/download/)
2. **Hedera Testnet Network** - Added to MetaMask (done automatically on first connection)
3. **Hedera Testnet Account** - Create from [testnet.portal.hedera.com](https://testnet.portal.hedera.com/)

### Configuration
The wallet integration is configured in:
- `src/config/contracts.js` - Contract addresses on Hedera testnet
- `src/components/WalletConnect.tsx` - Main wallet connection component
- `src/context/WalletContext.tsx` - Global wallet state management

## Architecture

### Component Hierarchy

```
App
├── WalletProvider (Context)
│   └── AppContent
│       ├── AuthForm (email/password login)
│       ├── Landing (wallet connection page)
│       └── Dashboard (main application)
```

### Core Files

#### 1. **WalletConnect Component** (`src/components/WalletConnect.tsx`)
Standalone wallet connection UI component that:
- Detects MetaMask installation
- Connects to Hedera Testnet (Chain ID: 296)
- Displays wallet address when connected
- Allows wallet disconnection

**Props:**
```typescript
interface WalletConnectProps {
  onConnect?: (accountId: string, provider?: BrowserProvider) => void;
}
```

**Usage:**
```jsx
import WalletConnect from "./components/WalletConnect";

export default function MyComponent() {
  const handleConnect = (accountId, provider) => {
    console.log("Connected account:", accountId);
  };

  return <WalletConnect onConnect={handleConnect} />;
}
```

#### 2. **WalletContext** (`src/context/WalletContext.tsx`)
Global state management for wallet across the entire application.

**Provides:**
```typescript
interface WalletContextType {
  address: string | null;              // Connected wallet address
  isConnected: boolean;                // Connection status
  provider: BrowserProvider | null;    // ethers.js provider
  signer: any;                         // ethers.js signer
  connectWallet: () => Promise<void>;  // Connect to MetaMask
  disconnectWallet: () => void;        // Disconnect wallet
  getContract: (contractName) => Contract | null;  // Get contract instance
  signTransaction: (message) => Promise<string>;   // Sign message
}
```

**Usage in Components:**
```jsx
import { useWallet } from "../context/WalletContext";

export default function MyComponent() {
  const { address, isConnected, connectWallet, disconnectWallet } = useWallet();

  return (
    <div>
      {isConnected ? (
        <>
          <p>Connected: {address}</p>
          <button onClick={disconnectWallet}>Disconnect</button>
        </>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}
```

#### 3. **Hedera Token Service** (`src/services/hederaTokenService.ts`)
Utilities for signing and managing Hedera tokens, including GreenPoints rewards.

**Key Functions:**

```typescript
// Sign a message with the wallet
signHederaTokenMessage(signer, message): Promise<TokenSigningResult>

// Create token minting signature
createTokenMintSignature(signer, tokenId, amount, recipientAddress): Promise<TokenSigningResult>

// Create token transfer signature
createTokenTransferSignature(signer, tokenId, fromAddress, toAddress, amount): Promise<TokenSigningResult>

// Issue green points to a user
issueGreenPoints(signer, userAddress, amount, reason, description): Promise<{success, transactionHash, error}>

// Get user's green points balance
getGreenPointsBalance(userAddress, provider): Promise<{success, balance, error}>
```

**Usage Example:**
```javascript
import { issueGreenPoints, getGreenPointsBalance } from "../services/hederaTokenService";
import { useWallet } from "../context/WalletContext";

export default function RewardsComponent() {
  const { signer, provider, address } = useWallet();

  const awardPoints = async () => {
    const result = await issueGreenPoints(
      signer,
      "0x1234567890123456789012345678901234567890",
      100,
      "RECYCLING",
      "Recycled 5 kg of plastic"
    );

    if (result.success) {
      console.log("Points awarded! Hash:", result.transactionHash);
    }
  };

  const checkBalance = async () => {
    const result = await getGreenPointsBalance(address, provider);
    if (result.success) {
      console.log("Your balance:", result.balance);
    }
  };

  return (
    <div>
      <button onClick={awardPoints}>Award Points</button>
      <button onClick={checkBalance}>Check Balance</button>
    </div>
  );
}
```

## Hedera Network Configuration

### Network Details
- **Network Name:** Hedera Testnet
- **Chain ID:** 296 (0x128 in hex)
- **RPC URL:** https://testnet.hashio.io/api
- **Block Explorer:** https://hashscan.io/testnet
- **Native Currency:** HBAR

### Auto-Configuration
When connecting with MetaMask for the first time, the component will:
1. Detect if Hedera Testnet is not configured
2. Automatically add the network to MetaMask (if supported)
3. Switch to the Hedera Testnet network
4. Display a warning if the network cannot be added

## Smart Contracts

### Contract Addresses (Hedera Testnet)
```javascript
ACCESS_CONTROL:     "0x5e8df4A8869613A89Cd08288a0389012446fBEE5"
PRODUCT_PASSPORT:   "0xb6fb89abEAd1dFb8A344e4b905F56afdb93F48f7"
LIFECYCLE_EVENT:    "0x8Fd15D6dd8d2E8Dba3eb595e0871212385A7A036"
GREEN_POINTS:       "0x2Ed3B5104630685B6a1660E3953C834917271178"
```

### Available Contracts via Context

```jsx
import { useWallet } from "../context/WalletContext";

export default function ContractInteraction() {
  const { getContract } = useWallet();

  const productPassportContract = getContract("PRODUCT_PASSPORT");
  const greenPointsContract = getContract("GREEN_POINTS");
  const accessControlContract = getContract("ACCESS_CONTROL");
  const lifecycleEventContract = getContract("LIFECYCLE_EVENT");

  // Use contracts to call methods
  const mintProduct = async () => {
    if (!productPassportContract) return;

    try {
      const tx = await productPassportContract.mintProductNFT(
        "ipfs://...",      // metadataURI
        "0x...",           // manufacturer address
        "SN12345"          // serialNumber
      );
      const receipt = await tx.wait();
      console.log("Product minted:", receipt);
    } catch (error) {
      console.error("Mint failed:", error);
    }
  };

  return <button onClick={mintProduct}>Mint Product</button>;
}
```

## Common Scenarios

### 1. Connect Wallet on App Load

```jsx
// src/pages/Landing.jsx
import { useWallet } from "../context/WalletContext";
import WalletConnect from "../components/WalletConnect";

export default function Landing({ onWalletConnect }) {
  const { address, isConnected } = useWallet();

  return (
    <div>
      <h1>Welcome to ReGen Marketplace</h1>
      <WalletConnect
        onConnect={(accountId) => onWalletConnect(accountId)}
      />
    </div>
  );
}
```

### 2. Sign a Message for Authentication

```jsx
import { useWallet } from "../context/WalletContext";

export default function SignatureAuth() {
  const { signer, address } = useWallet();

  const authenticateUser = async () => {
    const message = `Authenticate ReGen Marketplace\nWallet: ${address}\nTimestamp: ${Date.now()}`;

    try {
      const signature = await signer.signMessage(message);
      console.log("Signature:", signature);

      // Send to backend for verification
      const response = await fetch("/api/auth/verify-signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, message, signature })
      });

      const result = await response.json();
      console.log("Authentication result:", result);
    } catch (error) {
      console.error("Signature failed:", error);
    }
  };

  return <button onClick={authenticateUser}>Sign In with Wallet</button>;
}
```

### 3. Award Green Points for User Actions

```jsx
import { issueGreenPoints } from "../services/hederaTokenService";
import { useWallet } from "../context/WalletContext";

export default function RecycleAction() {
  const { signer } = useWallet();

  const completeRecycling = async (userAddress, weight) => {
    const points = Math.floor(weight * 10); // 10 points per kg

    const result = await issueGreenPoints(
      signer,
      userAddress,
      points,
      "RECYCLING",
      `Recycled ${weight}kg of materials`
    );

    if (result.success) {
      alert(`Congratulations! You earned ${points} Green Points!`);
    } else {
      alert("Failed to award points: " + result.error);
    }
  };

  return (
    <button onClick={() => completeRecycling("0x...", 5)}>
      Log Recycling
    </button>
  );
}
```

### 4. Display User's Green Points Balance

```jsx
import { useEffect, useState } from "react";
import { getGreenPointsBalance } from "../services/hederaTokenService";
import { useWallet } from "../context/WalletContext";

export default function BalanceWidget() {
  const { address, provider } = useWallet();
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    if (!address || !provider) return;

    const fetchBalance = async () => {
      const result = await getGreenPointsBalance(address, provider);
      if (result.success) {
        setBalance(result.balance);
      }
    };

    fetchBalance();
    const interval = setInterval(fetchBalance, 30000); // Refresh every 30s

    return () => clearInterval(interval);
  }, [address, provider]);

  return (
    <div className="bg-green-100 p-4 rounded-lg">
      <h3>Green Points</h3>
      <p className="text-2xl font-bold">{balance}</p>
    </div>
  );
}
```

## Error Handling

### Common Errors

**User Rejected Connection**
```
Code: 4001
Message: "User rejected the request to connect wallet."
```

**Wrong Network**
```
Message: "⚠️ Please switch to Hedera Testnet (Chain ID: 296)"
```

**MetaMask Not Installed**
```
Message: "MetaMask not installed. Please install MetaMask extension."
```

### Proper Error Handling Pattern

```jsx
import { useWallet } from "../context/WalletContext";
import { useState } from "react";

export default function SafeWalletAction() {
  const { isConnected, connectWallet, signer } = useWallet();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignMessage = async () => {
    try {
      setError(null);
      setLoading(true);

      if (!isConnected) {
        await connectWallet();
        return;
      }

      if (!signer) {
        setError("Wallet not properly initialized");
        return;
      }

      const signature = await signer.signMessage("Test message");
      console.log("Success:", signature);
    } catch (err) {
      if (err.code === 4001) {
        setError("You rejected the request");
      } else {
        setError(err.message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <div className="text-red-600">{error}</div>}
      <button onClick={handleSignMessage} disabled={loading}>
        {loading ? "Processing..." : "Sign Message"}
      </button>
    </div>
  );
}
```

## Data Persistence

### Automatic Persistence
The wallet integration automatically:
- Stores connected account ID in `localStorage` under key `hedera_account`
- Restores wallet connection on page reload (if previously connected)
- Clears storage on wallet disconnect

### Custom Data Storage

```jsx
const { address } = useWallet();

useEffect(() => {
  if (address) {
    // Save user data
    localStorage.setItem("user_wallet", address);

    // Fetch user-specific data
    fetch(`/api/user/${address}`).then(r => r.json());
  }
}, [address]);
```

## Type Definitions

### TypeScript Types Available

```typescript
// From WalletContext
import { useWallet } from "../context/WalletContext";

// Contract names (for getContract)
type ContractName = "ACCESS_CONTROL" | "PRODUCT_PASSPORT" | "LIFECYCLE_EVENT" | "GREEN_POINTS";

// From hederaTokenService
import { SignatureData, TokenSigningResult } from "../services/hederaTokenService";
```

## Testing Checklist

- [ ] MetaMask is installed and enabled
- [ ] Hedera Testnet network is added to MetaMask
- [ ] Test wallet has testnet HBAR tokens
- [ ] Connect button appears before wallet connection
- [ ] Wallet address displays when connected
- [ ] Disconnect button works correctly
- [ ] Can sign messages with wallet
- [ ] Contract interactions execute successfully
- [ ] Network switching works (if on wrong network)
- [ ] Wallet state persists on page reload

## Troubleshooting

### Wallet Not Detecting
1. Check MetaMask is installed and enabled
2. Refresh the page
3. Clear browser cache
4. Check browser console for errors

### Transaction Fails
1. Ensure you have sufficient HBAR in testnet wallet
2. Verify contract address is correct
3. Check network is Hedera Testnet (Chain ID: 296)
4. Review contract ABI matches deployed contract

### Signature Issues
1. Ensure MetaMask is unlocked
2. Check signer is initialized (`useWallet().signer`)
3. Verify message format is correct

## Resources

- **MetaMask Docs:** https://docs.metamask.io/
- **Hedera Docs:** https://docs.hedera.com/
- **ethers.js Docs:** https://docs.ethers.org/
- **Hedera Testnet Faucet:** https://testnet.portal.hedera.com/
- **HashScan Explorer:** https://hashscan.io/testnet
