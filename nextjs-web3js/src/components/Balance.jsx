import { useAccount } from "wagmi";
import useWeb3Provider from "../hooks/useWeb3Provider";
import { useState } from "react";

export default function Balance() {

  const [userBalance, setUserBalance] = useState()

    const { isConnected, address } = useAccount()

    const {provider} = useWeb3Provider()

    async function getBalance (){
        const _userBalance = await provider.eth.getBalance(address)
        setUserBalance(_userBalance)
    }

  return (
    <>
    <button onClick={getBalance} disabled={!isConnected}>
      Get Balance
    </button>
    {userBalance}
    </>
  );
}
