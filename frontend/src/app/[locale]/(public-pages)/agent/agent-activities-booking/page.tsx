import { getPageMetadata } from "@/config/metadata";
import AgentActivitiesBookingClient from "./agentActivitiesBookingClient";

export const generateMetadata = () => getPageMetadata("Agent Activities Booking");

export default function AgentActivitiesBookingPage() {
  return <AgentActivitiesBookingClient />;
}
