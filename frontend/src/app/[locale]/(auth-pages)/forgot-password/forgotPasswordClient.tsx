"use client";

import dynamic from "next/dynamic";

const ForgotPasswordView = dynamic(() => import("@/views/auth/forgot-password/forgotPassword"), { ssr: false });

export default function ForgotPasswordClient() {
  return <ForgotPasswordView />;
}
