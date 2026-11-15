import { getPageMetadata } from "@/config/metadata";
import CarMapClient from "./carMapClient";

export const generateMetadata = () => getPageMetadata("Car Map");

export default function CarMapPage() {
  return <CarMapClient />;
}
