"use client";

import dynamic from "next/dynamic";

const TeamView = dynamic(() => import("@/views/pages/teams/teams"), { ssr: false });

export default function TeamClient() {
  return <TeamView />;
}
