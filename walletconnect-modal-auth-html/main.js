import { WalletConnectModalAuth } from "@walletconnect/modal-auth-html";

// 0. Define ui elements
const connectButton = document.getElementById("connect-button");

// 1. Define constants
const projectId = import.meta.env.VITE_PROJECT_ID;
if (!projectId) {
  throw new Error("You need to provide VITE_PROJECT_ID env variable");
}

// 3. Create modal client
export const modal = new WalletConnectModalAuth({
  projectId,
  metadata: {
    name: "My Dapp",
    description: "My Dapp description",
    url: "https://my-dapp.com",
    icons: ["https://my-dapp.com/logo.png"],
  },
});

// 4. Sign In
async function onSignIn() {
  try {
    connectButton.disabled = true;
    const data = await modal.signIn({ statement: "Sign In to My Dapp" });
    console.info(data);
  } catch (err) {
    console.error(err);
  } finally {
    connectButton.disabled = false;
  }
}

// 6. Create connection handler
connectButton.addEventListener("click", onSignIn);
