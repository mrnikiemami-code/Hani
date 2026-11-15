"use client";

import dynamic from "next/dynamic";

const ReviewView = dynamic(() => import("@/views/user-dashboard/my-reviews/userReviews"), { ssr: false });

export default function ReviewClient() {
  return <ReviewView />;
}
