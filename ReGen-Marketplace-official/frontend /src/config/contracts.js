/**
 * Smart Contract Addresses for ReGen Marketplace
 * Deployed on Hedera Testnet
 */

import { CONTRACT_ABIS } from '../abis';

export const CONTRACT_ADDRESSES = {
  ACCESS_CONTROL: "0x5e8df4A8869613A89Cd08288a0389012446fBEE5",
  PRODUCT_PASSPORT: "0xb6fb89abEAd1dFb8A344e4b905F56afdb93F48f7",
  LIFECYCLE_EVENT: "0x8Fd15D6dd8d2E8Dba3eb595e0871212385A7A036",
  GREEN_POINTS: "0x2Ed3B5104630685B6a1660E3953C834917271178",
};

export const HEDERA_NETWORK = "testnet";
export const HASHSCAN_BASE_URL = "https://hashscan.io/testnet";

export const getHashScanUrl = (contractAddress) => {
  return `${HASHSCAN_BASE_URL}/contract/${contractAddress}`;
};

export { CONTRACT_ABIS };

