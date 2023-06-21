import { EthereumProvider } from "@walletconnect/ethereum-provider";
import { useEffect, useState } from "react";

// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}

export default function HomePage() {
  const [providerClient, setProviderClient] = useState(undefined);

  // 2. Initialize sign client
  async function onInitializeProviderClient() {
    const client = await EthereumProvider.init({
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      showQrModal: true,
      qrModalOptions: { themeMode: "light" },
      chains: [1],
      methods: ["eth_sendTransaction", "personal_sign"],
      events: ["chainChanged", "accountsChanged"],
      metadata: {
        name: "My Dapp",
        description: "My Dapp description",
        url: "https://my-dapp.com",
        icons: ["https://my-dapp.com/logo.png"],
      },
    });
    setProviderClient(client);
  }

  // 3. Enable / connect with provider, will open web3modal
  async function onConnect() {
    if (providerClient) {
      await providerClient.connect();
    } else {
      throw new Error("providerClient is not initialized");
    }
  }

  useEffect(() => {
    onInitializeProviderClient();
  }, []);

  return providerClient ? (
    <button onClick={onConnect}>Connect Wallet</button>
  ) : (
    "Initializing..."
  );
}
