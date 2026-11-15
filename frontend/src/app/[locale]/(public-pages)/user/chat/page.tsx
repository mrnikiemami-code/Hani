import { getPageMetadata } from "@/config/metadata";
import ChatClient from "./chatClient";

export const generateMetadata = () => getPageMetadata("Chat");

export default function ChatPage() {
  return <ChatClient />;
}
