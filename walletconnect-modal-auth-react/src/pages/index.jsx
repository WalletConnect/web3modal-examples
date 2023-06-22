import {
  WalletConnectModalAuth,
  useSignIn,
} from "@walletconnect/modal-auth-react";
import { useState } from "react";

// 1. Get projectID at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
if (!projectId) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}

export default function HomePage() {
  // 2. Use sign in hook
  const [disabled, setDisabled] = useState(false);
  const { signIn } = useSignIn({ statement: "Sign In to My Dapp" });

  // 3. Sign in function
  async function onSignIn() {
    try {
      setDisabled(true);
      const data = await signIn();
      console.info(data);
    } catch (err) {
      console.error(err);
    } finally {
      setDisabled(false);
    }
  }

  return (
    <>
      <button onClick={onSignIn} disabled={disabled}>
        Sign In
      </button>

      {/* Set up WalletConnectModalAuth component */}
      <WalletConnectModalAuth
        projectId={projectId}
        metadata={{
          name: "My Dapp",
          description: "My Dapp description",
          url: "https://my-dapp.com",
          icons: ["https://my-dapp.com/logo.png"],
        }}
      />
    </>
  );
}
