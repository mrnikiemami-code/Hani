import { getPageMetadata } from "@/config/metadata";
import CarGridClient from "./carGridClient";

export const generateMetadata = () => getPageMetadata("Car Grid");

export default function CarGridPage() {
  return <CarGridClient />;
}
