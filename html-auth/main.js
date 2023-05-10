import { Web3ModalAuth } from "@web3modal/auth-html";

// 0. Define ui elements
const connectButton = document.getElementById("connect-button");

// 1. Define constants
const projectId = import.meta.env.VITE_PROJECT_ID;

// 3. Create modal client
export const web3Modal = new Web3ModalAuth({
  projectId,
  metadata: {
    name: "Web3Modal",
    description: "Web3Modal",
    url: "web3modal.com",
    icons: [
      "https://walletconnect.com/_next/static/media/logo_mark.84dd8525.svg",
    ],
  },
});

// 4. Sign In
async function onSignIn() {
  try {
    connectButton.disabled = true;
    const data = await web3Modal.signIn({ statement: "Connect to Web3Modal" });
    console.info(data);
  } catch (err) {
    console.error(err);
  } finally {
    connectButton.disabled = false;
  }
}

// 6. Create connection handler
connectButton.addEventListener("click", onSignIn);
