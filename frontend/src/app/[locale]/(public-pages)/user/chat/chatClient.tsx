"use client";

import dynamic from "next/dynamic";

const ChatView = dynamic(() => import("@/views/user-dashboard/message/userChat"), { ssr: false });

export default function ChatClient() {
  return <ChatView />;
}
