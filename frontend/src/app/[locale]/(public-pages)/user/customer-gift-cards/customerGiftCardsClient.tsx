"use client";

import dynamic from "next/dynamic";

const CustomerGiftCardsView = dynamic(() => import("@/views/user-dashboard/offer-and-rewards/gift-cards/giftCards"), { ssr: false });

export default function CustomerGiftCardsClient() {
  return <CustomerGiftCardsView />;
}
