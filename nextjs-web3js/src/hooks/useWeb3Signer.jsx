import { useSigner } from "wagmi";
import toWeb3Provider from 'ethers-to-web3';
import Web3 from 'web3';

export default function useWeb3Signer() {

 const signer = useSigner()

 const web3signer = toWeb3Provider(signer)

 const web3 = new Web3(web3signer)

  return { signer: web3 }
}