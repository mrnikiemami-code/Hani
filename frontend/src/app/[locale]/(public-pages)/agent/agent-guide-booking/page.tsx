import { getPageMetadata } from "@/config/metadata";
import AgentGuideBookingClient from "./agentGuideBookingClient";

export const generateMetadata = () => getPageMetadata("Agent Guide Booking");

export default function AgentGuideBookingPage() {
  return <AgentGuideBookingClient />;
}
