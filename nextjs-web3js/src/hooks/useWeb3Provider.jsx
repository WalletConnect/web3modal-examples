import { useProvider } from "wagmi";
import toWeb3Provider from 'ethers-to-web3';
import Web3 from 'web3';

export default function useWeb3Provider() {

 const provider = useProvider()

 const web3provider = toWeb3Provider(provider)

 const web3 = new Web3(web3provider)

  return { provider: web3 }
}
