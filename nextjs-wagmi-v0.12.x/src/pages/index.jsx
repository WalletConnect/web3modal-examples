import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import dynamic from 'next/dynamic';

//Prevent hydration mismatch error by rendering only on client.
const CustomButton = dynamic(()=>import("../components/CustomButton"),{
  ssr: false
})

export default function HomePage() {
  return (
    <>
      {/* Predefined button  */}
      <Web3Button icon="show" balance="show" />
      <br />

      {/* Network Switcher Button */}
      <Web3NetworkSwitch />
      <br />

      {/* Custom button */}
      <CustomButton />
    </>
  );
}
