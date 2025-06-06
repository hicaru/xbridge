import "@rainbow-me/rainbowkit/styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi"; // Changed from WagmiConfig
import { wagmiConfig } from "./config/wallet.ts"; // Removed chains
import { ToastContainer, Bounce } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}> {/* Changed from WagmiConfig */}
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#4DBBBA",
            accentColorForeground: "white",
          })}
          showRecentTransactions
          // chains prop is no longer needed here as it's handled by WagmiProvider & getDefaultConfig
        >
          <App />
          <ToastContainer
            position="bottom-right"
            autoClose={30000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
        />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
