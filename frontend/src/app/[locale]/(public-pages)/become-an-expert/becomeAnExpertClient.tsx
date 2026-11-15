"use client";

import dynamic from "next/dynamic";

const BecomeAnExpertView = dynamic(() => import("@/views/pages/become-an-expert/becomeAnExpert"), { ssr: false });

export default function BecomeAnExpertClient() {
  return <BecomeAnExpertView />;
}
