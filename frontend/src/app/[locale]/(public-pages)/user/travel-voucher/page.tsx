import { getPageMetadata } from "@/config/metadata";
import TravelVoucherClient from "./travelVoucherClient";

export const generateMetadata = () => getPageMetadata("Travel Voucher");

export default function TravelVoucherPage() {
  return <TravelVoucherClient />;
}
