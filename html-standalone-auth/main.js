import AuthClient, { generateNonce } from "@walletconnect/auth-client";
import { Web3Modal } from "@web3modal/standalone";

// 0. Define ui elements
const connectButton = document.getElementById("connect-button");

// 1. Define constants
const projectId = import.meta.env.VITE_PROJECT_ID;
const chainId = "eip155:1";

// 3. Create modal client
export const web3Modal = new Web3Modal({
  projectId,
  walletConnectVersion: 2,
  standaloneChains: [chainId],
});
export let authClient = undefined;

// 4. Initialise clients
async function initialize() {
  try {
    connectButton.disabled = true;
    authClient = await AuthClient.init({ projectId });
    connectButton.disabled = false;
    connectButton.innerText = "Connect Wallet";

    // 5. Listen for auth response
    authClient.on("auth_response", ({ params }) => {
      console.log(params);
      web3Modal.closeModal();
    });
  } catch (err) {
    console.error(err);
  }
}

initialize();

// 6. Create connection handler
connectButton.addEventListener("click", async () => {
  try {
    if (authClient) {
      const { uri } = await authClient.request({
        aud: "https://walletconnect.com/login",
        domain: "walletconnect.com",
        chainId,
        nonce: generateNonce(),
        type: 'eip4361',
        statement: 'Sign in with wallet.'
      });
      if (uri) {
        await web3Modal.openModal({ uri });
      }
    }
  } catch (err) {
    console.error(err);
  }
});
