import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import dynamic from "next/dynamic";

// Read: https://github.com/wagmi-dev/wagmi/issues/542#issuecomment-1144178142
const CustomButton = dynamic(() => import("../components/CustomButton"), {
  ssr: false,
})

export default function HomePage() {
  return (
    <>
      {/* Predefined button  */}
      <Web3Button icon="show" label="Connect Wallet" balance="show" />
      <br />

      {/* Network Switcher Button */}
      <Web3NetworkSwitch />
      <br />

      {/* Custom button */}
      <CustomButton />
    </>
  );
}
