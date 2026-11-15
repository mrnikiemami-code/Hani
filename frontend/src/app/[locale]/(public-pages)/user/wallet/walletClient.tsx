"use client";

import dynamic from "next/dynamic";

const WalletView = dynamic(() => import("@/views/user-dashboard/wallet/userWallet"), { ssr: false });

export default function WalletClient() {
  return <WalletView />;
}
