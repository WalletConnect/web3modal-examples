import { configureChains, createClient } from "@wagmi/core";
import { arbitrum, avalanche, mainnet, polygon } from "@wagmi/core/chains";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/html";

// 1. Define constants
const projectId = import.meta.env.VITE_PROJECT_ID;
const chains = [mainnet, polygon, avalanche, arbitrum];

// 2. Configure wagmi client
const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ chains, version: 1, projectId }),
  provider,
});

// 3. Create ethereum and modal clients
const ethereumClient = new EthereumClient(wagmiClient, chains);
export const web3Modal = new Web3Modal(
  {
    projectId,
    walletImages: {
      safe: "https://pbs.twimg.com/profile_images/1566773491764023297/IvmCdGnM_400x400.jpg",
    },
  },
  ethereumClient
);
