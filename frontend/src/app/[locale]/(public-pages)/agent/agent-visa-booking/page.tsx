import { getPageMetadata } from "@/config/metadata";
import AgentVisaBookingClient from "./agentVisaBookingClient";

export const generateMetadata = () => getPageMetadata("Agent Visa Booking");

export default function AgentVisaBookingPage() {
  return <AgentVisaBookingClient />;
}
