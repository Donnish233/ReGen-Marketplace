# ReGen Marketplace - Hedera Deployment Guide

## Prerequisites

1. Node.js (v16 or later)
2. Hedera Testnet account with HBAR for gas fees
3. Your Hedera credentials in `.env` file

## Setup

### 1. Install Dependencies

```bash
cd SmartContract
npm install
```

### 2. Configure Environment

Create a `.env` file in the `SmartContract` directory with your credentials:

```env
HEDERA_ACCOUNT_ID=0.0.7126929
HEDERA_PRIVATE_KEY=0xf086a33c24aff1c3c2db1d696cbd5e8daf78f1eeae54fb39eb2740c1745f3a01
HEDERA_NETWORK=testnet
```

**⚠️ IMPORTANT:** Never commit your `.env` file to Git! It's already in `.gitignore`.

### 3. Compile Contracts

```bash
npm run compile
```

This will compile all Solidity contracts and prepare them for deployment.

## Deployment

### Deploy to Hedera Testnet

```bash
npm run deploy:hedera
```

Or manually:

```bash
npx hardhat run scripts/deploy-to-hedera.js --network hedera_testnet
```

### What Happens During Deployment

The script will:

1. ✅ Deploy `AccessControl` contract
2. ✅ De풀ments `ProductPassport` contract  
3. ✅ Deploys `LifecycleEvent` contract
4. ✅ Deploys `GreenPoints` contract
5. ✅ Link contracts together (set ProductPassport address in LifecycleEvent)
6. ✅ Save deployment info to `deployment-info.json`

### After Deployment

You'll get:

- All contract addresses
- A `deployment-info.json` file with all the details
- Links to view contracts on HashScan

Example output:

```
🎉 DEPLOYMENT SUCCESSFUL
======================================================================
Hedera Account ID:   0.0.7126929
Deployer Address:    0x...

Contract Addresses:
AccessControl:       0x...
ProductPassport:     0x...
LifecycleEvent:      0x...
GreenPoints:         0x...
======================================================================
```

## Viewing Contracts on HashScan

After deployment, you can view your contracts on HashScan:

- Testnet: https://hashscan.io/testnet/contract/YOUR_CONTRACT_ADDRESS

## Integrating with Frontend

1. Copy the contract addresses from `deployment-info.json`
2. Update your frontend `.env` or config file:

```javascript
// Example frontend config
export const CONTRACT_ADDRESSES = {
  PRODUCT_PASSPORT: "0x...", // From deployment
  LIFECYCLE_EVENT: "0x...",   // From deployment
  GREEN_POINTS: "0x...",      // From deployment
  ACCESS_CONTROL: "0x..."     // From deployment
};
```

3. Use these addresses in your React components to interact with the contracts

## Troubleshooting

### Error: "HEDERA_PRIVATE_KEY not found"

- Make sure your `.env` file exists in the `SmartContract` directory
- Check that the file has the correct variable name: `HEDERA_PRIVATE_KEY` (not `PRIVATE_KEY`)

### Error: "Insufficient funds"

- You need HBAR in your Hedera account for gas fees
- Get testnet HBAR from: https://portal.hedera.com/

### Error: "Network not supported"

- Make sure you're running with the correct network flag: `--network hedera_testnet`
- Check your `hardhat.config.js` has the Hedera network configured

### Contracts compile but deployment fails

- Check your Hedera account has sufficient HBAR
- Verify your private key is correct
- Try checking the transaction on HashScan using your account ID

## Testing

Run the test suite:

```bash
npm test
```

## Next Steps

1. ✅ Deploy contracts (you just did this!)
2. 📝 Update frontend with contract addresses
3. 🔌 Connect Hedera wallet (HashConnect integration)
4. 🧪 Test minting a product NFT
5. 🎯 Test lifecycle events logging
6. 🎁 Test GreenPoints issuance and redemption

## Support

If you encounter issues:

1. Check the error message carefully
2. Verify your `.env` credentials
3. Check your Hedera account has HBAR
4. Review the HashScan explorer for transaction status
5. Check the `deployment-info.json` file for any errors

## Production Deployment

For mainnet deployment:

1. Update `.env` to use mainnet:
   ```env
   HEDERA_NETWORK=mainnet
   ```

2. Deploy with mainnet network:
   ```bash
   npx hardhat run scripts/deploy-to-hedera.js --network hedera_mainnet
   ```

⚠️ **WARNING:** Mainnet requires real HBAR and is permanent. Test thoroughly on testnet first!

