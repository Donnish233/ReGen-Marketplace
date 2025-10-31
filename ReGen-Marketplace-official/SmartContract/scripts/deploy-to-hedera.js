const { ethers } = require("hardhat");
require("dotenv").config();

/**
 * Deploy script for ReGen Marketplace smart contracts on Hedera Testnet
 * 
 * This script deploys all four core contracts:
 * 1. AccessControl - Role-based access control
 * 2. ProductPassport - NFT minting and ownership management
 * 3. LifecycleEvent - Event logging on HCS
 * 4. GreenPoints - Reward token system
 * 
 * Usage: npx hardhat run scripts/deploy-to-hedera.js --network hedera_testnet
 */
async function main() {
  console.log("🚀 Starting deployment of ReGen Marketplace contracts on Hedera...\n");
  
  // Verify credentials are set
  if (!process.env.HEDERA_PRIVATE_KEY) {
    throw new Error("❌ HEDERA_PRIVATE_KEY not found in .env file");
  }
  
  if (!process.env.HEDERA_ACCOUNT_ID) {
    throw new Error("❌ HEDERA_ACCOUNT_ID not found in .env file");
  }

  console.log("🔑 Using Hedera Account ID:", process.env.HEDERA_ACCOUNT_ID);
  console.log("🌐 Network: Hedera Testnet\n");

  // Get the deployer account
  const signers = await ethers.getSigners();
  
  if (!signers || signers.length === 0) {
    throw new Error("❌ No signers found. Please check your Hedera credentials and network configuration.");
  }
  
  const deployer = signers[0];
  console.log("📝 Deploying contracts with account:", deployer.address);
  
  try {
    const balance = await ethers.provider.getBalance(deployer.address);
    console.log("💰 Account balance:", ethers.formatEther(balance), "HBAR\n");
  } catch (error) {
    console.log("⚠️  Could not fetch balance (might be normal on Hedera)\n");
  }

  // Step 1: Deploy AccessControl contract
  console.log("1️⃣ Deploying AccessControl contract...");
  const AccessControl = await ethers.getContractFactory("AccessControl");
  const accessControl = await AccessControl.deploy();
  await accessControl.waitForDeployment();
  const accessControlAddress = await accessControl.getAddress();
  console.log("✅ AccessControl deployed to:", accessControlAddress, "\n");

  // Step 2: Deploy ProductPassport contract
  console.log("2️⃣ Deploying ProductPassport contract...");
  const ProductPassport = await ethers.getContractFactory("ProductPassport");
  const productPassport = await ProductPassport.deploy();
  await productPassport.waitForDeployment();
  const productPassportAddress = await productPassport.getAddress();
  console.log("✅ ProductPassport deployed to:", productPassportAddress, "\n");

  // Step 3: Deploy LifecycleEvent contract
  console.log("3️⃣ Deploying LifecycleEvent contract...");
  const LifecycleEvent = await ethers.getContractFactory("LifecycleEvent");
  const lifecycleEvent = await LifecycleEvent.deploy();
  await lifecycleEvent.waitForDeployment();
  const lifecycleEventAddress = await lifecycleEvent.getAddress();
  console.log("✅ LifecycleEvent deployed to:", lifecycleEventAddress, "\n");

  // Step 4: Deploy GreenPoints contract
  console.log("4️⃣ Deploying GreenPoints contract...");
  const GreenPoints = await ethers.getContractFactory("GreenPoints");
  const greenPoints = await GreenPoints.deploy();
  await greenPoints.waitForDeployment();
  const greenPointsAddress = await greenPoints.getAddress();
  console.log("✅ GreenPoints deployed to:", greenPointsAddress, "\n");

  // Step 5: Link contracts together
  console.log("5️⃣ Linking contracts together...");
  try {
    console.log("   Setting ProductPassport address in LifecycleEvent...");
    const tx1 = await lifecycleEvent.setProductPassportAddress(productPassportAddress);
    await tx1.wait();
    console.log("✅ Contracts linked successfully\n");
  } catch (error) {
    console.log("⚠️  Warning: Could not link contracts:", error.message, "\n");
  }

  // Step 6: Grant initial roles
  console.log("6️⃣ Setting up initial roles...");
  console.log("   Deployer is admin by default in all contracts\n");

  // Summary
  console.log("=".repeat(70));
  console.log("🎉 DEPLOYMENT SUCCESSFUL");
  console.log("=".repeat(70));
  console.log("Hedera Account ID:  ", process.env.HEDERA_ACCOUNT_ID);
  console.log("Deployer Address:   ", deployer.address);
  console.log("");
  console.log("Contract Addresses:");
  console.log("AccessControl:      ", accessControlAddress);
  console.log("ProductPassport:    ", productPassportAddress);
  console.log("LifecycleEvent:     ", lifecycleEventAddress);
  console.log("GreenPoints:        ", greenPointsAddress);
  console.log("=".repeat(70));
  console.log("\n📋 NEXT STEPS:");
  console.log("1. Save these addresses to your frontend config");
  console.log("2. Update your .env file with contract addresses");
  console.log("3. Test the contracts on HashScan:", `https://hashscan.io/testnet/contract/${productPassportAddress}`);
  console.log("\n");

  // Write addresses to a file for easy reference
  const fs = require("fs");
  const deploymentInfo = {
    timestamp: new Date().toISOString(),
    network: "hedera_testnet",
    deployer: {
      accountId: process.env.HEDERA_ACCOUNT_ID,
      address: deployer.address
    },
    contracts: {
      accessControl: accessControlAddress,
      productPassport: productPassportAddress,
      lifecycleEvent: lifecycleEventAddress,
      greenPoints: greenPointsAddress
    }
  };

  fs.writeFileSync(
    "deployment-info.json",
    JSON.stringify(deploymentInfo, null, 2)
  );
  console.log("✅ Deployment info saved to deployment-info.json\n");

  // Return addresses for potential frontend integration
  return deploymentInfo;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed:", error);
    process.exit(1);
  });

