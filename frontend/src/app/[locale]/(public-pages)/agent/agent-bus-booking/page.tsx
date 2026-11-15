import { getPageMetadata } from "@/config/metadata";
import AgentBusBookingClient from "./agentBusBookingClient";

export const generateMetadata = () => getPageMetadata("Agent Bus Booking");

export default function AgentBusBookingPage() {
  return <AgentBusBookingClient />;
}
