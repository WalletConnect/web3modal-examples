import { Web3ModalSign } from "https://unpkg.com/@web3modal/sign-html@2.4.7";

// 1. Define ui elements
const connectButton = document.getElementById("connect-button");

// 2. Create modal client, add your project id
const web3Modal = new Web3ModalSign({
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

// 3. Connect
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

// 4. Create connection handler
connectButton.addEventListener("click", onConnect);
