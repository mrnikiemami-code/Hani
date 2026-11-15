import { getPageMetadata } from "@/config/metadata";
import WalletClient from "./walletClient";

export const generateMetadata = () => getPageMetadata("Wallet");

export default function WalletPage() {
  return <WalletClient />;
}
