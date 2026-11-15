"use client";

import dynamic from "next/dynamic";

const ChangePasswordView = dynamic(() => import("@/views/auth/change-password/changePassword"), { ssr: false });

export default function ChangePasswordClient() {
  return <ChangePasswordView />;
}
