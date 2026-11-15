"use client";

import dynamic from "next/dynamic";

const RecentlyViewedView = dynamic(() => import("@/views/pages/recently-viewed/RecentlyViewed"), { ssr: false });

export default function RecentlyViewedClient() {
  return <RecentlyViewedView />;
}
