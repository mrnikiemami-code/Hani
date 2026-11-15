import { getPageMetadata } from "@/config/metadata";
import AgentCruiseBookingClient from "./agentCruiseBookingClient";

export const generateMetadata = () => getPageMetadata("Agent Cruise Booking");

export default function AgentCruiseBookingPage() {
  return <AgentCruiseBookingClient />;
}
