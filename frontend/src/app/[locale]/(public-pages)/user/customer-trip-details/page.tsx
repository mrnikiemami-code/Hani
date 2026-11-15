import { getPageMetadata } from "@/config/metadata";
import CustomerTripDetailsClient from "./customerTripDetailsClient";

export const generateMetadata = () => getPageMetadata("Customer Trip Details");

export default function CustomerTripDetailsPage() {
  return <CustomerTripDetailsClient />;
}
