import { Web3ModalAuth } from "https://unpkg.com/@web3modal/auth-html@2.4.7";

// 1. Define ui elements
const connectButton = document.getElementById("connect-button");

// 2. Create modal client, add your project id
const web3Modal = new Web3ModalAuth({
  projectId: "YOUR_PROJECT_ID",
  metadata: {
    name: "Web3Modal",
    description: "Web3Modal",
    url: "web3modal.com",
    icons: [
      "https://walletconnect.com/_next/static/media/logo_mark.84dd8525.svg",
    ],
  },
});

// 3. Sign In
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

// 4. Create connection handler
connectButton.addEventListener("click", onSignIn);
