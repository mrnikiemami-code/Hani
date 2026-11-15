import { getPageMetadata } from "@/config/metadata";
import AgentBookingDetailsClient from "./agentBookingDetailsClient";

export const generateMetadata = () => getPageMetadata("Agent Booking Details");

export default function AgentBookingDetailsPage() {
  return <AgentBookingDetailsClient />;
}
