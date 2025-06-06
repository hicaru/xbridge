import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { chainConfigs } from "./config";

// Extract the chain objects from the configuration.
// These are already of the type `Chain` from 'viem/chains'
const configuredChains = Object.values(chainConfigs)
  .map((chainConfig) => chainConfig?.wagmiChain)
  .filter(Boolean) as any[]; // Ensure undefined chains are filtered out, 'as any[]' to bypass strict type checks if necessary for getDefaultConfig

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
