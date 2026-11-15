import { getPageMetadata } from "@/config/metadata";
import AgentHotelBookingClient from "./agentHotelBookingClient";

export const generateMetadata = () => getPageMetadata("Agent Hotel Booking");

export default function AgentHotelBookingPage() {
  return <AgentHotelBookingClient />;
}
