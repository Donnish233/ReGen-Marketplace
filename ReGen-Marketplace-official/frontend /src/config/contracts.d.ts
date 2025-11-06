import { CONTRACT_ABIS as _CONTRACT_ABIS } from '../abis';

export interface ContractAddresses {
  ACCESS_CONTROL: string;
  PRODUCT_PASSPORT: string;
  LIFECYCLE_EVENT: string;
  GREEN_POINTS: string;
}

export const CONTRACT_ADDRESSES: ContractAddresses;
export const HEDERA_NETWORK: string;
export const HASHSCAN_BASE_URL: string;

export const getHashScanUrl: (contractAddress: string) => string;

export const CONTRACT_ABIS: typeof _CONTRACT_ABIS;
