"use client";

import dynamic from "next/dynamic";

const RegisterView = dynamic(() => import("@/views/auth/register/register"), { ssr: false });

export default function RegisterClient() {
  return <RegisterView />;
}
