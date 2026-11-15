"use client";

import dynamic from "next/dynamic";

const AgentReviewView = dynamic(() => import("@/views/agent-dashboard/reviews/agentReviews"), { ssr: false });

export default function AgentReviewClient() {
  return <AgentReviewView />;
}
