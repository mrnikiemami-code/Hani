"use client";

import dynamic from "next/dynamic";

const WishlistView = dynamic(() => import("@/views/user-dashboard/wishlist/userWishlist"), { ssr: false });

export default function WishlistClient() {
  return <WishlistView />;
}
