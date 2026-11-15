import { getPageMetadata } from "@/config/metadata";
import AgentEnquiryDetailsClient from "./agentEnquiryDetailsClient";

export const generateMetadata = () => getPageMetadata("Agent Enquiry Details");

export default function AgentEnquiryDetailsPage() {
  return <AgentEnquiryDetailsClient />;
}
