import React, { useEffect, useState, useRef } from "react";
import Web3 from "web3";
import { useWeb3Modal, useWeb3ModalEvents } from "@web3modal/react";
import { useAccount, useBalance, useConnect } from "wagmi";
import Image from "next/image";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function Index(props) {
  const [web3, setWeb3] = useState(null);
  const [connected, setConnected] = useState(true);
  const [error, setError] = useState();

  const [msg, setMsg] = useState("");

  const web3Modal = useWeb3Modal({
    cacheProvider: true,
    providerOptions: {},
  });

  const key = uuidv4();

  const connectToWallet = async (e) => {
    e.preventDefault();

    try {
      const provider = await web3Modal.open();

      const web3Instance = new Web3(provider);

      setWeb3(web3Instance);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  const signMessage = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const web3 = new Web3(window.ethereum);
        const message = `${process.env.NEXT_PUBLIC_MESSAGE} ${key}`;
        await window.ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        if (accounts.length === 0) {
          setError("No account found in MetaMask.");
          return;
        }
        const fromAddress = accounts[0];
        const signature = await web3.eth.personal.sign(
          message,
          fromAddress,
          ""
        );
        const result = await axios.post("/api/handler", {
          signature: signature,
          key: key,
          address: fromAddress,
        });

        if (result.data?.isAuth) {
          
          setConnected(true);
          
        } else {
          setError(result?.data?.error);
        }
      } else {
        setError("Please install MetaMask to sign messages.");
      }
    } catch (error) {
      setError("Error while signing the message.");
      console.error(error);
    }
  };

  useAccount({
    onConnect({ address, connector, isReconnected }) {
      !connected ? signMessage() : setMsg(address);
      console.log(!connected);
      setConnected(false);
    },
    
  });

  return (
    <div className={"flex flex-col items-center justify-center h-screen"}>
      <button
        aria-label="Continue with WalletConnect"
        role="button"
        onClick={(e) => {
          connectToWallet(e);
        }}
        className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center mt-10"
      >
        
        <p className="text-base font-medium ml-4 text-white">
          Continue with WalletConnect
        </p>
      </button>
      <br/>
      <p>Address : {msg}</p>
      <p>{error}</p>
    </div>
  );
}

export default Index;
