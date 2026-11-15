import { getPageMetadata } from "@/config/metadata";
import CustomerGiftCardsClient from "./customerGiftCardsClient";

export const generateMetadata = () => getPageMetadata("Customer Gift Cards");

export default function CustomerGiftCardsPage() {
  return <CustomerGiftCardsClient />;
}
