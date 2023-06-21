import { Web3ModalSign } from "@web3modal/sign-html";

// 0. Define ui elements
const connectButton = document.getElementById("connect-button");

// 1. Define constants
const projectId = import.meta.env.VITE_PROJECT_ID;
if (!projectId) {
  throw new Error("You need to provide VITE_PROJECT_ID env variable");
}

// 2. Create modal client
export const web3Modal = new Web3ModalSign({
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

// 4. Connect
async function onConnect() {
  try {
    connectButton.disabled = true;
    const session = await web3Modal.connect({
      requiredNamespaces: {
        eip155: {
          methods: ["eth_sendTransaction", "personal_sign"],
          chains: ["eip155:1"],
          events: ["chainChanged", "accountsChanged"],
        },
      },
    });
    console.info(session);
  } catch (err) {
    console.error(err);
  } finally {
    connectButton.disabled = false;
  }
}

// 5. Create connection handler
connectButton.addEventListener("click", onConnect);
