"use client";

import dynamic from "next/dynamic";

const LoginView = dynamic(() => import("@/views/auth/login/login"), { ssr: false });

export default function LoginClient() {
  return <LoginView />;
}
