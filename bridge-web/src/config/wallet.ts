import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { type Chain } from "viem"; // Added import for Chain type
import { chainConfigs } from "./config";

// Extract the chain objects from the configuration.
// These are already of the type `Chain` from 'viem/chains'
const configuredChains: Chain[] = Object.values(chainConfigs)
  .map((chainConfig) => chainConfig?.wagmiChain)
  .filter(Boolean); // Removed 'as any[]' and added explicit Chain[] type

// TODO: Replace with your actual project ID and application name
const projectId = "YOUR_PROJECT_ID";
const appName = "My Bridge App";

if (!projectId) {
  console.warn("WalletConnect Project ID is not set. Please set it in bridge-web/src/config/wallet.ts");
}

export const wagmiConfig = getDefaultConfig({
  appName,
  projectId,
  chains: configuredChains,
  // You might need to configure transports if default public RPCs are not sufficient
  // or if you have specific RPC requirements per chain.
  // Example:
  // ssr: true, // if using SSR
  // transports: configuredChains.reduce((obj, chain) => {
  //   obj[chain.id] = http(); // Default to http transport
  //   return obj;
  // }, {}),
});
