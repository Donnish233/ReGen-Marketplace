# Quick Start - Deploy to Hedera

## Your Credentials (Already Configured)

```
HEDERA_ACCOUNT_ID=0.0.7126929
HEDERA_PRIVATE_KEY=0xf086a33c24aff1c3c2db1d696cbd5e8daf78f1eeae54fb39eb2740c1745f3a01
```

## Deploy in 3 Steps

### Step 1: Create .env file

Create a `.env` file in the `SmartContract` directory:

```bash
cd SmartContract
```

Copy your credentials into `.env`:

```bash
HEDERA_ACCOUNT_ID=0.0.7126929
HEDERA_PRIVATE_KEY=0xf086a33c24aff1c3c2db1d696cbd5e8daf78f1eeae54fb39eb2740c1745f3a01
HEDERA_NETWORK=testnet
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Deploy to Hedera

```bash
npm run deploy:hedera
```

That's it! 🎉

The deployment script will:
- Deploy all 4 contracts
- Link them together
- Save addresses to `deployment-info.json`
- Show you HashScan links

## What You'll Get

After deployment, you'll receive:

```
🎉 DEPLOYMENT SUCCESSFUL
Contract Addresses:
AccessControl:      0x...
ProductPassport:    0x...
LifecycleEvent:     0x...
GreenPoints:        0x...
```

## Next Steps

1. Copy contract addresses to your frontend config
2. Test the wallet connection
3. Start minting product NFTs!

## Need Help?

Check `DEPLOYMENT_GUIDE.md` for detailed troubleshooting.

