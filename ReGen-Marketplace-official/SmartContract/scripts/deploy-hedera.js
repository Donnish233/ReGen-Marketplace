/**
 * Hedera-specific deployment script using @hashgraph/sdk
 * 
 * This script deploys contracts directly to Hedera network
 * Make sure you have your operator credentials configured
 */

const {
    Client,
    AccountId,
    PrivateKey,
    ContractCreateFlow,
    FileCreateTransaction,
    ContractExecuteTransaction,
    ContractCallQuery,
} = require("@hashgraph/sdk");
require("dotenv").config();

// Hedera network setup
const OPERATOR_ID = process.env.OPERATOR_ID;
const OPERATOR_KEY = process.env.OPERATOR_KEY;
const NETWORK = process.env.HEDERA_NETWORK || "testnet";

async function main() {
    console.log("🚀 Starting Hedera deployment...\n");

    // Create client based on network
    let client;
    if (NETWORK === "testnet") {
        client = Client.forTestnet();
    } else if (NETWORK === "mainnet") {
        client = Client.forMainnet();
    } else {
        throw new Error("Invalid network. Use 'testnet' or 'mainnet'");
    }

    // Set operator credentials
    client.setOperator(
        AccountId.fromString(OPERATOR_ID),
        PrivateKey.fromString(OPERATOR_KEY)
    );

    console.log("📝 Using account:", OPERATOR_ID);
    console.log("🌐 Network:", NETWORK, "\n");

    // Read contract bytecode (you'll need to compile first)
    const fs = require("fs");
    
    try {
        // Read the compiled contract artifacts
        const contracts = [
            { name: "AccessControl", path: "./artifacts/contracts/AccessControl.sol/AccessControl.json" },
            { name: "ProductPassport", path: "./artifacts/contracts/ProductPassport.sol/ProductPassport.json" },
            { name: "LifecycleEvent", path: "./artifacts/contracts/LifecycleEvent.sol/LifecycleEvent.json" },
            { name: "GreenPoints", path: "./artifacts/contracts/GreenPoints.sol/GreenPoints.json" },
        ];

        console.log("📦 Reading compiled contracts...\n");
        
        for (const contract of contracts) {
            console.log(`Deploying ${contract.name}...`);
            
            const contractData = JSON.parse(fs.readFileSync(contract.path, "utf8"));
            const bytecode = contractData.bytecode;
            
            // Create contract on Hedera
            const contractCreateTransaction = new ContractCreateFlow()
                .setBytecode(bytecode)
                .setGas(1000000);

            const contractCreateResponse = await contractCreateTransaction.execute(client);
            const contractCreateReceipt = await contractCreateResponse.getReceipt(client);
            
            console.log(`✅ ${contract.name} deployed!`);
            console.log(`   Contract ID: ${contractCreateReceipt.contractId.toString()}\n`);
        }

        console.log("🎉 All contracts deployed successfully!\n");
        
    } catch (error) {
        console.error("❌ Deployment failed:", error.message);
        process.exit(1);
    }

    client.close();
}

main();

