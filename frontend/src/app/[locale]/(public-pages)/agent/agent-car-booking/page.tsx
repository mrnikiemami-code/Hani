import { getPageMetadata } from "@/config/metadata";
import AgentCarBookingClient from "./agentCarBookingClient";

export const generateMetadata = () => getPageMetadata("Agent Car Booking");

export default function AgentCarBookingPage() {
  return <AgentCarBookingClient />;
}
