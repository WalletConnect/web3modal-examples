import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import CustomButton from "../components/CustomButton";
import Balance from "../components/Balance";

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

      {/* use web3.js provider to get user's balance */}
      <Balance/>
    </>
  );
}
