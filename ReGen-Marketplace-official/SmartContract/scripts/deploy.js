const { ethers } = require("hardhat");

/**
 * Deploy script for ReGen Marketplace smart contracts on Hedera
 * 
 * This script deploys all three core contracts:
 * 1. AccessControl - Role-based access control
 * 2. ProductPassport - NFT minting and ownership management
 * 3. LifecycleEvent - Event logging on HCS
 * 4. GreenPoints - Reward token system
 */
async function main() {
  console.log("🚀 Starting deployment of ReGen Marketplace contracts on Hedera...\n");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);
  console.log("💰 Account balance:", (await ethers.provider.getBalance(deployer.address)).toString(), "\n");

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
  console.log("   Setting ProductPassport address in LifecycleEvent...");
  const tx1 = await lifecycleEvent.setProductPassportAddress(productPassportAddress);
  await tx1.wait();
  console.log("✅ Contracts linked successfully\n");

  // Step 6: Grant initial roles (if needed)
  console.log("6️⃣ Setting up initial roles...");
  console.log("   Deployer is admin by default\n");

  // Summary
  console.log("=".repeat(60));
  console.log("🎉 DEPLOYMENT SUMMARY");
  console.log("=".repeat(60));
  console.log("AccessControl:     ", accessControlAddress);
  console.log("ProductPassport:   ", productPassportAddress);
  console.log("LifecycleEvent:    ", lifecycleEventAddress);
  console.log("GreenPoints:       ", greenPointsAddress);
  console.log("=".repeat(60));
  console.log("\n📋 Save these addresses for your frontend integration!\n");

  // Return addresses for potential frontend integration
  return {
    accessControl: accessControlAddress,
    productPassport: productPassportAddress,
    lifecycleEvent: lifecycleEventAddress,
    greenPoints: greenPointsAddress,
  };
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

