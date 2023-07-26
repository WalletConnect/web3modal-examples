import { WalletConnectModalAuth } from "https://unpkg.com/@walletconnect/modal-auth-html@2.6.1";

// 1. Define ui elements
const connectButton = document.getElementById("connect-button");

// 2. Create modal client, add your project id
const modal = new WalletConnectModalAuth({
  projectId: "YOUR_PROJECT_ID",
  metadata: {
    name: "My Dapp",
    description: "My Dapp description",
    url: "https://my-dapp.com",
    icons: ["https://my-dapp.com/logo.png"],
  },
});

// 3. Sign In
async function onSignIn() {
  try {
    connectButton.disabled = true;
    const data = await modal.signIn({
      statement: "Sign In to My Dapp",
    });
    console.info(data);
  } catch (err) {
    console.error(err);
  } finally {
    connectButton.disabled = false;
  }
}

// 4. Create connection handler
connectButton.addEventListener("click", onSignIn);
