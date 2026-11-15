import { getPageMetadata } from "@/config/metadata";
import AgentFlightBookingClient from "./agentFlightBookingClient";

export const generateMetadata = () => getPageMetadata("Agent Flight Booking");

export default function AgentFlightBookingPage() {
  return <AgentFlightBookingClient />;
}
