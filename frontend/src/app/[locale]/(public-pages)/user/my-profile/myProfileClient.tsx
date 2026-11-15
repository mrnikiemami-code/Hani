"use client";

import dynamic from "next/dynamic";

const MyProfileView = dynamic(() => import("@/views/user-dashboard/my-profile/myProfile"), { ssr: false });

export default function MyProfileClient() {
  return <MyProfileView />;
}
