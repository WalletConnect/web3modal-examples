import { Web3ModalSign, useConnect } from "@web3modal/sign-react";
import { useEffect, useState } from "react";

// 1. Get projectID at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
if (!projectId) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}

export default function HomePage() {
  const [disabled, setDisabled] = useState(false);
  const { connect } = useConnect({
    requiredNamespaces: {
      eip155: {
        methods: ["eth_sendTransaction", "personal_sign"],
        chains: ["eip155:1"],
        events: ["chainChanged", "accountsChanged"],
      },
    },
  });

  async function onConnect() {
    try {
      setDisabled(true);
      const session = await connect();
      console.info(session);
    } catch (err) {
      console.error(err);
    } finally {
      setDisabled(false);
    }
  }

  return (
    <>
      <button onClick={onConnect} disabled={disabled}>
        Connect Wallet
      </button>

      {/* Set up Web3ModalAuth component */}
      <Web3ModalSign
        projectId={projectId}
        metadata={{
          name: "Web3Modal",
          description: "Web3Modal",
          url: "web3modal.com",
          icons: [
            "https://walletconnect.com/_next/static/media/logo_mark.84dd8525.svg",
          ],
        }}
      />
    </>
  );
}
