import { TokenConfig } from "../config/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { FC } from "react";

interface AddTokenProps {
  info: TokenConfig;
  decimals: number;
  symbol: string;
}

const AddToken: FC<{ info: TokenConfig; decimals: number; symbol: string }> = ({
  info,
  decimals,
  symbol,
}: AddTokenProps) => {
  const { connector } = useAccount();

  const addTokenToWallet = async () => { // Renamed for clarity from addToMetamask to avoid confusion with component name
    if (!connector) {
      toast.error("Wallet not connected");
      return;
    }
    const provider = await connector.getProvider();
    if (!provider) {
      console.error("Provider not available from connector.");
      toast.error("Wallet provider not available. Cannot add token.");
      return;
    }

    let toastOpts = { autoClose: 5000 };
    try {
      toast.info("Confirm token add in wallet", toastOpts);
      // Ensure info.address is not null
      if (!info.address) {
        toast.error("Token address is not available.");
        return;
      }
      const wasAdded = await provider.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: info.address,
            symbol: symbol,
            decimals: decimals,
            image: info.logo,
          },
        },
      });

      if (wasAdded) {
        toast.success(`Added token ${info.name}`, toastOpts);
      } else {
        toast.error(`Couldn't add token ${info.name}`, toastOpts);
      }
    } catch (e: unknown) {
      toast.error(`Can't add token ${info.name}`, toastOpts);
    }
  };

  // Render the button only if a connector is available.
  // The actual provider fetching and check will happen inside addTokenToWallet.
  if (!connector) {
    return null; // Or some disabled button or placeholder
  }

  return (
    <button
      className="btn join-item"
      onClick={addTokenToWallet} // Updated to new function name
    >
      <FontAwesomeIcon icon={faPlus} color="white" className="ml-auto" />{" "}
      </button>
    );
  // Extraneous closing brace and 'return result;' removed.
};

export default AddToken;
