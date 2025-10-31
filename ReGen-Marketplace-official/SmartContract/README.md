# ReGen Marketplace Smart Contracts

Smart contracts for the ReGen Marketplace, a circular economy platform built on the Hedera network.

## Overview

The ReGen smart contract suite governs the creation, ownership, transfer, and lifecycle tracking of product NFTs within the circular economy. It automates key sustainability actions such as repair logging, recycling certification, and GreenPoints issuance — all in a transparent and tamper-proof way on the Hedera network.

## Smart Contracts

### 1. ProductPassport Contract (NFT Minting + Ownership)

Manages the minting of product NFTs using Hedera Token Service (HTS) and tracks ownership transfers.

**Key Functions:**
- `mintProductNFT(metadataURI, manufacturer, serialNumber)` - Mints a new NFT representing a physical product
- `transferOwnership(tokenId, newOwner, reason)` - Updates ownership during resale or recycling
- `getProductInfo(tokenId)` - Returns metadata, ownership history, and lifecycle summary
- `ownerOf(tokenId)` - Returns the current owner of a product
- `balanceOf(owner)` - Returns number of products owned by an address
- `tokensOfOwner(owner)` - Returns all tokens owned by an address

**Events:**
- `ProductMinted` - Emitted when a new product is minted
- `OwnershipTransferred` - Emitted when ownership changes

### 2. LifecycleEvent Contract (HCS Event Logging)

Records verifiable lifecycle events to the Hedera Consensus Service (HCS) for public viewing.

**Key Functions:**
- `logEvent(tokenId, eventType, description, actor, proofHash)` - Logs a lifecycle event
- `getEventHistory(tokenId)` - Retrieves all events for a product
- `getRepairEvents(tokenId)` - Gets all repair events for a product
- `getRecyclingEvents(tokenId)` - Gets all recycling events
- `verifyEvent(eventId)` - Marks an event as verified by authorized party

**Event Types:**
- CREATE, TRANSFER, REPAIR, INSPECTION, RECYCLE, VERIFY, REFURBISH, DISASSEMBLY

**Events:**
- `LifecycleEventLogged` - Emitted when an event is logged
- `EventVerified` - Emitted when an event is verified

### 3. GreenPoints Contract (Reward Token)

Manages the issuance and redemption of GreenPoints as HTS-compatible tokens for sustainable actions.

**Key Functions:**
- `issuePoints(userAddress, amount, reason, description)` - Issues points for sustainable actions
- `redeemPoints(amount, redemptionType)` - Allows users to redeem points for benefits
- `getBalance(userAddress)` - Returns the GreenPoints balance
- `transfer(to, amount)` - Transfer points between users
- `burn(amount)` - Remove points from circulation

**Reward Reasons:**
- RECYCLING, VERIFIED_RESALE, REPAIR, REFURBISHMENT, SUSTAINABILITY_BADGE, ECO_AUDIT, CARBON_OFFSET, CIRCULAR_EARNING

**Events:**
- `PointsIssued` - Emitted when points are issued
- `PointsRedeemed` - Emitted when points are redeemed
- `Transfer` - Emitted when points are transferred

### 4. AccessControl Contract

Provides role-based access control for the ReGen Marketplace contracts.

**Roles:**
- `MANUFACTURER_ROLE` - Can mint products
- `VERIFIED_SERVICE_CENTER_ROLE` - Can log repairs and inspections
- `RECYCLER_ROLE` - Can log recycling events
- `ADMIN_ROLE` - Can manage roles and verify events

**Key Functions:**
- `grantRole(role, account)` - Grant a role to an address
- `revokeRole(role, account)` - Revoke a role from an address
- `hasRole(role, account)` - Check if an address has a role
- `transferOwnership(newOwner)` - Transfer contract ownership

## Setup & Installation

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Hardhat
- Hedera account (for deployment)

### Installation

```bash
cd SmartContract
npm install
```

### Environment Setup

Create a `.env` file in the SmartContract directory:

```env
# Hedera Account Credentials (for Hedera deployment)
OPERATOR_ID=0.0.YOUR_ACCOUNT_ID
OPERATOR_KEY=YOUR_PRIVATE_KEY

# Network (testnet or mainnet)
HEDERA_NETWORK=testnet

# For Hardhat deployment
PRIVATE_KEY=YOUR_PRIVATE_KEY
```

## Cons  

### Using Hardhat

```bash
# Compile contracts
npm run compile

# Deploy to local network
npx hardhat run scripts/deploy.js --network localhost

# Deploy to Hedera testnet
npx hardhat run scripts/deploy.js --network hedera_testnet

# Deploy to Hedera mainnet
npx hardhat run scripts/deploy.js --network hedera_mainnet
```

### Using Hedera SDK (Direct)

```bash
# Compile first
npm run compile

# Deploy using Hedera SDK
node scripts/deploy-hedera.js
```

## Data Flow

1. **Product Minting**: A product is minted as an NFT (HTS) and its metadata is stored on IPFS
2. **Lifecycle Tracking**: Each action (repair, resale, recycle) is recorded as an HCS message tied to that NFT ID
3. **Public Queries**: The Mirror Node aggregates data for public queries via QR code lookup
4. **Rewards**: Sustainable actions trigger automatic GreenPoints issuance from the Rewards contract

## Security & Validation

- **Access Control**: Only verified manufacturers or service centers can mint or log events via role-based access
- **Transaction Signing**: All transactions are signed and timestamped via Hedera Consensus Service
- **Smart Contract Validation**: Implements comprehensive access control using Hedera Account IDs and roles
- **Event Verification**: Events can be verified by authorized parties to ensure authenticity

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## Integration with Frontend

The contracts are integrated with the React frontend through:

1. **WalletConnect Component**: Uses HashConnect for Hedera wallet integration
2. **Contract Addresses**: Store deployed contract addresses in your frontend config
3. **Hedera SDK**: Use `@hashgraph/sdk` to interact with contracts from the frontend

### Example Frontend Integration

```javascript
import { Contract } from "@hashgraph/sdk/contract";

// Initialize contract
const contractAddress = "0x..."; // Your deployed contract address
const contract = new Contract(contractAddress);

// Call a view function
const balance = await contract.getBalance(walletAddress);
```

## Future Extensions (Phase 3+)

- **DAO Governance**: Governance of reward parameters (GreenPoints emission rate, sustainability criteria)
- **Oracle Integration**: Integration with carbon credit or ESG data oracles
- **Brand APIs**: Smart contract–driven brand APIs for automated lifecycle certification

## License

MIT

## Support

For issues and questions, please contact the ReGen Marketplace development team.

