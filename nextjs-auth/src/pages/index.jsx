import { Web3ModalAuth, useSignIn } from "@web3modal/auth-react";
import { useState } from "react";

// 1. Get projectID at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
if (!projectId) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}

export default function HomePage() {
  // 2. Use sign in hook
  const [disabled, setDisabled] = useState(false);
  const signIn = useSignIn({ statement: "Connect to Web3Modal Lab" });

  // 3. Sign in function
  async function onSignIn() {
    try {
      setDisabled(true);
      const data = await signIn({ statement: "Connect to Web3Modal Lab" });
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

      {/* Set up Web3ModalAuth component */}
      <Web3ModalAuth
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
