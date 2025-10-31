# Contract ABIs

This folder contains the compiled ABIs (Application Binary Interfaces) for all deployed smart contracts on Hedera.

## Contract ABIs

- **AccessControl.json** - Role-based access control contract
- **ProductPassport.json** - NFT-based product passport contract
- **LifecycleEvent.json** - Lifecycle event logging contract (HCS)
- **GreenPoints.json** - Green points reward token contract

## Usage

Import the ABIs in your components:

```javascript
import { CONTRACT_ABIS, CONTRACT_ADDRESSES } from '@/config/contracts';

// Access ABI
const productPassportABI = CONTRACT_ABIS.ProductPassport;
```

## Deployment Addresses

- AccessControl: `0x5e8df4A8869613A89Cd08288a0389012446fBEE5`
- ProductPassport: `0xb6fb89abEAd1dFb8A344e4b905F56afdb93F48f7`
- LifecycleEvent: `0x8Fd15D6dd8d2E8Dba3eb595e0871212385A7A036`
- GreenPoints: `0x2Ed3B5104630685B6a1660E3953C834917271178`

All contracts are deployed on **Hedera Testnet**.
