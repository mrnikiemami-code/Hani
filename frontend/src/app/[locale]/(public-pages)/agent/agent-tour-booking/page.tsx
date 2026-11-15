import { getPageMetadata } from "@/config/metadata";
import AgentTourBookingClient from "./agentTourBookingClient";

export const generateMetadata = () => getPageMetadata("Agent Tour Booking");

export default function AgentTourBookingPage() {
  return <AgentTourBookingClient />;
}
