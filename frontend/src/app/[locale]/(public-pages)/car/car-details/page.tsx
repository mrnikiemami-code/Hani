import { getPageMetadata } from "@/config/metadata";
import CarDetailsClient from "./carDetailsClient";

export const generateMetadata = () => getPageMetadata("Car Details");

export default function CarDetailsPage() {
  return <CarDetailsClient />;
}
